function showTab(tab) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(tab).classList.add("active");
}

// EMI
function emi(p, r, n) {
  let i = r / 12 / 100;
  let m = n * 12;
  return (p * i * Math.pow(1 + i, m)) /
         (Math.pow(1 + i, m) - 1);
}

// MAIN CALC
function calculate() {
  let salary = Number(document.getElementById("salary").value);
  let expenses = Number(document.getElementById("expenses").value);
  let carPrice = Number(document.getElementById("carPrice").value);
  let rate = Number(document.getElementById("rate").value);
  let years = Number(document.getElementById("years").value);

  let income = salary;
  let budget = salary - expenses;

  let loan = carPrice * 0.8;
  let monthlyEMI = emi(loan, rate, years);

  document.getElementById("incomeCard").innerText = "₹" + income;
  document.getElementById("emiCard").innerText = "₹" + monthlyEMI.toFixed(0);
  document.getElementById("budgetCard").innerText =
    "₹" + (budget - monthlyEMI).toFixed(0);

  document.getElementById("result").innerHTML =
    `💰 Income: ₹${income}<br>🏦 Loan: ₹${loan}<br>📉 EMI: ₹${monthlyEMI.toFixed(0)}`;
}

// AI
function aiRecommend(income, emi) {
  let ratio = emi / income;

  if (ratio < 0.2) return "⚡ EV Recommended";
  if (ratio < 0.3) return "🚙 Sedan Recommended";
  if (ratio < 0.4) return "🚗 Hatchback Recommended";
  return "⚠ Not Recommended";
}

// CHATBOT
function sendMessage() {
  let input = document.getElementById("userInput").value;
  let chatBox = document.getElementById("chatBox");

  if (!input) return;

  chatBox.innerHTML += `<div class="user">🧑 ${input}</div>`;

  let msg = input.toLowerCase();
  let num = msg.match(/\d+/);
  let salary = num ? Number(num[0]) : 0;

  let reply = "🤖 Ask about car budget or EMI";

  if (msg.includes("can i afford")) {
    if (salary < 30000) reply = "🚗 Hatchback";
    else if (salary < 70000) reply = "🚙 Sedan";
    else reply = "⚡ SUV/EV";
  }

  chatBox.innerHTML += `<div class="bot">${reply}</div>`;
  document.getElementById("userInput").value = "";
}

// ACR
function calcACR() {
  let fuel = Number(document.getElementById("fuel").value);
  let service = Number(document.getElementById("service").value);
  let insurance = Number(document.getElementById("insurance").value);
  let other = Number(document.getElementById("other").value);

  let total = (fuel * 12) + service + insurance + other;

  document.getElementById("acrResult").innerHTML =
    "📊 Annual Cost: ₹" + total;
}

// MAINTENANCE
function calcMaintenance() {
  let t = Number(document.getElementById("tyre").value);
  let o = Number(document.getElementById("oil").value);
  let r = Number(document.getElementById("repair").value);

  let total = t + o + r;

  document.getElementById("maintResult").innerHTML =
    "🔧 Maintenance: ₹" + total;
}

// PAYMENT
function calcPayment() {
  let price = Number(document.getElementById("carPrice2").value);
  let own = Number(document.getElementById("ownFund").value);
  let loan = Number(document.getElementById("loanFund").value);
  let mode = document.getElementById("paymentMode").value;

  let msg = "";

  if (mode === "Cash") msg = "💰 Full payment";
  if (mode === "Loan (EMI)") msg = "🏦 Loan selected";
  if (mode === "Credit Card EMI") msg = "⚠ High interest";

  document.getElementById("payResult").innerHTML = msg;
}

// RTO
function calcRTO() {
  let price = Number(document.getElementById("carPrice3").value);
  let state = document.getElementById("state").value;

  let tax = {
    tn: 0.10,
    ka: 0.14,
    mh: 0.13,
    dl: 0.12,
    up: 0.11,
    gj: 0.09
  };

  let rto = price * tax[state];

  document.getElementById("rtoResult").innerHTML =
    "🏛️ RTO: ₹" + rto.toFixed(0);
}
