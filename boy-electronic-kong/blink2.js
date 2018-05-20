fname = [
	'node',
	'back',
	'root',
	'timer',
	'moves',
	'giver',
	'receiver',
	'metaNode'
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
var giver;
var receiver;
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

var f=[]; 
f['node']='start';
f['back']='start';
f['root']='start';
f['metaNode']=0;


//append custom variables to variables array
fname = fname.concat(userVariables);







//populate flag variables with 0's by default
for (i in fname) {
	f[fname[i]]=0;
}
	
//////////////////////////////////////////
///main click handler//////////////////////
////////////////////////////////////////////


function createDeadLinks(a) {
	//build deadlinks for putting into past action transcript
	deadxLinkNum= a.split('{').length - 1; 
	for (var i =0; i < deadxLinkNum;i++) {
		y = a.replace(/^.*\{(.*)}.*$/, '$1');	
		ysplit = y.split("|");
		parsedUrl="<span class='deadLink'>" + ysplit[0] + "</span>";
		y="{"+y+"}";
		a=a.replace(y, parsedUrl);
	
	}
	return a;
}

function convertDeadLinks(a) {
	//build deadlinks for putting into past action transcript
	deadxLinkNum= a.split('<').length - 1; 
	for (var i =0; i < deadxLinkNum;i++) {
		y = a.replace(/^.*\<a(.*)a>.*$/, '$1');	
		
		parsedUrl="";
		y="<"+y+">";
		a=a.replace(y, parsedUrl);
	
	}
	return a;
}


function createLinks(x) {
	//find link building code {sdfsd|sdffs}
	
	var linknum = x.split('{').length - 1; //linknum = number of parseable links in the data.
	
	for (var i =0; i < linknum;i++) {
		y = x.replace(/^.*\{(.*)}.*$/, '$1');	
		var ysplit = y.split("|");
		parsedUrl="<a href=\"#a\" onClick=\"process('" + ysplit[1] + "');\">" + ysplit[0] + "</a>";
		y="{"+y+"}";
		x=x.replace(y, parsedUrl);
	
	}
	return x;
}


//calculate page height so scrolls so that no history is visible
function pageHeight() {return window.innerHeight != null? window.innerHeight: document.body != null? document.body.clientHeight:null;}

function process(fdc) {




if(!ie) {
//$('body').getNiceScroll().resize();
$.scrollTo( '-=1px'); //fixes firefox bug where won't scroll
}

	scrollPosition =  window.pageYOffset;//document.body.scrollTop;
	//alert('scroll: '+ scrollPosition);
	
	//window.setInterval(animate_box, 50);
	
	
	//if want no history visible, then need this. Make new div small again. not full height of window
	//document.getElementById("new").style.height = pageHeight()-30;
	
	//document.getElementByClassName("old").style.height = "auto";
	
	if(!firstload) {
	//remove all links
	//deadX = document.getElementById('content').innerHTML;
	
	
		
	//deadX = convertDeadLinks(deadX);
		
		document.getElementById('new').innerHTML = createDeadLinks(deadX);
		document.getElementById('new').setAttribute('class','old');
		document.getElementById('new').removeAttribute('id');
		//setAttribute('id','');
		
	}
	
	
//smoothScroll('anchor'); //scroll page down move page to appropriate location. Doesn't work when put at end of process(). Dont know why. No scroll, just direct jump.

	//document.getElementById('temp').innerHTML = createDeadLinks(deadX);
	
	//Put dead link description data into old
	//document.getElementById('old').innerHTML += createDeadLinks(deadX);//keep appending each move to transcript after click
	
	//put dead link event data into old
	//document.getElementById('old').innerHTML += createDeadLinks(e);
	
	
	
	
	

	
	
	use=0; //important to reset inventory
	f['node']=fdc;
	
	//if person isn't clicking on a meta page, or the same link again, re assign backIt variable
	if (metaNode) {
		
			f['back']=="metaNode";
			metaNode=0;
	} else {


		f['back']=backIt;
	}
	

	

	
	//check for querystring data so it loads game
	if(firstload) {
		query = window.location.search.substring(1);
		f['node']='start';
		f['back']='start';
		f['root']='start';
	}


	
		////process querystring
	if(query && firstload) {
		document.getElementById('title').setAttribute('id','inner'); //give body tag proper id
		
		//query=rot13(query);
		var mySplitResult = query.split("|");
		
		for(var i=0;i<=fname.length;i++){
		//f[fname[i]]=mySplitResult[i];
		
		
		//this fixes bug. Difference between integer and string of zero
		if(mySplitResult[i]=="0") {
			mySplitResult[i]=0;
		}
		
		
		f[fname[i]]=mySplitResult[i];
		//build(f[fname[i]]);
		//document.write(fnames[i]);
		}
		fdc=f['node'];
		
	} else if (firstload && !query) {
		document.getElementById("startScreenInner").innerHTML="<h1>" + gameTitle + "</h1>" + "<h2>by " + gameAuthor + "</h2>";
		
		if (readCookie("state")) {//if there's cookie data available, then do this
			document.getElementById("startScreenInner").innerHTML +="<p>Do you want to <a href=\"#a\" onClick=\"restore();\">continue</a> or start a <a href=\"#a\" onClick=\"newGame();\">new game</a>?</p>";
		} else {
			document.getElementById("startScreenInner").innerHTML+="<p>Start a <a href=\"#a\" onClick=\"newGame();\">new game</a></p>";
		}
	}
	

	
	////metrics ajax pull variable from php ajax
	//if (!firstload && !query) {
	//	f['idn']=document.getElementById('txtHint').innerHTML;
	//}
	
	//for building save link
	var z = fdc + "|";
	for(var i=1;i<fname.length;i++){
		z += f[fname[i]] + "|";
	}
	
	
	
	

	
	
	//make sure the querystring is prepopulated with spaces to allow for more variables in teh future. New variables can then be added and the save games won't break.
	var difference = 500 - fname.length;
	for (var i=0;i<difference;i++) {
		z += "0" + "|";
	}
	//z = rot13(z);
	z = z.substring(0, z.length-1);	
	
	
	
	if (!firstload) {
		//write cookie
		setCookie("state", z,360);
		var cookie = readCookie("state");





	
		
		
		
		
	}
	
		//write to database code here
	//goDb(z);	
	
	
	////print flag list	
	//for (i in fname) {
	//	build(fname[i]) + build(":") + build(f[fname[i]]) + build("<br>");
	//}
	

	
	
		
	//build querystring for saving/loading.	
	//querystring = fdc;
	for(var i=1;i<fname.length;i++){
		//querystring = querystring + '|' + f[fname[i]];

	}
	
	if (metaNode) {
		backIt="metaNode";		
	} else {
		backIt=f['node']; //record back location
	}
	//f['back']=f['node'];
	


	if(f['giver'] != 0) { 
	
	
		interactions();
		
		
	} else {
		
		//fix problem with f['whatever']="0" (returns true) not being the same as f['whatever']=0 (returns false)
		for (i in fname) {
			if(f[fname[i]]=="0") {
				f[fname[i]]=0;
			}
		}
		
		story(); //get from story.js

		if (!metaNode && f['back'] != "metaNode") {
			
			if (root) {
				f['timer']++;
			}
			
			//increase move counter
			f['moves']++;
			
		} else if (metaNode ) {
			f['back'] = "metaNode"
		} 
		


		
	}
	

	
	if (e) {
		e = "<div class=\"event\">" + e + "</div>";
	}
	
	if (b) {
		b = "<div class=\"event\">" + b + "</div>";
	}
	
	
	

	
	if(!links) {
		d=createDeadLinks(d);
	}
	d = b + d + e; //append event buffer to description buffer
	
	if(query && firstload) {
		/*build("<h1>Save/Restore Point:</h1><p> Bookmark this page to return here later. <br>The game also automatically saves your progress. (If Cookies enabled)</p>");*/
		
		d = "<div class='metaText'><h2>Save/Restore Point:</h2><p><strong>Bookmark this page</strong> to return here later.</p><p>The game also automatically saves your progress: you can leave the game and click 'continue' from the start page at a later time. (Cookies need to be enabled)</p></div><br>" + d;
		
	//metrics	
	//document.getElementById('txtHint').innerHTML=f['idn'];
	}		
	
	
	if(root) {
		f['root']=fdc;
		
	}
	
	deadX = d;
	
	//if user clicks on "about" when in a situation where links are deactivated, it could break the game state, allowing people to return to root location when they should be forced to click on an event link. Hence this if(meta) conditional is required:
	
	
	//if(meta) {
	//	
	//	build("<p class=\"back\">{Back|") + build(f['back']) + build("}</p>");
	//} 
	

	
	if (back && !root && links) {
		//make back button
		build("<p class=\"back\">{Back|") + build(f['root']) + build("}</p>");
		
	} else if (root && waitSystem && links && wait != 0 || wait) { //the || wait means you can activate a wait even in a non-root node or if waitsystem is off.
	
		d+='<p class="back">{Wait|' + f['root'] + '}</p>';
		
	}



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
	
	$('#new').append(d);
	
	//update so scrolls properly https://github.com/inuyaksa/jquery.nicescroll/wiki/Nicescroll-with-dynamic-content
	//$('body').getNiceScroll().resize();
	
	setTimeout(function() {$.scrollTo( $('#new' ), 300 );}, 50);
	
	
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
		
		includeInv();
		if (!links || inv == 0) {
			invText=createDeadLinks(invText);
			
			document.getElementById('rail').innerHTML = "<div id=\"inventory\" ><h2>You are carrying:</h2><div id='list'>" + invText + "</div></div>";	
		} else if (use || root && links) { //if user is in root or if inventory is on, then show inventory links
			
			//build("{Apple|invApple}");
			
			//build("<a href=\"javascript:inventory('invApple','") + build(fdc) + build ("', '") + build(f['isRoot']) + build("')\">Apple</a>");
		
			//parse inventory link building code {sdfsd|sdffs}
		
			var linknum =invText.split('{').length - 1; //linknum = number of parseable links in the data.
			
			for (var i =0; i < linknum;i++) {
				y = invText.replace(/^.*\{(.*)}.*$/, '$1');	
				var ysplit = y.split("|");
				parsedUrl="<a href=\"#a\" onClick=\"inventory('" + ysplit[1] + "','" + f['node'] + "')\">" + ysplit[0] + "</a>";
				y="{"+y+"}";
				invText=invText.replace(y, parsedUrl);
			}
		
			
			build(invText);
		
				
			var invDesc;
			
			if (use) {
				invDesc= "<div id=\"inventory\" class='use'><h2>Use:</h2><div id=\"arrow\"></div><div id='list'>" + d + "</div></div>";
			} else {
				
				invDesc= "<div id=\"inventory\"><h2>You are carrying:</h2><div id='list'>" + d + "</div></div>";
			}
			if (inv) {
				document.getElementById('rail').innerHTML = invDesc;
			
			} 
		
			
		}  else   {
				
				invText=createDeadLinks(invText);
		
				document.getElementById('rail').innerHTML = "<div id=\"inventory\" ><h2>You are carrying:</h2><div id='list'>" + invText + "</div></div>";
	
				
		}
		

		
	
	
	
	
		invText="";
	
	}
	///////////////////////////end inventory system






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
	} else {
		saveLink="<a href=\"?" + z  + "\">Save Game</a> ";
	}
	
	
	
	
	
	
	

	


	
	//create save button
	document.getElementById('meta').innerHTML = "<a href=\"?\">Restart</a> " + saveLink + createLinks(metaContent) + "<span class='fine'>Powered by <a href='http://bloomengine.com/blink' target='_blank'>Blink!</a></span>";
	
	//reset defaults
	f['giver']=0;
	f['receiver']=0;
	
	back=1;
	links=1;
	
	


	inv=1;

	if (waitSystem) {
		wait = 1;
	} else {
		wait = 0;
	}

	root=0;
	//end reset defaults
	
	
	if(firstload && !query) {
		//document.getElementById('wrap').visibility = 0;
		
		//document.getElementById('new').innerHTML=
		//document.getElementById('wrap').display='none'
		//document.write("<a href=\"javascript:startF()\">start</a> new game");
		
		toggleLayer('wrap');
		
	}
			
	

	
	if(firstload) {
		
		firstload=0;
		query=0;

	}
	
	
jsprettify.prettify();
	
	resize();
	
	
} //end process main click handler process()





///////////////////////
//functions
//////////////////////


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



window.onresize = resize;

function restore() {
	document.getElementById('title').setAttribute('id','inner');
	
	//load variables from cookie, populate f[]
	var xxx=readCookie("state");
	
	var mySplitResult = xxx.split("|");
	
	for(var i=0;i<=fname.length;i++){
	//f[fname[i]]=mySplitResult[i];
	f[fname[i]]=mySplitResult[i];
	//build(f[fname[i]]);
	//document.write(fnames[i]);
	}
	//fdc=f['node'];

	//
	////metrics ajax database. If clicking 'restore', fill the idn value from the cookie and put that value into the txtHint box
	//if (!firstload && !query) {
	//	document.getElementById('txtHint').innerHTML=f['idn'];
	//}
	
	toggleLayer('wrap');
	toggleLayer('startScreen');
	
	deadX="<h2>Restored game</h2>";
	//document.getElementByClassName('old').innerHTML+="dsfzzzzz";
	
	
	

	

	
	
	process(f['node']);
	//$.scrollTo( $('#new' ), 500 );
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
	
	document.getElementById('title').setAttribute('id','inner');
//document.getElementById('wrap').visibility = true;
toggleLayer('wrap');
toggleLayer('startScreen');

//<p><a href=\"#a\" onClick=\"$.scrollTo( $('#new' ), 500 );\">Go to bottom</a></p>
document.getElementById('content').innerHTML="<div class=\"old\"><h2>New Game</h2></div>" + document.getElementById('content').innerHTML;

//$('body').getNiceScroll().resize();

$.scrollTo( $('#new' ), 300 );
//process('start');

}


function resize()
{
	/* code to figure out width and heights for different browsers: http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
	*/
	var viewportwidth;
	var viewportheight;
	 
	 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	 
	 if (typeof window.innerWidth != 'undefined')
	 {
		  viewportwidth = window.innerWidth,
		  viewportheight = window.innerHeight
	 }
	 
	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	
	 else if (typeof document.documentElement != 'undefined'
		 && typeof document.documentElement.clientWidth !=
		 'undefined' && document.documentElement.clientWidth != 0)
	 {
		   viewportwidth = document.documentElement.clientWidth,
		   viewportheight = document.documentElement.clientHeight
	 }
	 
	 // older versions of IE
	 
	 else
	 {
		   viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
		   viewportheight = document.getElementsByTagName('body')[0].clientHeight
	 }


	
	
	//adjust size of inventory according so it shrinks and turns on scrollbars if window gets too small
		
	//document.getElementById('inventory').style.maxHeight = viewportheight - 100 + 'px';
	document.getElementById('list').style.maxHeight = viewportheight -120 + 'px';
	document.getElementById('content').style.minHeight = viewportheight - 60 + 'px';
	//alert(pageHeight());
	

	
}


//true/false on/off tester
function t(a) {
	if(f[a]==1) {
		return true;
	} else {
		return false;
	}
}

//inventory

function scroll() {
		//$.scrollTo( $('#wrap' ), 2000 );
}

function inventory(a,b) {
	if(use) {
		f['giver']=a;
		f['receiver']=b;
	}
	process(a);
}



//append text to description buffer
function build(a) {
		d = d + a;	
}

//append new text to inventory buffer
function buildInv(a) {
	invText = invText + a;
}

//append text to event buffer
function event(a) {
	e = e + a;
}

//clear description buffer and start again
function buildNew(a) {
	d = a;
}


	
function pageWidth() {return window.innerWidth != null? window.innerWidth: document.body != null? document.body.clientWidth:null;}
function pageHeight() {return window.innerHeight != null? window.innerHeight: document.body != null? document.body.clientHeight:null;}
	



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
    for( var i = 0; i < length; i++ )
    {
        element = form.elements[i]

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

  var serial = [], i, j, first;
  var add = function (name, value) {
    serial.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
  }

  var elems = form.elements;
  for (i = 0; i < elems.length; i += 1, first = false) {
    if (elems[i].name.length > 0) { /* don't include unnamed elements */
      switch (elems[i].type) {
        case 'select-one': first = true;
        case 'select-multiple':
          for (j = 0; j < elems[i].options.length; j += 1)
            if (elems[i].options[j].selected) {
              add(elems[i].name, elems[i].options[j].value);
              if (first) break; /* stop searching for select-one */
            }
          break;
        case 'checkbox':
        case 'radio': if (!elems[i].checked) break; /* else continue */
        default: add(elems[i].name, elems[i].value); break;
      }
    }
  }

  return serial.join('&');
}




/////

//story
function story() {
	

	
	
	f['moves']=Number(f['moves']); //for fixing querystring bug. Convert string back to number. Perhaps build a function for this if there's a lot of integer variables needed
	
	
	
	
	nodes();
	


///////////	
	
	
	
	//////////////////////////
	///////////debug tools////
	//////////////////////////
	

	dt = '<form id="debugForm"  action="formHandler.php" method="post">';
	
	/*
	dt += '<div class="form_block"><label>Timer: </label><input type="text" name="timer" value="1"  /></div>';
	//example markup
	*/
	
	
	//dt+='<input type="hidden" name="receivePost" value="1" />';
	
		//output flag variables	
	for (i in fname) {
		dt += '<div class="form_block"><label>'

		dt+=fname[i];
		dt+=": </label>";
		
		dt+='<input type="text" id="'
		dt+=fname[i];
		dt+='" name="';
		dt+=fname[i];
		dt+='" value="';
		dt+=f[fname[i]];
		dt+='"  />'
		dt+="</div>";
	}
	dt += '<input type="submit" class="button" />';
	dt += '</form>';
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
		document.getElementById('debug').innerHTML=dt;
	} 
	
	//////////////////////////////
	///////////end debug tools////
	/////////////////////////////	


}
