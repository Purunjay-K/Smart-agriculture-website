const form = document.getElementById("farmerForm");

const nameInput = document.getElementById("name");
const mobileInput = document.getElementById("mobile");
const emailInput = document.getElementById("email");
const plotInput = document.getElementById("plot");
const villageInput = document.getElementById("village");
const stageInput = document.getElementById("stage");
const soilInput = document.getElementById("soil");
const irrigationInput = document.getElementById("irrigation");
const moistureInput = document.getElementById("soilMoisture");
const dateInput = document.getElementById("date");

const tableBody = document.getElementById("farmerTableBody");
const clearAllBtn = document.getElementById("clearAllBtn");
const STORAGE_KEY = "registeredFarmers";

/* ---------- Saved records (localStorage) ---------- */

function loadFarmers() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
}

function saveFarmers(farmers) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(farmers));
    } catch (e) {
        // storage blocked: the table still works until the page is refreshed
    }
}

let farmers = loadFarmers();

function renderTable() {
    tableBody.innerHTML = "";

    if (farmers.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 12;
        cell.className = "text-center text-muted";
        cell.textContent = "No farmers registered yet.";
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }

    farmers.forEach(function(farmer, index) {
        const row = document.createElement("tr");

        const values = [
            index + 1,
            farmer.name,
            farmer.mobile,
            farmer.email,
            farmer.plot,
            farmer.village,
            farmer.stage,
            farmer.soil,
            farmer.irrigation,
            farmer.moisture + "%",
            farmer.date
        ];

        values.forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value; // textContent keeps typed text safe
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "btn btn-sm btn-outline-danger";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
            farmers.splice(index, 1);
            saveFarmers(farmers);
            renderTable();
        });
        actionCell.appendChild(deleteBtn);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

clearAllBtn.addEventListener("click", function() {
    if (farmers.length === 0) return;
    if (confirm("Delete all registered farmer records?")) {
        farmers = [];
        saveFarmers(farmers);
        renderTable();
    }
});

renderTable();

/* ---------- Validation ---------- */

function showError(input, message) {
    const error = document.getElementById(input.id + "Error");
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    error.textContent = message;
    error.style.display = "block";
}

function clearError(input) {
    const error = document.getElementById(input.id + "Error");
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    error.textContent = "";
    error.style.display = "none";
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let valid = true;

    // Task 2: Required text fields
    const farmerName = nameInput.value.trim();
    const plotId = plotInput.value.trim();
    const village = villageInput.value.trim();
    const namePattern = /^[A-Za-z ]+$/;

    if (farmerName === "") {
        showError(nameInput, "Farmer Name is required.");
        valid = false;
    } else if (!namePattern.test(farmerName)) {
        showError(nameInput, "Name must contain alphabetic characters and spaces only.");
        valid = false;
    } else {
        clearError(nameInput);
    }

    if (plotId === "") {
        showError(plotInput, "Plot ID is required.");
        valid = false;
    } else {
        clearError(plotInput);
    }

    if (village === "") {
        showError(villageInput, "Village is required.");
        valid = false;
    } else {
        clearError(villageInput);
    }

    // Task 3: Mobile number and email
    const mobilePattern = /^[6-9][0-9]{9}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!mobilePattern.test(mobileInput.value.trim())) {
        showError(mobileInput, "Enter a valid 10-digit Indian mobile number.");
        valid = false;
    } else {
        clearError(mobileInput);
    }

    if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, "Enter a valid email address.");
        valid = false;
    } else {
        clearError(emailInput);
    }

    // Task 4: Selection fields
    if (stageInput.value === "") {
        showError(stageInput, "Please select a crop stage.");
        valid = false;
    } else {
        clearError(stageInput);
    }

    if (soilInput.value === "") {
        showError(soilInput, "Please select a soil type.");
        valid = false;
    } else {
        clearError(soilInput);
    }

    if (irrigationInput.value === "") {
        showError(irrigationInput, "Please select an irrigation method.");
        valid = false;
    } else {
        clearError(irrigationInput);
    }

    // Soil moisture validation
    const moisture = Number(moistureInput.value);
    if (moistureInput.value === "" || Number.isNaN(moisture) ||
        moisture < 0 || moisture > 100) {
        showError(moistureInput, "Soil moisture must be between 0% and 100%.");
        valid = false;
    } else {
        clearError(moistureInput);
    }

    // Task 4: Registration date cannot be in the future
    if (dateInput.value === "") {
        showError(dateInput, "Registration Date is required.");
        valid = false;
    } else {
        const selectedDate = new Date(dateInput.value + "T00:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            showError(dateInput, "Registration Date cannot be in the future.");
            valid = false;
        } else {
            clearError(dateInput);
        }
    }

    if (valid) {
        // Add the new record to the table (read values BEFORE the form is reset)
        farmers.push({
            name: farmerName,
            mobile: mobileInput.value.trim(),
            email: emailInput.value.trim(),
            plot: plotId,
            village: village,
            stage: stageInput.value,
            soil: soilInput.value,
            irrigation: irrigationInput.value,
            moisture: moisture,
            date: dateInput.value
        });
        saveFarmers(farmers);
        renderTable();

        alert("Registration successful! All entered details are valid.");
        form.reset();
        document.querySelectorAll("#farmerForm .is-valid").forEach(function(field) {
            field.classList.remove("is-valid");
        });
    }
});

// Remove validation highlighting while the user edits a field.
document.querySelectorAll("#farmerForm input, #farmerForm select").forEach(function(input) {
    input.addEventListener("input", function() {
        input.classList.remove("is-invalid", "is-valid");
        const error = document.getElementById(input.id + "Error");
        if (error) {
            error.textContent = "";
            error.style.display = "none";
        }
    });

    input.addEventListener("change", function() {
        input.classList.remove("is-invalid", "is-valid");
        const error = document.getElementById(input.id + "Error");
        if (error) {
            error.textContent = "";
            error.style.display = "none";
        }
    });
});