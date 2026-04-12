// TAB SWITCH
function showTab(tab) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });
  document.getElementById(tab).classList.add("active");
}

// EMI FUNCTION (SAFE)
function emi(p, r, n) {
  if (!p || !r || !n) return 0;

  let i = r / 12 / 100;
  let m = n * 12;

  return (p * i * Math.pow(1 + i, m)) /
         (Math.pow(1 + i, m) - 1);
}

// MAIN CALCULATE (FIXED)
function calculate() {
  let salary = Number(document.getElementById("salary").value) || 0;
  let expenses = Number(document.getElementById("expenses").value) || 0;
  let carPrice = Number(document.getElementById("carPrice").value) || 0;
  let rate = Number(document.getElementById("rate").value) || 0;
  let years = Number(document.getElementById("years").value) || 0;

  if (!salary || !carPrice || !rate || !years) {
    alert("Please fill all required fields!");
    return;
  }

  let income = salary;
  let budget = salary - expenses;

  let loan = carPrice * 0.8;
  let monthlyEMI = emi(loan, rate, years);

  // Dashboard update
  document.getElementById("incomeCard").innerText = "₹" + income;
  document.getElementById("emiCard").innerText = "₹" + monthlyEMI.toFixed(0);
  document.getElementById("budgetCard").innerText =
    "₹" + (budget - monthlyEMI).toFixed(0);

  document.getElementById("result").innerHTML = `
    💰 Income: ₹${income}<br>
    🏦 Loan: ₹${loan}<br>
    📉 EMI: ₹${monthlyEMI.toFixed(0)}<br>
    💵 Remaining: ₹${(budget - monthlyEMI).toFixed(0)}
  `;

  document.getElementById("aiResult").innerHTML =
    "<h3>🤖 AI Suggestion</h3>" + aiRecommend(income, monthlyEMI);
}

// AI FUNCTION (FIXED)
function aiRecommend(income, emi) {
  if (!income) return "Enter data first";

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

  let response = getBotResponse(input.toLowerCase());

  chatBox.innerHTML += `<div class="bot">🤖 ${response}</div>`;

  document.getElementById("userInput").value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(msg) {
  let num = msg.match(/\d+/);
  let salary = num ? Number(num[0]) : 0;

  if (msg.includes("afford")) {
    if (salary < 30000) return "🚗 Hatchback";
    if (salary < 70000) return "🚙 Sedan";
    return "⚡ SUV / EV";
  }

  if (msg.includes("emi")) {
    return "⚠ Keep EMI < 30% of income";
  }

  return "🤖 Ask about salary or car affordability";
}

// ACR
function calcACR() {
  let fuel = Number(document.getElementById("fuel").value) || 0;
  let service = Number(document.getElementById("service").value) || 0;
  let insurance = Number(document.getElementById("insurance").value) || 0;
  let other = Number(document.getElementById("other").value) || 0;

  let total = (fuel * 12) + service + insurance + other;

  document.getElementById("acrResult").innerHTML =
    "📊 Annual Cost: ₹" + total;
}

// MAINTENANCE
function calcMaintenance() {
  let t = Number(document.getElementById("tyre").value) || 0;
  let o = Number(document.getElementById("oil").value) || 0;
  let r = Number(document.getElementById("repair").value) || 0;

  let total = t + o + r;

  document.getElementById("maintResult").innerHTML =
    "🔧 Maintenance: ₹" + total;
}

// PAYMENT
function calcPayment() {
  let price = Number(document.getElementById("carPrice2").value) || 0;
  let mode = document.getElementById("paymentMode").value;

  let msg = "Enter valid data";

  if (mode === "Cash") msg = "💰 Full Payment: ₹" + price;
  if (mode === "Loan (EMI)") msg = "🏦 Loan Selected";
  if (mode === "Credit Card EMI") msg = "⚠ High Interest Mode";

  document.getElementById("payResult").innerHTML = msg;
}

// RTO
function calcRTO() {
  let price = Number(document.getElementById("carPrice3").value) || 0;
  let state = document.getElementById("state").value;

  let tax = {
    tn: 0.10,
    ka: 0.14,
    mh: 0.13,
    dl: 0.12,
    up: 0.11,
    gj: 0.09
  };

  let rto = price * (tax[state] || 0);

  document.getElementById("rtoResult").innerHTML =
    "🏛️ RTO: ₹" + rto.toFixed(0);
}
