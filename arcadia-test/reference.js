////////////////////////////////////
//Timers
    timer_init("classroom_note_kas", 3);

    if (timer_fin("classroom_note_kas")) {
        d="Someone taps your shoulder. You turn and the girl behind you passes a small folded {note|classroom_note_kas_passed} with your name on it. ";
    }



    d+="content triggered manually";
    initNode('dorm');


///////////////////////
override default destination (root node) when clicking on "return" button

    two ways:
        d+=bk('dorm'); //use next one first. Better
        //back button manual

    other way:
        back = [name of node];

////
turn off back button:
    back = 0;
//////////////////////
//Randomizers
//

This cycles through the description items in sequential order, stopping on the last item in the array. If the flag_variable_name is defined in the uservariables array, it will be saved between game sessions. 

    d+=sq("flag_variable_name", ["first description", "second", "third"]);


    if (f.counseling_booth_paper=="x") {
        d+="You have no desire to read any more. ";

    } else {
        d+="You pick up one of the papers. It reads: ";
        d+=sq("counseling_booth_paper", ["\"Misdemeanor: disrespecting school authority. Penitence: 3 sessions of detention\"", "\"Misdemeanor: academic negligence. Penitence: 1 session of detention.", "Misdemeanor: travel without proper transit documents. Penitence: 3 sessions of detention.", "Misdemeanor: possession of contraband. Penitence: 5 sessions of detention."]);
        d+=" Underneath is a bar code. ";
    }



    //if need to give it a variable ratio reward schedule, add a 1 to the end
    d+=sq("test_sq", ["sqfirst","second","third"],1); 





    d+=vr("randomizer", ["dft", "option 1", "option 2", "option 3","a dangerous game you play", "foooooo"], 3, 1,"stop");


    d+=v("open_dorm_door", ["You pull on the handle, the door catches on a latch, refusing to open.",  "A chime sounds. Words form on the glass: \"Currently it is  quietstudytime, student Susan Newborne. Do not attempt to leave your dormitory.\"", "You tug on the handle. Words form on the glass wall: \"Currently it is  quietstudytime, Susan Newborne. This incident will be noted.\""], "stop");


     
    var reward = {"0":.8, "1":.5};

    switch(randomizer(reward)) {
        case "1":
            reward = ['javascript', 'php', 'low', 'ruby', 'python'];
            var parameters = [];
            parameters.flag_name = "randomizer";
            parameters.fin = "stop";
            y = randomizer(reward,parameters);
            d += y;
        break;

        case "0":
            d += "no reward";
        break; 
    }




/////////////////////////////////////////////////////
oneoffs Show something once
    //after clicking once, link deactivates, but is still readable
    d+=oneoff_link("Ephemera logo|eph_logo");


    d+=oneoff("seen_hate_april", "April Thursday", "{April Thursday|dorm_poster_april}")


    //text is visible once (does not require click) then gone.
    d+=oneoff_text("classroom_desk_graffiti", "There is some {graffiti|classroom_desk_graffiti} scratched on yours. ");





///////////////////////////////////////////////
//#conversation system



    var tmp = {
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
            {d: "kasparov", o: "{jump}"}

    };
     
   talk(tmp);
    
   
   #conversation sub-branch:

        ///then in the main node handler:
        case "gc_kasparov":
            //insert standard convo system
            talk(tmp2);
            f.back = //[whatever was the previous node with parent conversation]
        break;

//////////////////////////////////////////////////
//
//
//#object #interactions
//



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
