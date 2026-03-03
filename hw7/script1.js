// HTML constants
const first_name_input = document.getElementById("first_name");
const last_name_input = document.getElementById("last_name");
const age_input = document.getElementById("age");

// validates player information and places it into json.
function submit_player_info()
{
    let fn = first_name_input.value;
    let ln = last_name_input.value;
    let age = Number(age_input.value);
    
    console.log(fn + " : " + typeof(fn));
    console.log(ln + " : " + typeof(ln));
    console.log(age + " : " + typeof(age));

    // why is javascript so bad with numbers? NaN? 0? how cow is a "number"?!
    if (typeof(fn) === "string" && typeof(ln) === "string" && age !== 0)
    {
        console.log("player information success");
        var player_info = {
        "first_name": fn,
        "last_name": ln,
        "age": age,
        "attempts" : 0
        };
        localStorage.setItem("player_info",JSON.stringify(player_info));
        goto_page2();
    } 
    else
    {
        console.log("player information failure");
    }
}

function goto_page2()
{
    window.location = "page2.html";
    console.log("lol")
}