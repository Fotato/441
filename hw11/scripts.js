// borrowed plugin template from Michael Cassens
(function ($) {
  $.fn.country_display_plugin = function () {
    this.css("color", "rgb(247, 233, 214)");
    this.css("margin-left","25%");
    this.css("margin-right","25%");
    return this; // enables chaining
  };
}(jQuery));

// https://www.w3schools.com/jquery/ajax_getjson.asp
function get_countries()
{
    $(document).ready(function()
    {
        // callback function that passes the transformed array as an argument
        $.getJSON("data/countries.json",function(country_list)
        {
            // country_list is the list of countries
            // country is an individual country
            $.each(country_list, function(index, country)
            {
                let country_cell = `<div id=\"${country.name}\" class=\"individual_country_div\">`;
                // AI WAS USED HERE 100% IDK WHAT A BASE64 IMAGE IS.
                country_cell += `<img src=\"data:image/png;base64, ${country.flag}\">`;
                country_cell += `<h1>${country.name}</h1> (${country.isoAlpha3})`;
                country_cell += `<p>The currency used in ${country.name} is the <b><u>${country.currency.name}</u></b> (${country.currency.code})</p>`;
                country_cell += "</div>"

                $("#country_container").append(country_cell).country_display_plugin().fadeIn("5000");
            });
        })
    });
}

function search_country()
{
    return "#" + $("#country_search_field").val();
}