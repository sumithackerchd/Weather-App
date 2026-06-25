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

const toggle = document.querySelector(".darkBtn");

if (toggle) {

    toggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            toggle.innerHTML = "☀️";

        } else {

            toggle.innerHTML = "🌙";

        }

    });

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