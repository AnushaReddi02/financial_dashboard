// ================= ROLE SWITCHER =================
let role = localStorage.getItem("role") || "viewer";

const roleSwitcher = document.getElementById("roleSwitcher");

if (roleSwitcher) {
    roleSwitcher.value = role;

    roleSwitcher.addEventListener("change", (e) => {
        role = e.target.value;
        localStorage.setItem("role", role);

        alert("Role switched to " + role);

        applyRoleUI();
    });
}

function applyRoleUI() {
    const addBtn = document.querySelector(".add-btn");

    if (!addBtn) return;

    if (role === "admin") {
        addBtn.style.display = "inline-block";
    } else {
        addBtn.style.display = "none";
    }
}

applyRoleUI();


// ================= CHART =================
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


// ================= ADD TRANSACTION (NEW PAGE) =================
function submitTransaction() {
    const category = document.getElementById("category")?.value;
    const amount = document.getElementById("amount")?.value;
    const type = document.getElementById("type")?.value;

    if (!category || !amount) {
        alert("Please fill all fields");
        return;
    }

    let data = JSON.parse(localStorage.getItem("transactions")) || [];

    data.push({
        date: new Date().toISOString().split("T")[0],
        amount,
        category,
        type
    });

    localStorage.setItem("transactions", JSON.stringify(data));

    alert("Transaction added successfully!");

    window.location.href = "/transactions";
}


// ================= LOAD TRANSACTIONS =================
function loadTransactions() {
    const tableBody = document.getElementById("tableBody");
    if (!tableBody) return;

    let localData = JSON.parse(localStorage.getItem("transactions")) || [];

    // Append ONLY localStorage data (keep existing EJS rows)
    localData.forEach((t, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${t.date}</td>
            <td>₹${t.amount}</td>
            <td class="category">${t.category}</td>
            <td>${t.type}</td>
            <td>
                <button class="delete-btn" onclick="deleteTransaction(${index})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


// ================= DELETE =================
function deleteTransaction(index) {
    const confirmDelete = confirm("Are you sure you want to delete this transaction?");

    if (!confirmDelete) return;

    let data = JSON.parse(localStorage.getItem("transactions")) || [];

    data.splice(index, 1);

    localStorage.setItem("transactions", JSON.stringify(data));

    alert("Transaction deleted!");

    loadTransactions();
}


// ================= SEARCH =================
const searchInput = document.getElementById("search");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        const value = this.value.toLowerCase();
        const rows = document.querySelectorAll("#tableBody tr");

        rows.forEach(row => {
            const category = row.querySelector(".category").textContent.toLowerCase();

            row.style.display = category.includes(value) ? "" : "none";
        });
    });
}


// ================= INIT =================
loadTransactions();