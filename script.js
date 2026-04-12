function calculateEMI(p, r, n) {
    let rate = r / 12 / 100;
    let months = n * 12;

    return (p * rate * Math.pow(1 + rate, months)) /
           (Math.pow(1 + rate, months) - 1);
}

function calculate() {
    let salary = Number(document.getElementById("salary").value);
    let otherIncome = Number(document.getElementById("otherIncome").value);
    let existingEmi = Number(document.getElementById("existingEmi").value);
    let savings = Number(document.getElementById("savings").value);

    let carPrice = Number(document.getElementById("carPrice").value);
    let downPayment = Number(document.getElementById("downPayment").value);
    let insurance = Number(document.getElementById("insurance").value);
    let tax = Number(document.getElementById("tax").value);

    let rate = Number(document.getElementById("rate").value);
    let years = Number(document.getElementById("years").value);
    let fee = Number(document.getElementById("processingFee").value);

    let income = salary + otherIncome;

    // 🚗 cost breakdown
    let dpAmount = carPrice * (downPayment / 100);
    let loanAmount = carPrice - dpAmount;

    let insuranceAmt = carPrice * (insurance / 100);
    let taxAmt = carPrice * (tax / 100);
    let processingAmt = loanAmount * (fee / 100);

    let emi = calculateEMI(loanAmount, rate, years);

    let totalMonthlyObligation = emi + existingEmi;
    let ratio = (totalMonthlyObligation / income) * 100;

    // 📊 Risk Level
    let status = "";
    if (ratio < 25) status = "🟢 SAFE";
    else if (ratio < 40) status = "🟡 MODERATE";
    else status = "🔴 RISKY";

    document.getElementById("result").innerHTML = `
        <h2>📊 Results</h2>

        💰 Monthly Income: ₹${income}<br>
        🚗 Car Price: ₹${carPrice}<br>
        💵 Down Payment: ₹${dpAmount}<br>
        🏦 Loan Amount: ₹${loanAmount}<br>
        📊 EMI: ₹${emi.toFixed(0)}<br>

        🧾 Insurance: ₹${insuranceAmt}<br>
        🧾 Road Tax: ₹${taxAmt}<br>
        💳 Processing Fee: ₹${processingAmt}<br>

        📉 Total EMI Burden: ₹${totalMonthlyObligation.toFixed(0)}<br>
        ⚠ EMI-to-Income Ratio: ${ratio.toFixed(1)}%<br>

        <h3>Status: ${status}</h3>
    `;
}
