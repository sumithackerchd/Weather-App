// =========================
// Weather App Pro
// script.js
// =========================

// Fade animation
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

// Ripple Effect on Button
const button = document.querySelector("button");

if (button) {

    button.addEventListener("click", function(e) {

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = this.getBoundingClientRect();

        ripple.style.left = e.clientX - rect.left + "px";

        ripple.style.top = e.clientY - rect.top + "px";

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

    });

}

// Input Focus Effect

const input = document.querySelector("input");

if(input){

input.addEventListener("focus",()=>{

input.style.boxShadow="0 0 25px rgba(0,255,255,.7)";

});

input.addEventListener("blur",()=>{

input.style.boxShadow="none";

});

}

// Card Hover Animation

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-10px) scale(1.05)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0) scale(1)";

});

});

// Dark Mode

const toggle=document.createElement("button");

toggle.innerHTML="🌙";

toggle.className="darkBtn";

document.body.appendChild(toggle);

let dark=false;

toggle.onclick=()=>{

dark=!dark;

if(dark){

document.body.style.background="linear-gradient(135deg,#111827,#000000)";

toggle.innerHTML="☀";

}else{

document.body.style.background="linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)";

toggle.innerHTML="🌙";

}

}

// Floating Background

for(let i=0;i<25;i++){

let bubble=document.createElement("div");

bubble.className="bubble";

bubble.style.left=Math.random()*100+"vw";

bubble.style.animationDuration=(5+Math.random()*8)+"s";

bubble.style.width=(10+Math.random()*40)+"px";

bubble.style.height=bubble.style.width;

document.body.appendChild(bubble);

}

// Clock

const clock=document.createElement("div");

clock.className="clock";

document.body.appendChild(clock);

setInterval(()=>{

let d=new Date();

clock.innerHTML=d.toLocaleTimeString();

},1000);