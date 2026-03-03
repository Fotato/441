// html element constant
const statistics_display = document.getElementById("statistics_display");

function fetch_statistics()
{
    let player_info = JSON.parse(localStorage.getItem("player_info"));
    statistics_display.insertAdjacentHTML("beforeend",`<p>Name: ${player_info.first_name} ${player_info.last_name}</p>`);
    statistics_display.insertAdjacentHTML("beforeend",`<p>Age: ${player_info.age}</p>`);
    statistics_display.insertAdjacentHTML("beforeend",`<p>Attempts: ${player_info.attempts}</p>`);
    //player_info.attempts = attempts;
    //localStorage.setItem("player_info",JSON.stringify(player_info));
}