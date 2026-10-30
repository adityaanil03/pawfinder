document.addEventListener("DOMContentLoaded", function () {

    const lostForm = document.getElementById("lostForm");
    const foundForm = document.getElementById("foundForm");
    const reportList = document.getElementById("reportList");

    let reports = JSON.parse(localStorage.getItem("petReports")) || [];

    function displayReports() {
        reportList.innerHTML = "";

        if (reports.length === 0) {
            reportList.innerHTML = "<p>No pet reports yet.</p>";
            return;
        }

        reports.forEach(function (report) {
            const card = document.createElement("div");
            card.style.background = "#f5f7fa";
            card.style.padding = "15px";
            card.style.margin = "15px 0";
            card.style.borderRadius = "10px";

            card.innerHTML = `
                <h3>${report.status} Pet</h3>
                <p><strong>Name/Type:</strong> ${report.pet}</p>
                <p><strong>Location:</strong> ${report.location}</p>
                <p><strong>Contact:</strong> ${report.contact}</p>
                <p><strong>Description:</strong> ${report.description}</p>
            `;

            reportList.appendChild(card);
        });
    }

    function saveReport(form, status) {
        const data = new FormData(form);

        const report = {
            status: status,
            pet: data.get("petName") || data.get("petType"),
            location: data.get("location"),
            contact: data.get("contact"),
            description: data.get("description")
        };

        reports.unshift(report);
        localStorage.setItem("petReports", JSON.stringify(reports));

        displayReports();
        alert(status + " pet report added successfully! 🐾");
        form.reset();
    }

    lostForm.addEventListener("submit", function (event) {
        event.preventDefault();
        saveReport(lostForm, "Lost");
    });

    foundForm.addEventListener("submit", function (event) {
        event.preventDefault();
        saveReport(foundForm, "Found");
    });

    displayReports();

});
