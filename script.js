// ==========================
// TAB NAVIGATION
// ==========================
function showTab(tab) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(tab).classList.add("active");
}

// ==========================
// EMI CALCULATOR
// ==========================
function emi(principal, rate, years) {

    let monthlyRate = rate / 12 / 100;
    let months = years * 12;

    if (monthlyRate === 0) {
        return principal / months;
    }

    return (
        principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)
    ) /
    (
        Math.pow(1 + monthlyRate, months) - 1
    );
}

function calculate() {

    let salary =
        Number(document.getElementById("salary").value);

    let expenses =
        Number(document.getElementById("expenses").value);

    let carPrice =
        Number(document.getElementById("carPrice").value);

    let rate =
        Number(document.getElementById("rate").value);

    let years =
        Number(document.getElementById("years").value);

    if (
        !salary ||
        !carPrice ||
        !rate ||
        !years
    ) {
        alert("Please fill all required fields");
        return;
    }

    let loanAmount = carPrice * 0.80;

    let monthlyEMI =
        emi(
            loanAmount,
            rate,
            years
        );

    let remaining =
        salary -
        expenses -
        monthlyEMI;

    let affordability =
        ((salary - monthlyEMI) / salary) * 100;

    affordability =
        Math.max(
            0,
            Math.min(
                100,
                affordability
            )
        );

    let recommendation = "";

    if (monthlyEMI < salary * 0.20) {
        recommendation = "⚡ EV";
    }
    else if (monthlyEMI < salary * 0.30) {
        recommendation = "🚙 Sedan";
    }
    else if (monthlyEMI < salary * 0.40) {
        recommendation = "🚗 Hatchback";
    }
    else {
        recommendation = "❌ Too Expensive";
    }

    document.getElementById("incomeCard").innerHTML =
        "₹" + salary.toLocaleString();

    document.getElementById("emiCard").innerHTML =
        "₹" + monthlyEMI.toFixed(0);

    document.getElementById("budgetCard").innerHTML =
        "₹" + remaining.toFixed(0);

    document.getElementById("carType").innerHTML =
        recommendation;

    document.getElementById("scoreCard").innerHTML =
        affordability.toFixed(0) + "/100";

    document.getElementById("result").innerHTML = `
        <h3>Results</h3>

        Loan Amount:
        ₹${loanAmount.toLocaleString()} <br><br>

        EMI:
        ₹${monthlyEMI.toFixed(0)} <br><br>

        Remaining Income:
        ₹${remaining.toFixed(0)}
    `;

    document.getElementById("aiResult").innerHTML = `
        <h2>AI Recommendation</h2>
        Recommended Vehicle:
        ${recommendation}
    `;
}

// ==========================
// CHATBOT
// ==========================
function sendMessage() {

    let input =
        document.getElementById(
            "userInput"
        );

    let chatBox =
        document.getElementById(
            "chatBox"
        );

    let message =
        input.value.trim();

    if (!message) return;

    chatBox.innerHTML += `
        <div class="user">
            👤 ${message}
        </div>
    `;

    let reply =
        getBotResponse(
            message.toLowerCase()
        );

    chatBox.innerHTML += `
        <div class="bot">
            🤖 ${reply}
        </div>
    `;

    chatBox.scrollTop =
        chatBox.scrollHeight;

    input.value = "";
}

function getBotResponse(msg) {

    if (
        msg.includes("afford")
    ) {
        return "Try keeping EMI below 30% of salary.";
    }

    if (
        msg.includes("emi")
    ) {
        return "Lower tenure reduces interest but increases EMI.";
    }

    if (
        msg.includes("ev")
    ) {
        return "EVs usually have lower running costs than petrol cars.";
    }

    if (
        msg.includes("petrol")
    ) {
        return "Petrol cars have lower upfront cost but higher fuel expenses.";
    }

    return "Ask me about EMI, affordability, EVs, petrol cars or ownership costs.";
}

// ==========================
// ACR
// ==========================
function calcACR() {

    let fuel =
        Number(document.getElementById("fuel").value);

    let service =
        Number(document.getElementById("service").value);

    let insurance =
        Number(document.getElementById("insurance").value);

    let other =
        Number(document.getElementById("other").value);

    let total =
        (fuel * 12) +
        service +
        insurance +
        other;

    document.getElementById(
        "acrResult"
    ).innerHTML = `
        <h3>Annual Running Cost</h3>
        ₹${total.toLocaleString()}
    `;
}

// ==========================
// MAINTENANCE
// ==========================
function calcMaintenance() {

    let tyre =
        Number(document.getElementById("tyre").value);

    let oil =
        Number(document.getElementById("oil").value);

    let repair =
        Number(document.getElementById("repair").value);

    let total =
        tyre +
        oil +
        repair;

    document.getElementById(
        "maintResult"
    ).innerHTML = `
        <h3>Maintenance Cost</h3>
        ₹${total.toLocaleString()}
    `;
}

// ==========================
// PAYMENT PLANNER
// ==========================
function calcPayment() {

    let price =
        Number(document.getElementById("carPrice2").value);

    let own =
        Number(document.getElementById("ownFund").value);

    let loan =
        Number(document.getElementById("loanFund").value);

    let mode =
        document.getElementById("paymentMode").value;

    let ownAmount =
        price * own / 100;

    let loanAmount =
        price * loan / 100;

    document.getElementById(
        "payResult"
    ).innerHTML = `
        Payment Mode:
        ${mode}<br><br>

        Own Contribution:
        ₹${ownAmount.toLocaleString()}<br><br>

        Loan Amount:
        ₹${loanAmount.toLocaleString()}
    `;
}

// ==========================
// RTO CALCULATOR
// ==========================
const tax = {
ap:0.11, ar:0.08, as:0.08, br:0.08,
cg:0.09, ga:0.09, gj:0.09, hr:0.10,
hp:0.08, jh:0.09, ka:0.14, kl:0.13,
mp:0.09, mh:0.13, mn:0.08, ml:0.08,
mz:0.08, nl:0.08, or:0.09, pb:0.10,
rj:0.10, sk:0.08, tn:0.10, tg:0.12,
tr:0.08, up:0.11, uk:0.09, wb:0.10,
an:0.08, ch:0.10, dh:0.08, dl:0.12,
jk:0.09, la:0.08, ld:0.08, py:0.09
};

function calcRTO() {

    let price =
        Number(document.getElementById("carPrice3").value);

    let state =
        document.getElementById("state").value;

    let vehicle =
        document.getElementById("vehicleType").value;

    let regType =
        document.getElementById("registrationType").value;

    let fancy =
        Number(document.getElementById("fancyNumber").value);

    let insuranceRate =
        Number(document.getElementById("insuranceType").value);

    let fastag =
        Number(document.getElementById("fastag").value);

    let taxRate =
        tax[state] || 0.10;

    if (vehicle === "ev") {
        taxRate *= 0.30;
    }

    if (regType === "commercial") {
        taxRate += 0.03;
    }

    if (regType === "bh") {
        taxRate = 0.08;
    }

    let rto =
        price * taxRate;

    let insurance =
        price * insuranceRate;

    let registration = 1500;
    let smartCard = 600;
    let handling = 3000;

    let total =
        price +
        rto +
        insurance +
        registration +
        smartCard +
        handling +
        fancy +
        fastag;

    document.getElementById("rtoCard").innerHTML =
        "₹" + rto.toFixed(0);

    document.getElementById("rtoResult").innerHTML = `
        <h2>🚗 On-Road Price Breakdown</h2>

        Ex-Showroom:
        ₹${price.toLocaleString()}<br><br>

        RTO:
        ₹${rto.toLocaleString()}<br><br>

        Insurance:
        ₹${insurance.toLocaleString()}<br><br>

        Registration:
        ₹${registration.toLocaleString()}<br><br>

        Smart Card:
        ₹${smartCard.toLocaleString()}<br><br>

        Handling:
        ₹${handling.toLocaleString()}<br><br>

        Fancy Number:
        ₹${fancy.toLocaleString()}<br><br>

        FASTag:
        ₹${fastag.toLocaleString()}<br><br>

        <hr>

        <h1>
        ₹${total.toLocaleString()}
        </h1>

        Estimated On-Road Price
    `;
}

// ==========================
// OWNERSHIP COST
// ==========================
function ownershipCost() {

    let price =
        Number(document.getElementById("vehiclePrice").value);

    let running =
        Number(document.getElementById("annualRunning").value);

    let maintenance =
        Number(document.getElementById("maintenanceCost").value);

    let oneYear =
        price +
        running +
        maintenance;

    let threeYear =
        price +
        (running + maintenance) * 3;

    let fiveYear =
        price +
        (running + maintenance) * 5;

    document.getElementById(
        "ownershipResult"
    ).innerHTML = `
        1 Year:
        ₹${oneYear.toLocaleString()}<br><br>

        3 Years:
        ₹${threeYear.toLocaleString()}<br><br>

        5 Years:
        ₹${fiveYear.toLocaleString()}
    `;
}

// ==========================
// EV vs PETROL
// ==========================
function compareEV() {

    let petrol =
        Number(document.getElementById("petrolMonthly").value);

    let ev =
        Number(document.getElementById("evMonthly").value);

    let yearlyPetrol =
        petrol * 12;

    let yearlyEV =
        ev * 12;

    let savings =
        yearlyPetrol -
        yearlyEV;

    document.getElementById(
        "evResult"
    ).innerHTML = `
        Petrol Annual Cost:
        ₹${yearlyPetrol.toLocaleString()}<br><br>

        EV Annual Cost:
        ₹${yearlyEV.toLocaleString()}<br><br>

        Savings:
        ₹${savings.toLocaleString()}
    `;
}
