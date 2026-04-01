// ROLE SWITCHER
let role = "viewer";

document.getElementById("roleSwitcher")?.addEventListener("change", (e) => {
    role = e.target.value;
    alert("Role switched to " + role);

    if (role === "admin") {
        document.body.classList.add("admin");
    } else {
        document.body.classList.remove("admin");
    }
});


// CHART (only run if chart exists)
const ctx = document.getElementById("chart");
if (ctx) {
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Income", "Expenses"],
            datasets: [{
                label: "Finance Overview",
                data: [5000, 1500],
            }]
        }
    });
}


// 🔍 SEARCH FUNCTIONALITY
const searchInput = document.getElementById("search");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        const value = this.value.toLowerCase();
        const rows = document.querySelectorAll("#tableBody tr");

        rows.forEach(row => {
            const category = row.querySelector(".category").textContent.toLowerCase();

            if (category.includes(value)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
}