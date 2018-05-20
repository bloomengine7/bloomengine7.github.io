//////////////////////////////////////
////Variables////////////////////////
////////////////////////////////////
/*
Please do not remove the "powered by blink" message.

If you read the comments in this source code, you will understand the basic idea of how to write a game.

If you are not already familiar with basic javascript and html, it may be helpful to google up some tutorials on the subject.

Have fun making your game!




/////////////////////////////////////
////Variables////////////////////////
////////////////////////////////////

/*
Any variables that need to be stored in save games must be put into the userVariables array. No empty spaces in the variable names! 

By default, all variables written here start off set as "0" or "false"

You DO NOT need to put inventory item variables into this array. 
*/


userVariables = [
    "timers",//don't touch
    "talk",
    "reward",
    "dorm_closet_open",
    "dorm_privacy_mode",
    "default_no_node",
    "blue",
    "testa",
    "test_sq",
    "blue",
    "dorm_poster_april",
    "timer_classroom_kas_note",
    "seen_poster_fail",
    "seen_behind_poster",

];

inventoryTypes = [
	//["object", "Objects"],
	["thought", "Thoughts"],
    //["blah","Blah"]
/*	["location", "Locations"] */
];

meta_labels = {
    "restart": "Restart",
    "save": "Save Game",
    "menu": "Menu",
    "inventory": "Thoughts:",
    "use": "Use:"

}

/////////////////////////////////////
////Game Config/////////////////////
////////////////////////////////////

function config() {

	gameTitle = "Arcadia Heights";
	
	gameAuthor = "Hadrian Li | Bloomengine";
	
	//goes at menu at top
	metaContent = "{About|about}<a href='http://Bloomengine.com' target='_blank'>bloomengine.com</a>"; 
	
	//If you don't need an inventory system, write inventorySystem = 0;
    inventorySystem = 1; 
	
	//If you want a "wait" button to allow time to pass, set waitSystem = 1; If the wait system is off, it can be activated on a specific node by writing wait=1 within the node; Alternatively, if the wait system is turned on, it can be deactivated on a specific node by writing wait=0; The option to wait is only available in root nodes.
	//waitSystem = 1; 
	
	debugMode = 1; //Change this to 0 before you release your game. These are debug tools that appear on the left side. 
		
}
 





/*
 
node: A node is a chunk of descriptive text that the engine outputs. A situation. Think of it as a page in a choose your own adventure book. 

By default the player starts at the "start" node. 

/////////////////////////////////////
////Node variables reference:////////
////////////////////////////////////

root = 1; make node a root location. When user clicks "return" they are taken back to the last visited root node.

parent = [name of a node]; When the user clicks "return" they will be taken back to the node specified as parent instead of the root node.

back = 0; turn off "return" button

wait = 0; If the wait system is on, it will turn off "wait" button (Only in that particular node). For turning it completely off throughout the entire game, set waitSystem = 0 in the game config function above.

use = 1; activate "use" inventory mode when in a sub-node (This can only be used on a node that is NOT a root node). This is for allowing use of objects to interact with other objects.

links = 0; deactivate all links in description but keep links within the event box active. Used when an event causes something to happen and you still want to show the description of room, but not have people interact with it. 

inv = 0; hide inventory and wait button

*/



function set_starting_variables() {
    f.reward_counter = 5;
}

var reward=0;

function timers() {

    var array = []; 
    

    if (f.timers && f.timers.indexOf(',') > -1) { //if more than one counter, then break it up and put into array
        array = f.timers.split(',');

    } else {
        array[0] = f.timers;
    }

    array.forEach(function(element) {

        if(!exist(f[element])) {
            f[element] = 0;
        }
        f[element]++;    
        console.log(element + f[element]);
    });

}
function daemon() {
//refers to global f array and global variable reward
//
//

    timers();

    




    if (parseInt(f.reward)<1) {
        f.reward = 0;
        reward = 1; 
    } else if (parseInt(f.reward) > 0 && f.node != f.root) {
        f.reward -= 1;
        reward = 0;
        console.log('in here');
    } else {
        reward=0;
    }
    console.log("f.rwd: " + f.reward);
    console.log("reward: " + reward);
    //if (reward) { console.log('reward'); }
    //console.log(reward);    
}
///////////////////////////////////////////////
//////////////Nodes////////////////////////////
///////////////////////////////////////////////

function nodes(node) { //Do not remove this line
	switch(node) { //Do not remove this line
   
	
	

////
case "start": //aka caf
	root=1;
        d+="Yourzzzzz name is Susan Newbourne.\nThese are your high school memories:\n{Dormitory|dorm}\n{Classroom|classroom}";
        if (i.informer) {
            d+="\n{Washroom|meeting_washroom_stall}";
        }
        if (i.sinatra && !f.gc_discovered_sinatra && !f.gc_discovered_nothing_important) {//if player has already seen success and failure of holding back information. Learned the concept of how to conceal important information
            d+="\n{Guidance Counselor|counseling_booth}"; 
        }
        d+="\n{Cafeteria|caf}";
        d+="\n{Jump file main|story.js}";

break;
case "dorm":
    root=1;
    scene_change("Kasparov");    
    
    if (f.back == "stand_on_toilet" && !f.dorm_privacy_mode) {
        d+="<div class='transition'>As you step away from the toilet, the scene beyond the glass wall resolves to high-resolution. \"Privacy mode disabled,\" appears on the wall. \"Time deducted from your daily quota.\"</div>";
    }
    d+="Three {walls|dorm_walls}, a floor and ceiling of concrete. One wall of {glass|dorm_glass}. Outside, a {large courtyard|dorm_outside}. In the corner is a {bed|dorm_bed} and a {desk|dorm_desk}. In the other corner is a {toilet|dorm_toilet} and sink. ";

    //d+=seq("test_sq", ["sqfirst","second","third"],1);
    d+=exit_memory();
    //d+=oneoff("oneoff","","oneoff");
break;




case "dorm_desk":
    d+="A metal slab extending out of the wall. On it is an tattered {notebook|dorm_notebook} and {pen|dorm_pen}. A cube-shaped stool lies tucked underneath the desk.";
break;
case "dorm_notebook":
    d+="The pages are plastic and slippery to the touch. At the bottom outer corner of each page is a watermark of the " + oneoff_link("Ephemera logo|eph_logo") + ". Printed on the pages are {questions|dorm_notebook_questions} and a space to write answers.";  
break;
case "eph_logo":
    d+="The initials EPH inside a square. ";
break;
case "dorm_notebook_questions":
    d+='\"Explain in your own words how the Heisenberg Uncertainty Principle relates to the Spectre Drive.\" Scrawled underneath is your '
    d+= oneoff_link("answer|dorm_notebook_answer") + ".";

break;
case "dorm_notebook_answer":
    d+="The math bores you. You've never revealed how effortless it has become. Layered underneath your writing are faint impressions other peoples answers. They are mostly unreadable, but some {writing and drawings|dorm_notebook_doodles} become visible when you angle the page in the light. ";
break;
case "dorm_notebook_doodles":
    d+="Cartoons and vestiges of graphs and equations. "; 
break;
case "dorm_pen":
    d+="Cartoonishly large and heavy, embossed with the {Ephemera logo|eph_logo}. ";
break;
case "dorm_bed":
    d+="A futon on a raised slab of concrete.";
break;
case "dorm_poster":
    d+="A life-sized and faded picture of "
    
    d+=oneoff_link("April Thursday|dorm_poster_april_oneoff");
    d+=" with fist raised in the air, as if punching something invisible. Her other hand holds a microphone. She wears a customized school uniform: flared sleeves, skirt shorter than standard issue. On her wrists are "; 
   
    if (f.dorm_poster_spiked_bracelets_edgy_seen || f.reward) {
        d+="spiked bracelets. ";
    } else if (!f.reward) {
        d+="{spiked bracelets|dorm_poster_spiked_bracelets}. ";
        //d+=v("dorm_poster_spiked_bracelets", ["spiked bracelets. ", "{spiked bracelets|dorm_poster_spiked_bracelets}. "]);

    }

    d+="Overlaid on the picture in distressed bubble typeface: April Thursday Live at Arcadia Heights, Ward C. ";
    //overlay(["Sponsored by Faculty","It was a good concert","Wasn't it, Suzy?"],1000);
    //
        d=sq("dorm_poster_april", [d, "You don't know when it was. You only have fragments. You remember the gymnasium shuddering from the noise of the performance. Afterwards, a cleanup crew. Posters strewn like dead leaves on the ground. ", "The days after the concert, you had watched them taking down the posters. It dawned on you to take one of the big ones. They never suspected anything."], 1);
        d+="\n\nOne {corner|poster_corner} of the poster curls slightly. ";
break;

case "dorm_poster_april_oneoff":
    d+="You can't stand the sight of her. ";
break;
case "poster_corner":

    if (f.seen_behind_poster && f.seen_poster_fail) {
        d+="You first touch the panel to first open the closet. The words \"Privacy mode enabled\" form on the glass wall. \n\n";
        f.dorm_privacy_mode = 1;
    } else if (!f.dorm_privacy_mode) {
        d+="<em>Not yet. They can see you.</em> ";
        f.seen_poster_fail = 1;
    }
    if (f.dorm_privacy_mode) {
        f.seen_behind_poster = 1; 
        d+="You lift up the poster. Thousands of tally marks are scratched in the space behind it. At the bottom are the words: \"Find Kasparov.\" ";
        i.kasparov=1;
        if (f.poster_sinatra) {
            d+="In smaller letters: \"Talk to Sinatra. Janitor.\"";
            i.sinatra = 1;
        }
    } 
    
break;
case "dorm_poster_spiked_bracelets":
    d+="Edgy but within dress code. ";
    f.dorm_poster_spiked_bracelets_edgy_seen = 1;
break;
case "dorm_poster_april":
        d+="There was a time you liked her music. Now you can't stand the sight of her. ";
       /*d+=v("dorm_poster_april", ["You can't stand the sight of her. ", "Posters and flyers had been pasted everywhere. After the concert, they eventually peeled off, left on the ground like dead leaves. ", "After the concert, you asked for one of the bigger posters from the walls of the cafeteria. They never suspected anything."], "stop");
        *
        * *
        */
break;
case "dorm_toilet":
        d+="A cube with a hole set into the floor. There are two ";
        
        
         
        
        if (f.dorm_privacy_mode) {
            d+="grooved areas";
        } else {

            d+="{grooved areas|stand_on_toilet}";
        }
        d+=" for you to place your feet. The toilet attaches to a taller rectangular column which serves as a sink. ";
    break;

case "stand_on_toilet":
        d+="You step near the toilet and a chime sounds. The glass wall pixellates and the words: \"Privacy mode activated,\" appear on the wall. A timer appears, counting minutes, seconds and milliseconds.";

    break;

	case "dorm_walls":
        d+="Weathered and scarred with tiny pockmarks. A  {poster|dorm_poster} hangs on the wall. Next to it is a {panel|dorm_closet} and closet door.\n"

        //d+= vr("blue",["dft","dog", "cat"], 5, 4,"stop");

    break;

        case "dorm_closet":
            if (f.dorm_closet_open) {
                    d+="School uniforms hang on a rack. Other clothes and articles are placed in shelves.";
                    d+="<li>{Close closet|close_dorm_closet}</li>";
                    
            } else {
                d+="You touch the panel and the closet door slides open. Inside, school uniforms hang neatly on a rack. Other clothes and articles are placed in shelves. \n\nA chime sounds and the words: \"Privacy mode activated,\" form on glass wall behind you. A digital counter appears, with minutes and seconds counting down. The scene outside {pixellates|dorm_glass_pixellate}.\n\n";

                if(!f.value_privacy) {
                    items = [
                        20000,
                        function() {

                            $("#owrap").show().removeClass().addClass('fct');
                            $("#oc").show();
                        },20,
                        function(){
                            $("#oc").html("We value your privacy.");
                        },500,
                        function() {

                            $("#owrap").hide();

                     
                        },10
                    ];

                    timer(items);
                    f.value_privacy = 1;
                }
                f.dorm_closet_open = 1;
                f.dorm_privacy_mode = 1;
            }
        break;
        case "close_dorm_closet":
                 d+="You close the closet. A chime sounds and words appear on the wall: \"Privacy mode disabled. Time deducted from your daily quota.\" \n\nThe {world outside|dorm_outside} resolves to a higher resolution.";
                f.dorm_closet_open = 0;
                f.dorm_privacy_mode = 0;

        break;
        case "dorm_glass_pixellate":
            d+="Beyond the glass, you can make out shapes and colors, but everything lacks definition.";

        break;
    //
    //
    //
    //
    case "dorm_glass":
        d+="Tall panes of glass, connected at each corner by metal clasps. The glass reaches from floor to ceiling, offering a full view of the {outside|dorm_outside}. One of the panes has a metal handle, doubling as a {door|open_dorm_door}. "
    break;

/*
        case "dorm_door":
            d+="A metal handle is fused to the glass. \n<li>{Open door|open_dorm_door}</li>";
        break;
*/
        case "open_dorm_door":
                    d+=sq("open_dorm_door", ["You pull on the handle, the door catches on a latch. A chime sounds. Words form on the glass: \"Currently it is quietstudytime, student Susan Newborne. Do not attempt to leave your dormitory.\"", "You tug on the handle. Words form on the glass wall: \"Currently it is  quietstudytime, Susan Newborne. This incident will be noted.\"", "The door catches on a latch and refuses to open. "]);
        break;

        case "dorm_outside":

            /* example of a transition if (f.back=="dorm_glass") {
                d+="<div class='transition'>you push through the door </div>";
            } */
            if (f.dorm_privacy_mode) {

                d+="A pixellated and blocky view of the courtyard outside. ";
            } else {
                d+="Beyond the glass, a {tower|panopticon_tower} stands in the center of a circular {yard|panopticon_yard}. A curved wall made of thousands of {dormitory rooms|view_of_other_dorms} forms a ring around the tower. The rooms stack on top of each other, open to view like the interior of a dollhouse. A narrow walkway connects each room. At intervals, ";
                
               d+=v("dorm_view_escalators", ["escalators", "{escalators|dorm_view_escalators}"],"stop");
                
               d+=" connect the different levels. \n\nShafts of light fall from {above|dorm_outside_above}.";



                if(!f.panopticon_popup) {
                    items = [
                        500,
                        function() {
                            $("#oc").html("Panopticon");
                            $("#owrap").show().removeClass().addClass("std");
                        },500,
                        function() {

                            $("#owrap").hide();
                            
                     
                        },10
                    ];

                    timer(items);
                    f.panopticon_popup=1;
                }

                
            }
            
            d+=bk('dorm');
           //d+="<p class='back'>{Return|dorm}</p>"; 

        break;
        case "dorm_view_escalators":
            d+="They cycle slowly, waiting for someone to step onto them. ";
        break;
        case "panopticon_yard":
            d+="Astroturf recedes into the distance. ";
        break;

case "view_of_other_dorms":
    d+="Students sit at their desks, studying. Some lie on their beds, reading. Some are on the toilet and pixellated. ";

break;


case "panopticon_tower":
    d += "White and red, like a lighthouse. Near the top is a ring of {spotlights|spotlights}. Above them, a {orb|panopticon_dome} of ink-black glass. ";

    
break;

case "panopticon_dome":
    d+="The eye of the panopticon. ";
break;

case "spotlights":
    d += "Frozen in various positions. ";
break;

case "dorm_outside_above":
    d+="A tangle of structural supports and catwalks. Higher up is a domed ceiling painted with clouds and blue sky. Light seeps through {narrow windows|dorm_outside_dome_windows}.";


break;


                case "dorm_outside_dome_windows":
                    d+="Tall and narrow like " + oneoff_link("cathedral|windows_cathedral") +
                    " windows. The outside is fragmented and golden milky, lacking definition."        
                break;


                case "windows_cathedral":
                    d+="You learned about Cathedrals in History class. Flying buttresses. Stained-glass windows. Ceilings painted with clouds, stars, and rocketships. They made high ceilings because people wanted to reach for the stars to find aliens. All of this was covered last exam.";

/*
                    items = [
                        50,
                        function() {

                            $("#owrap").show().removeClass().addClass("fct");
                            $("#owrap").css('opacity','0');
                            $("#owrap").animate({opacity: 1},300).delay(2000);
                            $("#oc").css('opacity','0');
                            $("#oc").html("Ancient centers of learning");
                        },300,
                        function(){
                            $("#oc").animate({opacity: 1},250).delay(2000).animate({opacity:0},250);
                        },2500,function(){
                            $("#oc").css('opacity','0');
                            $("#oc").html("Rising like mushrooms after the rain");
                            $("#oc").animate({opacity: 1},250).delay(4000).animate({opacity:0},250);
                        },4500,function(){
                            $("#oc").css('opacity','0');
                            $("#oc").html("Freeing us from the stone age");
                            $("#oc").animate({opacity: 1},250).delay(4000).animate({opacity:0},250);
                        },4500,
                        function() {

                            $("#owrap").animate({opacity: 0},250).delay(2000).animate({opacity:0},250);
                        }, 2500,
                        function(){
                            $("#owrap").hide();
                     
                        },10
                    ];

                    timer(items);
*/

                break;
    ////
    //
    //
    //

case "classroom":
    root=1;
    if(i.kasparov && f.back=="start") {
        f.classroom_note_kas=0;
        scene_change("The Message"); 
//        timer_init("classroom_note_kas", 3);
    }
    f.classroom_note_kas++;
    
    d+="{Ms. Heinrich|classroom_teacher} stands in front of a {whiteboard|classroom_whiteboard}, voice {droning|classroom_droning} hypnotically. {Students|classroom_students} sit at their {desks|classroom_desks}.";
    if (f.classroom_note_kas==4 && i.kasparov) {
        d="Someone taps your shoulder. You turn and the girl behind you passes a small folded {note|classroom_note_kas_passed} with your name on it. ";
        back=0;
    }
    d+=exit_memory();
break;

case "classroom_note_kas_passed":
    d+="She returns to cleaning her manicured nails. Not her. She's just a conveyor. You search the other faces behind her. They are unreadable. \n\nYou unfold the {note|classroom_read_note}. ";
    back=0;
    break;

case "classroom_read_note":
    d+="\"I have info about K. Meet at lunch. Washroom near cafeteria, third stall. Destroy this note.\" \n\nYou crumple the note. Feigning a yawn, you put it in your mouth and eat it. ";
    i.informer = 1;
break;
case "classroom_desks":
    d+="Undersized one-piece affairs. Clean angles of metal and glass. Chair and desk fused together. ";

    if (!f.classroom_desk_graffiti) {
        d+="There is some {graffiti|classroom_desk_graffiti} scratched on yours. ";
    }
break;
case "classroom_desk_graffiti":
    d+="\"Suzy + {Thomas|classroom_thomas}\" inside a heart pierced by an arrow. ";
    f.classroom_desk_graffiti = 1;
break;

case "classroom_thomas":
    d+="You glance over at Thomas. A vacant stare and his thumb is still in his mouth. You didn't find it amusing when they put that on your desk. ";
break;


case "classroom_teacher":
d+="She wears a grey power suit and has a large monitor for her head. Her expression is usually a smiling emoticon, sometimes interrupted by the flicker of a word or phrase. She had the habit of doing that to stress an important point. ";
break;

case "classroom_droning":
        z = "Most of her time is spent with her back facing the students, speaking into the whiteboard. "; 
        d+=sq("heinrich_talk", [z, '"Who can explain to me the Heisenberg Uncertainty Principle?" she says. The words "Heisenberg", "Uncertainty" and "Principle" flash in rapid succession on her face. ', 
    '"How does the collapse of the wave function affect the Spectre fold?" A long pause. "Anyone?" You find yourself looking out the {windows|classroom_windows}. ', z]);

break;

case "classroom_windows":
d+="The glass distorts the outside. A pulsating milky white. You squint from the brightness. ";


break;


case "classroom_whiteboard":
d+="A jungle of of math equations. Her arm is a blur of motion and the " + oneoff_link("marker|classroom_teacher_pen") + " squeaks like sneakers on a gynasium floor. ";
break;

case "classroom_teacher_pen":
d+="Ephemera Brand. Ink flowing freely. It looks oversized, even in her  metal hands. ";
break;

case "classroom_students":
d+="Some doodle in their notebooks. Some cast eyes at each other, passing "; 

if(f.sticky_love_notes=="x") {
    d+="notes";

} else {
    d+="{notes|classroom_notes}";
}
d+=". ";
//d+= oneoff("notes|classroom_notes") + " when Ms. Heinrich's back is turned. ";
    d+=v("classroom_students", ["", "In the back row, a student wears his {jacket|classroom_turncoat} flipped inside out. ",  "Some  have a side of their shirt untucked. Still within dress code. \"Three deviances allowed\", says the student handbook. ", "Some girls have their skirts {awkwardly bunched|classroom_skirts_bunched} at their waist. Rolled several times to show more leg. Still within dress code. "], "stop");


break;

case "classroom_skirts_bunched":
    d+="Rolled several times at the waist to show more leg. Still within dress code. ";
    break;
case "classroom_turncoat":
    d+="A member of the Chess Club. Hair clipped extremely short. Blue scarf. Socks pulled over his pants. ";
break;

case "classroom_notes":
d+=sq("sticky_love_notes", ["Mostly poetry on sticky notes. Professions of love, written in code. The Dorabella Cipher has been all the rage recently. Not that the teacher's couldn't crack it. Not that they cared to. ", "The ink would disappear in a few days. They would probably break up by then too. ", "You're often a conveyor. You've never had the desire to give or receive a note. "]);

break;


////                                       
case "mean_girl_washroom":                 
d+="<p>She taps her foot.</p>";           
if (!f.all_wet) {                          
	use=1;                                 
                                           
} else {                                   
	d="<p>The girls hold their stomachs laughing. The redhead is expressionless, her eyes bore into you.</p>";
}                                          
if (f.giver) {                             
	switch (f.giver) {                     
		case "boy":                        
			if (!f.genius_comment) {       
				d="<p>\"Yes genius. Kevin. You're new here so I'll explain how things work.\" You step back as she leans in. The other girls grasp your arms, forcing you into her face. \"You do not talk to him.\" She holds her gaze then raises her hand to touch your hair, examining the split-ends. \"I like your hair. There's something about it--\" She takes the gum out of her mouth and mashes it into the strands.</p>";
				i.gum_hair=1;              
				f.genius_comment=1;        
			} else {                       
				d="<p>She rolls her eyes.</p>";
			}                              
		break;                             
		                                   
		                                   
		case "friend":                     
			d="<p>\"You have no friends.\"</p>";
		break;                             
		                                   
		case "gum_hair":                   
			if (!f.gum_comment) {          
				d="<p>\"It suits you.\"</p>"
				f.gum_comment=1;           
			} else {                       
				d="<p>She ignores your comments.</p>";
			}                              
		break;      

		case "ornament":
		case "cell_phone":
			d="<p>She avoids looking at it, waving it away.</p>";
		break;

		
		case "yourself":  		
			d="<p>\"Amnesia. That's Gold Suzy. The stuff you say.\"</p>";
		break;
		
		default:                           
			d="<p>She rolls her eyes.</p>";
	                                       
	                                       
	}                                      
                                           
}                                          
break;                                     

case "meeting_washroom_stall":
    root=1;
    scene_change("The Informer");    
    if (f.back=="start") {
        //f.washroom_informer_arrive = "0";
       i.washroom_informer_pogs = 1;
       f.washroom_informer_paid = 0;
       f.informer_in_washroom = 0;
       f.washroom_informer_arrive = 0;

       f.washroom_informer_theft = 0;
       f.washroom_informer_kasparov = 0;
       f.washroom_informer_sinatra = 0;
       f.washroom_informer_random_checks = 0;
       f.washroom_informer_ss = 0;

    }
    d+="You sit on the toilet with the seat lid lowered. ";
    if (!f.washroom_informer_paid) {
        d+="In your lap is a bag of {pogs|pogs_game}. ";
    }
    if (f.meeting_washroom_stall_graffiti != "x") { 
        d+="{Graffiti|meeting_washroom_stall_graffiti} ";
    } else {
        d+="Graffiti ";
    }
    d+="covers the stall walls and door. The "; 
    d+=oneoff_link("washroom|meeting_washroom_quiet") + " smells of disinfectant. ";
    timer_init("washroom_informer_arrive", 5);


    if (f.informer_in_washroom == "x") {
        d+="The space underneath the stall is {empty|informer_gone}.";
    } else if (f.washroom_informer_paid) {
        d+="{Shoes|washroom_informer_desc} peek from under the stall door. ";        
        //informer_interactions();
    }

    if (timer_fin("washroom_informer_arrive")) {
        d="Footsteps. Feet appear beneath the stall door. \"{Payment|pay_informer},\" she says. \"Then information.\" She speaks with a practiced and raspy voice. They were always for theatrics. ";
        f.informer_in_washroom = 1; 
        back = 0;

        
    } else {

        d+=exit_memory();
    } 

    done_talking(tmp);
    break;

case "informer_gone":
    back = 0;
    i.informer=1;
    d+="The informer has slipped away. You open the stall door and {step outside|washroom_main}.";
break;

case "washroom_informer_desc":
  
 
    d+="Your informer stands on the other side, waiting in silence. ";


    //conversation example
    //

    
    var tmp = {
        "washroom_informer_theft":
            {d:"Theft", o:"\"We don't know what they stole. We only heard mention of a theft.\"",v:1},

        "washroom_informer_kasparov":
            {d:"Kasparov", o:"\"We've given you what you paid for. Don't expect us to dig for more. There's been word of enhanced interrogation if the name escapes anyone's lips.\" ",v:1},
      
        "washroom_informer_sinatra":
            {d:"Janitor who saw Kasparov", o:function() {
                d+="\"His name is Sinatra. A few test tubes short of a science experiment. Be discreet. He may be watched. If you are questioned about any of this, remember the best lie is to tell the truth. Not the whole truth.\" ";
                f.poster_sinatra=1; 
                i.sinatra=1;
                
            },v:1},
     "washroom_informer_random_checks":
            {d:"Random security checks", o:"\"Carry your student ID with you. Have your transit documents in order. Or hire a good forger.\" "},
 
        "washroom_informer_ss":
            {d:"School Security",o:function(){
                console.log('heyeea');
                f.washroom_informer_random_checks = 1; 
                d="\"You've seen it. More random checks and more guards. They don't want to broadcast it, but they're casting a wide net.\" ";
                i.ss=1;
                //back=0;
            },v:1}

/*
        "test_node_conv":
            ["test node conv", function() {
                d=initNode("test_node_conv");
                setTimeout(function(){process("test_node_conv");},1000)
                }
            ,1]
 */           
    };
     
   talk(tmp);
    //convo_1();
    /*
    d+="<div class='convo'>"; 

    if (!f.convo_sub_branch) {
        d+="<li>{convesation sub branch|convo_sub_branch}</li>";
    }
    d+="</div>";
    */
    if (done_talking(tmp)) {
        f.informer_in_washroom = "x"; 

    } 
    
/*
    if (!f.washroom_informer_kasparov) {

        d+="{Kasparov|washroom_informer_kasparov}";
    }

    if (!f.washroom_informer_sinatra) {
        d+="{Sinatra|washroom_informer_sinatra}";
    }
*/


/*
    if (!f.washroom_ss) {
        d+="{School Security|washroom_ss}";
    }
    if (!f.washroom_informer_network) {
        d+="{Informer Network|washroom_informer_network}";
    }

    */
break;


case "convo_1":
    f.convo_1=1;
    d+="description1";
    convo_1();
break;

case "convo_2":
    f.convo_2=1;
    d+="description2";
    convo_1();
break;

case "convo_3":
    f.convo_3=1;
    d+="desc3";
    convo_1();
break;


case "convo_sub_branch":
    f.convo_sub_branch = 1;
    d+="starting words";
    var tmp2 = {

        "1washroom_informer_kasparov":
            ["1Kasparov", "sddssdsd",1],
      
        "1washroom_informer_sinatra":
            ["1Sinatra", "dsdsdsddfsdf",1],
     "1washroom_informer_random_checks":
            ["1random security checks", "\"orger.\" "],
 
        "1washroom_informer_ss":
            ["1school security",function(){
                f.washroom_informer_kasparov = 1;
                console.log('heyeea');
                f.washroom_informer_random_checks = 1; 
                d="ssddssdsd";
                //back=0;
            },1]
    };
     
    d+="<div class='convo'>"; 
    talk(tmp2);
    d+="</div>";
break;
case "washroom_informer_network":
    d+="\"We provide information about anything, except ourselves. Do not ask anymore.\"";
    f.washroom_informer_network = 1;
break;
case "washroom_informer_kasparov":
    d+="\"That's all we know. He keeps his activities well beneath the radar. Even to us.\"";
    f.washroom_informer_kasparov = 1;
break;

case "washroom_headmaster":
    d="\"He was in a rage after the Teacher's lounge incident. \" ";
    f.washroom_headmaster = 1;
break;
case "washroom_informer_sinatra":
    d+="\"All we have is that name. You can find him on your own.\"";
    f.washroom_informer_sinatra = 1;
break;

case "washroom_ss":
    d+="\"You've seen them everywhere. Now you know why.\"";
    f.washroom_ss = 1;
    break;

case "pogs_game":
	inventoryDescArray["washroom_informer_pogs"]["funct"]();

break;

case "pay_informer":
                d+="You pass the bag underneath the stall door. The pogs clatter as she digs through them. \"Excellent,\" she says. \"This is {what we know...|all_we_know_informer}\"";
                f.washroom_informer_paid=1;
                i.washroom_informer_pogs=0;
                back=0;
                

break;
    case "all_we_know_informer":

        d+="\"Kasparov. They whisper and hate that name. They say he's responsible for a vandalism and theft from the Teacher's Lounge. The only witness to the event was a janitor who works the east wing. The headmaster put security on high alert.\" ";
        i.headmaster=1;

        /*
    f.washroom_informer_kasparov = 1;
    f.washroom_informer_sinatra = 1;
    f.washroom_headmaster = 1;
    f.washroom_ss = 1;
    f.washroom_informer_network = 1;
       */ 
    break;
    
    case "meeting_washroom_quiet":
        d+="Sound filters in from the hallway outside. The bustle of students heading for the cafeteria. ";

    break;
    
    case "meeting_washroom_stall_sitting_toilet":
    f.meeting_washroom_stall_sitting_toilet=1;
        d+="You sit on a toilet with the seat lid lowered. "; 
    
    break;


    case "meeting_washroom_stall_graffiti":
        d+=sq("meeting_washroom_stall_graffiti", ["Layer upon layer of fading graffiti. At least you have something to read to pass the time. ", "There are some comics. One is a five panel story about a dog lost in a forest. ", "There are some algebraic functions. ", "There's a heart with 'Karen + Horatio' inscribed in it.", "The back wall is tagged with a huge overlapping T and C of the Turncoat gang."]);
    break;
	///                                    
	case "counter":                        
	parent="kitchen";                      
		d+="<p>Platforms pass at regular intervals, some full of payloads of food and others empty, waiting to receive dirty trays and dishes.</p>";
		use=1;                             
	                                       
		if(f.giver==="0") {                
			alert("fake zero");            
		}                                  
		                                   
		if (f.giver) {                                        
			switch (f.giver) {
				case "cell_phone":
					d="<p>You decide to hold on to your cell phone.</p>";
				break;
				case "lunch_tray":         
					d="<p>You deposit your tray and watch it descend {downwards|kitchen}.</p>";
					i.lunch_tray=0;        
				break;                     
				                           
				case "student_card":       
					d="<p>You decide to hold onto your card.</p>";
				break;          

				case "ornament":       
					d="<p>You better hold on to your ornament.</p>";
				break;  		
				
				default:    
					if (giver_type=="thought") {
						d="<p>You can't think of any connection between those two things.</p>";
					} else {
						d="<p>It doesn't belong in the conveyor.</p>";
					}
                break;
			}                              
		}                                  
	                                       
	break;                                 
		                                   
		                                   
		                                   
case "washroom_main":
    root = 1;
    d+="The stalls are empty. A row of sinks and {mirrors|washroom_mirror} line the wall. One of the mirrors is smashed with its shards scattered across the floor. Light pours in from a {narrow window|washroom_window} near the ceiling. A doorway leads {outside|washroom_back_out}.";



    d+=exit_memory();

break;
		                                   
		                                   
		                                   
		                                   
case "washroom_mirror":
    d+="Your reflection stares back at you. Obsidian hair. Plastic and pristine skin. Primordial eyes. ";
break;

case "washroom_window":
    d+="The glass distorts the outside. A thick, almost liquid fog. ";

break;
                                           
case "washroom_back_out":
    back="start";
    d+="You step past a mop and bucket blocking the entrance. There is yellow caution tape and a sign which reads: \"Washroom out of order. Do Not Enter\". ";

break;
                                           
                                           
                                           
case "counseling_booth":
    root=1;
    scene_change("The Truth");

    d+="A closet-sized room. Everything is white except for the {red stool|counseling_booth_stool} you sit on. There is a panel on the wall with a {camera|counseling_booth_camera}, a {speaker|counseling_booth_speaker} and a {slot|counseling_booth_slot}. Overhead, flourescent bulbs stutter.";

    if (f.back=="start") {
        console.log('yeaaaa bak is start');
        f.guidance_counselor_timer=0;

		for (c in f) {
			f[c]="0";
		};
        
    }
    //start_timer("guidance_counselor");
    if (!exist(f["guidance_counselor_timer"] || f.back=="start")) {
        console.log("counter gc reset");
        f.guidance_counselor_timer=0;
    } else {
        f.guidance_counselor_timer++;
    }
    switch(f.guidance_counselor_timer) {
        case 2:
            d+="\n\nA tinny voice comes  out of the speaker: \"Thank you for your patience. You are second in queue for the next available counselor.\" ";
            back=0;
        break;

        case 4:
            
            d+="\n\n\"Thank you for your patience. You are first in queue for the next available counselor.\" ";

        break;
        case 6:

            d="A chime. \"Operator connected,\" says a voice. The buzz of the speaker resolves to high-fidelity silence. \n\n\"Welcome, my child. Please prepare to recite the words. Hold still for the scan.\" A band of warmth passes over your face. \"Arcadia,\" he says. \n\n{Minds free|guidance_counselor_the_words}";
            back=0;
            f.guidance_counselor_the_words_count=0;
        break;
        default:
    }


        d+=exit_memory();
break;


case "guidance_counselor_the_words":
    back=0;
            f.guidance_counselor_the_words_count++;
    switch (f.guidance_counselor_the_words_count) {
        case 1:
            d+="\"Arcadia...\" \n\n{Doves nest|guidance_counselor_the_words}";
            break;
        case 2:
            d+="\"Arcadia...\" \n\n{A father's dream|guidance_counselor_the_words}";
            break;
        case 3:
            d+="\"Arcadia...\" \n\n{A mother's love|guidance_counselor_the_words}";
            break;
        case 4:
            d+="\"Arcadia.\" \n\n{Arcadia|guidance_counselor_the_words}";
            break;
        case 5:
            d+="\"Skies...\" \n\n{Forever blue|guidance_counselor_the_words}";
            break;
        case 6:
            d+="\"Please repeat.\" \n\n{Skies forever blue|guidance_convo}";
            break;
    }
break;

case "outgoing":
    d+="hello";
break;
case "guidance_convo":
    root=1;
    d+="The counselor waits for you to speak. ";
    if (f.back=="guidance_counselor_the_words") {
        d="\"Thank you. What would you like to confess today, Suzy?\" ";
    }

    if(f.gc_fix_dating_problem) {
        f.gc_semester="x";
    }

    var tmp = {
        "gc_who_are_you":
            {d: "Who are you", o: "\"I am Faculty. I am your counselor and mediator. That is all you need to know. You will not remember me.\"",v:1},

        "gc_blue":
            {d:"Headmaster Blue", o: "\"You are brave to share your feelings. Everyone has violent thoughts at times. We love him, but a part of us hates him. That is how the office of Headmaster sets us free through the grace invested in him. He carries away our darkness. I have confidence your love will overcome your hate. You are forgiven, my child.\"",v:1},
        "gc_quantum":
            {d:"Quantum physics", o: "\"As long as you do your best, you are forgiven. Many students find the course challenging.\"",v:1},
      
        "gc_toilet_time":
            {d: "Toilet time", o: function() {
                d+="You visualize his clenched teeth. \"Thank you for your penitence. If you continue your struggle to not waste time you are forgiven.\" ";
                
                
            },v:1},
        "gc_nothing_to_say":
            {d:"No", o: function(){
                d+="\"I feel you have something else you would like to discuss.\"";
                f.gc_boyfriend=1;
            }},

        "gc_boyfriend":
            {d:"Boyfriend", o:function() {
                d+="\"Yes, the delicate matter of a boyfriend. Our records indicate you have not dated for two semesters.\"";
                f.gc_semester=1; 
                f.gc_dating=1;
            }},
        "gc_semester":
            {d:"Semester", o:"\"It does not belong to you to know how long a semester is.\""},
        "gc_dating":
            {d:"Dating", o: function() {
                d+="\"It is natural for a girl your age to date. We want to foster an environment in which students can find love. And learn. How can we help you find love, my child?\"";
                f.gc_fix_dating_problem=1;    
                f.gc_semester = "x"; 
                d+="<li><span class='deadLink'>I do not want to find love<span></li>";
                f.topic = "dating";
            }},
        "gc_fix_dating_problem":
            {d: "I will fix the problem", o: function() {
                d+="\"Excellent. I think we have accomplished much today.\" The band of warmth continues moving over your face. He sighs. \"There is more. What are you hiding?\"";
                
                i.boyfriend = 1;
                f.topic=0;    
                f.gc_informer = 1;
                f.gc_kasparov = 1;
                f.gc_sinatra = 1;
            }, topic:"dating"},
        "gc_kasparov":
            {d: "Kasparov", o: "{jump}"},
        "gc_sinatra":
            {d: "Sinatra", o: "{jump}"},
        "gc_informer":
            {d: "Informer", o: function() {
                d+="\"I suspected as much. How do you keep finding them? What information did you seek?\"";
                f.gc_cheat_exam = 1;
                f.gc_increased_school_security = 1;
            }},
        "gc_cheat_exam":
            {d: "How to cheat on exam", o: "\"Don't lie to me, Suzy. Ease your conscience and tell me the truth.\""}, 
        "gc_increased_school_security":
            {d: "Increased school security", o: function() {
                d+="\"You noticed again. What do you hope to find in this... minutiae? I don't suppose you saw a face. What did the Informer tell you?\"";
                f.gc_no_face=1;
            }},
        "gc_no_face":
            {d: "No face. Vandalism of teacher's lounge.", o: function() {
                d+="\"As I suspected.\" A click. The scanner shuts off and the band of warmth fades. \"The news would eventually spread. I won't fault you for knowing about it ahead of the general public. But you need to be open with us in the future. Fine, all fine. Now hold still. Straighten your back and {look at me|gc_look_at_him}.\" \n\n";
                talk=0;
                f.gc_discovered_nothing_important = 1;

            }},

    };
    //d+=tmp.gc_who_are_you.o;
   talk(tmp);

   if (f.gc_who_are_you == "x" && f.gc_blue == "x" && f.gc_quantum == "x" && f.gc_toilet_time == "x" && !f.gc_nothing_to_say) {
        f.talk=0;
        d+="\nThe band of warmth continues moving across your face. \"Suzy, is there anything else you would like to discuss?\"";
        f.gc_nothing_to_say = 1;
        talk(tmp);
   } 
    
    if (!f.topic && !f.gc_kasparov) {   
        d+="<li><span class='deadLink'>Kasparov<span></li>";
        if (!f.gc_informer) {
            d+="<li><span class='deadLink'>Informer<span></li>";
        }
           d+="<li><span class='deadLink'>Sinatra<span></li>"
    }
break;


case "gc_sinatra":

                d+="\"As I suspected.\" A click. The scanner shuts off and the band of warmth fades. \"Yes, the vandalism of the teacher's lounge. The news would eventually spread. I won't fault you for knowing about it first. But we will need to erase the Janitor's name. Straighten your back and {look at me|gc_look_at_him}.\" \n\n";
                f.gc_discovered_sinatra = 1;
                f.gc_wipe_sinatra = 1;
               back=0; 

break;
case "gc_kasparov":
    d+="He is silent. \"What is this?\" You hear his beleagured breathing. \"Place your hands above your head. Do not attempt any {sudden movements|gc_sudden_movements}.\" The lights begin flickering. The sound of a thousand cicadas fills the room."; 
    back=0;

break;

case "gc_sudden_movements":
    d+="It is no use trying to move. Your body has become limp. The door to the booth bursts open. Two School Security guards enter the room and catch you before you {collapse|start} to the floor. ";
    i.kasparov=0;
    i.sinatra=0;
    i.informer=0;
    i.ss=0;
    back=0;
    
break;
            
case "gc_look_at_him":
    back = "start";
    d+="You stare into the orb. A sound like a thousand cicadas. The lights begin a pattern of flickering. The flickering increases in speed it becomes a strobe. You hold on to what you can...";
    var items = [
        0,
        function() {
            $(".back").animate({opacity:0},0);
        },
        500,
        function(){
            
            $("#ss").effect( "highlight",{color:"yellow"}, 400 );
        
            $("li#ss").animate({opacity:0},500);
            i.ss = 0;
        },1800,
        function(){
            $("li#ss").remove();
            $("#vandalism_teachers_lounge").effect( "highlight",{color:"yellow"}, 400 );

            if(f.gc_wipe_sinatra) {
                $("#sinatra").effect( "highlight",{color:"yellow"}, 400 );
                $("li#sinatra").delay(500).animate({opacity:0},500);
                i.sinatra = 0;
                f.gc_wipe_sinatra = 0;
            }
            $("li#vandalism_teachers_lounge").delay(500).animate({opacity:0},500);
            i.vandalism_teachers_lounge = 0;
        },1800,
        function(){
            $("li#vandalism_teachers_lounge").remove();
            $("#informer").effect( "highlight",{color:"yellow"}, 400 );
            $("li#informer").delay(500).animate({opacity:0},500);
            i.informer = 0;
        },1800,
        function() {
        
            $("li#informer").remove();
            $(".back").animate({opacity:1},2000);
        },1500
        

     
    ];
    timer(items);
/*
        d+="<li><span class='deadLink'>Kasparov<span></li>";
        d+="<li><span class='deadLink'>Informer<span></li>";
       d+="<li><span class='deadLink'>Sinatra<span></li>"
 */   
break;
case "counseling_booth_stool":
    d+="A perfect cube. The floor around it has faded scuff marks. ";
break;

case "counseling_booth_speaker":
    d+="A spiral pattern of dots radiating outwards to form a circle. ";
    if (!f.guidance_counselor_arrived) {
        d+="It emits a buzz. ";

    }

break;

case "counseling_booth_slot":
    d+="Two inches wide. Small slips of {paper|counseling_booth_paper} litter the floor beneath it.";
     
break;

case "counseling_booth_paper":

if (f.counseling_booth_paper=="x") {
    d+="You have no desire to read any more. ";

} else {
    d+="You pick up one of the papers. It reads: ";
    d+=sq("counseling_booth_paper", ["\"Misdemeanor: disrespecting school authority. Penitence: 3 sessions of detention\"", "\"Misdemeanor: academic negligence. Penitence: 1 session of detention.", "Misdemeanor: travel without proper transit documents. Penitence: 3 sessions of detention.", "Misdemeanor: possession of contraband. Penitence: 5 sessions of detention."]);
    d+=" Underneath is a bar code. ";
}

break;

case "counseling_booth_camera":
    d+="A black orb encasing an unseen pupil.";
break;



case "caf":
    root=1;
    d+="Lunch tables overflow with {students|caf_students} and extend into the horizon. Light blooms through a wall of narrow {windows|caf_windows}. Food control {carousels|caf_carousels} clatter as lunch trays move up and down from below. ";
    if (i.boyfriend) {
        d+="\n\nThe  {group|caf_bridge_club} seated next to you is noisy. ";
    }
    d+=exit_memory();
break;
case "caf_bridge_club":
    d+="Back slapping and laughter. One of them squats on the bench like a monkey, doing little hops and rocking the table. They wear red scarves. A {playing card|caf_bridge_playing_card} peeks from the breast pocket of their uniforms. The boys leave one side of their shirts untucked. The girls have the sides of their heads shaved. They are members of the Bridge Club. ";
break;
case "caf_windows":
    d+="They extend {high up|caf_ceiling} and tower over the students. Golden shafts of {light|caf_outside} filter though the glass. "; 
break;
case "caf_bridge_playing_card":
    d+="Always the Queen of diamonds. ";
break;
case "caf_carousels":
    d+="The lunch trays rattle on the conveyor belts. Used trays sink down to the {lower floors|caf_lower_floors}. "; 
break;

case "caf_outside":
    d+="A milky, swirling fog.";
break;

case "caf_ceiling":
    d+="High above is a tangle of catwalks, girders, pipes and cables. Spaced at regular intervals are {cameras|caf_cameras}. ";

break;
case "caf_students":
    d+="Idle conversation. The drone of a thousand voices. ";
break;
case "caf_cameras":
    d+="Large black orbs hang from the ceiling like strange fruit. ";
break;

case "caf_lower_floors":
    d+="The kitchen lies below. Fire, fury and people in white {hasmat|caf_chefs} suits. ";  
break;

case "caf_chefs":
    d+="Chefs with tall white toques scurry about. Some carry armfuls of food. Others balance stacks of trays. They have monitors for heads and emoticons for faces. ";
break;
///////In case you link to a nonexistent node, then this error message will appear
default:

    switch(typeof node){ 
        case 'function': //if a function can be found for the value passed as node, execute it
            node_function[node]();
        break;
        case 'undefined': //no function found, doesn't exist, go to defaults
        default:
            nodeless = ['Your thoughts lead you elsewhere.', 'Your attention drifts to other matters. ', 'Your memory blurs. ', 'Your focus shifts elsewhere. '];
            var parameters = [];
            parameters.flag_name = "default_no_node";
            d += "<span class='error-missing-node'>" + randomizer(nodeless,parameters) + "</span>";
   }
break;                                 






//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

    } //////do not remove this bracket         
} //////do not remove this bracket         
                                           
                                           
                                           
/////////////////////////////////////      
////Inventory////////////////////////      
////////////////////////////////////       
                                           
    //////
add("Headmaster Blue", "headmaster", function() { d+="Highest reigning Faculty member in Arcadia Heights. Hunting Kasparov.";
    thought=1;
});

add("Sinatra", "sinatra", function() {
    d+="<em>";
    if (i.vandalism_teachers_lounge) {
        d+="A witness to the raid of the Teacher's lounge. A janitor working in the east wing. ";
    } else {
        d+="Someone... who? A janitor. He saw Kasparov.";
    }
    d+="</em>";
    thought=1;
});
                                           
/////////                                  
add("Pogs", "washroom_informer_pogs", function() {
    d+="It had taken many games to gather this collection. Hours of sweat and shouting. Your arm is still sore from throwing the slammer. ";

});
/*
  add("ZZZ", "zzz", function() {
    d+="zzz";
    thought=1;
});
   */                                        
/////                                      
add("Cell phone", "cell_phone",function(){ 
	d+="<p>A cheap red phone, slightly bruised.</p>";
	
	if(f.cellphone_ornamented) {
	d="<p>A cheap red phone, slightly bruised. A plastic strawberry ornament dangles from it.</p>";
	}
	                                       
	if (i.text_message_sorry) {            
		d+="<p>There is another {new message|sorry_message}.</p>";
	                                       
	} else if (f.text_message_received) {  
		d+="<p>There is a {new message|text_message}.</p>";
	                                       
	}                                      
                                           
});     



/////                                      


		 


                                           
/////////////////////////////////////////////////////
/////thoughts
                                           
                                           
                                           
                                           
                                           
                                           
                                           
////
add("School Security", "ss", function() {
    thought=1;
    d+="On high alert because of theft and vandalism in the Teacher's Lounge.";

});
////
add("Kasparov", "kasparov", function() {
    thought=1;
    d+="Who is he? He will have the answers you want.";
});

add("Vandalism and theft", "vandalism_teachers_lounge", function() {
    d+="Kasparov and his people vandalized and stole something from the Teacher's lounge.";
    thought=1;
});

add("Informer", "informer", function() {
    thought=1;
    d+="The Infoclub. Suppliers of esoteric and illegal information.";
});

add("Boyfriend", "boyfriend", function() {
    thought=1;
    d+="You need to find a boyfriend. ";
});
