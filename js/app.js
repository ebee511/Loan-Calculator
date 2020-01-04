/* 
Example: 10,000, 2%, 2 years
monthly: 425.40, total payment: 10209.66, total interest: 209.66
*/

// VARIABLES
let resultsDiv = document.getElementById("results");
let loadingIcon = document.getElementById("loading-gif");
let loanAmount = document.getElementById("amount");
let loanInterest = document.getElementById("interest");
let loanYears = document.getElementById("years");
let calculateBtn = document.getElementById("submit");
let monthlyPaymentsInput = document.getElementById("monthlyPayments");
let totalPaymentInput = document.getElementById("totalPayment");
let totalInterestInput = document.getElementById("totalInterest");
let totalLoanAmt;
let totalInterestAmt;
let monthlyPaymentAmt;
let decimalInterestRate;
let monthsOfLoan;

// EVENT LISTENERS
calculateBtn.addEventListener("click", totalLoanCalc);

// FUNCTIONS
function loadingImage() {
  loadingIcon.classList.toggle("show");
}

function totalLoanCalc(e) {
  // to prevent reload of page
  e.preventDefault();
  // grab values of variables after click since when we begin they are empty
  let principle = loanAmount.value;
  let interestRate = loanInterest.value;
  let loanTerm = loanYears.value;

  // check if any values are left empty
  if (principle === "" || interestRate === "" || loanTerm === "") {
    alert("Error: There is a field left blank. Please try again.");
    return;
  }

  decimalInterestRate = interestRate / 1200;
  // find loan term in months
  monthsOfLoan = loanTerm * 12;

  // FIND TOTAL LOAN, TOTAL INTEREST, MONTHLY PAYMENTS
  // calculate top half of total loan
  let topHalf = decimalInterestRate * principle * monthsOfLoan;
  // calculate bottom half of total loan
  let bottomHalf = 1 - Math.pow(1 + decimalInterestRate, -monthsOfLoan);
  totalLoanAmt = (topHalf / bottomHalf).toFixed(2);

  totalInterestCalc(totalLoanAmt);
  monthlyPaymentsCalc(totalLoanAmt);
  // append costs to form fields
  monthlyPaymentsInput.value = monthlyPaymentAmt;
  totalPaymentInput.value = totalLoanAmt;
  totalInterestInput.value = totalInterestAmt;
  resultsDiv.classList.remove("hidden");
  resultsDiv.classList.add("show");
}

function totalInterestCalc(totalLoanAmt) {
  let principle = loanAmount.value;
  totalInterestAmt = (totalLoanAmt - principle).toFixed(2);
  console.log(totalInterestAmt);
}

function monthlyPaymentsCalc(totalLoanAmt) {
  let loanTerm = loanYears.value;
  monthsOfLoan = loanTerm * 12;
  monthlyPaymentAmt = (totalLoanAmt / monthsOfLoan).toFixed(2);
  console.log(monthlyPaymentAmt);
}

function showErrorMsg() {}

// GOALS:
// - Monthly Payment Amount
// - Total Payment Amount
// - Total Interest Amount

// If any field is left blank
// display an error message