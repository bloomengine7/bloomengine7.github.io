/////////////////////////////////////
////Variables////////////////////////
////////////////////////////////////

/*
Any variables that need to be stored in save games must be put into the userVariables array. No empty spaces in the variable names! 

By default, all variables written here start off set as "0" or "false"


*/

userVariables = new Array (
		'townComment',
		'readyGoTown',
		'roseStory',
		'facePalmed',
		'booked',
		'noRoses',
		'billyWillGuide',
		'billyGoAhead',
		'haveRose',
		'treeNoRosesComment',
		'treeAwake',
		'thornOut',
		'pricked',
		'samAsleep',
		'day',
		'growledDone',
		'treeNoRosesCommentDay1',
		
		'molePeep',
		'treeStealCounter',
		'treeDeadComment',
		'goatKnowHaveRose',
		'studentHasRose',
		'samHasBook',
		'flowerGuySeenRose',
		'girlNotWant',
		'samRecharged',
		'fruitComment'
);

/*
ttd:

* rock on hinge
* f['back'] not recorded on save
* We're just passing through sam needs to say sometime.
* 

*/

/*

Please do not remove the "powered by blink" message.

If you read the comments in this source code, you will understand the basic idea of how to write a game.

I'll try to keep the comments as simple and clear as possible. If you are not already familiar with basic programming and html coding concepts, it may be helpful to google up some tutorials on the subject.

If you're already pro, forgive me if I comment on stuff that's very obvious.

Have fun making your game!
 
*/


/////////////////////////////////////
////Game Config/////////////////////
////////////////////////////////////

function config() {
	gameTitle = "A Blink Game";
	gameAuthor = "BloomEngine";
	metaContent = "{About|about} {Hints|hints}"; //goes at menu at bottom
	inventorySystem = 0; //If you don't want an inventory system in your game, set inventorySystem = 0;
	
	waitSystem = 0; //If you want a "wait" button to allow time to pass, set waitSystem = 1; If the wait system is off, it can be activated on a specific node by writing wait=1; Alternatively, if the wait system is turned on, it can be deactivated on a specific node by writing wait=0;
	
	debugMode = 1;
	
}
 





/*
 
node: A node is a chunk of descriptive text that the engine outputs. A situation. Or kind of like a page in a choose your own adventure book. 

By default the player starts at the "start" node. "blueRoom" and "redRoom" are also nodes.

In the starting location, "chair" is also a node. In the blue room, "lightSwitch" is a node.





/////////////////////////////////////
////Node variables reference:////////
////////////////////////////////////

root = 1; //make node a root location. When user clicks "back" they are taken back to the root location.

back = 0; turn off "back" button

wait = 0; turn off "wait" button. Only in that particular node. For turning it completely off throughout the entire game, use waitSystem = 0;

use = 1; activate "use" inventory mode when in a sub-node. For using objects to interact with other objects.

links = 0; deactivate all links in description but keep links within the event box active. Used when an event causes something to happen and you still want to show the description of room, but not have people interact with it. For example, if a timed event occurs, like the "lights go off", you 

inv = 0; hide inventory and wait button

*/





///////////////////////////////////////////////
//////////////Nodes////////////////////////////
///////////////////////////////////////////////

function nodes() { //Do not remove this line
	switch(f['node']) { //Do not remove this line

////
case "start":
	d+="<h2>Path to Town</h2><p>The {Mountains|mountainsFar} tower on the horizon. {Atticus|atticus} and {Sam|sam} stand on the path leading toward the <span class='go'>{town|bridge}</span>.</p>";

	if (f['billyWillGuide']) {

		d+="<p>{Billy goat|billyGoatGoUp} here **</p>";
		
	} 
	
	if (!f['townComment']) {
		f['townComment']=1;
		d+="<p><img src='i/sam_head.gif' class='left' />\"It's been a long trip. There it is.\"</div></p>";
	}
	root = 1;

	break;

	
	///
	case "atticus":
		d="<p><img src='i/atticus.gif' class='left' />Tired but sharp eyes.</p>";
		break;
	
	///
	case "sam":
		d="<p><img src='i/boy.gif' class='left' />Almost like a real boy. The seams on his joints speak otherwise.</p>";
		break;

	////
	case "townFar":
		d="<p>[image of town: river, boy by river. Mountains in the distance]</p>";
		break;
	
	
	
	///
	case "mountainsFar":
		d="<p><img src='i/town.gif' /></p>";
		break;




////
case "bridge":
	root=1;
	
	if(f['back']=="deadEndCave") {
		d+="description of the three of them returning. Goat goes off into town.";
	} else if (f['back']=="market" && f['girlNotWant']) {
		d+="Student comes storming back, carrying book.";
		f['samHasBook']=0;
	}
	d+="***<h2>Bridge</h2>";
	if(!f['studentHasRose']) {
		d+="<p>A {young man|student} sits on a rock near the bank of the river.</p>";
	}
	
	if(f['samHasBook']) {
		d+="** {sam|samReading} reading book.";
	} else if(f['girlNotWant']) {
		d+="{Sam|samEnd} stands by river.";
	}
	d+="<p>{Path to market|market} ahead.</p>";
	
	if(f['billyWillGuide']) {
		d+="<p>{Path to mountains|start}</p>";
	} else {
		d+="<p>{Path to mountains|noGoMountain}</p>";
	}
	
	d+="Tree by river. Link to bigger image. Looks similar to big tree. Comment about a lot of these trees in city. {Fruit|fruit} on tree.";
	
	break;

	
///
case "fruit":
	d+="Image of fruit.";
	if(!f['studentHasRose'] && !f['fruitComment']) {
		f['fruitComment']=1;
		d+="<p>Student comments about value of tree's fruit. Says sometimes tree has roses too. Not this season.</p>";
	}
	
	break;


///
case "noGoMountain":
	d+="No point going back there";
	
	break;

	
///
case "samEnd":
	root=1;
	d+="Well, he wanted his book back. Didn't say why. Says something oblivious. Time to move on. End";
	break;
	
///
case "samReading":
	d+="** image sam reading. Confused";
	if(!f['samReadComment']) {
		f['samReadComment']=1;
		d+="** I'm going to stick around here for a while and read. You wander if you want.";
	}
	
	break;

///
case "helpHim":
	d="[image of dog glaring at student. ] \" ";
	f['facePalmed']=1;
	break;
	

////
case "student":

	if(f['haveRose']) {
		d+="give him rose. ** He happy. Says will give to her. How can I repay you. I will give you this book. Student leaves. Sam sits down and starts reading. Dog wakes"
		f['haveRose']=0;
		f['studentHasRose']=1;
		f['samHasBook']=1;
	}
	
	if (!f['roseStory']) {
	
	
		d+="<p><img src='i/sam_head.gif' class='left' />\"Why are you so sad?\"</p><img src='i/student.gif' class='left' /><p>\"She said that she would dance with me if I brought her red roses, but in all the town there are no red roses.\"</p><p>His arms tighten around the {book|book} that he carries.</p> ";
		f['roseStory']=1;
	}  else {
		d+="<p>His brows are knitted in concentration. He clutches his book.</p>";
	}
	break;


///
case "book":
	d="<p>The cover reads: \"Book of Very Wise Words\".</p>";
	if (!f['booked']) {
		d="<p><img src='i/showbook.gif' class='left' />I've read all that that the wise men have written, and all the secrets of philosophy are mine, yet for want of a red rose is my life made wretched.\"</p> ";
		
	
		f['roseStory']=1;
	}

	
	break;

case "wretched":
	if (f['roseStory'] && !f['facePalmed']) {
			e="<p>[image of sam looking at Dog. Student talking into the air.] \"This sounds serious,\" says Hatboy. </p><p>\"The Prince gives a ball tomorrow night and my love will be of the company. If I bring her a red rose, I shall hold her in my arms and she will dance with me till dawn.\"</p><p>\"Did you hear that Dog? He can't find a red rose. We have to {help|helpHim} him.\"</p>  "
			back=0;
		}
	break;

///
case "market":
	root=1;
	d="<h1>city street Market</h1><p>{Flower Shop|flowerStand}</p><p>{River|bridge}</p><p>Path to {fountain|fountain}.</p>"
	

	if(f['noRoses'] && !f['billyWillGuide']) {
		d+="<p>{Goat|billyGoat} guy stands here.**</p>";
	}
	break;

	
	
///
case "billyGoat":
	d+="<p>**Billy goat img</p>";
	
	if(!f['billyWillGuide']) {
		f['billyWillGuide']=1;
		d+="<p>Sam asks. ** Goat guy says ok. But will cost you. No guarantees either. Meet me back at mountain pass. He walks away.</p>";
	}
	
	break;

///
case "mountains":
	root=1;
	d="<h2>Mountains</h2><p>{goat guy|goatGuy}.</p>";
	break;


///
case "goatGuy":
	d="<p></p>";
	break;

///
case "flowerStand":
	d+="<p>** rose shop</p>";
	if (f['haveRose'] && !f['flowerGuySeenRose']) {
		//sam with you.
		d+="Sam shows him rose. I don't believe it. You actually found one. I'll buy it from you. Sam refuses."
		f['flowerGuySeenRose']=1;
	} else {
		
		
		if (!f['noRoses'] && f['roseStory']) {
			d+="<p>Guy says no more roses. Only place perhaps grow is in cloud kingdom. What do you need roses for? Boy answers. Guy says talk to the goat man behind you.</p>";
			f['noRoses']=1;
		} else {
			d+="<p>Seller looks at you.</p>";
			
		}
	}
	
	break;

	
	
	

////
case "billyGoatGoUp":
	d+="<p>** well, it's good to see you. We can {make the trip|entranceCloudKingdom} now. asks for money. Greedy glint in eye. Sam gives him money</p>";
	back=0;
	break;

	
	
////
case "entranceCloudKingdom":
	root=1;
	if(f['back']=="billyGoatGoUp") {
		d+="<p>Trek description. Billy says I will wait here. If you can't find the place, then you will never find it. I will wait for a day. Come back here.</p>";
		
	}
	d+="<h2>Cloud Kingdom Entrance</h2><p>Very foggy. Lampost.";
	if(f['haveRose']) {
		d+="{Path into cave|deadEndCave}.</p>";	
	} else {
		d+="{Path into cave|cloudKingdom}.</p>";
	}
	
	if(!f['goatKnowHaveRose']) {
		d+="<p>{billy Goat|billyWaiting} waits here</p>";
	}
	
	if(f['haveRose'] && !f['goatKnowHaveRose']) {
		d="Cloud Kingdom Entrance by lampost. ** He looks at watch. Well, that was quick. Not even 5 minutes. You couldn't {get through|getThrough}, could you? Well that is not unexpected.";	
		
	}
	
	break;

///
case "getThrough":
	d+="Sam shows him rose and says we got it. Thanks for your help. \"no way\". He says. He walks into cave.";
	f['goatKnowHaveRose']=1;
	break;

	
///
case "deadEndCave":
	root=1;
	d+="Goat guy standing there. Dead end. I don't believe it. It's time to go {back to town|bridge}.";
	
	
	break;
	
////
case "cloudKingdom":
	root=1;
	if(f['back']=="entranceCloudKingdom") {
		d+="<p>** Trek description through cave</p>";
		
	} else if(f['back']=="rockTree") {
	
		d+="<p>** Atticus coming out of rock</p>";
		if (f['day']<2) {
			e+="<p>Sam waking. He looks tired. \"Well, lets see if the rose is ready.\"</p>";
		} else {
			e+="<p>Sam waking. looks very tired.</p>";
		}
		
		//reset
		f['treeStealCounter']=0;
		f['day']++;
		f['samAsleep']=0;
		f['pricked']=0;
	}
	
	d+="<h2>Cloud Kingdom</h2><p>Very foggy. {bed|bed}. {Path|tree}. {rock|rockBed}.";
	
	if (f['haveRose']) {
		d+="{Cave entrance|entranceCloudKingdom}";
	} else {
		d+="{cave entrance|leaveCloudKingdomEarly}";
	}
	
	
	
	if (f['growledDone'] && !f['day']) {
		d+="Sam ** {dreams|dream1}.";
		back=0;
	}
	
	if (f['molePeep']==1) {
		d+="<p>Mole peeps. then gone</p>";
		f['molePeep']=2;
	}
	
	break;


	
///
case "rockBed":
	if(f['molePeep']==2) { //if mole has already revealed secret path.
		if (f['samAsleep']) {
			d+="** open it up, go {down|rockTree}";
				f['treeStealCounter']=0;
				back=0;
		} else if(f['haveRose']) {
			d+="<p>Don't fiddle around with rock, says Sam. We have to get going. </p>";
		} else {
			d+="<p>No time to waste. Let's see how the rose is. says sam.</p>";
		}
	
	} else {
		d+="ordinary ** desc";
	}
	break;


///
case "rockTree":
	root=1;
	d+="<h1>Rock by tree</h1>** image atticus peeping up. tree pic. Tree can't see you.";
	if (f['day']>1) {
		d+="{senstive branch|sensitiveArea}";
	}	

	
	
	switch(f['treeStealCounter']) {
		case 0:
		d+="Rose 1** Tree pulls {red rose|treeHasRose} from branch. Holds it in his hand staring at it.";
		break;
	
		case 1:
			d="Rose 2** Tree opens up and puts it in storage. Atticus {leaves|cloudKingdom}.";
			
		break;
	
	
	}
	f['treeStealCounter']++;
	break;

	
	
///
case "treeHasRose":
	d+="** can't take it. image of it glowing bright red.";
	break;
///
case "treeSteal":
	back=0;
	d+="";
	break;
///
case "bed":
	
	if (f['pricked'] && !f['samAsleep'] && !f['samRecharged']) {
		f['samAsleep']=1;
		
		d+="** Sam goes to bed. Atticus watches him."
	} else if (f['samAsleep']) {
		d+="image of sam sleeping **";
		if(f['pricked'] && f['molePeep']!=2 && f['day']) {
			f['molePeep']=1;
		}
		if(f['haveRose']) {
			d+="sam waking up. Glad to see rose. Takes it out of Atticus's mouth. Says wants to go thank tree. Atticus tries to prevent him, but then falls asleep. Sam picks him up and puts him on his back. {Goes anyway|tree}.";
			back=0;
			f['samAsleep']=0;
			
		}
	}else {
		d+="<p>** bed image</p>";
	}
	break;

////
case "leaveCloudKingdomEarly":
	if(f['samAsleep']) {
		d+="<p>Image of atticus thinking about Sam. Can't leave.</p>";
	} else {
		d+="<p>We haven't got the rose yet, says sam</p>** ";
	}
	break;
	
	
////
case "billyWaiting":
	
	if(!f['billyGoAhead']) {
		f['billyGoAhead']=1;
		d+="<p>**Well, get a move on already.</p>";
	} else {
		
		d+="<p>** Generic billy goat image or something</p>";
	}
	break;

	
	
////
case "tree":
	root=1;
	
	///already have rose
	if(f['haveRose']) {
		d+="tree ordinary. No nore anthropomorphized";
		if(!f['treeDeadComment']) {
			d+="atticus says something about tree being dead now. Great sacrifice.";
			f['treeDeadComment']=1;
		}
	} else {
		
		
		/// day 0
		if (!f['day']) {
			if(f['treeAwake']) {
				d+="<h2>Tree</h2> ** <p>{Tree|talkTree} awake image</p>  {bruised bark|sensitiveArea}";
				if (f['thornOut']) {
					d+="<p>** {Thorn|thorn} out.</p>";
				}
			} else {
				d+="<h2>Tree</h2> ** <p>Tree alseep image. {bruised bark|sensitiveArea}.</p>";
			}
		}
		
		/// day 1 - Sam already pricked once
		else if (f['day']==1) {
			d+="<h2>Tree</h2> ** <p>{Tree|talkTree} awake image. Looks younger.</p>  {bruised bark|sensitiveArea}";
		
		
			if (f['thornOut']) {
				d+="<p>** {Thorn|thornDay1} out.</p>";
			}
		}
		
		
		////day 2 - sam pricked twice already
		else if (f['day']==2) {
			d+="<h2>Tree</h2> ** <p>{Tree|talkTree} tree day 2 awake image. Looks younger.</p>  {bruised bark|sensitiveArea}";
		
		
			if (f['thornOut']) {
				d+="<p>** {Thorn|thornDay1} out.</p>";
			}
		}
		else {
			d+="<h2>Tree</h2> ** <p>{Tree|talkTree} tree day 2+ awake image. Looks younger.</p>  {bruised bark|sensitiveArea}";
		
		
			if (f['thornOut']) {
				d+="<p>** {Thorn|thornDay1} out.</p>";
			}	
		}
	}
	d+="<p>Path back to {bed|cloudKingdom}.</p><p>Rocks</p>";
	
	break;

	
////
case "thorn":
	if (!f['pricked']) {
		d+="Atticus growls at tree. ** Sam pricks his finger. Feels tired. Tree says go rest. Come back and hopefully you will have red rose."
	
		f['pricked']=1;
		f['samRecharged']=0;
		f['thornOut']=0;
	} else {
		d+="image of thorn.";
	}
	break;

	
////
case "thornDay1":
	if (!f['pricked']) {
		d+="Atticus growls at tree AGAIN day 1. ** Sam pricks his finger. Feels tired. Tree says go rest. Sam walks away. Come back and hopefully you will have red rose."
		f['samAsleep']=1;
		f['pricked']=1;
		f['thornOut']=0;
	} else {
		d+="image of thorn.";
	}
	break;	

////
case "talkTree":
	switch(f['day']) {
		default:
		if (f['samAsleep']) {
			d+="Atticus growls at tree. Tree ignores him. **";
	
			f['growledDone']=1;
			
		} else {
			if (!f['treeNoRosesComment']) {
				f['treeNoRosesComment']=1;
				d+="<p>** Sam says he needs rose. tree tells story cold winter, No roses. He's old. SAm says must be way. This is for true love. Only one way to produce red rose, says tree. Thorn comes out. You must prick yourself on this thorn.</p>";
				f['thornOut']=1;
			} else if (f['pricked']) {
				d+="** tree tells sam to rest";
				//adjust this according to day. **
			} else {
				d+="Tree shakes his head. You must prick your finger for me to make a red rose";
				//adjust this according to day. **
					f['thornOut']=1;
			}
		}
			break;
	

		//pricked once
		case 1:
			
			if (f['samAsleep']) {
				d+="Atticus growls at tree. Tree ignores him. **";
		
				f['growledDone']=1;
				
			} else {
				if (!f['treeNoRosesCommentDay1']) {
					f['treeNoRosesCommentDay1']=1;
					d+="**  Sam says how long have I been asleep? Tree says don't know. Time is different here. shows white rose. Not done yet. Need to prick again.</p>";
					f['thornOut']=1;
					
				} else if (f['pricked']) {
					d+="** tree tells sam to rest again. Day1. Sam walks away.";
					
				
						f['samAsleep']=1;
				
				} else {
					d+="You must prick your finger again for the rose to become truly red.";
					f['thornOut']=1;
				}
			}
			break;
		
		//pricked twice
		case 2:
			if (f['samAsleep']) {
			d+="Atticus growls at tree. Tree ignores him. **";
	
			f['growledDone']=1;
			
		} else {
			if (!f['treeNoRosesCommentDay1']) {
				f['treeNoRosesCommentDay1']=1;
				d+="**  Sam says how long have I been asleep? Tree says don't know. Time is different here. shows white rose. Not done yet. Need to prick again.</p>";
				f['thornOut']=1;
				
			} else if (f['pricked']) {
				d+="** tree tells sam to rest again. Day2. Sam walks away.";
				
			
					f['samAsleep']=1;
			
			} else {
				d+="You must prick your finger again for the rose to become truly red.";
				f['thornOut']=1;
			}
			break;
	

	
	
	
	
		}
		
		
	
	}
	
	break;

	

	

	
	
////
case "sensitiveArea":
	if(f['root']=="rockTree") {
		d+="Atticus rushes out and steps on sensitive area. ** tree drops {rose|catchRose}";
		back=0;
	} else {
		if(f['treeAwake']) {
			if(!f['samAsleep']) {
				d+="** sam: better not cause him any more pain.";
				
			} else {
				d+="** Don't touch that! says tree.";
			}
		} else {
			f['treeAwake']=1;
			d+="<p>Tree wakes up. Shouts in pain. Says something about termites.</p>";
		}
	}
	
	break;

	
///
case "catchRose":
	d+="<p>** image of atticus jumping and grabbing it. He runs away. Tree angry. SAys something about you humans know nothing. I have lived thousands of years. My offspring are spread throughout the city. Dog back to {sam|cloudKingdom}.</p>";
	f['haveRose']=1;
	back=0;
	break;

/////
case "dream1":
	root=1;
	d+="** Atticus lays down by bed and sleeps. dream 1 - Sam sees father. or some backstory.";
	d+="** Sam {wakes|cloudKingdom} up";
	f['samRecharged']=1;
	f['pricked']=0;
	f['samAsleep']=0;
	f['day']=1;
	break;
	
////////
case "fountain":
	root=1;
	d+="<p>** fountain</p> university in background.";
	d+="<p>{path to market|market}</p>";
	
	if(f['studentHasRose'] && !f['girlNotWant']) {
		d="Student talking to {girl|girl} **";
	}
	
	break;

///
case "girl":
	d+="It doesn't match. Boy throws {rose|roseCart} down. Ungrateful. They walk apart."
	f['girlNotWant']=1;
	
	break;

	
///
case "roseCart":
	d+="<p>Cart runs it over. Image of it completely broken.</p>";
	break;
/////////
case "hints":
	metaNode=1;
	d="<h2>hints</h2><p>hint info.</p>";
	
	break;


		
/////////
case "about":
	metaNode=1;
	d="<h2>About</h2><p>Demo info.</p>";
	
	break;


///////
case "iPurse":
	d+="<p>just an ordinary purse.</p>";
	break;


///////
case "iMenu":
	d+="<p>just an ordinary menu.</p>";
	break;




///////In case you link to a nonexistent node, then this error message will appear
default:
	d = "Error";
	break;
	}
	
	
} //////do not remove this bracket




/////////////////////////////////////
////Inventory////////////////////////
////////////////////////////////////

function includeInv() {


	invText="<div id='objects'><ul>"; //do not erase

	//put all inventory items that can potentially be picked up into this area. Put each item into a <li></li> tag.
	
	if (f['haveBall']) {
		invText+="<li>{Ball|iBall}</li>";
	}
	




	invText+="</ul></div>";	//do not erase
}





/////////////////////////////////////////
//Object Interactions////////////////////
/////////////////////////////////////////

/*
  
this stuff is WIP. If you can figure it out, use it. I will document it better shortly.

*/

function interactions() {

	var end;
	
	if (f['giver']=='iPurse' && f['receiver']=='box1') {
		d+="Ppurse doesn't like it. Not a good use of purse.";
		end=1;
	}
	
	
	if (!end) {
		
		if(f['receiver']=="box1") {
		
				 
			switch(f['giver']) {
				case "iMenu":
				
					
					d+="<p>You request a sandwich. He nods and takes the menu.</p>";
					
	
					
				break;
			
				default:
				d+="<p>Doesn't go in box.</p> ";
				break;
				
			}
		} else if(f['receiver']=='cat') {
			
			switch(f['giver']) {
				case "invMouse":
					d+="It plays with the mouse";
				break;
			
				default:
				d+="It doesn't seem interested. Cats are that way sometimes. ";
				break;
				
			}
		} else if(f['receiver']=='start2') {
			switch(f['giver']) {
				default:
					d+="start 2 doesn't want it";
					//build("Start2 doesn't want it");
			}
		} else if(f['receiver']=='start3') {
			switch(f['giver']) {
				case "invApple":
					//noBack=1;
					d+="it eats the {apple|start} sdfdsf sdsd f dsfd sdfdsf sdsd f dsfdfsdfsfsdfs";
					break;
				
				case "invOrange":
					
					d+="IT doesT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangeT doesn't want orangen't want orange";
					break;
				
				default:
					d+="It doesn't want it";
					//for (i in fname) {
					//	build(fname[i]) + build(": ") + build(f[fname[i]]) + build("<br>");
					//}
			}
		
		}
		
	}	
}
/////end interactions
