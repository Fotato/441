// associate constant variables to elements
const header1 = document.getElementById("header1");
const message_display = document.getElementById("message_display");
const message = document.getElementById("message");
const option_display = document.getElementById("option_display");

// create a generic prompt paragraph element
const prompt_text = document.createElement("p")
prompt_text.textContent = "What do you do next?"
prompt_text.className = "p_prompt"

function initial_message(){
    header1.textContent = "Welcome" + " " + "To Your Life!";
    message.textContent = "It's time to live your life! Screw fatalism, you're the one in control. Select from the options below to enable your character to live the best possible life. No pressure.";
    
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

    header1.textContent = "The Sun Rises...";
    message.textContent = "Your dreams are sweet and pillow-soft, but you are suddenly awoken by an incessant alarm. You reach over and switch it off."
    message_display.appendChild(prompt_text);

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
        message.textContent = "You awaken once more, this time without your alarm's assistance. Its plastic face seems disappointment as it displays the time: 11:30 am! Oh God! Your boss is going to kill you and the half-dozen missed calls on your phone only serves to exacerbate your worry.";
        
        option1.textContent = "Go to work";
        option1.addEventListener("click", ()=> night_phase(1));
        option2.textContent = "Go back to sleep";
        option2.addEventListener("click", ()=> night_phase(2));
        option3.textContent = "Return the missed calls";
        option3.addEventListener("click", ()=> night_phase(3));
    } else if (previous_choice == 2){
        header1.textContent = "Another day...";
        message.textContent = "You're tired, but that's to be expected since you're getting older. In a blur of routine your prepare yourself and catch the bus. Soon after you arrive at work. Your coworker, Shane, tells you a corny joke.";
        
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
    //header1.textContent = "Night Has Come At Last...";

    if (previous_choice == 1){
        header1.textContent = "The Walk Of Shame...";
        message.textContent = "It is well past noon when you finally arrive at work. Everyone is busy with their dull day-to-day. Your boss calls you into their office. He is angry and he yells at you for a half-hour. Afterward you leave the office disheveled. At least you weren't fired. You sit down at your desk and check your emails. It seems your luck has changed! In your inbox is a email from affluent african prince--you stand to gain millions. Your boss is a chump, he'll see."
        prompt_text.textContent = "$ $ $ Cha-Ching $ $ $";
    } else if (previous_choice == 2){
        header1.textContent = "What A Strange Dream...";
        message.textContent = "You dream about your boss chasing you down a long hallway. You try your best to sprint, but your legs are like lead. The moment before he catches you, you wake with a start. Sweat beads your brow. It was only a dream! Thank god! Suddenly, a floorboard creeks and you look up. Looming in the shrouded corner of your room stands an imposing man in three-piece suit. You do not recognize this man, but you have no doubt as to your boss's involvement. The imposing man cracks his knuckles.";
        prompt_text.textContent = "You Probably should've gone to work.";
    } else if (previous_choice == 3){
        header1.textContent = "Future, Past, Present...";
        message.textContent = "You return one of the missed calls thinking it to be your boss or his secretary. Strangely neither picks up and instead an old man answers. He speaks between fits of laughter, \"I haven't much, time, but I'm, you from the future! I know, this won't, make sense right now, but don't, laugh, at Shane's joke!\" Before you can answer he hangs up."
        prompt_text.textContent = "What could it mean?"
    
    } else if (previous_choice == 4){
        header1.textContent = "Hilarity To Horror...";
        message.textContent = "You laugh at Shane's joke. It was just what you needed. In the world of routine and constant déjà vu Shane's stupid jokes keep you alive. Of course the joke wasn't that funny, but you can't stop laughing. Oh no! You can't stop laughing! Tears start streaming down your cheeks; the jubilation you once felt turns to panic. This intensifies the laughter until Shane takes a step back. He says something, but you can't hear it over your billowing laughter."
        prompt_text.textContent = "Too much of a good thing, I guess."
    } else if (previous_choice == 5){
        header1.textContent = "Hilarity To Hostility...";
        message.textContent = "You don't laugh. Shane stands there, the curtail of his joke flaccid in the stifling silence. You stand there as well, inexpressive, vacant, hollow, rude. What the heck is wrong with you? Shane is a nice guy! \"What the heck is wrong with you,\" says Shane. Overwhelmed with the injustice of his joke's reception, he lunges forward and grabs you. Adrenalin courses through his body as he picks you up with a roar. You're terrified. You plead with him, but he cannot hear you from beyond the red veil."
        prompt_text.textContent = "This will hurt."
    } else if (previous_choice == 6){
        header1.textContent = "Hilarity To Promotion...";
        message.textContent = "You cut Shane's joke short and begin a new, better joke. At its conclusion he looks skeptically at you: unimpressed. Thankfully your boss heard it and pushes Shane aside. Roaring with laughter he beams down at you like how your father did when you were young. He finally sees you; he's proud of you at last."
        prompt_text.textContent = "Papa?"
    } else if (previous_choice == 7){
        header1.textContent = "Barefaced Liar...";
        message.textContent = "You answer the door. Your boss's secretary looks at you inquisitively. You try to muster another oscar-worthy act, but in your lethargy and bed-rottenness you can only manage indifference. The jig is up. She hands you two gatorade bottles and turns on her heel. You watch her as she walks away, her hair swishing austerely."
        prompt_text.textContent = "You should probably fix up your Résumé."
    } else if (previous_choice == 8){
        header1.textContent = "Open Sesame...";
        message.textContent = "You pretend to be asleep. A minute later the knocking stops. Then an insidious sensation creeps up your spine. Through lids nearly shut you see the secretary approach your bedroom window. Shockingly, she jimmies the window open and crawls through. You want to spring up and shout at her, but then you'd be found out. So instead you lay still and wait. She creeps forward and sets two bottles of gatorade, red flavor, on your nightstand. She sits at the edge of the bed and begins to hum a lullaby. You are not soothed and you suppress shivers of fear."
        prompt_text.textContent = "Mommy?"
    } else{
        header1.textContent = "Not Enough REM...";
        message.textContent = "A day filled with napping turns quickly to panic as you rush to your bedroom window. You throw it open and plunge through. Unfortunately in your bleariness you forgot that you didn't live in an apartment complex and that your house didn't have a fire escape. Instead of a great escape, you tumble through the hedge planted below your window. In the commotion of snapping branches and exclamation of pain your boss's secretary runs up to the bush. \"Oh my God! Are you okay?!\""
        prompt_text.textContent = "Hope you can muster another oscar-worthy performance."
    }
}

// MAIN
initial_message();