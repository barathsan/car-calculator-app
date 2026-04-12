function showTab(tab) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });

  document.getElementById(tab).classList.add("active");
}

// EMI calculation
function emi(p, r, n) {
  let i = r / 12 / 100;
  let m = n * 12;

  return (p * i * Math.pow(1 + i, m)) /
         (Math.pow(1 + i, m) - 1);
}

// MAIN CALCULATOR
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

  let ai = aiRecommend(income, monthlyEMI);

  document.getElementById("incomeCard").innerText = "₹" + income;
  document.getElementById("emiCard").innerText = "₹" + monthlyEMI.toFixed(0);
  document.getElementById("budgetCard").innerText =
    "₹" + (budget - monthlyEMI).toFixed(0);

  document.getElementById("result").innerHTML = `
    💰 Income: ₹${income}<br>
    🏦 Loan: ₹${loan}<br>
    📉 EMI: ₹${monthlyEMI.toFixed(0)}<br>
  `;

  document.getElementById("aiResult").innerHTML =
    "<h3>🤖 AI Suggestion</h3>" + ai;
}

// AI recommendation
function aiRecommend(income, emi) {
  let ratio = emi / income;

  if (ratio < 0.2) return "⚡ EV Recommended";
  if (ratio < 0.3) return "🚙 Sedan Recommended";
  if (ratio < 0.4) return "🚗 Hatchback Recommended";
  return "⚠ Not Recommended";
}

// CHATBOT (FIXED WORKING)
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

// BOT LOGIC
function getBotResponse(msg) {

  let num = msg.match(/\d+/);
  let salary = num ? Number(num[0]) : 0;

  if (msg.includes("can i afford")) {
    if (salary < 30000) return "🚗 Hatchback recommended";
    if (salary < 70000) return "🚙 Sedan recommended";
    return "⚡ SUV or EV recommended";
  }

  if (msg.includes("best car")) {
    return "🚗 Hatchback | 🚙 Sedan | ⚡ EV based on budget";
  }

  if (msg.includes("emi")) {
    return "⚠ Keep EMI under 30% of income";
  }

  if (salary > 0) {
    return salary < 50000
      ? "🚗 Safe: Hatchback"
      : "🚙 You can consider Sedan or SUV";
  }

  return "🤖 Ask: 'Can I afford a car with 50k salary?'";
}
