    

done_talking = function(obj) {
    var c;
    var done_talking = true;
    console.log('in convo_fin'); 
    for (c in obj) {
        console.log('testingtopics: ' + c);    
        if (f[c] != "x") {
            done_talking = false;
        }  
    }
    console.log(done_talking);   
    return done_talking; 
    /*
     *
     * washroom_informer_kasparov    
washroom_informer_sinatra
washroom_informer_random_checks
washroom_informer_ss
*
*/

}

function convo_1() {
    back="washroom_informer_desc";
    if (!f.convo_1) {
        d+="<li>{conversation item 1|convo_1}</li>";
    }
    if (!f.convo_2) {
        d+="<li>{conversation item 2|convo_2}</li>";
    }
    if (!f.convo_3) {

        d+="<li>{conversation item 3|convo_3}</li>";
    }
}

function interact(funct) {
    if (f.giver) {
        root=0;
        funct();
        use=0;
    }

}

function exit_memory() {
//refers to f.end_memory
//
    if (back != 0) {
        if (f.end_memory) {
            return "<p class='back exit_memory highlight_exit'>{&#10003;   Finish memory|start}</p>";
        } else {
            return "<p class='back exit_memory'>{Exit memory|start}</p>";
        }
    } else {
        return "";
    }

}


function informer_interactions() {

    interact(function(){
          switch (f.giver) {                     
            case "washroom_informer_pogs":                        
                d="You pass the bag beneath the stall door. It is quickly snatched away. You hear the Pogs clattering as she examines the bag. \"Alright,\" she says. \"This is {all we know...|all_we_know_informer}\"";
                i.washroom_informer_pogs = 0;
                f.washroom_informer_paid = 1;
                back=0;
            break;                             
                                               
            case "sinatra":
                d="\"All we have is that name. You can find him on your own.\""; 
                i.sinatra=0;
            break;
            
            case "headmaster":
                d="\"He was in a rage after the Teacher's lounge incident.\" ";
            break;

            case "kasparov":
                if (!f.washroom_informer_paid) {
                    d="\"First the goods.\"";

                } else {
                    d="You already have what you need to know. ";
                }
            break;
            
            default:                           
                d="She isn't interested. ";
                                               
                                               
        }   
      

    });
        
                                  
}

function timer_init(name, interval) {
    console.log("timer initiatlized");
    if (!exist(f[name]) || f[name]==0) {
        f[name]= f.moves + interval;
    }
}

function timer_fin(timer_name) {


    if (f.moves > f[timer_name] && f[timer_name] !="x") {
        f[timer_name] = "x";
        return true;
    } else {
        return false;
    }
}
function exist(variable) {
    if (typeof variable !== 'undefined') {
        return true;
    } else {
        return false;
    }

}

var test_array = [100,["tx 1", 5000], 200, ["tx 2", 5000]];




//displays link once, After it is clicked on once, then only text afterwards. used like this oneoff("a link|variable_name");
//put the variable name in user array to make it save
function oneoff_link(link) {
    link_parts = link.split("|");
    var text = link_parts[0];
    var fname = link_parts[1];
    if (!exist(f[fname])) {
        f[fname]=0;
    }
    if (f[fname]) {
        return text;
    } else {
        return "<a onClick=\"f." + fname + "=1; process('" + fname + "'); return false;\">" + text + "</a>"
    }
}

/* displays text once, then shows default every time thereafter
usage:

d+=oneoff("seen_hate_april", "April Thursday", "{April Thursday|dorm_poster_april}")
*/

function oneoff_text(flag_name, text) {
///refers to global f array and requires exist function

    if (!exist(f[flag_name])) {
        f[flag_name]=0;
    }
    if (f[flag_name]) {
        return "";
    } else {

        f[flag_name] = 1;
        return text;
    }


}


/*
This cycles through the description items in sequential order, stopping on the last item in the array. If the flag_variable_name is defined in the uservariables array, it will be saved between game sessions. 

d+=seq("flag_variable_name", ["first description", "second", "third"]);

//if need to give it a variable ratio reward schedule, add a 1 to the end
d+=seq("test_sq", ["sqfirst","second","third"],1); 
*/
function sq(flag_name, array, reward_param) {//refers to global flag array, and global variable reward

    if (!exist(f[flag_name])) {
        f[flag_name]="0";
    }
   

    console.log("f[flag_name]" + f[flag_name]);

    if(exist(reward_param)) {
        f.reward = variable_ratio_2(f.reward, 3, 2);
    }
    console.log("f[flag_name]" + f[flag_name]);

    var count = f[flag_name];
    console.log("count" + count);
    //return nothing if reward schedule is on and it is not at the reward item 
    if (exist(reward_param) && !reward) {
        return array[0];
    }

    if(f[flag_name] < array.length-1 && reward) {
        f[flag_name]++;
        console.log("incremented");
    } else {
        f[flag_name]="x";
    }

    if(count=="x") {
        return array[array.length-1];
    } else {


    console.log("count" + count);
        return array[count];
    }
}


function v(flag_name, choices, fin_param) {
//one side effect/dependency, refers to global f array
//
    var output;
    var rewards = choices.slice(0);
    var dft = rewards[0];
    rewards.shift(); //this makes it remove the default from the rewards. Perhaps better to leave it in in cases the user hits a reward the first time coming to a node. Then the default node may never be seen

    console.log("rewweafdsfd " + f[flag_name]);
    if (f[flag_name]==0 || !exist(f[flag_name])) {
        f.reward = variable_ratio_2(f.reward, 3, 2);


        buffer = "";
        for (var i=0; i < rewards.length; i++) {
            buffer += "1";
        }

        f[flag_name]=buffer;
        
        return dft;

    }
    if (f[flag_name] != "x" && f.reward<1) {
        var parameters = [];
        parameters.flag_name = flag_name;
                parameters.fin = fin_param;

        //the following forces it to show the default the first time upon reaching the reward if it has not been seen yet
        //output = randomizer(rewards,parameters);

            output = randomizer(rewards,parameters);

        //reward schedule here
        f.reward = variable_ratio_2(f.reward, 3, 2);
        console.log('reward activated');
    } else {
        output = dft;
    }
   
    
    return output; 

}

function variable_ratio_2(f_value,median,range) {
        var output;
        
        if (parseInt(f_value) <= 0) {
            output = lnRandomScaled(median, range);
        } else {
            output = parseInt(f_value) - 1;
        }
        return output
}

function get_keys(object) {
    var output = [];
    for(var k in object) {
        output.push(k);
    }
    return output;
 }


function get_values(object) {
    var output = [];
    for(var k in object) {
        output.push(object[k]);
    }
    return output;
 }


function randomizer(my_object,parameters) {
    //Randomized selector/////////////////////////////////////////////////////////////////
    /*

    Relatively clean. One side effect: affects global flag list settings f[]

    parameters.flag_name = the name that will be used in the main flag list f.[whateever]. Records state. REMEMBER TO PUT IT IN THE FLAG ARRAY

    parameters.fin = what to do when all options have been exhaused. options are: reset, stop. if not supplied, it will default to reset.
    - Reset makes it reactivate all previously seen links. Start the process over again.
    - Stop makes it put an x in the flag list so it can be referenced easily: if (f.flag_name != "x") or (f.memories_of_dog == "x")

        the x would be useful to deactivate a link in the parent room (root) location:
        

        if (f.randomizer == "x") {
            d+="dead link";

        } else {
            d+="{active link|link_node}";
        }


    // example usage of weighted selection. The closer to 1 the more likely. The closer to 0 less likely:
        var reward = {'option 1':0.8, 'option 2':0.4, 'option 3':0.3};
        console.log(randomizer(reward)); 

    // Example useage of unweighted random selection:
        reward = ['javascript', 'php', 'low', 'ruby', 'python'];
        var parameters = [];
        parameters.flag_name = "randomizer";
        parameters.fin = "stop";
        console.log(randomizer(reward,parameters));


    // Combination of simple and complex. Kind of like gambling with a random reward schedule. But the rewards won't be repeated until they are all finished:
    
       var reward = {"0":.8, "1":.1};
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

    */
    //////////////////////////////////////////////////////////////////////

    var list_only_unseen, weight_only_unseen, key_value_array, list, weight, extra_params, x, only_active, flag_values, output, index_position;
    key_value_array = [];


    if (!parameters) {
        parameters = 0;
    } else {
        if (!parameters.fin) parameters.fin = "reset"; // default parameters if no parameters supplied
    }


    if (Array.isArray(my_object)) { //if no weight parameters supplied, give it default weight
    //if( Object.prototype.toString.call( my_object ) === '[object Array]' ) {
    
        for (var i = 0; i < my_object.length; i++) {
            key_value_array[my_object[i]] = 1;
            //key_value_array[javascript]=.1
        }
        
        my_object = key_value_array;

    }  else {
        key_value_array = my_object;
    }

    var list = [];
    var weight = [];
    

    list = get_keys(key_value_array);
    weight = get_values(key_value_array);
//    list = Object.keys(key_value_array);
 //   weight = Object.values(key_value_array);


    if (parameters.flag_name) { //This detects if simple or complex randomization. AKA do not re-show previously seen choices unless all choices have been exhausted. If it has a flag_name then it means it's state will be recorded in the flags list for future reference. Means complex randomization
        var buffer = "";

        //if all options have been seen, reset all to unseen (all to 11111)
        if (!count_character("" + f[parameters.flag_name],"1")) {
            buffer = "";
            for (var i=0; i < list.length; i++) {
                buffer += "1";
            }
            f[parameters.flag_name]=buffer;
            console.log("rese4t 1s");
        }

        //activate all possibilities if first time, never seen any of them yet. populate with 1's
        if(f[parameters.flag_name]==="0") { //if f.[whatever you called it] is default 
            buffer = "";
            for (var i=0; i < list.length; i++) {
                buffer += "1";
            }

            f[parameters.flag_name]=buffer;
        } else { ///load from flag variable if it already contains info
            var buffer = f[parameters.flag_name] + "";
        }

        if (f[parameters.flag_name] != "1" && count_character("" + f[parameters.flag_name],"1")==1) {

            var str = f[parameters.flag_name].split('');

            //f[parameters] = str;
            index_position = str.indexOf("1");
            output = list[index_position];
            //console.log(list[4]);            
        } else {
            only_unseen = get_only_unseen(key_value_array,buffer);
            list_only_unseen = get_keys(only_unseen);
            weight_only_unseen = get_values(only_unseen);
            output = getRandomItem(list_only_unseen, weight_only_unseen);
        }
    } else { 
        output = getRandomItem(list, weight);
    }    




    //deactivate the one that will be presented
    //get the item number in array based on key name
    index_position = list.indexOf(output);
    if (parameters.flag_name && f[parameters.flag_name] != "1") {
        var str = f[parameters.flag_name].split('');
        str[index_position] = '0';
        str = str.join('');
        f[parameters.flag_name] = str;
    }
    
    if (parameters.flag_name != "0" && parseInt(f[parameters.flag_name])==0 && parameters.fin == "stop") {
       f[parameters.flag_name] = "x"; 
       //
    }


    return output;
    //
    //identify how many times a character appears in a string
    function count_character(my_string, find_character) {
        var output = my_string.split(find_character).length-1; 
        return output;
    }
    //console.log("count:", count_character("00100","1"));
}



function get_only_unseen(p_array,on_off_flags) {
    /* For use with randomizer function
     * pass in a key/value object, and string of 1's and 0's:
     * {"dog": .9, "cat": .5, "mouse": .1} 
     * 101
     * It will produce new array with items removed:
     * {"dog": .9, "mouse": .1}
    */

    var number_of_items = get_keys(p_array).length;
    //var clone = Object.assign({}, p_array);
    var clone = jQuery.extend({}, p_array);
    var list = get_keys(p_array);
    for (var i=0; i < number_of_items; i++) {

        if (on_off_flags.charAt(i)=="0") {
            //new_array.push(p_array[i]);
            delete clone[list[i]];
        }
    }

    return clone;
}


var getRandomItem = function(list, weight) {
//used with main randomizer function. Give this function an array of items and weights, and it will randomly return an item according to its weight.
    var total_weight = weight.reduce(function (prev, cur, i, arr) {
        return prev + cur;
    });
     
    var random_num = rand(0, total_weight);
    var weight_sum = 0;
     
    for (var i = 0; i < list.length; i++) {
        weight_sum += weight[i];
        weight_sum = +weight_sum.toFixed(2);
         
        if (random_num <= weight_sum) {
            return list[i];
        }
    }
}

////for use with getRandomItem function. Produces a random number bewtwen min and max
var rand = function(min, max) {
    return Math.random() * (max - min) + min;
};

