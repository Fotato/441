// associate constant variable to html element
const game_container = document.getElementById("game_container");

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

function flip_card(card_number)
{
    document.getElementById("card" + card_number).src = card_front_double_shuffle_array[card_number];
}

// START
create_card_front_double_array();
console.log("Before Shuffle:");
console.log(card_front_double_array);

console.log("After Shuffle:");
shuffle_card_front_double_array();
console.log(card_front_double_shuffle_array);
