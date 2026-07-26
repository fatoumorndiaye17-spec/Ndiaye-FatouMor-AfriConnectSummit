
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