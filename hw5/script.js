// associate constant variables to elements
const header1 = document.getElementById("header1");
const message_display = document.getElementById("message_display");
const option_display = document.getElementById("option_display");
const message = document.getElementById("message");
const sub_message = document.getElementById("sub_message");

// create an button to restart the game
const restart_button = document.createElement("button");
restart_button.textContent = "RESTART";
restart_button.onclick = morning_phase;

function initial_message(){
    sub_message.textContent = "No pressure."
    header1.textContent = "Welcome" + " " + "To Your Life!";
    message.textContent = "It's time to live your life! Screw fatalism you're the one in control. Select from the options below to enable your character to live the best possible life.";
    
    // create an button for option select
    const option1 = document.createElement("button");
    option1.textContent = "Continue";
    option1.onclick = morning_phase;
    // add the newly created button to the html element
    option_display.appendChild(option1);
}

function morning_phase(){
    // clear option list
    option_display.innerHTML="";
    // populate the sub message text
    sub_message.textContent = "What do you do next?";

    header1.textContent = "The Sun Rises...";
    message.textContent = "Your dreams are sweet and pillow-soft, but you are suddenly awoken by an incessant alarm.";

    // create buttons for option select
    const option1 = document.createElement("button");
    option1.textContent = "Hit the snooze button";
    option1.addEventListener("click", ()=> afternoon_phase(1));

    const option2 = document.createElement("button");
    option2.textContent = "Prepare for work";
    option2.addEventListener("click", ()=> afternoon_phase(2));

    const option3 = document.createElement("button");
    option3.textContent = "Call your job and pretend to be sick";
    option3.addEventListener("click", ()=> afternoon_phase(3));

    // add the newly created button to the html element
    option_display.appendChild(option1);
    option_display.appendChild(option2);
    option_display.appendChild(option3);
}

// this function takes the previous choice into consideration when displaying the next message.
function afternoon_phase(previous_choice){
    // clear option list
    option_display.innerHTML="";

    // create buttons for option select
    const option1 = document.createElement("button");
    const option2 = document.createElement("button");
    const option3 = document.createElement("button");

    // add the newly created button to the html element
    option_display.appendChild(option1);
    option_display.appendChild(option2);
    option_display.appendChild(option3);

    if (previous_choice == 1){
        header1.textContent = "Light Filters Through Your Blinds...";
        message.textContent = "You awaken once more, this time without your alarm's assistance. Its plastic face seems disappointment as it displays the time: 11:30am! Oh God! Your boss is going to kill you and the half-dozen missed calls on your phone only serve to exacerbate your worry.";
        
        option1.textContent = "Go to work";
        option1.addEventListener("click", ()=> night_phase(1));
        option2.textContent = "Go back to sleep";
        option2.addEventListener("click", ()=> night_phase(2));
        option3.textContent = "Return the missed calls";
        option3.addEventListener("click", ()=> night_phase(3));
    } else if (previous_choice == 2){
        header1.textContent = "Another day...";
        message.textContent = "You're tired, but that's to be expected since you're getting older. In a blur of routine you prepare yourself and catch the bus. Soon after you arrive at work. There your coworker, Shane, tells you a corny joke.";
        
        option1.textContent = "Laugh at Shane's joke.";
        option1.addEventListener("click", ()=> night_phase(4));
        option2.textContent = "Don't laugh at Shane's joke";
        option2.addEventListener("click", ()=> night_phase(5));
        option3.textContent = "One-up Shane";
        option3.addEventListener("click", ()=> night_phase(6));
    }else{
        header1.textContent = "Ah, Master Deceiver...";
        message.textContent = "Not only do you call into your job pretending to be sick, but you pull off such an oscar-worthy performance that the boss's secretary decides to do a wellness check on you. A couple hours later you hear a knock at your door.";
    
        option1.textContent = "Answer the door";
        option1.addEventListener("click", ()=> night_phase(7));
        option2.textContent = "Pretend that your asleep";
        option2.addEventListener("click", ()=> night_phase(8));
        option3.textContent = "Flee through the fire escape";
        option3.addEventListener("click", ()=> night_phase(9));
    }
    
}

function night_phase(previous_choice){
    // clear option list
    option_display.innerHTML="";

    if (previous_choice == 1){
        header1.textContent = "The Walk Of Shame...";
        message.textContent = "It is well past noon when you finally arrive at work. Everyone is busy with their dull day-to-day. Your boss calls you into their office. He is angry and he yells at you for a half-hour. Afterward, you leave his office disheveled. At least you weren't fired. You sit down at your desk and check your emails. It seems your luck has changed! In your inbox is a email from an affluent african prince--you stand to gain millions. Your boss is a chump, he'll see."
        sub_message.textContent = "$ $ $ Cha-Ching $ $ $";
        option_display.appendChild(restart_button);

    } else if (previous_choice == 2){
        header1.textContent = "What A Strange Dream...";
        message.textContent = "You dream about your boss chasing you down a long hallway. You try your best to sprint, but your legs are like lead. The moment before he catches you, you wake with a start. Sweat beads your brow. It was only a dream! Thank God! Suddenly, a floorboard creeks and you look up. Looming in the shrouded corner of your room stands an imposing man in three-piece suit. You do not recognize this man, but you have no doubt as to your boss's involvement. The imposing man cracks his knuckles.";
        sub_message.textContent = "You probably should've gone to work.";
        option_display.appendChild(restart_button);

    } else if (previous_choice == 3){
        header1.textContent = "Future, Past, Present...";
        message.textContent = "You return one of the missed calls thinking it to be your boss or his secretary. Strangely neither picks up and instead an old man answers. He speaks between fits of laughter, \"I haven't much, time, but I'm, you from the future! I know, this won't, make sense right now, but don't, laugh, at Shane's joke!\" Before you can answer he hangs up."
        sub_message.textContent = "What could it mean?";
        option_display.appendChild(restart_button);

    } else if (previous_choice == 4){
        header1.textContent = "Hilarity To Horror...";
        message.textContent = "You laugh at Shane's joke. It was just what you needed. In the world of routine and constant déjà vu Shane's stupid jokes keep you alive. Of course the joke wasn't that funny, but you can't stop laughing. Oh no! You can't stop laughing! Tears start streaming down your cheeks; the jubilation you once felt turns to panic. This intensifies the laughter until Shane takes a step back. He says something, but you can't hear it over your bellowing laughter."
        sub_message.textContent = "\"It wasn\'t that funny\" -Shane";
        option_display.appendChild(restart_button);

    } else if (previous_choice == 5){
        header1.textContent = "Hilarity To Hostility...";
        message.textContent = "You don't laugh. Shane stands there, the curtail of his joke flaccid in the stifling silence. You stand there as well, inexpressive, vacant, hollow, rude. What the heck is wrong with you? Shane is a nice guy! \"What the heck is wrong with you!?\" yells Shane. Overwhelmed by the injustice of his joke's reception, he lunges forward and grabs you. Adrenalin courses through his body as he picks you up with a roar. You're terrified. You plead with him, but he cannot hear you from beyond the red veil."
        sub_message.textContent = "This will hurt.";
        option_display.appendChild(restart_button);

    } else if (previous_choice == 6){
        header1.textContent = "Hilarity To Promotion...";
        message.textContent = "You cut Shane's joke short and begin a new, better joke. At its conclusion he looks skeptically at you: unimpressed. Thankfully your boss heard it and pushes Shane aside. Roaring with laughter he beams down at you like how your father did when you were younger. He finally sees you; he's proud of you at long last."
        sub_message.textContent = "Papa?";
        option_display.appendChild(restart_button);

    // Special Section that uses text input boxes.
    } else if (previous_choice == 7){
        header1.textContent = "Barefaced Liar...";
        // clear the previous message
        message.textContent ="";

        //message.textContent = "You answer the door. Your boss's secretary looks at you inquisitively. Choose your next words carefully.";
        message.insertAdjacentHTML("beforeend", "You open your front door. Your boss's secretary stands before you; limned harshly by daylight. Hey Sara! ");
        // correct answer is "how"
        message.insertAdjacentHTML("beforeend", "<input id=\"word1\" type=\"text\" placeholder=\"...\" style=\"width:3ch;\" maxlength=\"3\"> are you? ");
        // correct answer is "sorry" and "sick" or "bad" or "ill"
        message.insertAdjacentHTML("beforeend", "<input id=\"word2\" type=\"text\" placeholder=\".....\" style=\"width:5ch;\" maxlength=\"5\"> that I couldn't make it to the office today, I've been feeling really <input id=\"word3\" type=\"text\" placeholder=\"....\" style=\"width:4ch;\" maxlength=\"4\">.");
        message.insertAdjacentHTML("beforeend","<i>*cough* *cough*</i> ");
        // correct answer is "tomorrow"
        message.insertAdjacentHTML("beforeend","I'll probably be at work <input id=\"word4\" type=\"text\" placeholder=\"........\" style=\"width:8ch;\" maxlength=\"8\">, but we'll have to wait and see.")
        sub_message.textContent = "Here goes nothing...";

        // add a new submission button
        const submit_button = document.createElement("button");
        submit_button.textContent = "Submit";
        submit_button.onclick = secret_night_phase;
        // add the newly created button to the html element
        option_display.appendChild(submit_button);

    } else if (previous_choice == 8){
        header1.textContent = "Open Sesame...";
        message.textContent = "You pretend to be asleep. A minute later the knocking stops. Then an insidious sensation creeps up your spine. Through half-shut lids you see the secretary approach your bedroom window. Shockingly, she jimmies the window open and crawls through. You almost jump up and shout at her, but then you'd be found out. So instead you lay still and wait. She creeps forward and sets two bottles of gatorade, red flavor, on your nightstand. She sits at the edge of the bed and begins to hum a lullaby. You are not soothed and you suppress shivers of fear."
        sub_message.textContent = "Mommy?";
        option_display.appendChild(restart_button);

    } else{
        header1.textContent = "Not Enough REM...";
        message.textContent = "A day filled with napping turns quickly to panic as you rush to your bedroom window. You throw it open and plunge through. Unfortunately in your bleariness you forgot that you didn't live in an apartment complex and that your house doesn't have a fire escape. Instead of a great escape you tumble through the hedge planted below the window. In the commotion of snapping branches and exclamation of pain your boss's secretary runs up to the bush, \"oh my God! Are you okay?!\"";
        sub_message.textContent = "Hope you can muster another oscar-worthy performance.";
        option_display.appendChild(restart_button);
    }
}

function secret_night_phase(){
    // clear option list
    option_display.innerHTML="";
    
    // Each field has an ID and these constant variables map to each element value. Also make all text lower case.
    let w1 = document.getElementById("word1").value.toLowerCase();
    let w2 = document.getElementById("word2").value.toLowerCase();
    let w3 = document.getElementById("word3").value.toLowerCase();
    let w4 = document.getElementById("word4").value.toLowerCase();
    console.log(w1);
    console.log(w2);
    console.log(w3);
    console.log(w4);
    
    // Are the values correct?
    if (secret_night_phase_validate(w1,w2,w3,w4)){
        //success
        header1.textContent = "Silver Tongue...";
        message.textContent = "Impressed with your \"candor\" Sara gives you a smile and two red Gatorade bottles. \"I hope so! The office isn't the same without you~\" You try to say something, but thankfully Sara mistakes your stammering for the grumblings of sickitude. Sara turns to leave, but not before giving you a wink. Your mouth starts to get dry. Maybe you are getting sick...";
        //sub_message.textContent = 
        for (let i = 0; i < 3; i++){
            setTimeout(()=>{celebration(i)}, i * 1500);
        }

    } else{
        //failure
        header1.textContent = "Tongue Tied...";
        message.textContent = "You try to muster another oscar-worthy act, but in your lethargy and bed-rottenness you can only manage something akin to indifference. The jig is up. She hands you two Gatorade bottles and turns on her heel. You watch her as she walks away, her hair swishing austerely.";
        sub_message.textContent = "You should probably fix up your résumé.";
    }
    option_display.appendChild(restart_button);
}

function secret_night_phase_validate(w1, w2, w3, w4){
    if (w1 == "how" && w2 == "sorry" && (w3 == "sick" || w3 == "bad" || w3 == "ill") && w4 == "tomorrow"){
        console.log("user input success");
        return true;
    } else{
        console.log("user input failure");
        return false;
    }
}

// DEBUG -- there is a bug where if you quit out before setTimeout is complete, it will continue to change the sub_message.
function celebration(i){
    switch(i){
            case 0:
                sub_message.textContent = "You da man!";
                console.log(i)
                break;
            case 1:
                sub_message.textContent = "Yippee!";
                console.log(i)
                break;
            case 2:
                sub_message.textContent = "Encore!";
                console.log(i)
                break;
    }
}

// MAIN
initial_message()