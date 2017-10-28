		/*********************************************************************
		 * No onMouseOut event if the mouse pointer hovers a child element 
		 * *** Please do not remove this header. ***
		 * This code is working on my IE7, IE6, FireFox, Opera and Safari
		 * 
		 * Usage: 
		 * <div onMouseOut="fixOnMouseOut(this, event, 'JavaScript Code');"> 
		 *		So many childs 
		 *	</div>
		 *
		 * @Author Hamid Alipour Codehead @ webmaster-forums.code-head.com		
		**/
		function is_child_of(parent, child) {
			if( child != null ) {			
				while( child.parentNode ) {
					if( (child = child.parentNode) == parent ) {
						return true;
					}
				}
			}
			return false;
		}
		function fixOnMouseOut(element, event, JavaScript_code) {
			var current_mouse_target = null;
			if( event.toElement ) {				
				current_mouse_target 			 = event.toElement;
			} else if( event.relatedTarget ) {				
				current_mouse_target 			 = event.relatedTarget;
			}
			if( !is_child_of(element, current_mouse_target) && element != current_mouse_target ) {
				eval(JavaScript_code);
			}
		}

