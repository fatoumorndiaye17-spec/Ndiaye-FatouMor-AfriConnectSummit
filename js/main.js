// Dark Mode avec localStorage

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");

    if(themeIcon){
        themeIcon.classList.replace("bi-moon","bi-sun");
    }
}

if(themeToggle){
    themeToggle.addEventListener("click", function(){
        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){
            localStorage.setItem("theme","dark");

            if(themeIcon){
                themeIcon.classList.replace("bi-moon","bi-sun");
            }
        }else{
            localStorage.setItem("theme","light");

            if(themeIcon){
                themeIcon.classList.replace("bi-sun","bi-moon");
            }
        }
    });
}


// Menu hamburger responsive

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if(menuToggle){
    menuToggle.addEventListener("click", function(){
        navLinks.classList.toggle("active");
    });
}

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function(item){
    item.addEventListener("click", function(){
        navLinks.classList.remove("active");
    });
});


// Navbar qui change au scroll

const header = document.querySelector(".header");

window.addEventListener("scroll", function(){
    if(window.scrollY > 50){
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.15)";
    }else{
        header.style.boxShadow = "none";
    }
});


// Bouton retour en haut

const backToTop = document.getElementById("backToTop");

if(backToTop){
    window.addEventListener("scroll", function(){
        if(window.scrollY > 400){
            backToTop.style.display = "flex";
        }else{
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", function(){
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    });
}


// Année dynamique dans le footer

const year = document.getElementById("year");

if(year){
    year.textContent = new Date().getFullYear();
}

// COMPTE A REBOURS

const countdownNumbers=document.querySelectorAll(".countdown span");

if(countdownNumbers.length===4){

const eventDate=new Date("September 15, 2026 09:00:00").getTime();

setInterval(()=>{

const now=new Date().getTime();
const distance=eventDate-now;

if(distance>0){

const days=Math.floor(distance/(1000*60*60*24));
const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
const minutes=Math.floor((distance%(1000*60*60))/(1000*60));
const seconds=Math.floor((distance%(1000*60))/1000);

countdownNumbers[0].textContent=days;
countdownNumbers[1].textContent=hours;
countdownNumbers[2].textContent=minutes;
countdownNumbers[3].textContent=seconds;

}

},1000);

}


// ONGLET PROGRAMME

const tabButtons=document.querySelectorAll(".tab-button");
const tabContents=document.querySelectorAll(".tab-content");

tabButtons.forEach(button=>{

button.addEventListener("click",()=>{

tabButtons.forEach(btn=>{

btn.classList.remove("active");
btn.setAttribute("aria-selected","false");

});


tabContents.forEach(content=>{

content.classList.remove("active");

});


button.classList.add("active");
button.setAttribute("aria-selected","true");


const day=button.dataset.day;
const selectedContent=document.getElementById(day);

if(selectedContent){

selectedContent.classList.add("active");

}

});

});


// FILTRE DES INTERVENANTS

const filterButtons=document.querySelectorAll(".filter-button");
const speakerCards=document.querySelectorAll(".speaker-card");


filterButtons.forEach(button=>{

button.addEventListener("click",()=>{


filterButtons.forEach(btn=>{

btn.classList.remove("active");

});


button.classList.add("active");


const filter=button.dataset.filter;


speakerCards.forEach(card=>{


if(filter==="all" || card.dataset.category===filter){

card.style.display="";

}else{

card.style.display="none";

}


});


});

});


// COMPTEURS ANIMES

const counters=document.querySelectorAll(".counter");


const counterObserver=new IntersectionObserver(entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


const counter=entry.target;
const target=Number(counter.textContent);

let value=0;


const animation=()=>{


value+=Math.ceil(target/100);


if(value<target){

counter.textContent=value;
requestAnimationFrame(animation);

}else{

counter.textContent=target;

}


};


animation();

counterObserver.unobserve(counter);


}


});


},{threshold:0.5});


counters.forEach(counter=>{

counterObserver.observe(counter);

});


// ANIMATION AU SCROLL

const revealElements=document.querySelectorAll(".reveal");


const revealObserver=new IntersectionObserver(entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.classList.add("show");

revealObserver.unobserve(entry.target);

}


});


},{threshold:0.15});


revealElements.forEach(element=>{

revealObserver.observe(element);

});

// VALIDATION DU FORMULAIRE

const contactForm=document.getElementById("contact-form");

if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault();

const fullname=document.getElementById("fullname");
const email=document.getElementById("email");
const phone=document.getElementById("phone");
const participation=document.getElementById("participation");
const country=document.getElementById("country");
const message=document.getElementById("message");
const successMessage=document.getElementById("success-message");

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex=/^(\+221)?\s?(7[05678])[0-9\s]{7,12}$/;

let valid=true;

document.querySelectorAll(".error-message").forEach(function(error){
error.textContent="";
});

successMessage.textContent="";

if(fullname.value.trim().length<3){
fullname.nextElementSibling.textContent="Veuillez saisir votre nom complet.";
valid=false;
}

if(!emailRegex.test(email.value.trim())){
email.nextElementSibling.textContent="Adresse email invalide.";
valid=false;
}

if(!phoneRegex.test(phone.value.trim())){
phone.nextElementSibling.textContent="Numéro de téléphone invalide.";
valid=false;
}

if(participation.value===""){
participation.nextElementSibling.textContent="Choisissez un type de participation.";
valid=false;
}

if(country.value===""){
country.nextElementSibling.textContent="Choisissez votre pays.";
valid=false;
}

if(message.value.trim().length<20){
message.nextElementSibling.textContent="Votre message doit contenir au moins 20 caractères.";
valid=false;
}

if(valid){

successMessage.textContent="Votre inscription a été envoyée avec succès.";

contactForm.reset();

}

});

}

/*======================================================
OPTIMISATION RESPONSIVE ET CORRECTION
======================================================*/

window.addEventListener("resize",function(){

if(window.innerWidth>768 && navLinks){
    navLinks.classList.remove("active");
}

});
/* Vérification finale */

document.querySelectorAll("img").forEach(function(image){
    if(!image.alt){
        image.alt="Image AfriConnect Summit";
    }
});