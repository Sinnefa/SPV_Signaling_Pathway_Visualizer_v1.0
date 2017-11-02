/* CONSTANTS */

//var baseurl = "";
var styleElem = document.createElement('style');
styleElem.type = 'text/css';
var triangleShape = "M0,-5L10,0L0,5 Z";
var complexShape = "M -3.5380432619161e-7,-10.422110257019 A 6.470588673012,6.4705126773471 0 0 0 -6.4705890268163,-3.9515454402782 6.470588673012,6.4705126773471 0 0 0 -6.0156256696514,-1.5674331419299 6.470588673012,6.4705126773471 0 0 0 -10.784314764824,4.6758743153767 6.470588673012,6.4705126773471 0 0 0 -4.3137261358123,11.146439132118 6.470588673012,6.4705126773471 0 0 0 -0.00842569486298,9.4951383190327 6.470588673012,6.4705126773471 0 0 0 4.3137252082032,11.146439132118 6.470588673012,6.4705126773471 0 0 0 10.784314981215,4.6758743153767 6.470588673012,6.4705126773471 0 0 0 6.0071996209837,-1.5586332441786 6.470588673012,6.4705126773471 0 0 0 6.4705880992072,-3.9515454402788 6.470588673012,6.4705126773471 0 0 0 -3.5380434841829e-7,-10.42211025702 Z";
var rectangleShape = "M0 0 L0 20 L5 20 L5 0 Z";
var phenotypeShape = "M-30,-15L50,-15L50,5L-30,5 Z";
var selected = new Array();
var elabels = new Array();
var nlabels = new Array();
var svg = new Array();
var maingraph = new Array();
var zoom = new Array();
var forceArray = new Array();
var text = new Array();
var textEdges = new Array();
var original = new Array();
var bounding = new Array();
var w, h;
var topMenuHeight = 32;
var ie = 0;
var indexScore = 0;
var indexInteractions = 1;
var indexForce = 1;
var oldColors = new Array();

var blue = "#0066CC";
var red = "#FF3333";
var transblue = "#0066CC";
var transred = "#FF3333";

var css = "\n\
\n\
path.link {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
	stroke: #666;\n\
	stroke-width: 2px;\n\
}\n\
path.link-undefined {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
        stroke: #666;\n\
        stroke-width: 2px;\n\
        stroke-dasharray: 10;\n\
}\n\
/* Unknown */ \n\
path.link-unknown {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0;\n\
        stroke: #777777;\n\
        stroke-width: 2px;\n\
}\n\
path.link-bind-unknown {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0;\n\
        stroke: #777777;\n\
        stroke-width: 2px;\n\
        stroke-dasharray:5 5;\n\
}\n\
path.link-undefined-unknown {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
        stroke: #777777;\n\
        stroke-width: 2px;\n\
        stroke-dasharray: 15 15;\n\
}\n\
path.link-transcription-unknown {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0.1;\n\
        stroke: #77777766;\n\
        stroke-width: 2px;\n\
        stroke-dasharray:5 5;\n\
}\n\
/* Activations */ \n\
path.link-activation {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
        fill-opacity: 0;\n\
	stroke: " + blue + ";\n\
	stroke-width: 2px;\n\
}\n\
path.link-bind-activation {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
        fill-opacity: 0;\n\
	stroke: " + blue + ";\n\
	stroke-width: 2px;\n\
	stroke-dasharray:5 5;\n\
}\n\
path.link-undefined-activation {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
        stroke: " + blue + ";\n\
        stroke-width: 2px;\n\
        stroke-dasharray: 15 15;\n\
}\n\
path.link-transcription-activation {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0;\n\
        stroke: " + transblue + ";\n\
        stroke-width: 2px;\n\
        stroke-dasharray:5 5;\n\
	stroke-opacity: 0.3;\n\
}\n\
/* Inhibitions */ \n\
path.link-inhibition {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
	stroke: " + red + ";\n\
	stroke-width: 2px;\n\
}\n\
path.link-bind-inhibition {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
	stroke: " + red + ";\n\
	stroke-width: 2px;\n\
	stroke-dasharray:5 5;\n\
}\n\
path.link-undefined-inhibition {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
        stroke: " + red + ";\n\
        stroke-width: 2px;\n\
        stroke-dasharray: 15 15;\n\
}\n\
path.link-transcription-inhibition {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
        stroke: " + transred + ";\n\
        stroke-width: 2px;\n\
        stroke-dasharray:5 5;\n\
	stroke-opacity: 0.3;\n\
}\n\
/* Others */ \n\
path.link-direct {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
        stroke: #000000;\n\
        stroke-width: 2px;\n\
}\n\
path.link-indirect {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
        stroke: #000000;\n\
        stroke-width: 2px;\n\
        stroke-dasharray:8 8;\n\
}\n\
path.link-binding {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
        stroke: #000000;\n\
        stroke-width: 2px;\n\
        stroke-dasharray:3 3;\n\
}\n\
path.link-none {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
        stroke: #666;\n\
        stroke-width: 2px;\n\
}\n\
path.link-ppi {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
        stroke: #0aa34a;\n\
        stroke-width: 2px;\n\
}\n\
path.link-complex-formation {\n\
        z-index:10000;\n\
        fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
        stroke: #0aa34a;\n\
        stroke-width: 2px;\n\
}\n\
path.link-chemical-activation {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
	stroke: " + blue + ";\n\
	stroke-width: 2px;\n\
	/*stroke-dasharray: 0,2 1;*/\n\
}\n\
path.link-chemical-inhibition {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
	stroke: " + red + ";\n\
	stroke-width: 2px;\n\
	/*stroke-dasharray: 0,2 1;*/\n\
}\n\
path.link-smallmolecule-activation {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
	stroke: " + blue + ";\n\
	stroke-width: 2px;\n\
	/*stroke-dasharray: 0,2 1;*/\n\
}\n\
path.link-smallmolecule-inhibition {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
        fill-opacity: 0.01;\n\
	stroke: " + red + ";\n\
	stroke-width: 2px;\n\
	/*stroke-dasharray: 0,2 1;*/\n\
}\n\
/* Nodes */ \n\
.nohuman {\n\
	stroke: #000;\n\
	stroke-width: 1px;\n\
	fill: #FF9933;\n\
	z-index:10000;\n\
}\n\
\n\
.chemical {\n\
	stroke: #000;\n\
	stroke-width: 1px;\n\
	fill: #e1b68b;\n\
	z-index:10000;\n\
}\n\
\n\
.smallmolecule {\n\
	stroke: #000;\n\
	stroke-width: 1px;\n\
	fill: #ffc966;\n\
	z-index:10000;\n\
}\n\
\n\
.protein {\n\
	stroke: #000;\n\
	stroke-width: 1px;\n\
	fill: #99cc66;\n\
	z-index:10000;\n\
}\n\
.complex {\n\
	stroke: #000;\n\
	stroke-width: 1px;\n\
	fill: #708ccd;\n\
	z-index:10000;\n\
}\n\
.proteinfamily {\n\
	stroke: #000;\n\
	stroke-width: 1px;\n\
	fill: #ffffff;\n\
	z-index:10000;\n\
}\n\
.phenotype {\n\
	stroke: #000;\n\
	stroke-width: 1px;\n\
	fill: #99FF99;\n\
	z-index:10000;\n\
}\n\
.stimulus {\n\
        stroke: #000;\n\
        stroke-width: 1px;\n\
        fill: #FF9999;\n\
        z-index:10000;\n\
}\n\
text {\n\
	font: 10px sans-serif;\n\
	pointer-events: none;\n\
}\n\
\n\
text.shadow {\n\
	stroke: #fff;\n\
	stroke-width: 3px;\n\
	stroke-opacity: .8;\n\
}\n\
.scroll-pane\n\
{\n\
	overflow: auto;\n\
	color: #111;\n\
	width: 100%;\n\
	height: 100%;\n\
}\n\
.hull1 {\n\
  fill: grey;\n\
  stroke: grey;\n\
  stroke-width: 15px;\n\
  stroke-linejoin: round;\n\
  opacity:0.3;\n\
}\n\
.hull2 {\n\
  fill: red;\n\
  stroke: red;\n\
  stroke-width: 15px;\n\
  stroke-linejoin: round;\n\
  opacity:0.5;\n\
}\n\
.controlbar {\n\
    padding:0px;\n\
}\n\
.controlbar td {\n\
    padding: 0px;\n\
    border: 0px;\n\
}\n\
";

/* CREATE MISSING BROWSER FUNCTIONS */

if (navigator.userAgent.search("MSIE") >= 0)
    ie = 1;
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };
}
if (typeof String.prototype.contains === 'undefined') {
    String.prototype.contains = function (it) {
        return this.indexOf(it) != -1;
    };
}
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
Array.prototype.popByVal = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
}
Array.prototype.popByPosition = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (i === val) {
            this.splice(ii, 1);
            i--;
        }
    }
    return this;
}

/* FORCING STYLE */
if (styleElem.styleSheet) {
    styleElem.styleSheet.cssText = css;
} else {
    styleElem.appendChild(document.createTextNode(css));
}
var head = document.getElementsByTagName('head')[0];
head.appendChild(styleElem);

function dragstarted(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", true);
}
function dragended(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", false);
}

/************* MAIN *************/

var nodescharge = Array();

function initGraph(links_external, node_labels, edge_labels, div, x, y, extra, signaling=1, hidetoolbar=0) {
        elabels[div] = (edge_labels);
        nlabels[div] = (node_labels);
        var links = JSON.parse(JSON.stringify(links_external));
        if (!original[div]) {
            original[div] = links_external.slice(0);
        }
        selected[div] = new Array();
        var nodes = {};
        links.forEach(function (link) {
            if ("" + link.idA == "undefined")
                link.source = nodes[link.source] || (nodes[link.source] = {name: link.source, category: link.typeA, id: link.idA});
            else
                link.source = nodes[link.idA] || (nodes[link.idA] = {name: link.source, category: link.typeA, id: link.idA});
            if ("" + link.idB == "undefined")
                link.target = nodes[link.target] || (nodes[link.target] = {name: link.target, category: link.typeB, id: link.idB});
            else
                link.target = nodes[link.idB] || (nodes[link.idB] = {name: link.target, category: link.typeB, id: link.idB});
        });
        w = x;
        h = y;
        
        // Determining node size proportional to graph
        var nodeRadius = w / 50;
        var complexdx = -200;
        if (nodeRadius >= 7)
            nodeRadius = 9;
        else
            nodeRadius = 7;
        
        // Determining nodes distance proportional to graph
        var distance = (h / Object.keys(nodes).length) + 5;
        if (distance < 35)
            distance = 35;
        nodescharge[div] = -600; 
        
        // Determining nucleus position proportional to graph and adapting other values
        var posNucleo = h + (h / 3);
        if (posNucleo <= 400)
            posNucleo -= 30;
        if (w < 600) {
            complexdx = -50;
            distance = 35;
            if (nodescharge[div] == 0)
                nodescharge[div] = -600; //-250
        }
        if (!signaling) { // If we are visualizing plain PPI charge and distance are different
            nodescharge[div] = -900;
            distance = 50;
        }
        
        forceArray[div] = d3.layout.force()
                .nodes(d3.values(nodes))
                .links(links)
                .size([w - topMenuHeight, h])
                .linkDistance(function (l) {
                    if (l.target['category'] === "phenotype") {
                        return complexdx + 300;
                    } else
                        return distance;
                })
                .charge(nodescharge[div])
                .on("tick", tick)
                .friction(0.5);
        
        var drag = forceArray[div].drag()
                .origin(function (d) {
                    return d;
                })
                .on("dragstart", dragstarted)
                .on("dragend", dragended);
        
        zoom[div] = d3.behavior.zoom();
        zoom[div].scaleExtent([0.5, 3.0]);
        
        var topmenu = '\
                        <div style="line-height:0px;text-align:left;vertical-alignment:middle;padding:0em;height:' + topMenuHeight + 'px;background:gray;width:100%;font-family: \'Lucida Console\', Monaco, monospace;font-size:1em;">\n\
                            <table class="controlbar">\n\
                            <tr>\n\
                            <td><button style="cursor:pointer;background-color: Gainsboro;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin: 1px;margin-left:5px;height:25px;width:25px;padding:0px;" onclick="zoom[\'' + div + '\'].scale(1).translate([0, 0]);reset(forceArray[\'' + div + '\'],\'' + div + '\',w,h,'+signaling+');"><img alt="Reset layout" title="Reset layout" src="' + baseurl + '/js/refresh.png" border="0"/></button></td>\n\
                            <td><button style="cursor:pointer;background-color: Gainsboro;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin: 1px;height:25px;width:25px;padding:0px;" onclick="capture(\'container' + div + '\',w,' + (h - topMenuHeight) + ')"><img alt="Save network" title="Save network" src="' + baseurl + '/js/camera.png" border="0"/></button></td>\n\
                            <td><button style="cursor:pointer;background-color: Gainsboro ;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin: 1px;height:25px;width:25px;padding:0px;" onclick="exportNetwork(\'' + div + '\');"><img alt="Export network" title="Export network" src="' + baseurl + '/js/export.png" border="0"/></button></td>\n\
                            <td><button style="cursor:pointer;background-color: Gainsboro ;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin: 1px;height:25px;width:25px;padding:0px;" onclick="toggleScores(\''+div+'\')"/><img alt="Export network" title="Toggle scores" src="' + baseurl + '/js/score.png" border="0"/></button></td>\n\
                            <td><button style="cursor:pointer;background-color: Gainsboro ;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin: 1px;height:25px;width:25px;padding:0px;" onclick="hideLegend(\'' + div + '\')"><img alt="Toggle legend" title="Toggle legend" src="' + baseurl + '/js/legend.png" border="0"/></button></td>\n\
                            <td><span style="font-size:0.8em;font-family:\'Open Sans\',sans-serif;color:white"><b>Type:</b></span></td>\n\
                            <td>\n\
                                <select id="interactionFilter'+div+'" style="background-color: Gainsboro ;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin-top:1px;margin-right:5px;width:60px;height:26px" onchange="applyFilter(\'' + div + '\',w,h,\'' + extra + '\',' + signaling + ',\'' + hidetoolbar + '\');">\n\
                                    <option value="" selected>All</option>\n\
                                    <option value="direct">Direct</option>\n\
                                    <option value="undefined">Indirect</option>\n\
                                    <option value="activation">Up-regulate</option>\n\
                                    <option value="inhibition">Down-regulate</option>\n\
                                    <option value="bind">Binding</option>\n\
                                    <option value="transcription">Transcription</option>\n\
                                    <!--<option value="chemical">Chemical</option>-->\n\
                                </select>\n\
                            </td>\n\
                            <td>\n\
                                <span style="font-size:0.8em;font-family:\'Open Sans\',sans-serif;color:white"><b>Score:</b></span>\n\
                            </td>\n\
                            <td>\n\
                                <select id="scoreFilter'+div+'" style="background-color: Gainsboro ;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin-top:1px;px;width:40px;height:26px" onchange="applyFilter(\'' + div + '\',w,h,\'' + extra + '\',' + signaling + ',' + hidetoolbar + ');">\n\
                                    <option value="0.0">0.0</option>\n\
                                    <option value="0.1">0.1</option>\n\
                                    <option value="0.2">0.2</option>\n\
                                    <option value="0.3">0.3</option>\n\
                                    <option value="0.4">0.4</option>\n\
                                    <option value="0.5">0.5</option>\n\
                                    <option value="0.6">0.6</option>\n\
                                    <option value="0.7">0.7</option>\n\
                                    <option value="0.8">0.8</option>\n\
                                    <option value="0.9">0.9</option>\n\
                                 </select>\n\
                            </td>\n\
                            <td>\n\
                                <span style="font-size:0.8em;font-family:\'Open Sans\',sans-serif;color:white"><b>Layout:</b></span>\n\
                            </td>\n\
                            <td>\n\
                                <select id="forceFilter'+div+'" style="background-color: Gainsboro ;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin-top:1px;px;width:60px;height:26px" onchange="applyForce(\'' + div + '\',w,h,\'' + extra + '\',' + signaling + ',' + hidetoolbar + ');">\n\
                                    <option value="1">Compact</option>\n\
                                    <option value="6" selected>Moderate</option>\n\
                                    <option value="12">Relaxed</option>\n\
                                 </select>\n\
                            </td>\n\
                            </tr>\n\
                            </table>\n\
                        </div>\n\
        ';
        if (hidetoolbar==0) d3.select("#" + div).html(topmenu);
        d3.select("#" + div).attr("style", d3.select("#" + div).attr("style") + "overflow:hidden;padding:2px;border:1px solid black");
        scale = 0.9;
        zoomWidth = (w - scale * w) / 2;
        zoomHeight = (h - scale * h) / 2;
        if (hidetoolbar==1) topMenuHeight=0;
        maingraph[div] = d3.select("#" + div).append("div").attr("id", "container" + div).append("svg:svg")
                .attr("width", w)
                .attr("height", h - topMenuHeight)
                .attr("id", "menthaGraphStage" + div)
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("version", "1.1")
                .call(zoom[div].on("zoom", zoomSVG))

        svg[div] = maingraph[div]
                .append("svg:g")
                .attr("transform", "translate(" + zoomWidth + "," + zoomHeight + ")scale(" + scale + ")");
        svg[div].append("defs").append("style").attr("type", "text/css").text("<![CDATA[" + css + "]]>");
        var gradient = svg[div].append("defs").append("linearGradient")
                .attr("id", "cytosol")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%");
        gradient.append("stop")
                .attr("offset", "0%")
                .attr("style", "stop-color:rgb(255,255,255);stop-opacity:1");
        gradient.append("stop")
                .attr("offset", "8%")
                .attr("style", "stop-color:rgb(173,216,230);stop-opacity:1");
        var cellBody = h * 10;
        if (signaling)
            svg[div].append("svg:g").append("circle")
                    .attr("r", cellBody)
                    .attr("r", cellBody)
                    .attr("stroke", "black")
                    .attr("stroke-width", "2")
                    .attr("fill", "#FFFF99")
                    .attr("cx", w / 2)
                    .attr("cy", (cellBody + (h / 10)) + 5);
        if (signaling)
            svg[div].append("svg:g").append("circle")
                    .attr("r", cellBody)
                    .attr("stroke", "black")
                    .attr("stroke-width", "2")
                    .attr("fill", "url(#cytosol)")
                    .attr("cx", w / 2)
                    .attr("cy", (cellBody + (h / 10)) + (h / 15));
        if (signaling)
            svg[div].append("svg:g").append("ellipse")
                    .attr("rx", h * 2)
                    .attr("ry", h / 2)
                    .attr("stroke", "black")
                    .attr("stroke-width", "2")
                    .attr("fill", "#CCCCFF")
                    .attr("cx", w / 2)
                    .attr("cy", posNucleo);
        svg[div].append("svg:defs").append("marker")
                .attr("id", "activation")
                .attr("style", "fill:" + blue)
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 16)
                .attr("refY", -0.5)
                .attr("markerWidth", (nodeRadius * 3) / 4)
                .attr("markerHeight", (nodeRadius * 3) / 4)
                .attr("orient", "auto")
                .append("svg:path")
                .attr("d", triangleShape);
        svg[div].append("svg:defs").append("marker")
                .attr("id", "activationbase")
                .attr("style", "fill:" + blue)
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 0)
                .attr("refY", -0.5)
                .attr("markerWidth", (nodeRadius * 3) / 4)
                .attr("markerHeight", (nodeRadius * 3) / 4)
                .attr("orient", "auto")
                .append("svg:path")
                .attr("d", triangleShape);
        svg[div].append("svg:defs").append("marker")
                .attr("id", "inhibition")
                .attr("style", "fill:" + red)
                .attr("viewBox", "0 0 30 30")
                .attr("refX", 15)
                .attr("refY", 10)
                .attr("markerWidth", (nodeRadius * 3) / 2)
                .attr("markerHeight", (nodeRadius * 3) / 2)
                .attr("orient", "auto")
                .append("svg:path")
                .attr("d", rectangleShape);
        svg[div].append("svg:defs").append("marker")
                .attr("id", "inhibitionbase")
                .attr("style", "fill:" + red)
                .attr("viewBox", "0 0 30 30")
                .attr("refX", 0)
                .attr("refY", 10)
                .attr("markerWidth", (nodeRadius * 3) / 2)
                .attr("markerHeight", (nodeRadius * 3) / 2)
                .attr("orient", "auto")
                .append("svg:path")
                .attr("d", rectangleShape);
        svg[div].append("svg:defs").append("marker")
                .attr("id", "unknown")
                .attr("style", "fill:#777777")
                .attr("viewBox", "-10 -10 30 30")
                .attr("refX", 16)
                .attr("refY", 0)
                .attr("markerWidth", (nodeRadius * 3) / 2)
                .attr("markerHeight", (nodeRadius * 3) / 2)
                .attr("orient", "auto")
                .append("svg:circle")
                .attr("r", 6);
        svg[div].append("svg:defs").append("marker")
                .attr("id", "formation")
                .attr("style", "fill:#0aa34a")
                .attr("viewBox", "0 0 20 20")
                .attr("refX", 16)
                .attr("refY", 4)
                .attr("markerWidth", (nodeRadius * 4) / 3)
                .attr("markerHeight", (nodeRadius * 4) / 3)
                .attr("orient", "auto")
                .append("svg:rect")
                .attr("width", 8)
                .attr("height", 8);
        svg[div].append("svg:defs").append("marker")
                .attr("id", "undefined");
        svg[div].append("svg:defs").append("marker")
                .attr("id", "formation");
        svg[div].append("svg:defs").append("marker")
                .attr("id", "unknown");
        svg[div].append("svg:defs").append("marker")
                .attr("id", "complex-formation");
	svg[div].append("clipPath")
		.attr("id", "clipRect")
		.append("rect")
		.attr("x", -50)
		.attr("y", -50)
                .attr("width", w+100)
                .attr("height", h+100);
	svg[div].attr("clip-path", "url(#clipRect)")
	$("#" + div).bind("contextmenu",function(e){
       	    var id = e["target"].id;
            var x=e["pageX"];
       	    var y=e["pageY"];
            clicked=id;
            if(clicked in nodes) {
        	    document.getElementById('contextmenu').style.top = (y - 10) + "px";
	            document.getElementById('contextmenu').style.left = (x - 10) + "px";
	       	    $("#contextmenu").show();
            }
	    return false;
	});
        var tooltip = d3.select("body")
                .append("div")
                .style("position", "absolute")
                .style("z-index", "1000")
                .style("display", "none")
                .style("background-color", "white")
                .style("color", "black")
                .style("border", "1px solid black")
                .text("a simple tooltip");
        
        /* Configuring complexes hulls and tooltips */
        var cpx = [];
        for (var c in complexesList) {
            var tot = 0;
            for (p in complexesList[c]) {
                if (Object.keys(nodes).indexOf(complexesList[c][p]) != -1) {
                    tot++;
                }
            }
            if (tot > 1) {
                cpx.push(svg[div].append("svg:g").append("path")
                        .attr("class", "hull1")
                        .attr("name", c)
                        .attr("id", c)
                        .on("mouseover", function () {
                            n = d3.select(this).attr("name");
                            for (d in complexesList[n])
                                if (Object.keys(nodes).indexOf(complexesList[n][d]) != -1) {
                                    d3.select("#" + complexesList[n][d]).attr("r", nodeRadius * 2);
                                }
                            d3.select(this).attr("class", "hull2");
                            tooltip.html(d3.select(this).attr("name"));
                            tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                            return tooltip.style("display", "block");
                        })
                        .on("mousemove", function () {
                            tooltip.html(d3.select(this).attr("name"));
                            return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                        })
                        .on("mouseout", function () {
                            n = d3.select(this).attr("name");
                            for (d in complexesList[n])
                                if (Object.keys(nodes).indexOf(complexesList[n][d]) != -1) {
                                    d3.select("#" + complexesList[n][d]).attr("r", nodeRadius);
                                }
                            d3.select(this).attr("class", "hull1");
                            return tooltip.style("display", "none");
                        })
                        );
            }
        }
        
        /* Initializing objects */
        var path = svg[div].append("svg:g").selectAll("path")
                .data(forceArray[div].links().filter(function (d) {
                        return d;
                }))
                .enter().append("svg:path")
                .attr("class", function (d) {
                    return "link-" + d.type.toLowerCase();
                })
                .attr("id", function (d) {
                    return d.source.id + "" + d.target.id
                })
                .attr("marker-end", function (d) {
                    if (d.source.id != d.target.id && ie == 0) {
                        str = d.type.toLowerCase();
                        index = str.lastIndexOf('-') + 1;
                        return "url('#" + str.substring(index, str.length) + "')";
                    }
                })
                .on("click", clickEdge);
        var complexes = svg[div].append("svg:g").selectAll("circle")
                .data(forceArray[div].nodes().filter(function (d) {
                    if (d.category == "complex")
                        return d;
                }))
                .enter().append("svg:path")
                .attr("class", "complex")
                .attr("d", complexShape)
                .on("click", clickNode)
                .attr("id", function (d) {
                    return d.id;
                })
                .call(drag);
        var circle = svg[div].append("svg:g").selectAll("circle")
                .data(forceArray[div].nodes().filter(function (d) {
                    if (d.category == "protein" || d.category == "proteinfamily")
                        return d;
                }))
                .enter().append("svg:circle")
                .attr("r", nodeRadius)
                .attr("id", function (d) {
                    return d.id;
                })
                .attr("class", function (d) {
                    return d.category;
                })
                .attr("style", function (d) {
                    if ((extra + "").indexOf(d.id) !== -1 && d.category != "proteinfamily" && d.category != "complex")
                        return "fill:#538521;";
                })
                .on("click", clickNode)
                .call(drag);
        var roundrects = svg[div].append("svg:g").selectAll("rect")
                .data(forceArray[div].nodes().filter(function (d) {
                    if (d.category == "nohuman")
                        return d;
                }))
                .enter().append("svg:rect")
                .attr("x", function (d) {
                    return -nodeRadius;
                })
                .attr("y", function (d) {
                    return -nodeRadius;
                })
                .attr("id", function (d) {
                    return d.id;
                })
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("width", nodeRadius * 2)
                .attr("height", nodeRadius * 2)
                .attr("class", function (d) {
                    return d.category;
                })
                .on("click", clickNode)
                .call(drag);
        var rects = svg[div].append("svg:g").selectAll("rect")
                .data(forceArray[div].nodes().filter(function (d) {
                    if (d.category.startsWith("chemical") || d.category.startsWith("smallmolecule"))
                        return d;
                }))
                .enter().append("svg:rect")
                .attr("x", function (d) {
                    return -nodeRadius;
                })
                .attr("y", function (d) {
                    return -nodeRadius;
                })
                .attr("id", function (d) {
                    return d.id;
                })
                .attr("width", nodeRadius * 2)
                .attr("height", nodeRadius * 2)
                .attr("class", function (d) {
                    return d.category;
                })
                .on("click", clickNode)
                .call(drag);
        var phenotypes = svg[div].append("svg:g").selectAll("rect")
                .data(forceArray[div].nodes().filter(function (d) {
                    if (d.category == "phenotype")
                        return d;
                }))
                .enter().append("svg:path")
                .attr("class", "phenotype")
                .attr("d", phenotypeShape)
                .on("click", clickNode).attr("id", function (d) {
                    return d.id;
                })
                .call(drag);
        var stimuli = svg[div].append("svg:g").selectAll("rect")
                .data(forceArray[div].nodes().filter(function (d) {
                    if (d.category == "stimulus")
                        return d;
                }))
                .enter().append("svg:path")
                .attr("class", "stimulus")
                .attr("d", phenotypeShape)
                .on("click", clickNode)
                .call(drag);
      
        /* Configuring labels graphics */
        
        textEdges[div] = svg[div].append("svg:g").selectAll("g")
                .data(forceArray[div].links())
                .enter().append("svg:g");
        textEdges[div].append("svg:text")
                .attr("x", -15)
                .attr("y", "2em")
                .attr("id", function (l) {
                    return l.source.id + "-" + l.target.id + "-score";
                })
                .text(function (l) {
                    return l.score;
                });
        text[div] = svg[div].append("svg:g").selectAll("g")
                .data(forceArray[div].nodes().filter(function (d) {
                        return d
                }))
                .enter().append("svg:g");
        text[div].append("svg:text")
                .attr("x", function (d) {
                    if (d.category == "phenotype" || d.category == "stimulus")
                        return -d.name.toString().length * 2;
                    else
                        return "-15"
                })
                .attr("y", function (d) {
                    if (d.category == "phenotype" || d.category == "stimulus")
                        return "";
                    else
                        return "2em"
                })
                .attr("class", "shadow")
                .attr("category", function (d) {
                    return d.category;
                })
                .text(function (d) {
                    return d.name;
                });
        text[div].append("svg:text")
                .attr("x", function (d) {
                    if (d.category == "phenotype" || d.category == "stimulus")
                        return -d.name.toString().length * 2;
                    else
                        return "-15"
                })
                .attr("y", function (d) {
                    if (d.category == "phenotype" || d.category == "stimulus")
                        return "";
                    else
                        return "2em"
                })
                .attr("category", function (d) {
                    return d.category;
                })
                .text(function (d) {
                    return d.name;
                });
        
        /* Nodes position initialization for layout */
        forceArray[div].nodes().forEach(function (d, i) {
            d.x = w / 2;
            d.y = h / 2;
            d.px = w / 2;
            d.py = h / 2;
            d.cx = w / 2;
            d.cy = h / 2;
        });
        
        if (signaling)
            setFixedPositions(forceArray[div], w, h);
        
        forceArray[div].start();
        bounding[div] = true;
        
        function update() {
            path.attr("d", function (d) {
                var dx = d.target.x - d.source.x;
                var dy = d.target.y - d.source.y;
                if (!signaling) {
                    var toplimit = -topMenuHeight;
                    var bottomlimit = h;
                    var rightlimit = w+40;
                    var leftlimit = -40;
                    if (dx > rightlimit)
                        dx = rightlimit;
                    if (dx < leftlimit)
                        dx = leftlimit;
                    if (dy > bottomlimit)
                        dy = bottomlimit;
                    if (dy < toplimit)
                        dy = toplimit;
                    if (d.target.x > rightlimit)
                        d.target.x = rightlimit;
                    if (d.target.x < leftlimit)
                        d.target.x = leftlimit;
                    if (d.target.y > bottomlimit)
                        d.target.y = bottomlimit;
                    if (d.target.y < toplimit)
                        d.target.y = toplimit;
                    if (d.source.x > rightlimit)
                        d.source.x = rightlimit;
                    if (d.source.x < leftlimit)
                        d.source.x = leftlimit;
                    if (d.source.y > bottomlimit)
                        d.source.y = bottomlimit;
                    if (d.source.y < toplimit)
                        d.source.y = toplimit;
                    dx = d.target.x - d.source.x;
                    dy = d.target.y - d.source.y;
                }
                if (signaling && bounding[div]) {
                    var toplimit = (h / 6) + 5;
                    var bottomlimit = (h - (h / 6)) - 5;
                    var rightlimit = w - 5;
                    var leftlimit = 5;
                    if (dx > rightlimit)
                        dx = rightlimit;
                    if (dx < leftlimit)
                        dx = leftlimit;
                    if (dy > bottomlimit)
                        dy = bottomlimit;
                    if (dy < toplimit)
                        dy = toplimit;
                    if (!extracellular.contains(d.target.id) && !receptors.contains(d.target.id) && !factors.contains(d.target.id) && !phenotypesList.contains(d.target.id)) {
                        if (d.target.x > rightlimit)
                            d.target.x = rightlimit;
                        if (d.target.x < leftlimit)
                            d.target.x = leftlimit;
                        if (d.target.y > bottomlimit)
                            d.target.y = bottomlimit;
                        if (d.target.y < toplimit)
                            d.target.y = toplimit;
                    }
                    if (!extracellular.contains(d.source.id) && !receptors.contains(d.source.id) && !factors.contains(d.source.id) && !phenotypesList.contains(d.source.id)) {
                        if (d.source.x > rightlimit)
                            d.source.x = rightlimit;
                        if (d.source.x < leftlimit)
                            d.source.x = leftlimit;
                        if (d.source.y > bottomlimit)
                            d.source.y = bottomlimit;
                        if (d.source.y < toplimit)
                            d.source.y = toplimit;
                    }
                    dx = d.target.x - d.source.x;
                    dy = d.target.y - d.source.y;
                }
                var dr = (Math.sqrt(dx * dx + dy * dy)) / 0.2;
                if (d.source.id == d.target.id) {
                    return "M" + (d.source.x - 5) + "," + d.source.y + "A15,15 0 1,1 " + (d.source.x) + "," + d.source.y;
                }
		return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
            });
            complexes.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")scale(1.3,1.3)";
            });
            phenotypes.attr("transform", function (d) {
                var dx = d.x;
                var dy = d.y;
                return "translate(" + dx + "," + dy + ")";
            });
            stimuli.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
            circle.attr("transform", function (d) {
                var dx = d.x;
                var dy = d.y;
                if (signaling && bounding[div] && !extracellular.contains(d.id) && !receptors.contains(d.id) && !factors.contains(d.id)) {
                    var toplimit = (h / 6) + 10;
                    var bottomlimit = (h - (h / 6)) - 10;
                    var rightlimit = w - 5;
                    var leftlimit = 5;
                    if (dx > rightlimit)
                        dx = rightlimit;
                    if (dx < leftlimit)
                        dx = leftlimit;
                    if (dy > bottomlimit)
                        dy = bottomlimit;
                    if (dy < toplimit)
                        dy = toplimit;
                }
                return "translate(" + dx + "," + dy + ")";
            });
            roundrects.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
            rects.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
            text[div].attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
            textEdges[div].attr("transform", function (l) {
                /*************************/
                /* Edge labels should be placed on the arch itself */
                /* Labels are currently placed in the middle of a straight line connecting two nodes */
                /*************************/
                var dx = l.target.x - l.source.x,
                        dy = l.target.y - l.source.y,
                        dr = Math.sqrt(dx * dx + dy * dy),
                        dx2 = ((l.target.x + l.source.x) / 2),
                        dy2 = ((l.target.y + l.source.y) / 2);
                return "translate(" + (dx2) + "," + (dy2) + ")";
            });
            var cpxct = 0;
            for (var c in complexesList) {
                var tot = 0;
                var tmp = [];
                for (p in complexesList[c]) {
                    if (Object.keys(nodes).indexOf(complexesList[c][p]) != -1) {
                        tot++;
                        tmp.push(complexesList[c][p]);
                    }
                }
                if (tot > 1) {
                    var tmpNodes = d3.range(tot).map(function (d) {
                        try {
                            if (Object.keys(nodes).indexOf(tmp[d]) != -1) {
                                return [
                                    nodes[tmp[d]].x,
                                    nodes[tmp[d]].y
                                ];
                            }
                        } catch (err) {
                        }
                    });
                    if (tmpNodes.length == 2) { // Show complexes only if they consist of at least two elements
                        cpx[cpxct].attr("d", "M" + tmpNodes[0] + " L" + tmpNodes[1] + " Z");
                        cpx[cpxct].style("stroke-width", "30px");
                    } else {
                        cpx[cpxct].datum(d3.geom.hull(tmpNodes)).attr("d", function (d) {
                            return "M" + d.join("L") + "Z";
                        });
                    }
                    cpxct++;
                }
            }
        }
        function tick() {
            update();
            if (forceArray[div].alpha() < 0.05 && forceArray[div].alpha() > -0.05) {
                forceArray[div].stop();
                forceArray[div].nodes().forEach(function (d) {
                    d.fixed = true;
                    bounding[div] = false;
                });
                if (ie == 1)
                    path.attr("marker-end", function (d) {
                        if (d.source.id != d.target.id) {
                            return "url('#" + d.type.toLowerCase() + "')";
                        }
                    });
            }
        }
        function zoomSVG() {
            svg[div].selectAll("g").attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
            svg[div].select(".legend").attr("transform", "");
            tick();
        }

        var offsetlegend = 30;
        var col1 = 15;
        var col1text = 27;
        var row1pace = 15;
        var row1pacetext = 15;
        var col2 = 130;
        var col2text = 160;
        var row2pace = 15;
        var row2pacetext = 15;
        var fontsize = "font-size:0.6em";
        
        var legend = maingraph[div].append("svg:g").attr("class", "legend").attr("style", "display:none");
        legend.attr("transform", "matrix(1 0 0 1 0 0)").attr("onmousedown", "selectElement(evt)");
        legend.append("rect")
                .attr("x", 5)
                .attr("y", h - 145)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("width", 255)
                .attr("height", 110)
                .attr("style", "fill:white;stroke:black;stroke-width:1;fill-opacity:0.5;")
                .attr("category", "legend")
                .attr("transform", "matrix(1 0 0 1 0 0)").attr("onmousedown", "selectElement(evt)");
        
        // Legend Column 1
        var currentrow = 7;
        legend.append("circle")
                .attr("cx", col1)
                .attr("cy", h - (row1pace * currentrow) - offsetlegend)
                .attr("r", nodeRadius / 2)
                .attr("class", "protein")
                .attr("category", "legend");
        legend.append("text")
                .attr("x", col1text)
                .attr("y", h - (row1pacetext * currentrow) - offsetlegend + 3)
                .attr("style", fontsize)
                .text("Protein")
                .attr("category", "legend");
        var currentrow = 6;
        legend.append("circle")
                .attr("cx", col1)
                .attr("cy", h - (row1pace * currentrow) - offsetlegend)
                .attr("r", nodeRadius / 2)
                .attr("class", "proteinfamily")
                .attr("category", "legend");
        legend.append("text")
                .attr("x", col1text)
                .attr("y", h - (row1pacetext * currentrow) - offsetlegend + 3)
                .attr("style", fontsize)
                .text("Protein family")
                .attr("category", "legend");
        var currentrow = 5;
        legend.append("g")
                .attr("transform", "translate(" + col1 + "," + (h - (row1pace * currentrow) - offsetlegend) + ")")
                .append("path")
                .attr("d", complexShape)
                .attr("transform", "scale(0.6,0.6)")
                .attr("class", "complex")
                .attr("category", "legend");
        legend.append("text")
                .attr("x", 27)
                .attr("y", h - (row1pacetext * currentrow) - offsetlegend + 3)
                .attr("style", fontsize)
                .text("Complex")
                .attr("category", "legend");
        var currentrow = 4;
        legend.append("rect")
                .attr("x", col1 - 4)
                .attr("y", h - (row1pace * currentrow) - offsetlegend - 4)
                .attr("width", nodeRadius)
                .attr("height", nodeRadius)
                .attr("class", "smallmolecule")
                .attr("category", "legend");
        legend.append("text")
                .attr("x", col1text)
                .attr("y", h - (row1pacetext * currentrow) - offsetlegend + 3)
                .attr("style", fontsize)
                .text("Chemical/Molecule")
                .attr("category", "legend");
        var currentrow = 3;
        legend.append("rect")
                .attr("x", col1 - 6)
                .attr("y", h - (row1pace * currentrow) - offsetlegend - 4)
                .attr("width", nodeRadius + 5)
                .attr("height", nodeRadius)
                .attr("class", "phenotype")
                .attr("category", "legend");
        legend.append("text")
                .attr("x", col1text)
                .attr("y", h - (row1pacetext * currentrow) - offsetlegend + 3)
                .attr("style", fontsize)
                .text("Phenotype/Stimulus")
                .attr("category", "legend");
        var currentrow = 2;
        legend.append("rect")
                .attr("x", col1 - 6)
                .attr("y", h - (row1pace * currentrow) - offsetlegend - 4)
                .attr("width", nodeRadius + 5)
                .attr("height", nodeRadius - 1)
                .attr("stroke", "black")
                .attr("stroke-width", "1")
                .attr("fill", "#8F8FFF")
                .attr("category", "legend");
        legend.append("rect")
                .attr("x", col1 - 6)
                .attr("y", h - (row1pace * currentrow) - offsetlegend - 3)
                .attr("width", nodeRadius + 5)
                .attr("height", nodeRadius - 1)
                .attr("stroke", "#8F8FFF")
                .attr("stroke-width", "1.5")
                .attr("fill", "#8F8FFF")
                .attr("category", "legend");
        legend.append("text")
                .attr("x", col1text)
                .attr("y", h - (row1pacetext * currentrow) - offsetlegend + 3)
                .attr("style", fontsize)
                .text("Nucleus")
                .attr("category", "legend");
        var currentrow = 1;
        legend.append("rect")
                .attr("x", col1 - 6)
                .attr("y", h - (row1pace * currentrow) - offsetlegend - 4)
                .attr("width", nodeRadius + 5)
                .attr("height", nodeRadius - 1)
                .attr("stroke", "black")
                .attr("stroke-width", "1")
                .attr("fill", "#FFFF99")
                .attr("category", "legend");
        legend.append("rect")
                .attr("x", col1 - 6)
                .attr("y", h - (row1pace * currentrow) - offsetlegend - 3)
                .attr("width", nodeRadius + 5)
                .attr("height", nodeRadius - 3)
                .attr("stroke", "#FFFF99")
                .attr("stroke-width", "1.5")
                .attr("fill", "#FFFF99")
                .attr("category", "legend");
        legend.append("text")
                .attr("x", col1text)
                .attr("y", h - (row1pacetext * currentrow) - offsetlegend + 3)
                .attr("style", fontsize)
                .text("Membrane")
                .attr("category", "legend");
        
        // Legend Column 2
        var currentrow = 7;
        legend.append("path")
                .attr("d", "M" + col2 + " " + (h - (row2pace * currentrow) - offsetlegend) + " L" + (col2 + 25) + " " + (h - (row2pace * currentrow) - offsetlegend))
                .attr("class", "link-activation")
                .attr("category", "legend");
        legend.append("text")
                .attr("x", col2text)
                .attr("y", h - (row2pacetext * currentrow) - offsetlegend + 3)
                .attr("style", fontsize)
                .text("Up-regulates")
                .attr("category", "legend");
        var currentrow = 6;
        legend.append("path")
                .attr("d", "M" + col2 + " " + (h - (row2pace * currentrow) - offsetlegend) + " L" + (col2 + 25) + " " + (h - (row2pace * currentrow) - offsetlegend))
                .attr("class", "link-inhibition")
                .attr("category", "legend");
        legend.append("text")
                .attr("x", col2text)
                .attr("y", h - (row2pacetext * currentrow) - offsetlegend + 3)
                .attr("style", fontsize)
                .text("Down-regulates")
                .attr("category", "legend");
        var currentrow = 5;
        legend.append("path")
                .attr("d", "M" + col2 + " " + (h - (row2pace * currentrow) - offsetlegend) + " L" + (col2 + 25) + " " + (h - (row2pace * currentrow) - offsetlegend))
                .attr("class", "link-complex-formation")
                .attr("category", "legend");
        legend.append("text")
                .attr("x", col2text)
                .attr("y", h - (row2pacetext * currentrow) - offsetlegend + 3)
                .attr("style", fontsize)
                .text("Physical interaction")
                .attr("category", "legend");
        var currentrow = 4;
        legend.append("path")
                .attr("d", "M" + col2 + " " + (h - (row2pace * currentrow) - offsetlegend) + " L" + (col2 + 25) + " " + (h - (row2pace * currentrow) - offsetlegend))
                .attr("class", "link-unknown")
                .attr("category", "legend");
        legend.append("text")
                .attr("x", col2text)
                .attr("y", h - (row2pacetext * currentrow) - offsetlegend + 3)
                .attr("style", fontsize)
                .text("Unknown")
                .attr("category", "legend");
        var currentrow = 3;
        legend.append("path")
                .attr("d", "M" + col2 + " " + (h - (row2pace * currentrow) - offsetlegend) + " L" + (col2 + 25) + " " + (h - (row2pace * currentrow) - offsetlegend))
                .attr("class", "link-direct")
                .attr("category", "legend");
        legend.append("text")
                .attr("x", col2text)
                .attr("y", h - (row2pacetext * currentrow) - offsetlegend + 3)
                .attr("style", fontsize)
                .text("Direct")
                .attr("category", "legend");
        var currentrow = 2;
        legend.append("path")
                .attr("d", "M" + col2 + " " + (h - (row2pace * currentrow) - offsetlegend) + " L" + (col2 + 25) + " " + (h - (row2pace * currentrow) - offsetlegend))
                .attr("class", "link-indirect")
                .attr("category", "legend");
        legend.append("text")
                .attr("x", col2text)
                .attr("y", h - (row2pacetext * currentrow) - offsetlegend + 3)
                .attr("style", fontsize)
                .text("Indirect")
                .attr("category", "legend");
        var currentrow = 1;
        legend.append("path")
                .attr("d", "M" + col2 + " " + (h - (row2pace * currentrow) - offsetlegend) + " L" + (col2 + 25) + " " + (h - (row2pace * currentrow) - offsetlegend))
                .attr("class", "link-binding")
                .attr("category", "legend");
        legend.append("text")
                .attr("x", col2text)
                .attr("y", h - (row2pacetext * currentrow) - offsetlegend + 3)
                .attr("style", fontsize)
                .text("Binding")
                .attr("category", "legend");

        function clickNode(d) {
            var p = $("#" + div);
            var position = p.offset();
            var coord = d3.mouse(document.getElementById(div));
            var xPos = coord[0];
            var yPos = coord[1];
            selected[div].push(d.id);
            getDescription(d.id, d.name, xPos + position.left - 3, yPos + position.top - 3, div);
        }
        function clickEdge(d) {
            var p = $("#" + div);
            var position = p.offset();
            var coord = d3.mouse(document.getElementById(div));
            var xPos = coord[0];
            var yPos = coord[1];
            getEvidence(d.idA, d.idB, d.score, xPos + position.left - 3, yPos + position.top - 3, div, d.source.name, d.target.name);
        }
        try {
            document.getElementById("scoreFilter").selectedIndex = indexScore;
            document.getElementById("forceFilter").selectedIndex = indexForce;
            document.getElementById("interactionFilter").selectedIndex = indexInteractions;
        } catch (err) {}
    return svg[div];
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function toggleScores(div) {
    $("#"+div+" [id$='-score']").toggle();
}
function getDescription(id, name, x, y, div) {
    idpathway = "";
    if (!(nlabels[div] == null || nlabels[div][id] + "" == "undefined")) {
        var html = "<div style=\"text-align:center;margin-bottom:2px;background:#00A383;color:white;\"><b>" + name + "</b></div><div class=\"scroll-pane\" style=\"text-align:left;\">";
        html += nlabels[div][id];
        html += "</div>";
        document.getElementById('info').innerHTML = html;
        document.getElementById('info').style.top = (y - 10) + "px";
        document.getElementById('info').style.left = (x - 10) + "px";
        $("#info").show();
    } else {
        var html = "<div style=\"px;text-align:center;margin-bottom:2px;background:#00A383;color:white;\"><b>" + name + "</b></div><div class=\"scroll-pane\" style=\"text-align:left;\">";
        html += "<div id='lkjlkj'><div style='width:150px' ><center><img src='js/loader.gif'></img><br>Loading...</center></div></div>";
        html += "</div>";
        document.getElementById('info').innerHTML = html;
        document.getElementById('info').style.top = (y - 10) + "px";
        document.getElementById('info').style.left = (x - 10) + "px";
        $("#info").show();
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                html = xmlhttp.responseText;
                document.getElementById('lkjlkj').innerHTML = html;
            }
        }
        xmlhttp.open("GET", baseurl + "/GetNodeDescription.php?id=" + idpathway + "&ida=" + id, true);
        xmlhttp.send();
    }
}
function getEvidence(a, b, score, x, y, div, g1, g2) {
    idpathway = ""
    if (!(elabels[div] == null || elabels[div][a + b] + "" == "undefined")) {
        if ("" + score == "undefined")
            score = "";
        else
            score = ": " + score;
        var html = "<div style=\"text-align:center;margin-bottom:2px;background:#00A383;color:white;\"><b>" + g1 + " - " + g2 + "" + score + "</b></div><div class=\"scroll-pane\" style=\"text-align:left\">";
        html += elabels[div][a + b];
        html += "</div>";
        document.getElementById('infoEdge').innerHTML = html;
        document.getElementById('infoEdge').style.top = (y - 10) + "px";
        document.getElementById('infoEdge').style.left = (x - 10) + "px";
        $("#infoEdge").show();
    } else {
        if ("" + score == "undefined")
            score = "";
        else
            score = ": " + score;
        var html = "<div style=\"text-align:center;margin-bottom:2px;background:#00A383;color:white;\"><b>" + g1 + " - " + g2 + "" + score + "</b></div><div class=\"scroll-pane\" style=\"text-align:left\">";
        html += "<div id='lkjlkj2'><div style='width:150px' ><center><img src='js/loader.gif'></img><br>Loading...</center></div></div>";
        html += "</div>";
        document.getElementById('infoEdge').innerHTML = html;
        document.getElementById('infoEdge').style.top = (y - 10) + "px";
        document.getElementById('infoEdge').style.left = (x - 10) + "px";
        $("#infoEdge").show();
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if ("" + score == "undefined")
                    score = "";
                else
                    score = ": " + score;
                html = xmlhttp.responseText;
                document.getElementById('lkjlkj2').innerHTML = html;
            }
        }
        xmlhttp.open("GET", baseurl + "/GetEdgeDescription.php?id=" + idpathway + "&ida=" + a + "&idb=" + b, true);
        xmlhttp.send();
    }
}

var actionOut = '$("#info").hide();';
var actionOut2 = '$("#infoEdge").hide();';
var actionOut3 = '$("#contextmenu").hide();';
document.write("\n\
<script type=\"text/javascript\" src=\"" + baseurl + "/js/constants.js\"></script>\n\
<script type=\"text/javascript\" src=\"" + baseurl + "/js/jquery.mousewheel.js\"></script>\n\
<script type=\"text/javascript\" src=\"" + baseurl + "/js/jquery.jscrollpane.min.js\"></script>\n\
<script type=\"text/javascript\" src=\"http://d3js.org/d3.v3.min.js\"></script>\n\
<script type=\"text/javascript\" src=\"" + baseurl + "/js/fixOnMouseOut.js\"></script>\n\
<div id=\"info\"\n\
    onmouseout=\"fixOnMouseOut(this, event, actionOut);\"\n\
    style=\"width:200px;height:150px;z-index:800;font: 14px sans-serif;box-shadow: 3px 3px 4px #000000;padding:2px;background:#FFFFFF;border:1px solid black;position: absolute;top:-1000px;left:-1000px;border-radius: 4px 4px 4px 4px;vertical-align: middle;overflow:hidden\">\n\
</div>\n\
<div id=\"infoEdge\"\n\
    onmouseout=\"fixOnMouseOut(this, event, actionOut2);\"\n\
    style=\"width:200px;height:150px;z-index:800;font: 14px sans-serif;box-shadow: 3px 3px 4px #000000;padding:2px;background:#FFFFFF;border:1px solid black;position: absolute;top:-1000px;left:-1000px;border-radius: 4px 4px 4px 4px;vertical-align: middle;\">\n\
</div>\n\
<div id=\"contextmenu\"\n\
    onmouseout=\"fixOnMouseOut(this, event, actionOut3);\"\n\
    style=\"z-index:800;font: 12px sans-serif;box-shadow: 2px 2px 4px #000000;padding:2px;background:#EEF3E2;border:1px solid black;position: absolute;top:-1000px;left:-1000px;border-radius: 2px 2px 2px 2px;cursor:pointer;\">\n\
Context Menu\n\
</div>\
");
function exportNetwork(div) {
    myWindow = window.open('', '', 'width=800,height=600');
    myWindow.document.write("Source ID;Source Name;Source Category;Target ID; Target Name;Target Category;Effect<br>");
    forceArray[div].links().forEach(function (d) {
        myWindow.document.write(d.source.id + ";" + d.source.name + ";" + d.source.category + ";" + d.target.id + ";" + d.target.name + ";" + d.target.category + ";" + d.type + "<br>");
    });
    myWindow.focus();
}
function reset(force, div, w, h, signaling) {
    force.nodes().forEach(function (d) {
        d.fixed = false;
        d.x = w / 2;
        d.y = h / 2;
    });
    bounding[div] = true;
    if (signaling==1) {
		setFixedPositions(force, w, h);
	}
    force.start();
    svg[div].selectAll("g").transition().duration(500).attr('transform', 'translate(0,0) scale(1)');
}
function setFixedPositions(force, w, h) {
    var totRec = 0;
    force.nodes().forEach(function (d) {
        if (extracellular.contains(d.id)) {
            totRec++;
        }
    });
    var passo = (w - 10) / (totRec + 1);
    var x = passo;
    force.nodes().forEach(function (d) {
        if (extracellular.contains(d.id)) {
            d.y = 20;
            d.x = x;
            d.py = 20;
            d.px = x;
            x += passo;
            d.fixed = true;
        }
    });
    totRec = 0;
    force.nodes().forEach(function (d) {
        if (receptors.contains(d.id)) {
            totRec++;
        }
    });
    passo = (w - 10) / (totRec + 1);
    var x = passo;
    force.nodes().forEach(function (d) {
        if (receptors.contains(d.id)) {
            d.y = h / 7;
            d.x = x;
            d.py = h / 7;
            d.px = x;
            x += passo;
            d.fixed = true;
        }
    });
    var totFact = 0;
    force.nodes().forEach(function (d) {
        if (factors.contains(d.id)) {
            totFact++;
        }
    });
    passo = (w - 10) / (totFact + 1);
    var x = passo;
    var posNucleo = h - (h / 8);
    if (posNucleo <= 270)
        posNucleo -= 35;
    force.nodes().forEach(function (d) {
        if (factors.contains(d.id)) {
            d.y = posNucleo;
            d.x = x;
            d.py = posNucleo;
            d.px = x;
            x += passo;
            d.fixed = true;
        }
    });
    var totPhenotypes = 0;
    force.nodes().forEach(function (d) {
//if (d.category == "phenotype") {
        if (phenotypesList.contains(d.id)) {
            totPhenotypes++;
        }
    });
    passo = (w - 10) / (totPhenotypes + 1);
    var x = passo;
    var posNucleo = h - (h / 15);
    if (posNucleo <= 270)
        posNucleo -= 20;
    force.nodes().forEach(function (d) {
//if (d.category == "phenotypex") {
        if (phenotypesList.contains(d.id)) {
            d.y = posNucleo;
            d.x = x;
            d.py = posNucleo;
            d.px = x;
            x += passo;
            d.fixed = true;
        }
    });
}

function applyForce(div, x, y, extra, signaling, hidetoolbar) {
    var e = document.getElementById("scoreFilter"+div);
    indexScore = e.selectedIndex;
    var th = e.options[indexScore].value;

    var e1 = document.getElementById("interactionFilter"+div);
    indexInteractions = e1.selectedIndex;
    var inttype = e1.options[indexInteractions].value;

    var val = document.getElementById("forceFilter"+div);
    indexForce = val.selectedIndex;
    nodescharge[div] = -val.value * 100;

    links_signor = new Array();
    var i = 0;
    for (a in original[div]) {
        var elm = original[div][a];
        if (inttype == "direct") {
            if (elm['type'] && (elm['type'].contains("bind") || (!elm['type'].contains("undefined") && !elm['type'].contains("transcription") && (parseFloat(elm['score']) >= th || elm['score'] === undefined)))) {
                links_signor[i] = elm;
                i++;
            }
        } else {
            if ((elm['type'] && elm['type'].contains(inttype) && (parseFloat(elm['score']) >= th || elm['score'] === undefined))) {
                links_signor[i] = elm;
                i++;
            }
        }

    }

    document.getElementById(div).innerHTML = "";
    initGraph(links_signor, nlabels[div], elabels[div], div, x, y, extra, signaling, hidetoolbar);

    for (e in oldColors) {
        if (e.length > 1)
            svg[div].select('#' + e).attr("style", oldColors[e]);
    }
    
    document.getElementById("scoreFilter"+div).selectedIndex=indexScore+"";
    document.getElementById("interactionFilter"+div).selectedIndex=indexInteractions+"";
    document.getElementById("forceFilter"+div).selectedIndex=indexForce+"";
}

function applyFilter(div, x, y, extra, signaling, hidetoolbar) {
    var e = document.getElementById("scoreFilter"+div);
    indexScore = e.selectedIndex;
    var th = e.options[indexScore].value;

    var e1 = document.getElementById("interactionFilter"+div);
    indexInteractions = e1.selectedIndex;
    var inttype = e1.options[indexInteractions].value;

    links_signor = new Array();
    var i = 0;
    for (a in original[div]) {
        var elm = original[div][a];
        if (inttype == "direct") {
            if (elm['type'] && (elm['type'].contains("bind") || (!elm['type'].contains("undefined") && !elm['type'].contains("transcription") && (parseFloat(elm['score']) >= th || elm['score'] === undefined)))) {
                links_signor[i] = elm;
                i++;
            }
        } else {
            if ((elm['type'] && elm['type'].contains(inttype) && (parseFloat(elm['score']) >= th || elm['score'] === undefined))) {
                links_signor[i] = elm;
                i++;
            }
        }

    }
    document.getElementById(div).innerHTML = "";
    initGraph(links_signor, nlabels[div], elabels[div], div, x, y, extra, signaling, hidetoolbar);
    for (e in oldColors) {
        if (e.length > 1)
            svg[div].select('#' + e).attr("style", oldColors[e]);
    }
    
    document.getElementById("scoreFilter"+div).selectedIndex=indexScore+"";
    document.getElementById("interactionFilter"+div).selectedIndex=indexInteractions+"";
}

function capture(div, w, h) {
    var text = document.getElementById(div).innerHTML.replace('<div>', '').replace('</div>', '');
    text = text.replace("&lt;", "<").replace("&gt;", ">").replace(/&nbsp;/g, "");
    var svg_blob = new Blob([text], {'type': "image/svg+xml"});
    var url = URL.createObjectURL(svg_blob);
    var win = window.open(url, "SVG Graphics", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width="+w+", height="+h+", top=10, left=10");
}

function hideLegend(div) {
    maingraph[div].select(".legend").attr("style", function () {
        if (maingraph[div].select(".legend").attr("style") == "display:none")
            return "";
        else
            return "display:none";
    });
}

function setNodesColor(div, myArray, color) {
    setTimeout(function () {
        $.grep(myArray, function (e) {
            try {
                e = e.replace(":", "\\:").replace("-", "\\-");
                svg[div].select('#' + e).attr("style", "fill:" + color);
                svg[div].select('#' + e).attr("style", svg[div].select('#' + e).attr("style") + ";stroke:black");
                svg[div].select('#' + e).attr("style", svg[div].select('#' + e).attr("style") + ";stroke-width:2px");
            } catch (err) {
            }
        });
        update(div, myArray, color);
    }, 50);
}

function update(div, myArray, color) {
    oldColors = [];
    var roundrects = svg[div].selectAll("circle").each(function (d) {
        if (this["id"].length > 1) {
            oldColors[this["id"]] = svg[div].select('#' + this["id"]).attr("style");
        }
    });
}
