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


const ctx = document.getElementById("chart");

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