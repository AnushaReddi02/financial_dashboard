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


// SHOW FORM
const addBtn = document.querySelector(".add-btn");
const form = document.getElementById("formContainer");

if (addBtn) {
    addBtn.addEventListener("click", () => {
        form.style.display = form.style.display === "none" ? "block" : "none";
    });
}


// ADD TRANSACTION (frontend only)
function addTransaction() {
    const category = document.getElementById("newCategory").value;
    const amount = document.getElementById("newAmount").value;
    const type = document.getElementById("newType").value;

    if (!category || !amount) {
        alert("Please fill all fields");
        return;
    }

    const tableBody = document.getElementById("tableBody");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${new Date().toISOString().split("T")[0]}</td>
        <td>₹${amount}</td>
        <td class="category">${category}</td>
        <td>${type}</td>
    `;

    tableBody.appendChild(row);

    // ✅ Clear form
    document.getElementById("newCategory").value = "";
    document.getElementById("newAmount").value = "";

    // ✅ CLOSE FORM AFTER ADDING
    document.getElementById("formContainer").style.display = "none";
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