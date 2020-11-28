/***Login page logos animations***/

//animation for logo with icon
document.addEventListener(
    "DOMContentLoaded",
    () => {
        function animateSgv(id, delay, delayIncrement, delayFill) {
            const logo = document.getElementById(id);
            const logoPaths = document.querySelectorAll(`#${id} path`);
            delay = delay;
            for (let i = 0; i < logoPaths.length; i++) {
                logoPaths[i].style.strokeDasharray = logoPaths[i].getTotalLength();
                logoPaths[i].style.strokeDashoffset = logoPaths[i].getTotalLength();
                logoPaths[i].style.animation = `line-anim 1s ease-out forwards ${delay}s`;
                delay += delayIncrement;
                console.log(delay);
            }
            logo.style.animation = `fill 1s linear forwards ${delayFill}s`;
        }
        // Set the id of SVG, delay time in seconds to start animation, delay between each stroke animation and delay between stroke and fill animations
        animateSgv("logoIcon", 0, 0.1, 1.1);
    },
    false
);

//animation for logo without icon
document.addEventListener(
    "DOMContentLoaded",
    () => {
        function animateSgv(id, delay, delayIncrement) {
            const logo = document.getElementById(id);
            const logoPaths = document.querySelectorAll(`#${id} path`);
            delay = delay;
            for (let i = 0; i < logoPaths.length; i++) {
                logoPaths[i].style.strokeDasharray = logoPaths[i].getTotalLength();
                logoPaths[i].style.strokeDashoffset = logoPaths[i].getTotalLength();
                logoPaths[i].style.animation = `line-anim 2s ease forwards ${delay}s`;
                delay += delayIncrement;
                console.log(delay);
            }
            logo.style.animation = `fill 0.5s ease-out forwards ${delay}s`;
        }
        // Set the id of SVG, delay time in seconds to start animation and delay between each animation
        animateSgv("logoTypography", 0, 0.1);
    },
    false
);
