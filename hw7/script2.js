// associate constant variable to html element
const game_container = document.getElementById("game_container");

// associate constant variable to html element: scoreboard
const scoreboard = document.getElementById("scoreboard")

// This is the main (master) array that is associated with all available card fronts
const card_front_master_array = ["img/card_front_1.png", "img/card_front_2.png", "img/card_front_3.png", "img/card_front_4.png", "img/card_front_5.png", "img/card_front_6.png"];
// This is a mutable secondary array that stores all available card_fronts
var card_front_double_array = new Array();
// This is a mutable third array that store all double cards in a shuffled format
var card_front_double_shuffle_array = new Array();

function create_card_front_double_array()
{
    // This loop tracks where the cursor is within the card_front_master_array
    for (mi = 0; mi < card_front_master_array.length; mi++)
    {    
        // This loop repeats twice, appending the card_front_master_array's current index value.
        for (di = 0; di < 2; di++)
        {
            card_front_double_array.push(card_front_master_array[mi])
        }
    }
}

// worlds least efficient shuffle algorithm
function shuffle_card_front_double_array()
{
    let used_random_numbers = new Array();
    // ghetto way of making an array with a dynamic length
    for (di = 0; di < card_front_double_array.length; di++)
    {
        used_random_numbers.push(null)
        card_front_double_shuffle_array.push("")
    }

    for (di = 0; di < card_front_double_array.length; di++)
    {
        let random_number = Math.floor(Math.random() * card_front_double_array.length);
        let random_number_failure = false;
        for (uri = 0; uri < used_random_numbers.length; uri++)
        {
            if (random_number === used_random_numbers[uri])
            {
                // logic switch that tells the loop to either repeat or continue.
                random_number_failure = true;
            }
        }
        if (random_number_failure != true)
        {
            used_random_numbers[di] = random_number;
            card_front_double_shuffle_array[random_number] = card_front_double_array[di];
        }
        else
        {
            //repeat loop
            di--;
        }
    }

}

// lays out a grid that will always have 4 wide rows (though you can change the modulus math and it will display differently).
function arrange_cards()
{
    for(si = 0; si < card_front_double_shuffle_array.length; si++)
    {
        game_container.insertAdjacentHTML("beforeend", `<img id=\"card${si}\" src=\"img/card_back.png\" onclick=\"flip_card(${si});\">`)

        // cannot use modulus correctly if you don't add one. Remember the difference between index numbers and the item number.
        if ((si + 1)%4 === 0)
        {
            game_container.insertAdjacentHTML("beforeend", "<br>");
        }
    }
}

var counter = 0;
var attempts = 0;
var success_counter = 0;
var card_pick_list = new Array();

function flip_card(card_number)
{
    // you can control the flip card via a modulus
    counter++;
    // this detects if a card has already been flipped
    if (counter % 2 === 0)
    {   // using the card_pick_list could cause major issues if it is a string...
        if (card_front_double_shuffle_array[card_number] === card_front_double_shuffle_array[card_pick_list[0]] && card_number !== card_pick_list[0])
        {
            document.getElementById("card" + card_number).src = card_front_double_shuffle_array[card_number];
            document.getElementById("scoreboard").textContent = "They Match!";
            console.log("They match!");
            
            // if the cards matched, the history of card picks no longer matters. Delete the history.
            card_pick_list = [];
            success_counter++;
        }
        else
        {
            document.getElementById("card" + card_number).src = card_front_double_shuffle_array[card_number];
            document.getElementById("scoreboard").textContent = "They Don't Match!";
            console.log("The don't match.");
            card_pick_list.push(Number(card_number));
        }
        attempts++;
    }
    else
    {
        // if the card picked is the third in the series and after a unsuccessful match.
        if (counter >= 3 && card_pick_list.length !== 0)
        {
            document.getElementById("card" + card_pick_list[0]).src = "img/card_back.png";
            document.getElementById("card" + card_pick_list[1]).src = "img/card_back.png";
            card_pick_list = [];
        }
        document.getElementById("card" + card_number).src = card_front_double_shuffle_array[card_number];
        // not sure if I need to use Number... worried that it will store this as a string...
        card_pick_list.push(Number(card_number));
    }
    // check if the player has won. compare the total matches against the total possible matches.
    if (success_counter === (card_front_double_shuffle_array.length/2))
    {
        console.log("The player has won!");
        document.getElementById("scoreboard").textContent = "Congratulations! You Won!!!!";
        let player_info = JSON.parse(localStorage.getItem("player_info"));
        player_info.attempts = attempts;
        localStorage.setItem("player_info",JSON.stringify(player_info));

        setTimeout(()=>{window.location="page3.html"}, 3000);
    }
}

// START
create_card_front_double_array();
console.log("Before Shuffle:");
console.log(card_front_double_array);

console.log("After Shuffle:");
shuffle_card_front_double_array();
console.log(card_front_double_shuffle_array);
