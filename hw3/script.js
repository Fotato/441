//initial console message with things I like!
console.log("https://www.bay12games.com/dwarves/ https://www.youtube.com/ https://isitchristmas.com/");
console.log("Dwarf Fortress, Foxhole, Factorio");
console.log("Frank Frazetta: known for the modern Conan aesthetic, Norman Rockwell: known for realistic slice of life oil paintings, Jerry Gretzinger: created Jerry's Map");

//upon initialization ask the following question
var universal_answer = prompt("What is the answer to the Ultimate Question of Life, the Universe, and Everything?");

//validate the answer
if(universal_answer == 42){
    window.alert("Correct. What does it mean though?")
} else {
    window.alert("That can't be right.")
};

// emotional_face is a constant, meaning constant reference
// per w3schools () "It does not define a constant value. It defines a constant reference to a value."
// https://www.w3schools.com/JS/js_const.asp
const emotional_face = document.getElementById("emotional_face");
const message1 = document.getElementById("message1");

const smile = "imgs/smile_500x500.png";
const surprise = "imgs/surprise_500x500.png";
const mad = "imgs/mad_500x500.png";

//variable that tracks if the picture has been clicked
var clicked = false;

/*
hover interactivity

emotional_face == element in html
addEventListener == a thing that is constantly listening for something to happen
mouseover == if the mouse is hovering over the element
()=> Arrow Function aka run a function, in this case a simple if statement so long as the eventlistener is activated. empty parenthesis are inputs
or parameters that take arguments. in this case i've passed it the event argument and used it to print to the console. it is not required and can be empty.

it is important to note that the reason why the function exists instead of {} with code in them is because the webpage would execute the code the moment it is read.
this is the difference between defining a function and immediately calling it
*/
emotional_face.addEventListener("mouseover",(e) =>{
    //if NOT clicked
    if(!clicked){
        console.log(e)
        //use .src for images
        emotional_face.src = surprise;
        //use textContent for text
        message1.textContent = "DON'T CLICK ME!";
    }
});

//non-hover interactivity
// i've used function instead of an arrow function. this is another way to accomplish the same result as the arrow function.
emotional_face.addEventListener("mouseleave",function(){
    //if NOT clicked
    if(!clicked){
        emotional_face.src = smile;
        message1.textContent = "don't click me";
    }
});

//click interactivity

//this is yet another way to accomplish the same result as the above two eventlisteners
//here i've defined the function to be run when the image is clicked
function click_func(){
    // flips a switch so to speak and freezes the face to mad.
    clicked = true;
    //if clicked
    if(clicked = true){
        emotional_face.src = mad;
        message1.textContent = "I TOLD YOU NOT TO DO IT >:("
    }
};

//it is important to note that i have purposefully excluded the parenthesis because if i included it the function would immediately execute upon load
//click_func is a reference to the function
//click_func() is the function and will be executed, think about calling the function just by itself, click_func(), it makes sense that it would execute immediately.
emotional_face.addEventListener("click",click_func);