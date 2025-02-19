document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll för navigeringslänkar
    const links = document.querySelectorAll("nav ul li a");
    
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            if (this.getAttribute("href").startsWith("#")) {
                event.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 50,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Skapa och visa "Scroll to Top"-knapp
    const scrollBtn = document.createElement("button");
    scrollBtn.innerText = "⬆";
    scrollBtn.id = "scrollTopBtn";
    document.body.appendChild(scrollBtn);

    scrollBtn.style.position = "fixed";
    scrollBtn.style.bottom = "20px";
    scrollBtn.style.right = "20px";
    scrollBtn.style.padding = "10px";
    scrollBtn.style.fontSize = "20px";
    scrollBtn.style.border = "none";
    scrollBtn.style.backgroundColor = "#1db954";
    scrollBtn.style.color = "#fff";
    scrollBtn.style.borderRadius = "50%";
    scrollBtn.style.cursor = "pointer";
    scrollBtn.style.display = "none";

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    scrollBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
