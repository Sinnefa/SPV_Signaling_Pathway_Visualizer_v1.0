/* CONSTANTS BLOCK: Start */

// These two variables are usd to add the CSS style needed for the visualizer
var styleElem = document.createElement('style');
styleElem.type = 'text/css';

// Objects shapes defined according to SVG path syntax
var triangleShape = "M0,-5L10,0L0,5 Z";
var complexShape = "M -3.5380432619161e-7,-10.422110257019 A 6.470588673012,6.4705126773471 0 0 0 -6.4705890268163,-3.9515454402782 6.470588673012,6.4705126773471 0 0 0 -6.0156256696514,-1.5674331419299 6.470588673012,6.4705126773471 0 0 0 -10.784314764824,4.6758743153767 6.470588673012,6.4705126773471 0 0 0 -4.3137261358123,11.146439132118 6.470588673012,6.4705126773471 0 0 0 -0.00842569486298,9.4951383190327 6.470588673012,6.4705126773471 0 0 0 4.3137252082032,11.146439132118 6.470588673012,6.4705126773471 0 0 0 10.784314981215,4.6758743153767 6.470588673012,6.4705126773471 0 0 0 6.0071996209837,-1.5586332441786 6.470588673012,6.4705126773471 0 0 0 6.4705880992072,-3.9515454402788 6.470588673012,6.4705126773471 0 0 0 -3.5380434841829e-7,-10.42211025702 Z";
var rectangleShape = "M0 0 L0 20 L5 20 L5 0 Z";
var phenotypeShape = "M-30,-15L50,-15L50,5L-30,5 Z";

var elabels = new Array(); // Edges descriptions. One set for each DIV area.
var nlabels = new Array(); // Nodes descriptions. One set for each DIV area.
var complexesList = new Array(); // Complex descriptions. The key is the complex list, the value is an array for IDs
var svg = new Array(); // Visualized SVGs. One set for each DIV area.
var maingraph = new Array(); // Subgraph used for the legend
var zoom = new Array(); // Zoom functions. One set for each DIV area.
var forceArray = new Array(); // Actual layout objects. One set for each DIV area.
var nodescharge = new Array(); // Node charges. One set for each DIV area.
var text = new Array(); // Nodes labels. One set for each DIV area.
var textEdges = new Array(); // Edge labels (score). One set for each DIV area.
var original = new Array(); // Variable to store the entire original graph when resetting. One set for each DIV area.
var bounding = new Array(); // For signaling, it defines if the cytosol is active (layout bounds). One set for each DIV area.
var w, h; // Visualization width and height. One set for each DIV area.
var topMenuHeight = 32; // Top menu height
var ie = 0; // Used to check if the client browser is InternetExplorer
var indexScore = 0; // Index for selected drop down item for score filter
var indexInteractions = 1; // Index for selected drop down item for interaction type filter
var indexForce = 1; // Index for selected drop down item layout compactness
var oldColors = new Array(); //Old colors in case the programmer override some node colors
var contextMenu = new Array();

// Variables to hold pop-up key-values
var node_labels = [];
var edge_labels = [];

// Compartments, can be set from your html page
var extracellular = [];
var factors = [];
var receptors = [];
var phenotypesList = [];
var complexesList = [];


// These variables are used to store objects positions to prevent re-laying out of the entire
// graph in case the user selects edge/nodes filters
var ox = new Array();
var oy = new Array();
var px = new Array();
var py = new Array();
var cx = new Array();
var cy = new Array();

// These colors are the standard edge colors
var blue = "#0066CC"; // Activation
var red = "#FF3333"; // Inhibition
var transblue = "#0066CC";
var transred = "#FF3333";

// CSS added to the SVG object to style each elements
var css = "\n\
\n\
path.link {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: #666;\n\
	stroke-width: 2px;\n\
        pointer-events:stroke;\n\
}\n\
path.link-undefined {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: #666;\n\
	stroke-width: 2px;\n\
	stroke-dasharray: 10;\n\
        pointer-events:stroke;\n\
}\n\
/* Unknown */ \n\
path.link-unknown {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: #777777;\n\
	stroke-width: 2px;\n\
        pointer-events:stroke;\n\
}\n\
path.link-bind-unknown {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: #777777;\n\
	stroke-width: 2px;\n\
	stroke-dasharray:5 5;\n\
        pointer-events:stroke;\n\
}\n\
path.link-undefined-unknown {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: #777777;\n\
	stroke-width: 2px;\n\
	stroke-dasharray: 15 15;\n\
        pointer-events:stroke;\n\
}\n\
path.link-transcription-unknown {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: #77777766;\n\
	stroke-width: 2px;\n\
	stroke-dasharray:5 5;\n\
        pointer-events:stroke;\n\
}\n\
/* Activations */ \n\
path.link-activation {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: " + blue + ";\n\
	stroke-width: 2px;\n\
        pointer-events:stroke;\n\
}\n\
path.link-bind-activation {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: " + blue + ";\n\
	stroke-width: 2px;\n\
	stroke-dasharray:5 5;\n\
        pointer-events:stroke;\n\
}\n\
path.link-undefined-activation {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: " + blue + ";\n\
	stroke-width: 2px;\n\
	stroke-dasharray: 15 15;\n\
        pointer-events:stroke;\n\
}\n\
path.link-transcription-activation {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: " + transblue + ";\n\
	stroke-width: 2px;\n\
	stroke-dasharray:5 5;\n\
	stroke-opacity: 0.3;\n\
        pointer-events:stroke;\n\
}\n\
/* Inhibitions */ \n\
path.link-inhibition {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: " + red + ";\n\
	stroke-width: 2px;\n\
        pointer-events:stroke;\n\
}\n\
path.link-bind-inhibition {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: " + red + ";\n\
	stroke-width: 2px;\n\
	stroke-dasharray:5 5;\n\
        pointer-events:stroke;\n\
}\n\
path.link-undefined-inhibition {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: " + red + ";\n\
	stroke-width: 2px;\n\
	stroke-dasharray: 15 15;\n\
        pointer-events:stroke;\n\
}\n\
path.link-transcription-inhibition {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: " + transred + ";\n\
	stroke-width: 2px;\n\
	stroke-dasharray:5 5;\n\
	stroke-opacity: 0.3;\n\
        pointer-events:stroke;\n\
}\n\
/* Others */ \n\
path.link-direct {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: #000000;\n\
	stroke-width: 2px;\n\
        pointer-events:stroke;\n\
}\n\
path.link-indirect {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: #000000;\n\
	stroke-width: 2px;\n\
	stroke-dasharray:8 8;\n\
        pointer-events:stroke;\n\
}\n\
path.link-binding {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: #000000;\n\
	stroke-width: 2px;\n\
	stroke-dasharray:3 3;\n\
        pointer-events:stroke;\n\
}\n\
path.link-none {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: #666;\n\
	stroke-width: 2px;\n\
        pointer-events:stroke;\n\
}\n\
path.link-ppi {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: #0aa34a;\n\
	stroke-width: 2px;\n\
        pointer-events:stroke;\n\
}\n\
path.link-complex-formation {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: #0aa34a;\n\
	stroke-width: 2px;\n\
        pointer-events:stroke;\n\
}\n\
path.link-chemical-activation {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: " + blue + ";\n\
	stroke-width: 2px;\n\
	/*stroke-dasharray: 0,2 1;*/\n\
        pointer-events:stroke;\n\
}\n\
path.link-chemical-inhibition {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: " + red + ";\n\
	stroke-width: 2px;\n\
	/*stroke-dasharray: 0,2 1;*/\n\
        pointer-events:stroke;\n\
}\n\
path.link-smallmolecule-activation {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: " + blue + ";\n\
	stroke-width: 2px;\n\
	/*stroke-dasharray: 0,2 1;*/\n\
        pointer-events:stroke;\n\
}\n\
path.link-smallmolecule-inhibition {\n\
	z-index:10000;\n\
	fill: #ffffff;\n\
	fill-opacity: 0;\n\
	stroke: " + red + ";\n\
	stroke-width: 2px;\n\
	/*stroke-dasharray: 0,2 1;*/\n\
        pointer-events:stroke;\n\
}\n\
/* Nodes */ \n\
.nonhuman {\n\
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
text.plaintext {\n\
	fill: #000;\n\
	font-family:Helvetica;\n\
	paint-order:stroke;\n\
	stroke: #fff;\n\
	stroke-width: 2px;\n\
	font-size: 11px;\n\
}\n\
text.scoretext {\n\
	fill: black;\n\
	font-family:Helvetica;\n\
	paint-order:stroke;\n\
	stroke: #fff;\n\
	stroke-width: 1px;\n\
	font-size: 10px;\n\
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
/* CONSTANTS BLOCK: Start */


/* CREATE MISSING BROWSER FUNCTIONS */

// Checking if the client is Internet Explorer
if (navigator.userAgent.search("MSIE") >= 0) ie = 1;

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

function arrayContains(needle, arrhaystack) {
    return (arrhaystack.indexOf(needle) > -1);
}

/* ADDING STYLE */
if (styleElem.styleSheet) {
	styleElem.styleSheet.cssText = css;
} else {
	styleElem.appendChild(document.createTextNode(css));
}
var head = document.getElementsByTagName('head')[0];
head.appendChild(styleElem);

// Functions to control objects dragging
function dragstarted(d) {
	d3.event.sourceEvent.stopPropagation();
	d3.select(this).classed("dragging", true);
}
function dragended(d) {
	d3.event.sourceEvent.stopPropagation();
	d3.select(this).classed("dragging", false);
}

/************* MAIN *************/

function initGraph(links_external, node_labels, edge_labels, div, x, y, extra, signaling=1, hidetoolbar=0, preventOverlap=0) {

	/*
	links_external:	JSON object containing graph edges
	node_labels:	Assofiative array for node labels. Keys are nodes id
	edge_labels:	Assofiative array for node labels. Keys are pairs of node ids concatenated in one string
	div:		DIV where to insert the visualizer
	x:		Width
	y:		Height
	extra:		Array containing ids to highlight
	signaling:	1 is visualizing a signaling cascade, 0 for PPI
	hidetoolbar:	0 shows the tool bar with filtering options, 1 hides the toolbar
	preventOverlap:	0 does not apply, 1 applies an algorithm to prevent labels overlap and edges passing through nodes
	*/

	elabels[div] = (edge_labels); // Setting programmer's defined edge lables
	nlabels[div] = (node_labels); // Setting programmer's defined node lables
	var links = JSON.parse(JSON.stringify(links_external));
	if (!original[div]) { // Saving the otiginal edge list for resetting.
		original[div] = links_external.slice(0);
	}
	var nodes = {};
	var extraLinks= new Array();
	links.forEach(function (link) { // Edges parsing to extract is and other infos
		if ("" + link.idA == "undefined")
			link.source = nodes[link.source] || (nodes[link.source] = {name: link.source, category: link.typeA, id: link.idA});
		else
			link.source = nodes[link.idA] || (nodes[link.idA] = {name: link.source, category: link.typeA, id: link.idA});
		if ("" + link.idB == "undefined")
			link.target = nodes[link.target] || (nodes[link.target] = {name: link.target, category: link.typeB, id: link.idB});
		else
			link.target = nodes[link.idB] || (nodes[link.idB] = {name: link.target, category: link.typeB, id: link.idB});
	});

	for (d in nodes) {
		nodes[d].inDegree = 0;
		nodes[d].outDegree = 0;
	}

	links.forEach(function(d) {
		nodes[d.source.id].outDegree += 1;
		nodes[d.target.id].inDegree += 1;
	});

	w = x;
	h = y;
	var cellBody = h * 3; // Cell radius
	var ccx = w / 2; /* Cell x center */
	var ccy = (cellBody + (h / 10)); /* Cell y center */
	
	// Determining node size proportional to graph
	var nodeRadius = w/50; // Smaller DIVs need smaller nodes 
	if (nodeRadius >= 7)
		nodeRadius = 9;
	else
		nodeRadius = 7;
	var startingCharge = -(100*w)/(Object.keys(links).length);
	if (nodescharge[div] === undefined)
		nodescharge[div] = startingCharge;//startingCharge; 
	
	// Determining nucleus position proportional to graph and adapting other values
	var posNucleo = h + (h / 4);
	if (posNucleo <= 400)
		posNucleo -= 30;

	if (signaling) grav = 0.5;
		else grav = 0;
	
	// Layout initialization

	forceArray[div] = d3.layout.force()
			.nodes(d3.values(nodes)) // Gets the nodes from the graph and it passes it to the layout
			.links(links.concat(extraLinks)) // Gets the links from the graph and it passes it to the layout
			.size([w - topMenuHeight, h]) // Sets the layout area
			.linkDistance(function (l) {
				var dx = l.target.x - l.source.x,
				dy = l.target.y - l.source.y,
				dr = 1 + Math.sqrt(dx * dx + dy * dy);
				return 10/dr; // The further apart, the shorter the link
			})
			.charge(function (l) {
				return nodescharge[div]*((l.inDegree+l.outDegree)/2); // nodes with many connection tend to repell other nodes
			}) // Setting nodes charge
			.on("tick", tick) // Setting the functions called at each layout iterations
			.gravity(grav)
			.friction(0.5); // Friction to ease the layout loop
	
	var drag = forceArray[div].drag() // Setting the dragging functions for the given layout
			.origin(function (d) {
				return d;
			})
			.on("dragstart", dragstarted)
			.on("dragend", dragended);
	
	zoom[div] = d3.behavior.zoom(); // Setting the zooming function
	zoom[div].scaleExtent([0.5, 3.0]); // Setting mouse-wheel scaling bounds
	
	// HTML code to create the top menu bar
	// This code can be modified to change tool-bar appearance
	var topmenu = '\
			<div style="line-height:0px;text-align:left;vertical-alignment:middle;padding:0em;height:' + topMenuHeight + 'px;background:gray;width:100%;font-family: \'Lucida Console\', Monaco, monospace;font-size:1em;">\n\
				<table class="controlbar">\n\
				<tr>\n\
				<td><button style="cursor:pointer;background-color: Gainsboro;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin: 1px;margin-left:5px;height:25px;width:25px;padding:0px;" onclick="zoom[\'' + div + '\'].scale(1).translate([0, 0]);reset(forceArray[\'' + div + '\'],\'' + div + '\',w,h,\'' + extra + '\','+signaling+',' + hidetoolbar + ','+preventOverlap+','+ccx+','+ccy+','+cellBody+');"><img alt="Reset layout" title="Reset layout" src="' + baseurl + '/refresh.png" border="0"/></button></td>\n\
				<td><button style="cursor:pointer;background-color: Gainsboro;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin: 1px;height:25px;width:25px;padding:0px;" onclick="capture(\'' + div + '\',w,' + (h - topMenuHeight) + ')"><img alt="Save network" title="Save network" src="' + baseurl + '/camera.png" border="0"/></button></td>\n\
				<td width="0px"><a href="" style="width:0px;padding:0px;margin:0px" id="download'+div+'" download="pathway.svg"></a></td>\n\
				<td><button style="cursor:pointer;background-color: Gainsboro ;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin: 1px;height:25px;width:25px;padding:0px;" onclick="exportNetwork(\'' + div + '\');"><img alt="Export network" title="Export network" src="' + baseurl + '/export.png" border="0"/></button></td>\n\
				<td><button style="cursor:pointer;background-color: Gainsboro ;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin: 1px;height:25px;width:25px;padding:0px;" onclick="toggleScores(\''+div+'\')"/><img alt="Export network" title="Toggle scores" src="' + baseurl + '/score.png" border="0"/></button></td>\n\
				<td><button style="cursor:pointer;background-color: Gainsboro ;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin: 1px;height:25px;width:25px;padding:0px;" onclick="hideLegend(\'' + div + '\')"><img alt="Toggle legend" title="Toggle legend" src="' + baseurl + '/legend.png" border="0"/></button></td>\n\
				<td><span style="font-size:0.8em;font-family:\'Open Sans\',sans-serif;color:white"><b>Type:</b></span></td>\n\
				<td>\n\
					<select id="interactionFilter'+div+'" style="background-color: Gainsboro ;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin-top:1px;margin-right:5px;width:60px;height:26px" onchange="applyFilter(\'' + div + '\',w,h,\'' + extra + '\',' + signaling + ',' + hidetoolbar + ','+preventOverlap+');">\n\
						<option value="" selected>All</option>\n\
						<option value="direct">Direct</option>\n\
						<option value="undefined">Indirect</option>\n\
						<option value="activation">Up-regulates</option>\n\
						<option value="inhibition">Down-regulates</option>\n\
						<option value="bind">Binding</option>\n\
						<option value="transcription">Transcription</option>\n\
					</select>\n\
				</td>\n\
				<td>\n\
					<span style="font-size:0.8em;font-family:\'Open Sans\',sans-serif;color:white"><b>Score:</b></span>\n\
				</td>\n\
				<td>\n\
					<select id="scoreFilter'+div+'" style="background-color: Gainsboro ;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin-top:1px;px;width:40px;height:26px" onchange="applyFilter(\'' + div + '\',w,h,\'' + extra + '\',' + signaling + ',' + hidetoolbar + ','+preventOverlap+');">\n\
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
					<select id="forceFilter'+div+'" style="background-color: Gainsboro ;border-color: lightgray;border-radius: 3px 3px 3px 3px;border-style: solid;border-width: 1px;margin-top:1px;px;width:60px;height:26px" onchange="applyForce(\'' + div + '\',w,h,' + signaling + ','+ccx+','+ccy+','+cellBody+');">\n\
						<option value="'+startingCharge/2+'">Compact</option>\n\
						<option value="'+startingCharge+'" selected>Moderate</option>\n\
						<option value="'+startingCharge*2+'">Relaxed</option>\n\
					 </select>\n\
				</td>\n\
				<td width="100%" align="right"><a target="_blank" style="background-color:rgba(0, 0, 0, 0);" href="https://github.com/Sinnefa/SPV_Signaling_Pathway_Visualizer_v1.0" style="text-decoration:none;"><font color="white">SPV</font></a>&nbsp;</td>\n\
				</tr>\n\
				</table>\n\
			</div>\n\
	';
	if (hidetoolbar==0) // The top-menu bar is only added if the function is called with hidetoolbar parameter set to zero
		d3.select("#" + div).html(topmenu);

	// This defines the visualizer border, it can be modified easily changing the CSS		
	d3.select("#" + div).attr("style", d3.select("#" + div).attr("style") + "overflow:hidden;padding:2px;border:1px solid black");
	
	// Scaling and zooming factors
	scale = 0.9;
	zoomWidth = (w - scale * w) / 2;
	zoomHeight = (h - scale * h) / 2;

	// Preparing and object to hold the legend
	if (hidetoolbar==1) topMenuHeight=0; // If tool bar is hidded the legend position changes
	maingraph[div] = d3.select("#" + div).append("div").attr("id", "container" + div).append("svg:svg")
			.attr("width", w)
			.attr("height", h - topMenuHeight)
			.attr("id", "menthaGraphStage" + div)
			.attr("version", "1.1")
			.call(zoom[div].on("zoom", zoomSVG))

	// Adding the legend subelement and the main graph
	svg[div] = maingraph[div]
			.append("svg:g")
			.attr("transform", "translate(" + zoomWidth + "," + zoomHeight + ") scale(" + scale + ")");

	// Adding the CSS for edges, labels atc. as defined above in constants
	svg[div].append("defs").append("style").attr("type", "text/css").text("<![CDATA[" + css + "]]>");

	// Defining and SVG gradient object for the cytosol
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
			.attr("offset", "18%")
			.attr("style", "stop-color:rgb(173,216,230);stop-opacity:1");

	if (signaling) { // If visualizing a signaling pathway we create membrane, nucleus and cytosol
		svg[div].append("svg:g").append("circle")
				.attr("r", cellBody)
				.attr("r", cellBody)
				.attr("stroke", "black")
				.attr("stroke-width", "2")
				.attr("fill", "#FFFF99")
				.attr("cx", ccx)
				.attr("cy", ccy + 5);
		svg[div].append("svg:g").append("circle")
				.attr("r", cellBody)
				.attr("stroke", "black")
				.attr("stroke-width", "2")
				.attr("fill", "url(#cytosol)")
				.attr("cx", ccx)
				.attr("cy", ccy + (h / 15));
		svg[div].append("svg:g").append("ellipse")
				.attr("rx", h * 1.2)
				.attr("ry", h / 2)
				.attr("stroke", "black")
				.attr("stroke-width", "2")
				.attr("fill", "#CCCCFF")
				.attr("cx", w / 2)
				.attr("cy", posNucleo);
		svg[div].append("svg:g").append("rect")
				.attr("x", -25000)
				.attr("y", h - 60)
				.attr("width", 50000)
				.attr("height", 50000)
				.attr("style", "fill:white;stroke:black;stroke-width:2;")
				.attr("onmousedown", "selectElement(evt)");
	}

	// Follows a list of markers that can be used in the visualization: activation, inhibition and others
	// For each maker a shape, a position, a color and other parameters are defined
	// Change these markers carefully

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

	// Setting a clipping area for cut out larger object, like the large cell circumference
	svg[div].append("clipPath")
		.attr("id", "clipRect")
		.append("rect")
		.attr("x", -50)
		.attr("y", -50)
		.attr("width", w+100)
		.attr("height", h+100);
	svg[div].attr("clip-path", "url(#clipRect)")

	// Adding a context menu
	$("#" + div).bind("contextmenu",function(e){
   		var id = e["target"].id;
		var x=e["pageX"];
   		var y=e["pageY"];
		clicked=id;
		if(clicked in nodes) {
			document.getElementById('contextmenu'+div).style.top = (y - 10) + "px";
			document.getElementById('contextmenu'+div).style.left = (x - 10) + "px";
	   		$("#contextmenu"+div).show();
		}
		return false;
	});

	// Tool tip used to show complexes labels, when hovering the complex hull
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
	var cpx = []; // Variable to hold complex hulls
	// Looping through defined complexes to see if some of them are currently shown
	for (var c in complexesList) {
		var tot = 0;
		// Counting shown complexes
		for (p in complexesList[c]) {
			if (Object.keys(nodes).indexOf(complexesList[c][p]) != -1) {
				tot++;
			}
		}
		if (tot > 1) { // In case there are protein complexes in the visualization it adds hull objects
			cpx.push(svg[div].append("svg:g").append("path")
				.attr("class", "hull1")
				.attr("name", c)
				.attr("id", c)
				// Enlarges the hull on mouse hover
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
				// Moves the tooltip with the mouse within the hull
				.on("mousemove", function () {
					tooltip.html(d3.select(this).attr("name"));
					return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
				})
				// Hides the tooltip and reducesthe hull
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
	// Each SVG object, edges, nodes, etc. nees to be initialized,
	// As an example with comment the first two, the others work in a similar way

	var path = svg[div].append("svg:g").selectAll("path") // selects all path objects in the graph
		.data(forceArray[div].links().filter(function (d) { // filters only those which are edges
			return d;
		}))
		.enter().append("svg:path") // Adds a path which represents the edge itself
		.attr("class", function (d) {
			if (typeof d.type != 'undefined')
				return "link-" + d.type.toLowerCase(); // Edge style depends on the type defined in the JSON
			else
				return "link-unknown";
		})
		.attr("id", function (d) {
			return d.source.id.replace(":","") + "" + d.target.id.replace(":","")+"edge" // Assigning an unique ID to the link
		})
		.attr("marker-end", function (d) { // Appending a marker according to the edge type
			if (d.source.id != d.target.id && ie == 0) {
				str = d.type.toLowerCase();
				index = str.lastIndexOf('-') + 1;
				return "url('#" + str.substring(index, str.length) + "')";
			}
		})
		.on("click", clickEdge); // Adding an edge click listener

	var complexes = svg[div].append("svg:g").selectAll("circle") // Selecting all circles
		.data(forceArray[div].nodes().filter(function (d) { // Filtering only complexes
			if (d.category == "complex")
				return d;
		}))
		.enter().append("svg:path")
		.attr("class", "complex") // Adding the CSS class
		.attr("d", complexShape) // d in SVG contains the path of the object to draw, we asign the complexShape as in constants
		.on("click", clickNode) // Mouse listener
		.attr("id", function (d) { // setting the object ID
			return d.id;
		})
		.on("mouseover", function (d) {
			n = svg[div].select("#nodelabel"+d.id);
			n.style({'font-size':'18px','stroke-width':'4px'});
		})
		.on("mouseout", function (d) {
			n = svg[div].select("#nodelabel"+d.id);
			n.style({'font-size':'11px','stroke-width':'2px'});
		})
		.call(drag); // Adding a dragging listener

	/* For details see path or complexes above */
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
		.on("mouseover", function (d) {
			n = svg[div].select("#nodelabel"+d.id);
			n.style({'font-size':'18px','stroke-width':'4px'});
		})
		.on("mouseout", function (d) {
			n = svg[div].select("#nodelabel"+d.id);
			n.style({'font-size':'11px','stroke-width':'2px'});
		})
		.call(drag);

	/* For details see path or complexes above */
	var roundrects = svg[div].append("svg:g").selectAll("rect")
		.data(forceArray[div].nodes().filter(function (d) {
			if (d.category == "nonhuman")
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
		.on("mouseover", function (d) {
			n = svg[div].select("#nodelabel"+d.id);
			n.style({'font-size':'18px','stroke-width':'4px'});
		})
		.on("mouseout", function (d) {
			n = svg[div].select("#nodelabel"+d.id);
			n.style({'font-size':'11px','stroke-width':'2px'});
		})
		.call(drag);

	/* For details see path or complexes above */
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
		.on("mouseover", function (d) {
			n = svg[div].select("#nodelabel"+d.id);
			n.style({'font-size':'18px','stroke-width':'4px'});
		})
		.on("mouseout", function (d) {
			n = svg[div].select("#nodelabel"+d.id);
			n.style({'font-size':'11px','stroke-width':'2px'});
		})
		.call(drag);

	/* For details see path or complexes above */
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
		.on("mouseover", function (d) {
			n = svg[div].select("#nodelabel"+d.id);
			n.style({'font-size':'18px','stroke-width':'4px'});
		})
		.on("mouseout", function (d) {
			n = svg[div].select("#nodelabel"+d.id);
			n.style({'font-size':'11px','stroke-width':'2px'});
		})
		.call(drag);

	/* For details see path or complexes above */
	var stimuli = svg[div].append("svg:g").selectAll("rect")
		.data(forceArray[div].nodes().filter(function (d) {
			if (d.category == "stimulus")
				return d;
		}))
		.enter().append("svg:path")
		.attr("class", "stimulus")
		.attr("d", phenotypeShape)
		.on("click", clickNode)
		.on("mouseover", function (d) {
			n = svg[div].select("#nodelabel"+d.id);
			n.style({'font-size':'18px','stroke-width':'4px'});
		})
		.on("mouseout", function (d) {
			n = svg[div].select("#nodelabel"+d.id);
			n.style({'font-size':'11px','stroke-width':'2px'});
		})
		.call(drag);
	  
	var others = svg[div].append("svg:g").selectAll("circle") // Selecting all circles to create custom elements
		.data(forceArray[div].nodes().filter(function (d) {
			eval("check = (typeof "+d.category+"Shape"+" !== \"undefined\")");
			if (check && d.category !== "complex") return d; // filtering user defined elements
		}))
		.enter().append("svg:path")
		.attr("class", function (d) {return d.category}) // Adding the CSS class
		.attr("d", function (d) {return eval(d.category+"Shape")}) // d in SVG contains the path of the object to draw, we asign the complexShape as in constants
		.on("click", clickNode) // Mouse listener
		.attr("id", function (d) { // setting the object ID
			return d.id;
		})
		.on("mouseover", function (d) {
			n = svg[div].select("#nodelabel"+d.id);
			n.style({'font-size':'18px','stroke-width':'4px'});
		})
		.on("mouseout", function (d) {
			n = svg[div].select("#nodelabel"+d.id);
			n.style({'font-size':'12px','stroke-width':'2px'});
		})
		.call(drag); // Adding a dragging listener

	/* Configuring labels graphics */
	/* For details see path or complexes above */
	textEdges[div] = svg[div].selectAll("g")
		.data(forceArray[div].links())
		.enter().append("svg:g").append("text");

	textEdges[div].append('textPath')
		.attr('xlink:href', function (d, i) {
				return '#'+d.source.id.replace(":","") + "" + d.target.id.replace(":","")+"edge"
			})
		.attr("startOffset", "50%")
		.attr("class", "scoretext")
		.attr("id", function (l) {
				return l.source.id.replace(":","") + "-" + l.target.id.replace(":","") + "-score";
			})
		.text(function (d) {return d.score});

	text[div] = svg[div].append("svg:g").selectAll("g")
		.data(forceArray[div].nodes().filter(function (d) {
				return d
		})).enter().append("svg:text")
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
		.attr("class", "plaintext")
		.attr("category", function (d) {
			return d.category;
		})
		.attr("id", function (d) {
			return "nodelabel"+d.id;
		})
		.text(function (d) {
			return d.name;
		});
	
	// If we are visualizing a signaling pathway we define our layout by "manually" moving
	// some objects, see setFixedPositions
	if (signaling) {
		setFixedPositions(forceArray[div], w, h, ccx, ccy, cellBody);
	}
	else {
		// Saving each object positions to maintain them when filtering
		forceArray[div].nodes().forEach(function (d, i) {
			if(d.id in ox) {
				d.x=ox[d.id];
				d.y=oy[d.id];
				d.px=px[d.id];
				d.py=py[d.id];
				d.cx=cx[d.id];
				d.cy=cy[d.id];
				d.fixed = true;
			} 
		});
	}
		
	forceArray[div].start(); // Layout start
	bounding[div] = true; // Fixing layout boundaries
		
	function update() { // This function governs the layout at each iterations
		path.attr("d", function (d) { // These are the graph edges, we want them to stay within the SVG limists
			var dx = d.target.x - d.source.x;
			var dy = d.target.y - d.source.y;
			if (!signaling) {
				// If we are not visualizing a signaling graph, we want the layout to move within the SVG limits
				var toplimit = -topMenuHeight;
				var bottomlimit = h;
				var rightlimit = w+40;
				var leftlimit = -40;
				if (dx > rightlimit) dx = rightlimit;
				if (dx < leftlimit) dx = leftlimit;
				if (dy > bottomlimit) dy = bottomlimit;
				if (dy < toplimit) dy = toplimit;
				if (d.target.x > rightlimit) d.target.x = rightlimit;
				if (d.target.x < leftlimit) d.target.x = leftlimit;
				if (d.target.y > bottomlimit) d.target.y = bottomlimit;
				if (d.target.y < toplimit) d.target.y = toplimit;
				if (d.source.x > rightlimit) d.source.x = rightlimit;
				if (d.source.x < leftlimit) d.source.x = leftlimit;
				if (d.source.y > bottomlimit) d.source.y = bottomlimit;
				if (d.source.y < toplimit) d.source.y = toplimit;
				dx = d.target.x - d.source.x;
				dy = d.target.y - d.source.y;
			}
			if (signaling && bounding[div]) {
				// The layout is not entirely force oriented, some elements are fixed, we skip them
				if (!extracellular.contains(d.target.id) && !receptors.contains(d.target.id) && !factors.contains(d.target.id) && !phenotypesList.contains(d.target.id)) {
					// If we are visualizing a signaling graph, we want the layout to move within the cytosol limits
					var a = ccx;
					var b = ccy;
					var r = cellBody-(h/10);
					var toplimit = b-Math.sqrt(-(a*a)+(2*a*d.target.x)+(r*r)-(d.target.x*d.target.x));
				
					var b = ccy+(h/2.1);
					var bottomlimit = b-Math.sqrt(-(a*a)+(2*a*d.target.x)+(r*r)-(d.target.x*d.target.x));

					if (d.target.x > rightlimit) d.target.x = rightlimit;
					if (d.target.x < leftlimit) d.target.x = leftlimit;
					if (d.target.y > bottomlimit) d.target.y = bottomlimit;
					if (d.target.y < toplimit) d.target.y = toplimit;
				}
				if (!extracellular.contains(d.source.id) && !receptors.contains(d.source.id) && !factors.contains(d.source.id) && !phenotypesList.contains(d.source.id)) {
					// If we are visualizing a signaling graph, we want the layout to move within the cytosol limits
					var a = ccx;
					var b = ccy;
					var r = cellBody-(h/10);
					var toplimit = b-Math.sqrt(-(a*a)+(2*a*d.source.x)+(r*r)-(d.source.x*d.source.x));
				
					var b = ccy+(h/2);
					var bottomlimit = b-Math.sqrt(-(a*a)+(2*a*d.source.x)+(r*r)-(d.source.x*d.source.x));

					if (d.source.x > rightlimit) d.source.x = rightlimit;
					if (d.source.x < leftlimit) d.source.x = leftlimit;
					if (d.source.y > bottomlimit) d.source.y = bottomlimit;
					if (d.source.y < toplimit) d.source.y = toplimit;
				}
				dx = d.target.x - d.source.x;
				dy = d.target.y - d.source.y;
			}
			// this block of code calculates edge curvature depending on how many nodes are between source and target
			// to amplify the curvature effect change the step parameter at the beginning of the string
			var curvature = 0.1;
			var direction = "0,1";
			var step=0.2; // edges curvature steps, to prevent edge crossings
			if (preventOverlap) {
				forceArray[div].nodes().forEach(function (p) {
					if (d.source.x!=p.x && d.source.y!=p.y && d.target.x != p.x && d.target.y != p.y)
						if (checkLine(d.source.x, d.source.y, d.target.x, d.target.y, p.x, p.y)) curvature+=step;
					
				});
				// For transcription factors the curvature must be inside the cell
				if (factors.contains(d.source.id) && factors.contains(d.target.id)) {
					if (d.source.x<d.target.x) direction="0,1";
					else direction="0,0";
				}
				else if (d.source.x<d.target.x) direction="0,1";
				if (curvature>1.8) curvature=1.8;
			}
			var dr = (Math.sqrt(dx * dx + dy * dy))/curvature;
			// If source and target are the same we cant a loop so we define a circle
			if (d.source.id == d.target.id) {
				return "M" + (d.source.x - 5) + "," + d.source.y + "A15,15 0 1,1 " + (d.source.x) + "," + d.source.y;
			}
			// Else we trace the link
			return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 "+direction+" " + d.target.x + "," + d.target.y;
		});
		// Each object is transformed to respect the layout
		complexes.attr("transform", function (d) {
			return "translate(" + d.x + "," + d.y + ") scale(1.3,1.3)";
		});
		phenotypes.attr("transform", function (d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
		stimuli.attr("transform", function (d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
		circle.attr("transform", function (d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
		others.attr("transform", function (d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
		roundrects.attr("transform", function (d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
		rects.attr("transform", function (d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
		text[div].attr("transform", function (d) {
			if (!preventOverlap || (d.category=="stimulus" || d.category=="phenotype") ) return "translate(" + d.x + "," + d.y + ")";
		});

		if (preventOverlap) {
			// This code prevents labels to overlap
			shifting = -15; // In case of collision shifts the label by this amount
			margin = 15; // Margin used to calculate overlap
			marginx = 25; // Margin used to calculate overlap

			svg[div].selectAll(".plaintext").each(function (d) {
				if(d.category!="stimulus" && d.category!="phenotype") {
					father=this;
					new_y=d.y;
					svg[div].selectAll(".plaintext").each(function (d2) { // We check if there is a collision between each other label
						if(d2.category!="stimulus" && d2.category!="phenotype") {
							// In case of collision shifts the label
							if((d.y<d2.y+margin && d.y>d2.y-margin) && (d.x<d2.x+marginx && d.x>d2.x-marginx)) {
								new_y=new_y+shifting;
								d3.select(this).attr("transform","translate(" + d2.x + "," + new_y + ")");
								d3.select(father).attr("transform","translate(" + d.x + "," + d.y + ")");
							}
						}
					});
				}
			});
			
		}
		
		// Updating hulls for complexes
		var cpxct = 0;
		for (var c in complexesList) {
			var tot = 0;
			var tmp = [];
			// If there is any complex in the graph we created a hull around its elements, see above
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

	function tick() { // This function is called by D3 at each layout iteration
		update();
		// We stop the layout when the "temperature" is within certain boundaries
		if (forceArray[div].alpha() < 0.05 && forceArray[div].alpha() > -0.05) {
			forceArray[div].stop();
			forceArray[div].nodes().forEach(function (d) {
				d.fixed = true;
				bounding[div] = false;
			});
			if (ie == 1) // MArkers must be set at the end in internet explorer
				path.attr("marker-end", function (d) {
					if (d.source.id != d.target.id) {
						return "url('#" + d.type.toLowerCase() + "')";
					}
				});
		}
	}

	function zoomSVG() { // The zooming function applys a transformation according to the mouse event
		svg[div].selectAll("g").attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
		svg[div].select(".legend").attr("transform", "");
		tick();
	}
	
	/* LEGEND: START */
	// Each row in the legend has two elements, the item, and icon, and the text
	// Change one of them if needed but carefully

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
	legend.attr("transform", "matrix(1 0 0 1 0 0)").attr("onmousedown", "selectElement(evt)"); // Legent is not sensitive to dragging and scaling
	legend.append("rect")
		.attr("x", 5)
		.attr("y", h - 145)
		.attr("rx", 5)
		.attr("ry", 5)
		.attr("width", 255)
		.attr("height", 110)
		.attr("style", "fill:white;stroke:black;stroke-width:1;fill-opacity:1;")
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

	function clickNode(d) { // Called when node are clicked, getDescription handles either labels apssed as a varible or from an external webpage
		var p = $("#" + div);
		var position = p.offset();
		var coord = d3.mouse(document.getElementById(div));
		var xPos = coord[0];
		var yPos = coord[1];
		getDescription(d.id, d.name, xPos + position.left - 3, yPos + position.top - 3, div);
	}
	function clickEdge(d) { // Called when edges are clicked, getDescription handles either labels apssed as a varible or from an external webpage
		var p = $("#" + div);
		var position = p.offset();
		var coord = d3.mouse(document.getElementById(div));
		var xPos = coord[0];
		var yPos = coord[1];
		getEvidence(d.idA, d.idB, d.score, xPos + position.left - 3, yPos + position.top - 3, div, d.source.name, d.target.name);
	}
	try { // Sets the top menu drop-down to the surrently selected indexes
		document.getElementById("scoreFilter").selectedIndex = indexScore;
		document.getElementById("forceFilter").selectedIndex = indexForce;
		document.getElementById("interactionFilter").selectedIndex = indexInteractions;
	} catch (err) {}

	return svg[div];
}

function checkLine (x1, y1, x2, y2, a, b) {
	// This function checks if a mpoint (a,b) lays along the line going  from (x1,y1) to (x2,y2) to avoid links crossing other nodes.
        var htolerance = 60;
        if (Math.abs(x1-x2)<htolerance && (Math.abs(a-x1)<htolerance || Math.abs(a-x2)<htolerance) && ((b>y1 && b<y2) || (b>y2 && b<y1))) return true;
        if (Math.abs(y1-y2)<htolerance && (Math.abs(b-y1)<htolerance || Math.abs(b-y2)<htolerance) && ((a>x1 && a<x2) || (a>x2 && a<x1))) return true;
	if 	(

		((x1<x2) && (a>x1 && a<x2 && b>y1 && b<y2)) ||
		((x2<x1) && (a>x2 && a<x1 && b>y2 && b<y1)) ||

		((x1>x2) && (a<x1 && a>x2 && b>y1 && b<y2)) ||
		((x2>x1) && (a<x2 && a>x1 && b>y2 && b<y1))

		) {
		m = (y1-y2)/(x1-x2)
		q = ((x1*y2)-(x2*y1))/(x1-x2)
		ya = m*(a-5) + q;
		yb = m*(a+5) + q;
		if (Math.abs(ya-b)<100 && Math.abs(yb-b)<100) return true;
		else return false;
	}
	return false;
}

function setContextMenu(div, text) {
	contextMenu[div] = text;
	window["actionOut"+div] = "$('#contextmenu"+div+"').hide();";
	document.write("\n\
		<div id=\"contextmenu"+div+"\"\n\
			onmouseout=\"fixOnMouseOut(this, event, actionOut"+div+");\"\n\
			style=\"z-index:800;font: 12px sans-serif;box-shadow: 2px 2px 4px #000000;padding:2px;background:#EEF3E2;border:1px solid black;position: absolute;top:-1000px;left:-1000px;border-radius: 2px 2px 2px 2px;cursor:pointer;\">\n\
		"+contextMenu[div]+"\n\
		</div>\
	");
}

function toggleScores(div) { // Hides all the edge scores
	$("#"+div+" [id$='-score']").toggle();
}

function getDescription(id, name, x, y, div) {
	idpathway = "";
	// If the programmer has defined a label for the clicked object it is shown in the pop-up
	if (!(nlabels[div] == null || nlabels[div][id] + "" == "undefined")) {
		var html = "<div style=\"text-align:center;margin-bottom:2px;background:#00A383;color:white;\"><b>" + name + "</b></div><div class=\"scroll-pane\" style=\"text-align:left;\">";
		html += nlabels[div][id];
		html += "</div>";
		document.getElementById('info').innerHTML = html;
		document.getElementById('info').style.top = (y - 10) + "px";
		document.getElementById('info').style.left = (x - 10) + "px";
		$("#info").show();
	} else {
		// If the programmer has NOT defined a label for the clicked object
		// An ajax call will retrieve the pop-up content// You can de-comment this block to enable an ajax call will retrieve the pop-up content
		/*
		var html = "<div style=\"px;text-align:center;margin-bottom:2px;background:#00A383;color:white;\"><b>" + name + "</b></div><div class=\"scroll-pane\" style=\"text-align:left;\">";
		html += "<div id='lkjlkj'>No description available, loading gif is an example. Please modify the code to add a description in node_labels.<div style='width:150px' ><center><img src='"+ baseurl +"/loader.gif'></img><br>Loading...</center></div></div>";
		html += "</div>";
		document.getElementById('info').innerHTML = html;
		document.getElementById('info').style.top = (y - 10) + "px";
		document.getElementById('info').style.left = (x - 10) + "px";
		$("#info").show();
		var xmlhttp;
		if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
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
		// As an example we created a php page, you can modify this
		xmlhttp.open("GET", baseurl + "/GetNodeDescription.php?id=" + idpathway + "&ida=" + id, true);
		xmlhttp.send();
		*/
	}
}
function getEvidence(a, b, score, x, y, div, g1, g2) {
	idpathway = ""
	// If the programmer has defined a label for the clicked object it is shown in the pop-up
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
		// If the programmer has NOT defined a label for the clicked object
		// You can de-comment this block to enable an ajax call will retrieve the pop-up content
		/*
		if ("" + score == "undefined")
			score = "";
		else
			score = ": " + score;
		var html = "<div style=\"text-align:center;margin-bottom:2px;background:#00A383;color:white;\"><b>" + g1 + " - " + g2 + "" + score + "</b></div><div class=\"scroll-pane\" style=\"text-align:left\">";
		html += "<div id='lkjlkj2'>No description provided, loading gif is an example. Please modify the code to add a description in edge_labels.<div style='width:150px' ><center><img src='"+baseurl+"/loader.gif'></img><br>Loading...</center></div></div>";
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
		// As an example we created a php page, you can modify this
		xmlhttp.open("GET", baseurl + "/GetEdgeDescription.php?id=" + idpathway + "&ida=" + a + "&idb=" + b, true);
		xmlhttp.send();
		*/
	}
}

// These three actions are used to hide floaring elements like pop-ups and tooltips
var actionOut = '$("#info").hide();';
var actionOut2 = '$("#infoEdge").hide();';

// Adding to the hosting page the necessary HTML elements for pop-ups and JS files
document.write("\n\
	<script type=\"text/javascript\" src=\"" + baseurl + "/jquery.mousewheel.js\"></script>\n\
	<script type=\"text/javascript\" src=\"" + baseurl + "/jquery.jscrollpane.min.js\"></script>\n\
	<script type=\"text/javascript\" src=\"http://d3js.org/d3.v3.min.js\"></script>\n\
	<script type=\"text/javascript\" src=\"" + baseurl + "/fixOnMouseOut.js\"></script>\n\
	<div id=\"info\"\n\
		onmouseout=\"fixOnMouseOut(this, event, actionOut);\"\n\
		style=\"width:200px;height:150px;z-index:800;font: 14px sans-serif;box-shadow: 3px 3px 4px #000000;padding:2px;background:#FFFFFF;border:1px solid black;position: absolute;top:-1000px;left:-1000px;border-radius: 4px 4px 4px 4px;vertical-align: middle;overflow:hidden\">\n\
	</div>\n\
	<div id=\"infoEdge\"\n\
		onmouseout=\"fixOnMouseOut(this, event, actionOut2);\"\n\
		style=\"width:200px;height:150px;z-index:800;font: 14px sans-serif;box-shadow: 3px 3px 4px #000000;padding:2px;background:#FFFFFF;border:1px solid black;position: absolute;top:-1000px;left:-1000px;border-radius: 4px 4px 4px 4px;vertical-align: middle;\">\n\
	</div>\n\
");

function exportNetwork(div) { // When exporting a graph a pop-up will contain plain text to be saved
	myWindow = window.open('', '', 'width=800,height=600');
	myWindow.document.write("Source ID;Source Name;Source Category;Target ID; Target Name;Target Category;Effect<br>");
	forceArray[div].links().forEach(function (d) {
		myWindow.document.write(d.source.id + ";" + d.source.name + ";" + d.source.category + ";" + d.target.id + ";" + d.target.name + ";" + d.target.category + ";" + d.type + "<br>");
	});
	myWindow.focus();
}

function reset(force, div, w, h, extra, signaling, hidetoolbar, preventOverlap, ccx, ccy, cellBody) {
	// Resetting the graph entirely implies new nodes positions
	ox = new Array();
	oy = new Array();
	px = new Array();
	py = new Array();
	cx = new Array();
	cy = new Array();

	links_signor = original[div];

	document.getElementById(div).innerHTML = "";
	var startingCharge = -(100*w)/(Object.keys(original[div]).length);
	nodescharge[div] = startingCharge;
	initGraph(links_signor, nlabels[div], elabels[div], div, w, h, extra, signaling, hidetoolbar, preventOverlap);

	for (e in oldColors) {
		if (e.length > 1)
			svg[div].select('#' + e).attr("style", oldColors[e]);
	}
	
	document.getElementById("scoreFilter"+div).selectedIndex="0";
	document.getElementById("interactionFilter"+div).selectedIndex="0";
	document.getElementById("forceFilter"+div).selectedIndex="1";
}

function setFixedPositions(force, w, h, a, b, r, fromforce=0) {
	// Fixing position of extra cellular elements, stilumi, receptors, factor and phenotypes
	// The cell center is at (a,b) and its radius is r
	// Each node class follows the same strategy
	// graph width is divided by the number of elements to be placed
	// objects are placed at equal distance

	// Extracellular elements
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

	// Receptors
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
			d.x = x;
			d.px = x;
			new_y=b-Math.sqrt(-(a*a)+(2*a*x)+(r*r)-(x*x))+20; // Receptors are placed on a circumference
			d.y = new_y;
			d.py = new_y;
			x += passo;
			d.fixed = true;
		}
	});

	// Transcription factors
	var totFact = 0;
	force.nodes().forEach(function (d) {
		if (factors.contains(d.id)) {
			totFact++;
		}
	});
	var posNucleo = h - (h / 6);
	if (posNucleo <= 270)
		posNucleo -= 35;
	if ((w/1000)<1)
		passo = w / (totFact + 1);
	else
		passo = (w/3) / (totFact + 1);
	var x = passo;
	while (x < (w/2)-(passo*totFact/2)) {
		x += passo;
	}
	var count = 0;
	force.nodes().forEach(function (d) {
		if (factors.contains(d.id)) {
			count += 1;
			d.x = x;
			d.px = x;
			if (count % 2 == 0 && totFact>3 && h>600) rt = r + 30;
			else rt = r;
			new_y=b-Math.sqrt(-(a*a)+(2*a*x)+(rt*rt)-(x*x))+posNucleo-70; // Transcription factors are placed on a circumference
			d.y = new_y;
			d.py = new_y;
			x += passo;
			d.fixed = true;
		}
	});

	// Phenotypes
	var totPhenotypes = 0;
	force.nodes().forEach(function (d) {
		if (phenotypesList.contains(d.id)) {
			totPhenotypes++;
		}
	});
	passo = (w - 10) / (totPhenotypes + 1);
	var x = passo;
	var posNucleo = h - 20;
	if (posNucleo <= 270)
		posNucleo -= 20;
	force.nodes().forEach(function (d) {
		if (phenotypesList.contains(d.id)) {
			d.y = posNucleo;
			d.x = x;
			d.py = posNucleo;
			d.px = x;
			x += passo;
			d.fixed = true;
		}
	});

	// If the functions is called by a filter, we restore the elements positions
	force.nodes().forEach(function (d, i) {
		if(d.id in ox) {
			d.x=ox[d.id];
			d.y=oy[d.id];
			d.px=px[d.id];
			d.py=py[d.id];
			d.cx=cx[d.id];
			d.cy=cy[d.id];
			if (!fromforce) d.fixed = true;
		}
	});

}

function applyForce(div, x, y, signaling, ccx, ccy, cellBody) {

	// Getting drop down selected items to restore them after layingout
	var e = document.getElementById("scoreFilter"+div);
	indexScore = e.selectedIndex;
	var th = e.options[indexScore].value;

	var e1 = document.getElementById("interactionFilter"+div);
	indexInteractions = e1.selectedIndex;
	var inttype = e1.options[indexInteractions].value;

	var val = document.getElementById("forceFilter"+div);
	indexForce = val.selectedIndex;
	nodescharge[div] = val.value;

	forceArray[div].nodes().forEach(function (d, i) {
		ox[d.id]=d.x;
		oy[d.id]=d.y;
		px[d.id]=d.px;
		py[d.id]=d.py;
		cx[d.id]=d.cx;
		cy[d.id]=d.cy;
	});

	forceArray[div].nodes().forEach(function (d) {
		d.fixed = false;
		bounding[div] = true;
	});
	if (signaling) {
		setFixedPositions(forceArray[div], x, y, ccx, ccy, cellBody, 1);
	}
	forceArray[div].start();
	
	document.getElementById("scoreFilter"+div).selectedIndex=indexScore+"";
	document.getElementById("interactionFilter"+div).selectedIndex=indexInteractions+"";
	document.getElementById("forceFilter"+div).selectedIndex=indexForce+"";
}

function applyFilter(div, x, y, extra, signaling, hidetoolbar, preventOverlap) {
	forceArray[div].nodes().forEach(function (d, i) {
		ox[d.id]=d.x;
		oy[d.id]=d.y;
		px[d.id]=d.px;
		py[d.id]=d.py;
		cx[d.id]=d.cx;
		cy[d.id]=d.cy;
	});
	var e = document.getElementById("scoreFilter"+div);
	indexScore = e.selectedIndex;
	var th = e.options[indexScore].value;

	var e1 = document.getElementById("interactionFilter"+div);
	indexInteractions = e1.selectedIndex;
	var inttype = e1.options[indexInteractions].value;

	// In this case we filter edges according to user selections in the drop-down menus
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
	initGraph(links_signor, nlabels[div], elabels[div], div, x, y, extra, signaling, hidetoolbar, preventOverlap);
	for (e in oldColors) {
		if (e.length > 1)
			svg[div].select('#' + e).attr("style", oldColors[e]);
	}
	
	document.getElementById("scoreFilter"+div).selectedIndex=indexScore+"";
	document.getElementById("interactionFilter"+div).selectedIndex=indexInteractions+"";

}

function savePathway(anchor,div,pure=1) {
	var fileName = "drawing";
	if (pure==0) fileName+="_compatible.svg"; //For Illustrator compatibility
	else fileName+="_pure.svg"; //Pure standard SVG
	var text = document.getElementById(div).innerHTML.replace('<div>', '').replace('</div>', '');
        text = text.replace("&lt;", "<").replace("&gt;", ">").replace(/&nbsp;/g, "");
	text = text.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
	text = text.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
	if (pure==0) text = text.replace(/paint\-order\:stroke;[\s\S]+?stroke\:[\s\S]+?stroke\-width\:[\s\S]+?;/mg,""); //Illustrator doesn't support text outline
        var svg_blob = new Blob([text], {'type': "image/svg+xml"});
        var url = URL.createObjectURL(svg_blob);
	document.getElementById(anchor).href = url;
	document.getElementById(anchor).download = fileName;
}

function capture(div, w, h) {  // When exporting a graph a pop-up will contain a pure SVG to be saved
	savePathway('download'+div, 'container'+div);
	document.getElementById("download"+div).click();
	savePathway('download'+div, 'container'+div,0);
	document.getElementById("download"+div).click();
}

function hideLegend(div) { // Toggles legend subgraph
	maingraph[div].select(".legend").attr("style", function () {
		if (maingraph[div].select(".legend").attr("style") == "display:none")
			return "";
		else
			return "display:none";
	});
}

// Extra function to force node colors.
function setNodesColor(div, myArray, color) {
	setTimeout(function () { // Called once layout is done
		$.grep(myArray, function (e) {
			try {
				e = e.replace(":", "\\:").replace("-", "\\-");
				// if you want to change the style of the given nodes shange the following lines
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
	// Helper function called by setNodesColor
	oldColors = [];
	var roundrects = svg[div].selectAll("circle").each(function (d) {
		if (this["id"].length > 1) {
			oldColors[this["id"]] = svg[div].select('#' + this["id"]).attr("style");
		}
	});
}


function addEntityType (div, cssn) {
	// This function adds a user defined shape and its relative css
	// the shape has to be defined in the main code. See the README for an example
	css+=cssn;
	svg[div].select("style").text("<![CDATA[" + css+cssn + "]]>");
	var cssadd = document.createElement("style");
	cssadd.type = "text/css";
	cssadd.innerHTML = cssn;
	document.body.appendChild(cssadd);
}

function csv2spv(f,type) {
	// This cuntion can be used to convert local files in SPV networks,
	// we defined two file formats, you can add other formats
	var result = [];
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", f, false);
	xmlhttp.send();
	if (xmlhttp.status==200) {
		if (type.toUpperCase()=="SIGNOR") {
			result = signor(xmlhttp.responseText);
		}
		if (type.toUpperCase()=="PSICQUIC") {
			result = psicquic(xmlhttp.responseText);
		}
		// Add other formats if you want
	}
	return result;
}

function signor(allText) {
	// This function parses the standard SIGNOR pathway files
	// You can create similar functions for your files
	json = [];
	lines = allText.split(/\r?\n/);
	var seen = [];
	for (l in lines) {
		if (lines[l].length>10) {
			parts = lines[l].split(/\t/);

			typea = "protein";
			switch(parts[1]) {
				case "protein":
					typea = "protein";
        				break;
				case "proteinfamily":
					typea = "proteinfamily";
        				break;
				case "stimulus":
					typea = "stimulus";
        				break;
				case "chemical":
					typea = "chemical";
        				break;
				case "complex":
					typea = "complex";
        				break;
				case "smallmolecule":
					typea = "smallmolecule";
        				break;
				case "phenotype":
					typea = "phenotype";
        				break;
			}
			typeb = "protein";
			switch(parts[5]) {
				case "protein":
					typeb = "protein";
        				break;
				case "proteinfamily":
					typeb = "proteinfamily";
        				break;
				case "stimulus":
					typeb = "stimulus";
        				break;
				case "chemical":
					typeb = "chemical";
        				break;
				case "complex":
					typeb = "complex";
        				break;
				case "smallmolecule":
					typeb = "smallmolecule";
        				break;
				case "phenotype":
					typeb = "phenotype";
        				break;
			}
			inttype="unknown";
			if (parts[8].contains("form")) inttype="complex-formation";
			else if (parts[8].contains("up")) inttype="activation";
			else inttype="inhibition";
			if (!parts[8].contains("form") && parts[9].contains("bind")) inttype="bind-"+inttype;
			else if (!parts[8].contains("form") && parts[9].contains("trans")) inttype="transcription-"+inttype;
			else if (!parts[8].contains("form") && parts[22].contains("NO")) inttype="undefined-"+inttype;
			row = "source"+parts[0]+"idA"+parts[2].replace(":","")+"typeA"+typea+"target"+parts[4]+"idB"+parts[6].replace(":","")+"typeB"+typeb;
			if (!(arrayContains(row,seen))) {
				json.push({"source":parts[0],"idA":parts[2].replace(":",""),"typeA":typea,"target":parts[4],"idB":parts[6].replace(":",""),"typeB":typeb,"type":inttype});
				seen.push(row);
			} 

		}
	}
	return json;
}
function psicquic(allText) {
	// PSICQUIC is currently used for PPI thus its parsing is fairly simple
	// MI-JSON and the Causal Tab file format will introducte more details.
	// This two file formats will be implemented in a future release of the library
	json = [];
	lines = allText.split(/\r?\n/);
	var seen = [];
	for (l in lines) {
		if (lines[l].length>10) {
			parts = lines[l].split(/\t/);
			if (parts.length>10) {
				typea = "protein";
				typeb = "protein";
				inttype="ppi";

				source = parts[4].match(/.*\:(.*?)\(gene name\)/);
				if (source !== null && source.length>0) source = source[1];
				else source = "Protein Name";

				target = parts[5].match(/.*\:(.*?)\(gene name\)/);
				if (target !== null && target.length>0) target = target[1];
				else target = "Protein Name";

				row = "source"+source+"idA"+parts[0].replace(":","")+"typeA"+typea+"target"+target+"idB"+parts[1].replace(":","")+"typeB"+typeb;
				if (!(arrayContains(row,seen))) {
					json.push({"source":source,"idA":parts[0].replace(":",""),"typeA":typea,"target":target,"idB":parts[1].replace(":",""),"typeB":typeb,"type":inttype});
					seen.push(row);
				} 
			}
		}
	}
	return json;
}
