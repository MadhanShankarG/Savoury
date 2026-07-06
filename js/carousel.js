/*
  Reusable carousel.

    <section class="carousel">
        <button class="carousel-arrow prev">&#10094;</button>
        <h1>...</h1>
        <p>...</p>
        <button class="carousel-arrow next">&#10095;</button>
        <div class="carousel-dots"></div>
    </section>

    <script src="../js/carousel.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            initCarousel(".carousel", [
                "https://images.unsplash.com/photo-xxxx?w=1400",
                "https://images.unsplash.com/photo-yyyy?w=1400"
            ]);
        });
    </script>

  Leave the .carousel-dots container empty in the HTML - dots are
  generated automatically to match however many images you pass in.
*/

function initCarousel(carouselSelector, images, options) {
    options = options || {};
    var interval = options.interval || 10000;
    var overlay = options.overlay || "linear-gradient(rgba(43,33,24,.55),rgba(43,33,24,.35))";

    var carousel = document.querySelector(carouselSelector);
    if (!carousel || !images || images.length === 0) return;

    var dotsContainer = carousel.querySelector(".carousel-dots");
    var prevBtn = carousel.querySelector(".carousel-arrow.prev");
    var nextBtn = carousel.querySelector(".carousel-arrow.next");

    var current = 0;
    var timer = null;

    // Build dot elements to match the number of images
    if (dotsContainer) {
        dotsContainer.innerHTML = "";
        images.forEach(function (_, i) {
            var dot = document.createElement("span");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", function () {
                showSlide(i);
                restartAutoplay();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function dotEls() {
        return dotsContainer ? dotsContainer.querySelectorAll("span") : [];
    }

    function showSlide(index) {
        current = (index + images.length) % images.length;
        carousel.style.background = overlay + ', url("' + images[current] + '")';
        carousel.style.backgroundSize = "cover";
        carousel.style.backgroundPosition = "center";

        var dots = dotEls();
        dots.forEach(function (dot) { dot.classList.remove("active"); });
        if (dots[current]) dots[current].classList.add("active");
    }

    function restartAutoplay() {
        if (timer) clearInterval(timer);
        timer = setInterval(function () { showSlide(current + 1); }, interval);
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            showSlide(current + 1);
            restartAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            showSlide(current - 1);
            restartAutoplay();
        });
    }

    showSlide(0);
    restartAutoplay();
}