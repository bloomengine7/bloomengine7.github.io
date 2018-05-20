var query_compression=0; // turn querystring obfuscation on or off



fname = [
	'node',
	'back',
	'root',
	'timer',
	'moves',
	'giver',
	'receiver',
	'metaNode',
	'passUseMode'
];
var mover = document.getElementById("wrap");  


//mover.addEventListener("click", scroll, false);

//main variables for system
var d = ""; //description buffer
var e = ""; //event description buffer
var b = "";
var root=0; //whether or not user is in primary location. 
var firstload=1; //first time loading up game
var querystring="";
var backIt = "start"; //don't remove this
var content;
var old;
var use; //activate inventory mode
var giver = 0;
var receiver = 0;
var deadX = "";
var deadEvent ="";
var links = 1;
var back = 1;
var scrollPosition;
var invText="";
var inv=1;
var metaNode=0;
var metaContent;
var wait;
var dCount=1;
var thought;
var debugMode=0;
var iBuffer = "";
var inventoryDescArray = [];
var metaVisible=0;
var restored=0;
var parent;
var inventorySystem=1;
var waitSystem=0;
var saveLink;
var f={}; 	
var i={};
var scene_name=[];
var iName=[];
var iNameSorted=[];
var node_function=[];
var file_node_jumped;
var timeouts = [];
i.z='sdssd';
f.node='start';
f.back='start';
back=1;
f.root='start';
f.metaNode=0;
f.reward=0;


if (typeof external_load_text==="undefined") {
	external_load_text="<div id='external_load_text'>This game is powered by <a target=\"_blank\" href=\"http://bloomengine.com/blink\">Blink!</a></div>";
}



function createDeadLinks(a) {
        //build deadlinks for putting into past action transcript
        var deadxLinkNum = a.split('{').length - 1; 
        var y;
        var parsedUrl;
        
        for (var c=0; c < deadxLinkNum;c++) {
            y = a.replace(/^.*\{(.*)}.*$/, '$1');	
            ysplit = y.split("|");
            parsedUrl="<span class='deadLink'>" + ysplit[0] + "</span>";
            y="{"+y+"}";
            a=a.replace(y, parsedUrl);
        
        }
	return a;
}


function is_file_jump(text) {
   if (text.search(".js") != -1) {
       return true;
   } else {
        return false;
   }

   /*
   if (text.split("~").length > 1) {
        return true;
   } else {
        return false;
   }
   */
}

function createLinks(x) {
	//find link building code {sdfsd|sdffs}
	
	var linknum = x.split('{').length - 1; //linknum = number of parseable links in the data.
	
	for (var c=0; c < linknum;c++) {
		var y = x.replace(/^.*\{(.*)}.*$/, '$1');	
		var ysplit = y.split("|");
		var parsedUrl="<a onClick=\"process('" + ysplit[1] + "'); return false;\">" + ysplit[0] + "</a>";

        //detection of file jump
        if (is_file_jump(ysplit[1])) {
            parsedUrl="<a href=\"?file=" + ysplit[1];
            if (ysplit[2]) {
                parsedUrl+="&file_node=" + ysplit[2];
            }
             
            parsedUrl += "&i=" + buildSaveLink(i,iName) + "\">" + ysplit[0] + "</a>";
        }


		y="{"+y+"}";
		x=x.replace(y, parsedUrl);
	
	}
	return x;
}


//calculate page height so scrolls so that no history is visible
function pageHeight() {return window.innerHeight != null? window.innerHeight: document.body != null? document.body.clientHeight:null;}
/* 
 *
 * var query = 0;
if (getParameterByName("f")) {
    query = true;
} else {
    query = false;
}
*/


query = getParameterByName("f");













	
//////////////////////////////////////////
///main click handler//////////////////////
////////////////////////////////////////////
function process(node,giver,receiver,params) {




    if(typeof daemon == 'function') {
        daemon();
    }
    
    if (!params) params = {};
	if (!receiver) receiver = 0;
			 
	if (!giver) giver = 0;
		
	f.node=node;
	f.giver = giver;
	f.receiver = receiver;
	

	
/*	
	//fixes firefox scrolling bug
	$("#wrap").animate({
		scrollTop:  '+=1'
	}, 10); 		
*/	
    

	// if(!ie) {
	
	// $("#wrap").scrollTo( '-=1px'); //fixes firefox bug where won't scroll
	// }

	
	if(!firstload) {
	
        if (!params.manual) {
            $('#new a').replaceWith(function() {
                return '<span class="deadLink">' + $(this).text() + '</span>'
            });
            
        }

        $('#new .back').remove();   
        //change #new div to .old class, but only if it has text
        if ($('#new').text()) {
                document.getElementById('new').setAttribute('class','old');
        }
		document.getElementById('new').removeAttribute('id');
	
		
	}

	
	
	//if person isn't clicking on a meta page, or the same link again, re assign backIt variable
	if (metaNode) {
		
		f.back=="metaNode";
		metaNode=0;
	} else {
		f.back=backIt;
	}


	

	
	if(firstload) {

        let x = check_if_duplicated(user_variables);
        if(x.length) {
            alert('There are duplicated items in user_variables: ' + x.join() + '\nPlease remove duplicates or else there will be bugs!');
            //console.log(check_if_duplicated(user_variables));
        }
        
		//append custom variables to variables array
		fname = fname.concat(user_variables);

		//populate flag variables with 0's by default
		fname.forEach(function(fname) {
			f[fname]="0";
		});
		
		//populate inventory variables with 0's by default
		iName.forEach(function(iName) {
			i[iName]="0";
		});	
		
		
	
			
		// alert("query2" + query2);
		f.node='start';
		f.back='start';
		f.root='start';
		

		if (debugMode) {
			$('#wrap').append('<div id="debug"><a id="debugShowHide" href="javascript:debugShowHide()">Hide Debug</a><div id="debugContent"></div></div><!--debug-->');
		}
		
		
		resize();
		metaVisible = 1;
		
	}


	
	////process querystring
    if (firstload) {
		document.getElementById('title').setAttribute('id','inner'); //give body tag proper id
        var querySplit = [];		
    }

	if(getParameterByName("f") && firstload) {

		 querySplit[0] =  getParameterByName("f"); //querySplit[0].substring(0,  querySplit[0].length-1);	
        if (query_compression) {
            querySplit[0] = LZString.decompressFromEncodedURIComponent(querySplit[0]);
        }

		var fQuerySplit = querySplit[0].split("|");
		f=syncVariables(querySplit[0],fname,f);
        //f=cleanupZeros(f);

		for(var c=0;c<=fname.length;c++){
            if(("fquerysplit: " + fQuerySplit[c])==undefined) {
            }
			
			
			//this fixes bug. Difference between integer and string of zero
			if(fQuerySplit[c]=="0") {
				fQuerySplit[c]=0;
			}
			
			
		
		
			
			//build(f[fname[i]]);
			//document.write(fnames[i]);
		}
		node=f.node;


    } 
    
    if(getParameterByName("i") && firstload) {
		
		querySplit[1] = getParameterByName("i"); //querySplit[1].substring(0, querySplit[1].length-1);	
        if (query_compression) {
            querySplit[1] = LZString.decompressFromEncodedURIComponent(querySplit[1]);
        }
		//var iQuerySplit = querySplit[1].split("|");
		//i=syncVariables(querySplit[1],iName,i);

		i=syncVariables(querySplit[1],iName,i);
        for(var c=0;c<=iName.length-1;c++) {
        //    i[iName[c]]=iQuerySplit[c];
        }

		for(var c=0;c<=iName.length;c++){

			
			
			//this fixes bug. Difference between integer and string of zero
			
			
		
		
			
			//build(f[fname[i]]);
			//document.write(fnames[i]);
		}
	

		
		
	} else if (firstload && !getParameterByName("f") && !getParameterByName("i")) {
		document.getElementById("startScreenInner").innerHTML="<h1>" + gameTitle + "</h1>" + "<h2>by " + gameAuthor + "</h2>";
		
		if (readCookie("state")) {//if there's cookie data available, then do this
			document.getElementById("startScreenInner").innerHTML +="<p>Do you want to <a onClick=\"restore(); return false;\">continue</a> or start a <a onClick=\"newGame(); return false;\">new game</a>?</p>";
		} else {
			document.getElementById("startScreenInner").innerHTML+="<p>Start a <a onClick=\"newGame(); return false;\">new game</a>.</p>";
		}
		
		set_starting_variables();//set starting variables


        //if jump directly from another file to a specific node
        if (getParameterByName("file_node") && !file_node_jumped) {
            f.node = getParameterByName("file_node");
            node = f.node;
            file_node_jumped = 1;
        }	

		
	}




	
	////metrics ajax pull variable  from php ajax
	//if (!firstload && !query) {
	//	f['idn']=document.getElementById('txtHint').innerHTML;
	//}
	
	//for building save link


	
	
	//write to database code here
	//goDb(z);	
	
	
	////print flag list	
	//for (i in fname) {
	//	build(fname[i]) + build(":") + build(f[fname[i]]) + build("<br>");
	//}
	

	
	
		
	//build querystring for saving/loading.	
	//querystring = node;
	for(var c=1;c<fname.length;c++){
		//querystring = querystring + '|' + f[fname[i]];

	}
	
	if (metaNode) {
		backIt="metaNode";		
	} else {
		backIt=f.node; //record back location
	}
	//f.back=f.node;
	



		
		
		
	
	f['moves']=Number(f['moves']);  //for fixing querystring bug. Convert string back to number. Perhaps build a function for this if there's a lot of integer variables needed

	
	
	if (firstload) {
		//write cookie
			
		if (debugMode) {
			// alert('yeah');
			//l fname.push("debugPane");
		}
		if (f.debugPane	==undefined) {
			f.debugPane = 1;
		} else if (f.debugPane) {
			f.debugPane=0;
			debugShowHide();
		}
	

	
	}	
	

	//for highlighting newly added inventory items. Need closure to work.	
	old_i = [];
	for (var c=0;c<iName.length;c++) {        
		(function(c){
			(function(){ 
			   old_i[iName[c]] = i[iName[c]];
			})();	
		})(c);
	}	
	
	// alert(old_i.ornament_loose);
	
		z= buildSaveLink(f,fname);
		zz=buildSaveLink(i,iName);

        if (query_compression) {
            z = LZString.compressToEncodedURIComponent(z);

            zz = LZString.compressToEncodedURIComponent(zz);
        }
		var save_link_compressed = "f=" + z + "&i=" + zz;

        if (getParameterByName("file")) {
            save_link_compressed += "&file=" + getParameterByName("file");

        }
        
		saveLink="<a href=\"?" + save_link_compressed  + "\">Save Game</a> ";
	
        
        
        setCookie("state", z,360);
        setCookie("inv",zz,360);
        
				
    if (!firstload) {
        console.log("set " + JSON.stringify(f));
        localStorage.setItem('save_f', JSON.stringify(f));
        localStorage.setItem('save_i',JSON.stringify(i));

    }
	/////////////////inventory handler
	if (f.receiver) { //use object on object condition
		giver_type=inventoryDescArray[f.giver]["type"];
		use=0;
		
		nodes(f.node);
	
	} else if (f.giver) { //examine one item only
        //!!!problem area. f.giver not passed to save link here after the function
		
        d+="<div class='i_out'>"; 
        inventoryDescArray[node].funct();
        d+="</div>";
			
	} else if (f.node) { // pass through to general node handler if no inventory use
		nodes(f.node); 
		
	}

	
	highlight_items = (function() {
		var items = [];
		for (var c =0; c < iName.length;c++) {	
			if (old_i[iName[c]] != i[iName[c]]) {
				items.push(iName[c]);
			}
		}
		return items;
	})();	 
	debug();
	
	
	
	
	
	

	/*
	
	//make sure the querystring is prepopulated with spaces to allow for more variables in teh future. New variables can then be added and the save games won't break.
	var difference = 500 - fname.length;
	for (var i=0;i<difference;i++) {
		z += "0" + "|";
	}
	//z = rot13(z);
	z = z.substring(0, z.length-1);	
	*/
	
	

		
		
		
		

	if (!metaNode && f.back != "metaNode") {
		
		if (root) {
			f['timer']++;
		}
		
		//increase move counter
		f['moves']++;
		
	} else if (metaNode ) {
		f.back = "metaNode";
        back = "metaNode";
	} 
		


		
	
	

	
	if (e) {
		e = "<div class=\"event\">" + e + "</div>";
	}
	
	if (b) {
		b = "<div class=\"event\">" + b + "</div>";
	}
	
	
	

	
	if(!links && !params.manual) {
		d=createDeadLinks(d);
	}
	d = b + d + e; //append event buffer to description buffer

    if (getParameterByName("file")) {
      $("#owrap").hide();
		$("#wrap").css("display","block");
		$("#startScreen").css("display","none");

      
    }
    if (getParameterByName("f") && firstload || getParameterByName("i") && firstload) {
        $("#owrap").hide();
		$("#wrap").css("display","block");
		$("#startScreen").css("display","none");

	    if (getParameterByName("f")) {	
			$('#content').append("<div class=\"old\">" +  "<div class='metaText'><h2>Save/Restore Point</h2><p>Bookmark this URL to return to this point. The game also automatically saves your progress and you can choose 'continue' from the start screen. (Uses browser cache) </p></div></div>" + external_load_text);
	    }	
		if(typeof new_game_external_code == 'function') {

			new_game_external_code();
		}
		
	//metrics	
	//document.getElementById('txtHint').innerHTML=f['idn'];
	}		
	
	
	if(root) {
		f.root=node;
		
	}
	
	deadX = d;
	
	//if user clicks on "about" when in a situation where links are deactivated, it could break the game state, allowing people to return to root location when they should be forced to click on an event link. Hence this if(meta) conditional is required:
	
	//if(meta) {
	//	
	//	build("<p class=\"back\">{Back|") + build(f.back) + build("}</p>");
	//}
    //
    //
    //


    if (back == 1 && !root && links) {
		d+="<p class=\"back\">{Return|" + f.root + "}</p>";
    } else if (back !=1 && back !=0) {
        d+="<p class=\"back\">{Return|" + back + "}</p>";
    }
    /*
	if (back !=0 && back != 1 && root && links) {
        d+="<p class=\"back\">{Return|" + back + "}</p>";
	} else if (back && !root && links) {
		//make back button
		d+="<p class=\"back\">{Return|" + f.root + "}</p>";
		
	} else if (root && waitSystem && links != 0 && wait != 0 || root && wait) { //the || wait means you can activate a wait even in a non-root node or if waitsystem is off.

		d+='<p class="back">{Wait|' + f.root + '}</p>';
		
		
	}
    */


//parse data and build links

//var x = "asdfdf {hello|hellolink} asdff";
//var y;
//
//document.write(x + '<br/>');
//y = x.replace(/^.*\{(.*)}.*$/, '$1');
//document.write(y + '<br/>');
//
//
//var ysplit = y.split("|");
//document.write(ysplit[0]) + "<br>";
//document.write(ysplit[1]);
//y="{"+y+"}";
//x=x.replace(y, "W3Schools");
//document.write(x);




	
	//deadE= e;
	
	d = createLinks(d); //modify the buffer so it has parsed links


	


	//window.scroll(0,scrollposition);
	//setTimeout("smoothScroll('new')",10);


	
	
	
	//d = "<div id=\"new\">" + d + "</div>";
	//document.getElementById('content').innerHTML += "<div id=\"new\"></div>";
	
	$('#content').append("<div id=\"new\"></div>");
	
	//document.getElementById('new').innerHTML += d; //write d to content div
	//document.getElementById('content').innerHTML += e;
	
	d+='<div style="clear:both"></div>';
    //d=(d).replace(/\n/g, '<br>');
    //
    //
    
    
    //d = (d).replace(/\\/g, "^");
    //d=(d).replace(/\\/g, '[slash]');
    //d=(d).replace(/\\n/g, '<br>');
   //d=(d).replace(/\\p/g, '\\\\');
    //d=(d).replace(/\\p/g, '<br><br>');	//d=(d).replace(/<br><br>/g, '</p><p>');
    //
    //
        $('#new').html(createLinks(shortcut_characters(d))).promise().done(function(){

            if (!firstload && f.moves > 2) {
                $("#wrap").scrollTo("#new", 600); //custom animation speed 
            } else {
                $("#wrap").animate({
                    scrollTop:  '+=100'
                }, 10); 		
            
                $("#wrap").scrollTo("#content", 600);
            }
        });
	//update so scrolls properly https://github.com/inuyaksa/jquery.nicescroll/wiki/Nicescroll-with-dynamic-content
	//$('body').getNiceScroll().resize();
	// window.setTimeout(function(){

	
	//$.scrollTo( $('#new' ), 500 );
	
	//if want no history visible. Make new div full screen height;
	//document.getElementById("new").style.height = pageHeight() - 50;

	//clear description buffer
	d="";
	e="";
	b="";
	
	
	////////////////////////////////////////
	//inventory system
	
	
	
	if (inventorySystem) {
        if (use || root && back != 0 && inv != 0) {
            d+=outputInventory();
	    } else {
            d+=createDeadLinks(outputInventory());
        }
		
	
		
		/* if (!links || inv == 0 || f.giver != 0) {
	
			d=createDeadLinks(d);
		// alert("links " + links + "inv" + inv + "f.giver " + f.giver);
			document.getElementById('rail').innerHTML = "<div id=\"inventory\" >" + inventoryTitle + d + "</div>";	
		} else */ 
		
		if (use || links && back && inv !=0) { //if user is in root or if inventory is on, then show inventory links
			
			//build("{Apple|invApple}");
			
			//build("<a href=\"javascript:inventory('invApple','") + build(node) + build ("', '") + build(f['isRoot']) + build("')\">Apple</a>");
		
			//parse inventory link building code {sdfsd|sdffs}
		
			var linknum =d.split('{').length - 1; //linknum = number of parseable links in the data.
		
			for (var c =0; c < linknum;c++) {
				y = d.replace(/^.*\{(.*)}.*$/, '$1');	
				var ysplit = y.split("|");
				parsedUrl="<a onClick=\"process('" + ysplit[1] + "','" + ysplit[1] + "'); return false;\">" + ysplit[0] + "</a>";
				
				if (use) {
					parsedUrl="<a onClick=\"process('" + f.node + "','" + ysplit[1]  + "','" + f.node + "'); return false;\">" + ysplit[0] + "</a>";
				}
				
				y="{"+y+"}";
				d=d.replace(y, parsedUrl);
			}
		
			
			//build(d);
		
				
			var invDesc;
			
			if (use && !f.giver) {
			
				invDesc= "<div id=\"inventory\" class='use'><h2>" + meta_labels["use"] + "</h2><div id=\"arrow\"></div><div id=\"inv_wrap\">" + d + "</div></div></div>";
			} else {
			
				invDesc= "<div id=\"inventory\"><h2>" + meta_labels["inventory"] + "</h2><div id=\"inv_wrap\">" + d + "</div></div>";
			}
			if (inv) {
				document.getElementById('rail').innerHTML = invDesc;
			
			} 
		
			
		}  else   {
			
				if (!links) d=createDeadLinks(d);
		
				document.getElementById('rail').innerHTML = "<div id=\"inventory\" ><h2>" + meta_labels["inventory"] + "</h2><div id=\"inv_wrap\">" + d + "</div>";
	
				
		}
		



			var iNameSorted = iName.slice(0).sort();
		//attach inventory indented sub-items
		(function(){
			var link="";
			var parent_added = [];
			
			for (c=0; c<iName.length; c++) {
			
				if (parent) {
			
					/* chrome problem */
					
					
					
					if (typeof parent != 'object') {
						var x = "#" + parent;
							if (!parent_added[parent]) {
								$(x).append("<ul></ul>");
								parent_added[parent]=1;
							}

							
							if (use) {
								
								link = "<a onclick=\"process('1','" + inventoryDescArray[iNameSorted[c]]["node"] + "','" + f.node + "'); return false;\">" + inventoryDescArray[iNameSorted[c]]["text"] + "</a>";
							} else {

								link = "<a onclick=\"process('" + inventoryDescArray[iNameSorted[c]]["node"] + "','" + inventoryDescArray[iNameSorted[c]]["node"] + "'); return false;\">" + inventoryDescArray[iNameSorted[c]]["text"] + "</a>";
							}
							$(x + " ul").append( "<li class='node' id=\"" + inventoryDescArray[iNameSorted[c]]["node"] + "\">" + link + "</li>"); 
						
					}
					/* end chrome prob */
				}
			}
		})();
		
		//if no links mode, make sub items a dead link
		if (inv == 0 || links == 0 || back == 0) {
			// $(".node ul .node").each(function(){
				// $(this).html("<span class='deadLink'>" + $(this).text() + "</span>");
			// });
			

			
			$(".node ul .node a").replaceWith(function(){
			return $("<span />", {html: $(this).html()});
			});
			$(".node ul .node span").addClass("deadLink");
		}
		
		//hide all inventory items
		$("#inventory li.node").each(function() {
			$(this).hide();
		});
	


		//make inventory items visible if flag array appropriate
		for (c in iName) {
			if (i[iName[c]]==1 || i[iName[c]]=="1") {
				var v = "#inventory #" + iName[c];
				$(v).show();
			}
		}
		
		
		
		//highlight new items
		(function() {
			for (var c =0; c < highlight_items.length;c++) {
				// alert(highlight_items[c]);
				// $("#" + highlight_items[c]).css("border","1px solid red");
					var x = "#" + highlight_items[c];
				 $(x).each(function() {
					if ($(this).is(':visible')) {
					$(this).effect( "highlight",{color:"yellow"}, 1500 );
					}
				})
			}
		})();
		
		// $("li").effect( "highlight",{color:"yellow"}, 1500 );
	
		d="";
	
	} else {
		$("#content").css("margin-left","0");
	}
	///////////////////////////end inventory system


	//for highlighting newly added inventory items
	



	d="";
	
	//fix height of wrap div and scroll so transcript appears out of sight
	//document.getElementById("wrap").style.height = pageHeight();
	
	//$.scrollTo( '-=5px');
	

	//$(document).ready(function() {
	//   $.scrollTo( $('#wrap' ), 2000 );
	// });	


//$.scrollTo( $('#wrap' ), 2000 );
	

	

	if (f['moves']<2 || query) {
		saveLink="<span class='deadLink'>Save Game</span>";
	} 
    
	
		
	
	
	
	
//	//build("<a href=\"javascript:inventory('invApple','") + build(node) + build ("', '") + build(f['isRoot']) + build("')\">Apple</a>");
	


	
	
	//create save button
	$("#metaContent").html("<a href=\"?\">Restart</a>" + saveLink + createLinks(metaContent));
	// "<a href=\"?\">Restart</a> " + saveLink + createLinks(metaContent) + "<span class='fine'>Powered by <a href='http://bloomengine.com/blink' target='_blank'>Blink!</a></span>";
	
	//reset defaults
	f.giver=0;
	f.receiver=0;
    f["talk"]=0;

	back=1;
	links=1;
	use=0;
	


	inv=1;

	if (waitSystem) {
		wait = 1;
	} else {
		wait = 0;
	}

	root=0;
	parent=0;
	//end reset defaults
	
	
			
	

	
	if(firstload) {
		
		firstload=0;
		query=0;

		/*
		$('a').click(function (e) {
					showHideMeta(1);
			if (!e) {
				e = window.event;
			}
			
			//IE9 & Other Browsers
			if (e.stopPropagation) {
			  e.stopPropagation();
			}
			//IE8 and Lower
			else {
			  e.cancelBubble = true;
			}

		});
		*/
		
	
	//problem area	
		$('#wrap').click(function (event){
			showHideMeta(1);

		});
		
		
		$('#metaButton').click(function (event){
			myEventHandler(event)
			
		});
		
	}


		


		
	
jsprettify.prettify();
	
	resize();
	

	
} //end process main click handler process()





///////////////////////
//functions
//////////////////////

function shortcut_characters(ps_d) {
    var ps_d = escape(ps_d);
    ps_d = (ps_d).replace(/%0A/g, "%3Cbr%3E"); //change \n to <br>
    return unescape(ps_d);
}



function buildSaveLink(items,names) {
	var z = "";
	names.forEach(function(names){
		items=cleanupZeros(items);
		z += items[names] + "|";
	});
		
	return z;

}


//
////write to DB ajax
//function goDb(str) {
//	if (str=="")
//	{
//	document.getElementById("txtHint").innerHTML="";
//	return;
//	} 
//	if (window.XMLHttpRequest)
//	{// code for IE7+, Firefox, Chrome, Opera, Safari
//	xmlhttp=new XMLHttpRequest();
//	}
//	else
//	{// code for IE6, IE5
//	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//	}
//	xmlhttp.onreadystatechange=function()
//	{
//	if (xmlhttp.readyState==4 && xmlhttp.status==200)
//	  {
//	  document.getElementById("txtHint").innerHTML= xmlhttp.responseText;
//	  }
//	}
//	
//	
//
//
//	xmlhttp.open("GET","goDb.php?q="+str,true);
//	
//	xmlhttp.send();
//}		
////end write to database code


//inventory builder
function add(text,node,funct) {	

	// var d2 = d;

	
	// iBuffer += '<li><a href="#" onClick="process(\'sdd\',inventoryDescArray[\'' + node + '\']); return false;">' + text + '</a></li>';
	
	
	// iBuffer += '<a href="#" id="' + node + '" onClick="process(null,' + d2 + '>' + node + text + '</a>';
	
	// iName.push(node);
	iName.push(node);

	//store in array
	inventoryDescArray[node] = [];
	inventoryDescArray[node]["node"] = node;
	inventoryDescArray[node]["text"] = text;
	inventoryDescArray[node]["funct"] = funct;
	
   //to save state so that things can be returned to normal afterwards. because the functions inside add() are run, they may change world state 
    var i_holder = i;
	var f_holder = f;
	//This is to fix chrome bug: typeof parent != 'object'
	if (parent && typeof parent != 'object') {
		inventoryDescArray[node]["parent"] = parent;
		parent=0;
	}
	funct(); //this is to setup the type
	
	
	if (thought) {
		inventoryDescArray[node]["type"] = "thought";
		// i[node]["type"]="thought";
		// alert(i[node]);
	
	} else {
        	
		inventoryDescArray[node]["type"] = "object";
	}

    //restore to original state because the functions inside add() may have changed something
	i = i_holder;
	f = f_holder;
	thought=0;
    object=0;
    parent=0;
    // 
	// inventoryDescArray[node]["funct2"] = funct2;
	d = "";
}



window.onresize = resize;

function restore() {

    $("#owrap").hide();	
	$("#content").html("<div id='new'><h2>Restored game</h2>" + "</div>" + external_load_text);
	
	
	
	
	
	
	//document.getElementById('title').setAttribute('id','inner');
	
	//load variables from cookie, populate f[]
	//var xxx=readCookie("state");
	
	
	
	
	
		
		
		var invz=readCookie("inv");
		invz = invz.substring(0, invz.length-1);	
		
		
		
		//i=syncVariables(invz,iName,i);
		
		var state=readCookie("state");
			state = state.substring(0, state.length-1);
			
	//	f=syncVariables(state,fname,f);

        console.log("get" + localStorage.getItem('save_f'));
        
        f = JSON.parse(localStorage.getItem('save_f'));
        i = JSON.parse(localStorage.getItem('save_i'));
        
        //console.log('heeeeeee' + f.node);
		process(f.node,f.giver,f.receiver);
	
	
		hideStartScreen();

	
		
	$("#wrap").css("display","block");
	

	
		// toggleLayer('wrap');
// toggleLayer('startScreen');

	
}

function setCookie(cookieName,cookieValue,nDays) {
 var today = new Date();
 var expire = new Date();
 if (nDays==null || nDays==0) nDays=1;
 expire.setTime(today.getTime() + 3600000*24*nDays);
 document.cookie = cookieName+"="+escape(cookieValue)
                 + ";expires="+expire.toGMTString();
}

function readCookie(cookieName) {
 var theCookie=" "+document.cookie;
 var ind=theCookie.indexOf(" "+cookieName+"=");
 if (ind==-1) ind=theCookie.indexOf(";"+cookieName+"=");
 if (ind==-1 || cookieName=="") return "";
 var ind1=theCookie.indexOf(";",ind+1);
 if (ind1==-1) ind1=theCookie.length; 
 return unescape(theCookie.substring(ind+cookieName.length+2,ind1));
}






function toggleLayer( whichLayer )
{
  var elem, vis;
  if( document.getElementById ) // this is the way the standards work
    elem = document.getElementById( whichLayer );
  else if( document.all ) // this is the way old msie versions work
      elem = document.all[whichLayer];
  else if( document.layers ) // this is the way nn4 works
    elem = document.layers[whichLayer];
  vis = elem.style;
  // if the style.display value is blank we try to figure it out here
  if(vis.display==''&&elem.offsetWidth!=undefined&&elem.offsetHeight!=undefined)
    vis.display = (elem.offsetWidth!=0&&elem.offsetHeight!=0)?'block':'none';
  vis.display = (vis.display==''||vis.display=='block')?'none':'block';
}


function newGame() {

	var output="";

	//document.getElementById('title').setAttribute('id','inner');
//document.getElementById('wrap').visibility = true;

	hideStartScreen();
	

	$("#wrap").css("display","block");





// toggleLayer('wrap');
// toggleLayer('startScreen');
	
//<p><a href=\"#a\" onClick=\"$.scrollTo( $('#new' ), 500 );\">Go to bottom</a></p>

	
	//	alert($("content").html());
	// restored=1;
	$("#content").html("<div id='new'><h2>New game</h2>" + "</div>" + external_load_text);
		process('start');	
// output+="<div class=\"old\"><h2>New Game</h2></div>" + external_load_text + document.getElementById('content').innerHTML;


// document.getElementById('content').innerHTML=output;

	if(typeof new_game_external_code == 'function') {

		new_game_external_code();
	}
//$('body').getNiceScroll().resize();


// $("#wrap").scrollTo("#new", 750); //custom animation speed 
	resize();
	metaVisible = 1;
//('start');


}


function resize() {
	$("#debug").css("max-height", function(){ 
		return $(window).height();
	});
	
	$("#debugContent").css("max-height", function(){ 
		return $(window).height() - 60;
	});
	

	
	$("#wrap, #content").css("min-height", function(){ 
		return $(window).height();
	});
	
	
	$("#debugShowHide").css("height", function(){ 
	
		return $("#debug").height();
		
	});
	
	if ($("#inv_wrap").height() < $(window).height()) {
		$("#inv_wrap").css("height", "auto")
	}
	
	if ($(window).height() < $("#inv_wrap").height()+75) { 
		$("#inv_wrap").height($(window).height()-75);
	}
	

	
	//adjust size of inventory according so it shrinks and turns on scrollbars if window gets too small
		
	//document.getElementById('inventory').style.maxHeight = viewportheight - 100 + 'px';
	
	
	/* inventory
	document.getElementById('list').style.maxHeight = viewportheight -120 + 'px';
	document.getElementById('content').style.minHeight = viewportheight - 60 + 'px';

	*/
	

	
}



//inventory




//append text to description buffer
function build(a) {
		d = d + a;	
}

//append new text to inventory buffer
function buildInv(a) {
	d = d + a;
}

//append text to event buffer
function event(a) {
	e = e + a;
}

//clear description buffer and start again
function buildNew(a) {
	d = a;
}



	



  //window.onbeforeunload = confirmExit;
  //function confirmExit()
  //{
  //  return 'Have you saved game? Unless you\'ve saved game, progress will be lost.';
  //}




///for debugging. Pull variables from form fields



///

function form_params( form )
{
    var params = new Array()
    var length = form.elements.length
    for( var c = 0; c < length; c++ )
    {
        element = form.elements[c]

        if(element.tagName == 'TEXTAREA' )
        {
                params[element.name] = element.value
        }
        else if( element.tagName == 'INPUT' )
        {
                if( element.type == 'text' || element.type == 'hidden' || element.type == 'password')
                {
                        params[element.name] = element.value
                }
                else if( element.type == 'radio' && element.checked )
                {
                        if( !element.value )
                                params[element.name] = "on"
                        else
                                params[element.name] = element.value

                }
                else if( element.type == 'checkbox' && element.checked )
                {
                        if( !element.value )
                                params[element.name] = "on"
                        else
                                params[element.name] = element.value
                }
        }
    }
    return params;
}





function serialize(form) {
  if (!form || !form.elements) return;

  var serial = [], c, j, first;
  var add = function (name, value) {
    serial.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
  }

  var elems = form.elements;
  for (c = 0; c < elems.length; c += 1, first = false) {
    if (elems[c].name.length > 0) { /* don't include unnamed elements */
      switch (elems[c].type) {
        case 'select-one': first = true;
        case 'select-multiple':
          for (j = 0; j < elems[c].options.length; j += 1)
            if (elems[c].options[j].selected) {
              add(elems[c].name, elems[c].options[j].value);
              if (first) break; /* stop searching for select-one */
            }
          break;
        case 'checkbox':
        case 'radio': if (!elems[c].checked) break; /* else continue */
        default: add(elems[c].name, elems[c].value); break;
      }
    }
  }

  return serial.join('&');
}


function togglez(ids) {
	var z = "#debug_" + ids;
	var b = $(z).val();

	if (b == "0" || !b) {
		$(z).val("1")
	} else {
		$(z).val("0")
	}


}
	

/////

//story
function debug() {

	
	//////////////////////////
	///////////debug tools////
	//////////////////////////
	

	dt = '<div id="debug-block"><form id="debugForm" >';
	
	/*
	dt += '<div class="form_block"><label>Timer: </label><input type="text" name="timer" value="1"  /></div>';
	//example markup
	*/
	
	
	//dt+='<input type="hidden" name="receivePost" value="1" />';
	
	
	
	
	function output_flags(f,fname) {
					//output flag variables	
		for (c in fname) {
			dt += '<div class="form_block"><label>';
				
            dt+="<a href=\"#\" title=\"" + fname[c] + "\"onclick=\"togglez('" + fname[c] +"'); return false;\">";
			dt += fname[c];
			
            dt+=":</a>";
			
			dt+="</label>";
			dt+='<input type="text" id="debug_'
			dt+=fname[c];
			dt+='" name="';
			dt+=fname[c];
			dt+='" value="';
			dt+=f[fname[c]];
			dt+='"  />'
			dt+="</div>";
		}
	
	}

	dt += "<div id=\"flags\">";
	output_flags(f,fname);
	dt += "</div>";
	
	dt += "<div id=\"inv\">";
	
	output_flags(i,iName);
	dt += "</div>";
	//<input type='button' value='Submit' onclick='jsFunction();alert('it works!');'>
	dt += '<button type="submit" class="button" onclick="buildDebugLink(); return false;">Submit</button>';
	
	//dt += '<a href="#" onclick="buildDebugLink();">Do it</a>';
	dt += '</form></div>';

	name_element = document.getElementById('dc');
	//d+= document.getElementById('timer').value;

	

	
	
	//dt += serialize('debugForm')
	
    //
    //$(":checkbox, :radio").click(showValues);
    //$("select").change(showValues);
    //dt += showValues();
	
	
	//dt += $("form").serialize();
	
	
	
	/*
	dt = "";
	dt+="<ul>";
	
	dt+="<li>timer: ";
	dt+=f['timer'];
	dt+= "</li>"
	dt+="<li>cycle: ";
	dt+=f['cycle'];
	dt+= "</li>";

	//output flag variables	
	for (i in fname) {
		dt+="<li>";
		dt+=fname[i];
		dt+=": ";
		dt+=f[fname[i]];
		dt+="</li>";
	}
	
	dt+="</ul>";
	
	
	*/
	
	if (debugMode) {
		document.getElementById('debugContent').innerHTML=dt;


       $('#owrap').on('click', function(e) {  
            $('#owrap').hide();
        });
	} 

	//////////////////////////////
	///////////end debug tools////
	/////////////////////////////	

	resize();

	

}


function buildDebugLink() {
	var d = "";
    var i = "";

	$("#flags .form_block input").each(function(index,value) {
		
		
		d+=$(this).val() + "|";
		
	});
	
	//d+="&i=";
	
	$("#inv .form_block input").each(function(index,value) {
		
		
		i+=$(this).val() + "|";
		
	});
	
    if (query_compression) {
        d =  LZString.compressToEncodedURIComponent(d);
        i =  LZString.compressToEncodedURIComponent(i);
    }	

	
	document.location.href = "?f=" + d + "&i=" + i;
}




function debugShowHide() {

	if (f.debugPane) {
		$("#debug").css("left", -1 * $("#debug").width());
		f.debugPane = 0;
		$("#debugShowHide").text("Show debug");
		$("#debugShowHide").css("background-image","url(arrow-right.gif)");
	} else {
		$("#debug").css("left", "0");
		f.debugPane = 1;
			$("#debugShowHide").text("Hide debug");
			$("#debugShowHide").css("background-image","url(arrow-left.gif)");
					
	}
}





metaVisible = 1;


function myEventHandler(e)
{
	showHideMeta();
	
    if (!e)
      e = window.event;

    //IE9 & Other Browsers
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    //IE8 and Lower
    else {
      e.cancelBubble = true;
    }
}


function showHideMeta(forceHide) {
	
	var metaHeight = $("#metaContent").height();
	var offScreen = metaHeight * -1;
	
	
	
	if (metaVisible || forceHide) {
		//$("#meta").css("top", offScreen);
		
		
		$( "#meta" ).animate({
			
			top: offScreen - 5
		
		}, 1000, function() {
		// Animation complete.
			metaVisible = 0;
			$("#metaButton").html('Menu <img src="arrow-down.gif">');
			// $("#metaButton").css("background-image","url(arrow-down.gif)");
		});
		
		
	
		
	} else if (metaVisible==0) {
		//$("#meta").css("top", 0);
		
		$( "#meta" ).animate({
			
			top: 0
		
	
		}, 150, function() {
			metaVisible = 1;
			$("#metaButton").html('Menu <img src="arrow-up.gif">');
			
			// $("#metaButton").css("background-image","url(arrow-up.gif)");
			
		});
		
		
		
	}
 
}



function hideStartScreen() {
		startScreenHeight = "-=" + $("#startScreen").height();
		$( "#startScreen" ).animate({
			
			top: startScreenHeight
		
	
		}, 500, "swing", function() {
			$("#startScreen").css("display","none");
			
		});
		
		//$("#wrap").trigger("click"); possible problem area this may be needed
		
}




function syncVariables(rawFlag,flagNames,flags) {


	
	

		//fixthis join two arrays together. Don't replace. If there are more variables in flagnames than rawflag, leave flagnames alone

	


	var flagsParsed=rawFlag.split("|");
	// alert(flagsParsed.length);
	// alert(iName.length);
	
	for (var c=0;c<=flagNames.length-1;c++) {
		// alert("flagNames[c]: " + flagNames[c] + "flagsParsed[c]: " + flagsParsed[c]);
        //
		if(exist(flagsParsed[c])) {
        
             flags[flagNames[c]]=flagsParsed[c];
        } else {
             flags[flagNames[c]]=0;
        }
        if(flagsParsed[c]=='undefined' || flagsParsed[c]=='') {
            flags[flagNames[c]]=0;
        }
			
	}
	
	
	return flags;
}



function cleanupZeros(flags) {
	
	
	/* 
		for(var c=0;c<=fname.length;c++){
			
		
			
			//this fixes bug. Difference between integer and string of zero
			if(flags[fname[c]]=="0") {
				flags[fname[c]]=0;
				
			}
			
	
		} */
	
	
		
	//fix problem with f['whatever']="0" (returns true) not being the same as f['whatever']=0 (returns false)
	for (var x in flags) {
        if (flags[x]=='undefined' || flags[x] == '') {
            flags[x]="0";
        }
		if (flags[x]==="0" || flags[x]==="1") {
			flags[x]=flags[x]-0; //performing math converts it to a number
		}

	}
	
	
	
	
	
	
	return flags;
}


var nodeArray=[];
var rootList=[];
function n(node,funct) {
	var fHolder=f;
	var iHolder=i;
	nodeArray[node]=funct;
	//funct();
	if (root) {
		rootList.push(node);
		
	}
	f=fHolder;
	i=iHolder;
	root=0;
}

function outputInventory() {
	var c;

	var thought_system;
	var iBuffer = "";
	//loop through all of invdescarray
	
	var iHolder = i;
	var fHolder = f;
	
	for (c=0; c<iName.length; c++) {
		if (inventoryDescArray[iName[c]]["type"]=="thought") {
			thought_system=1;
		
		}
	
	}
	
	function output_inventory_node(c) {
		iNameSorted = iName.slice(0).sort();
		
		iBuffer += "<li class='node' id=\"" + inventoryDescArray[iNameSorted[c]]["node"] + "\">{" + inventoryDescArray[iNameSorted[c]]["text"] + "|" + inventoryDescArray[iNameSorted[c]]["node"] + "}</li>";
	}

	
	function listInventoryType() {
		
		iNameSorted = iName.slice(0).sort();
		for (var c=0; c < inventoryTypes.length; c++) {

			iBuffer+="<div class='inventory_type' id='" + inventoryTypes[c][0] + "'><h3>" + inventoryTypes[c][1] + "</h3><ul>";
			
			
			var inventoryTypeId = "" + inventoryTypes[c][0];
			
			
			for (var d=0; d<iName.length; d++) {
				
				
			
				if (inventoryDescArray[iNameSorted[d]]["type"]==inventoryTypeId && !inventoryDescArray[iNameSorted[d]]["parent"]) {
					output_inventory_node(d);
				}
			
			}
			
			
		iBuffer += "</ul></div>";
			
			
			

			
		}
	}
	
	if (inventoryTypes.length > 0) {
		listInventoryType();
	
	} else {
		iBuffer+="<ul>"
		for (c=0; c<iName.length; c++) {
			
			if (!inventoryDescArray[iNameSorted[c]]["parent"]) {
				output_inventory_node();
			}
		
		}
		iBuffer+="</ul>";
	}
	

	
	return iBuffer;
}




