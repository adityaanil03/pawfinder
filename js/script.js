document.addEventListener("DOMContentLoaded", function () {

    const lostForm = document.getElementById("lostForm");
    const foundForm = document.getElementById("foundForm");

    lostForm.addEventListener("submit", function (event) {
        event.preventDefault();

        alert("Lost pet report submitted successfully! 🐾");
        lostForm.reset();
    });

    foundForm.addEventListener("submit", function (event) {
        event.preventDefault();

        alert("Found pet report submitted successfully! 🐾");
        foundForm.reset();
    });

});
