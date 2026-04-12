const slider = document.getElementById("multiplier");
const multiValue = document.getElementById("multiValue");

slider.oninput = function () {
    multiValue.innerText = this.value;
};

function calculateEMI(principal, rate, time) {
    let r = rate / 12 / 100;
    let n = time * 12;

    let emi = (principal * r * Math.pow(1 + r, n)) /
              (Math.pow(1 + r, n) - 1);

    return emi;
}

function calculate() {
    let salary = Number(document.getElementById("salary").value);
    let rate = Number(document.getElementById("rate").value);
    let years = Number(document.getElementById("years").value);
    let multiplier = Number(document.getElementById("multiplier").value);

    if (!salary || salary <= 0) {
        document.getElementById("result").innerHTML = "❌ Enter valid salary";
        return;
    }

    // 💰 Affordable car price
    let carPrice = salary * multiplier;

    // 🧾 Tax + Insurance (approx 12% of car price)
    let taxInsurance = carPrice * 0.12;

    // 🏦 Loan principal (assume 80% loan, 20% down payment)
    let loanAmount = carPrice * 0.8;

    // 📊 EMI calculation
    let emi = calculateEMI(loanAmount, rate, years);

    document.getElementById("result").innerHTML = `
        <h3>Results</h3>
        💰 Car Budget: ₹${carPrice.toLocaleString()} <br>
        🧾 Tax + Insurance: ₹${taxInsurance.toFixed(0)} <br>
        🏦 Loan Amount: ₹${loanAmount.toLocaleString()} <br>
        📊 Monthly EMI: ₹${emi.toFixed(0)} <br>
        ⚠️ EMI should be < 30% of salary
    `;
}
