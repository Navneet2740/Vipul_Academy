// Mobile menu

const toggle = document.getElementById("menu-toggle");
const nav = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
if(nav.style.display === "flex"){
nav.style.display = "none";
}else{
nav.style.display = "flex";
}
});


// testimonial slider

const testimonials = [
{
text: "Best coaching institute. Teachers explain concepts very clearly.",
name: "— Rohan, Class 10"
},
{
text: "My maths improved a lot after joining Vipul Academy.",
name: "— Priya, Class 8"
},
{
text: "Very supportive teachers and weekly tests helped me score 95%.",
name: "— Arjun, Class 9"
}
];

let index = 0;

setInterval(()=>{

index++;

if(index >= testimonials.length){
index = 0;
}

document.getElementById("testimonial-text").innerText =
testimonials[index].text;

document.getElementById("testimonial-name").innerText =
testimonials[index].name;

},4000);