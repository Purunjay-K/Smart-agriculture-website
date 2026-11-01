// ============================================================
// TASK 1: Patient Information and Registration Fee Calculation
// ============================================================
function calculateRegistrationFee() {
    // Values and variables
    let patientName = document.getElementById("feePatientName").value.trim();
    let patientId = document.getElementById("feePatientId").value.trim();
    let patientAge = Number(document.getElementById("feePatientAge").value);
    let consultationFee = Number(document.getElementById("consultationFee").value);
    let registrationFee = Number(document.getElementById("registrationFee").value);

    // Assumption for this demonstration: senior citizen = age 60 or above.
    // The task sheet does not specify the discount percentage, so 10% is used here.
    let seniorDiscount = 0;
    let registrationStatus = "Regular Registration";

    if (patientAge >= 60) {
        seniorDiscount = consultationFee * 0.10;
        registrationStatus = "Senior Citizen Discount Applied";
    }

    let totalAmount = consultationFee + registrationFee - seniorDiscount;

    let message =
        "Patient Name: " + patientName + "\n" +
        "Patient ID: " + patientId + "\n" +
        "Total Amount Payable: ₹" + totalAmount.toFixed(2) + "\n" +
        "Registration Status: " + registrationStatus;

    // Message-printing methods
    alert(message);
    console.log(message);

    let output = document.getElementById("feeOutput");
    output.style.display = "block";
    output.textContent = message;
}

// Uses document.write() safely in a new browser window so the current page is not replaced.
function showTask1UsingDocumentWrite() {
    let patientName = document.getElementById("feePatientName").value.trim();
    let patientId = document.getElementById("feePatientId").value.trim();
    let patientAge = Number(document.getElementById("feePatientAge").value);
    let consultationFee = Number(document.getElementById("consultationFee").value);
    let registrationFee = Number(document.getElementById("registrationFee").value);

    let discount = patientAge >= 60 ? consultationFee * 0.10 : 0;
    let total = consultationFee + registrationFee - discount;
    let status = patientAge >= 60 ? "Senior Citizen Discount Applied" : "Regular Registration";

    let resultWindow = window.open("", "PatientResult", "width=500,height=350");

    if (resultWindow) {
        resultWindow.document.write(
            "<html><head><title>Patient Registration Result</title></head>" +
            "<body style='font-family:Arial;padding:25px'>" +
            "<h2>Patient Registration Result</h2>" +
            "<p><b>Patient Name:</b> " + patientName + "</p>" +
            "<p><b>Patient ID:</b> " + patientId + "</p>" +
            "<p><b>Total Amount:</b> ₹" + total.toFixed(2) + "</p>" +
            "<p><b>Registration Status:</b> " + status + "</p>" +
            "</body></html>"
        );
        resultWindow.document.close();
    } else {
        alert("Please allow pop-ups to demonstrate document.write().");
    }
}


// ============================================================
// TASK 2: Patient Appointment and Priority Decision
// ============================================================
function determinePriority() {
    let patientAge = Number(document.getElementById("priorityAge").value);
    let temperature = Number(document.getElementById("temperature").value);
    let severity = document.getElementById("severity").value;
    let emergencyStatus = document.getElementById("emergency").value;
    let recommendation;

    if (emergencyStatus === "Yes") {
        recommendation = "Emergency Consultation Required";
    } else if (temperature >= 39) {
        recommendation = "High Priority Consultation";
    } else if (severity === "Severe") {
        recommendation = "High Priority Consultation";
    } else if (patientAge >= 60 && severity === "Moderate") {
        recommendation = "Priority Consultation";
    } else {
        recommendation = "Regular Consultation";
    }

    let message = "Appointment Recommendation: " + recommendation;
    console.log(message);
    alert(message);

    let output = document.getElementById("priorityOutput");
    output.style.display = "block";
    output.textContent = message;
}


// ============================================================
// TASK 3: JavaScript Object for Patient Registration
// ============================================================
let patient = {
    patientName: "Rahul Sharma",
    patientId: "PAT-1001",
    age: 45,
    gender: "Male",
    bloodGroup: "B+",
    mobile: "9876543210",
    department: "Cardiology",
    appointmentType: "Consultation",
    registrationStatus: "Confirmed",

    displayPatient: function() {
        return "Patient Name: " + this.patientName + "\n" +
               "Patient ID: " + this.patientId + "\n" +
               "Age: " + this.age + "\n" +
               "Gender: " + this.gender + "\n" +
               "Blood Group: " + this.bloodGroup + "\n" +
               "Mobile: " + this.mobile + "\n" +
               "Department: " + this.department + "\n" +
               "Registration Status: " + this.registrationStatus;
    },

    displayAppointment: function() {
        return "Department: " + this.department + "\n" +
               "Appointment Type: " + this.appointmentType;
    },

    getAgeCategory: function() {
        if (this.age >= 60) {
            return "Senior Citizen";
        } else if (this.age >= 18) {
            return "Adult";
        } else {
            return "Minor";
        }
    }
};

function displayPatientObject() {
    let message = patient.displayPatient() + "\n" +
                  "\nAppointment Information:\n" +
                  patient.displayAppointment() + "\n" +
                  "\nAge Category: " + patient.getAgeCategory();

    console.log(patient);
    console.log(message);
    alert("Patient object details displayed on the page.");

    let output = document.getElementById("objectOutput");
    output.style.display = "block";
    output.textContent = message;
}


// ============================================================
// TASK 4: Patient Age and Appointment Data Using Arrays
// ============================================================
function analyzePatientAges() {
    let patientAges = [22, 35, 67, 45, 29, 72, 56, 18, 64, 40];

    let minimumAge = Math.min(...patientAges);
    let maximumAge = Math.max(...patientAges);
    let totalAge = patientAges.reduce(function(sum, age) {
        return sum + age;
    }, 0);
    let averageAge = totalAge / patientAges.length;

    let seniorCount = patientAges.filter(function(age) {
        return age >= 60;
    }).length;

    let below18Count = patientAges.filter(function(age) {
        return age < 18;
    }).length;

    let above60 = patientAges.filter(function(age) {
        return age > 60;
    });

    let message =
        "All Patient Ages: " + patientAges.join(", ") + "\n" +
        "Minimum Patient Age: " + minimumAge + "\n" +
        "Maximum Patient Age: " + maximumAge + "\n" +
        "Average Patient Age: " + averageAge.toFixed(2) + "\n" +
        "Senior-Citizen Patients (60+): " + seniorCount + "\n" +
        "Patients Below 18: " + below18Count + "\n" +
        "Patients Older Than 60: " + (above60.length ? above60.join(", ") : "None");

    console.log(message);

    let output = document.getElementById("arrayOutput");
    output.style.display = "block";
    output.textContent = message;
}


// ============================================================
// TASK 5: Patient Registration Validation Using Regex + DOM
// ============================================================
function validatePatientName(name) {
    return /^[A-Za-z ]+$/.test(name.trim());
}

function validateMobile(mobile) {
    return /^[0-9]{10}$/.test(mobile.trim());
}

function validatePatientId(patientId) {
    return /^PAT-[0-9]{4}$/.test(patientId.trim());
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function showValidationError(input, message) {
    input.classList.add("invalid-field");
    input.classList.remove("valid-field");
    let error = document.getElementById(input.id + "Error");
    error.textContent = message;
    error.style.display = "block";
}

function clearValidationError(input) {
    input.classList.remove("invalid-field");
    input.classList.add("valid-field");
    let error = document.getElementById(input.id + "Error");
    error.textContent = "";
    error.style.display = "none";
}

function validatePatientForm() {
    let nameInput = document.getElementById("patientName");
    let mobileInput = document.getElementById("patientMobile");
    let idInput = document.getElementById("patientId");
    let emailInput = document.getElementById("patientEmail");
    let valid = true;

    let name = nameInput.value.trim();
    let mobile = mobileInput.value.trim();
    let patientId = idInput.value.trim();
    let email = emailInput.value.trim();

    if (name === "") {
        showValidationError(nameInput, "Patient name is required.");
        valid = false;
    } else if (!validatePatientName(name)) {
        showValidationError(nameInput, "Name must contain alphabets and spaces only.");
        valid = false;
    } else {
        clearValidationError(nameInput);
    }

    if (!validateMobile(mobile)) {
        showValidationError(mobileInput, "Mobile number must contain exactly 10 digits.");
        valid = false;
    } else {
        clearValidationError(mobileInput);
    }

    if (!validatePatientId(patientId)) {
        showValidationError(idInput, "Patient ID must follow the format PAT-1234.");
        valid = false;
    } else {
        clearValidationError(idInput);
    }

    if (!validateEmail(email)) {
        showValidationError(emailInput, "Enter a valid email address.");
        valid = false;
    } else {
        clearValidationError(emailInput);
    }

    return valid;
}

const patientForm = document.getElementById("patientForm");

patientForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let successBox = document.getElementById("registrationSuccess");
    successBox.style.display = "none";

    if (validatePatientForm()) {
        let patientName = document.getElementById("patientName").value.trim();
        let patientId = document.getElementById("patientId").value.trim();

        let successMessage = "Registration successful! " + patientName +
            " (" + patientId + ") has been registered successfully.";

        successBox.textContent = successMessage;
        successBox.style.display = "block";
        console.log(successMessage);
        alert(successMessage);
    }
});

// Remove error/success highlighting while the user edits a field.
document.querySelectorAll("#patientForm input").forEach(function(input) {
    input.addEventListener("input", function() {
        input.classList.remove("invalid-field", "valid-field");
        let error = document.getElementById(input.id + "Error");
        if (error) {
            error.textContent = "";
            error.style.display = "none";
        }
        document.getElementById("registrationSuccess").style.display = "none";
    });
});

patientForm.addEventListener("reset", function() {
    setTimeout(function() {
        document.querySelectorAll("#patientForm input").forEach(function(input) {
            input.classList.remove("invalid-field", "valid-field");
        });
        document.querySelectorAll("#patientForm .error-message").forEach(function(error) {
            error.textContent = "";
            error.style.display = "none";
        });
        document.getElementById("registrationSuccess").style.display = "none";
    }, 0);
});
