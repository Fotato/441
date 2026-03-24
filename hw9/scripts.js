// Images
const img_array = ["./imgs/greenest_cloud.png","./imgs/green.png","./imgs/desert.png","./imgs/desert_cloud.png","./imgs/green_cloud.png"];
const text_array = ["Drink when water is plentiful.","Sleep when Summer comes.","Let the dying waste envelop you,","for soon the clouds..."," will touch your skin."];
const shape_array = [5,10,15,20,25,30,35,40,45,50];

function image_change_right(index)
{
    $("#main_image")
    .attr("src",img_array[index])
    .animate({opacity: "1"},500)
    .animate({left: "640px"}, 2500)
    .animate({opacity: "0.2"},1000)

    $("#title")
    .text(text_array[index])
    .animate({opacity: "1"},500)
    .animate({left: "640px"}, 2500)
    .animate({opacity: "0.0"},1000)
}

function image_change_left(index)
{
    $("#main_image")
    .attr("src",img_array[index])
    .animate({opacity: "1"},500)
    .animate({left: "0px"}, 2500)
    .animate({opacity: "0.0"},1000)

    $("#title")
    .text(text_array[index])
    .animate({opacity: "1"},500)
    .animate({left: "0px"}, 2500)
    .animate({opacity: "0.2"},1000)
}

function image_return_default()
{
    $("#main_image")
    .attr("src",img_array[0])
    .animate({opacity: "1"},500)
    .animate({left: "0px"}, 2500)

    $("#title")
    .text(text_array[0])
    .attr("src",img_array[0])
    .animate({opacity: "1"},500)
    .animate({left: "0px"}, 2500)
}

function modify_shape(shape_num,r,g,b)
{
    random_border = shape_array[Math.floor(Math.random() * shape_array.length)];
    console.log(random_border);

    $(`#shape_${shape_num}`)
    .css
    ({
        "background-color": `rgb(${r}, ${b}, ${g})`,
        "width": "100px",
        "height":"100px"
    })
    .animate
    ({
        "border-radius": `${random_border}px`,
    },1000);
}

// START HERE
$(document).ready(function ()
{
    image_change_right(0);
    modify_shape(1,150,0,30);

    setTimeout(()=>image_change_left(1),4000);
    setTimeout(()=>modify_shape(2,Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255)),4000);

    setTimeout(()=>image_change_right(2),8000);
    setTimeout(()=>modify_shape(3, Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255)),8000);

    setTimeout(()=>image_change_left(3),12000);
    setTimeout(()=>modify_shape(1, Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255)),12000);

    setTimeout(()=>image_change_right(4),16000);
    setTimeout(()=>modify_shape(2, Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255)),16000);

    setTimeout(()=>image_return_default(),20000);
    setTimeout(()=>modify_shape(3, Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255)),20000);

});