// DOM Elements
const purchaseAmountInput = document.getElementById('purchaseAmount');
const amountValueSpan = document.getElementById('amountValue');
const installmentsSelect = document.getElementById('installments');
const traditionalInterestInput = document.getElementById('traditionalInterest');
const tradInterestValueSpan = document.getElementById('tradInterestValue');
const traditionalFeeInput = document.getElementById('traditionalFee');
const tradFeeValueSpan = document.getElementById('tradFeeValue');

// Carta Franca Results
const cfMonthlyPaymentSpan = document.getElementById('cfMonthlyPayment');
const cfTotalInterestSpan = document.getElementById('cfTotalInterest');
const cfTotalFeesSpan = document.getElementById('cfTotalFees');
const cfTotalCostSpan = document.getElementById('cfTotalCost');

// Traditional Card Results
const tradMonthlyPaymentSpan = document.getElementById('tradMonthlyPayment');
const tradTotalInterestSpan = document.getElementById('tradTotalInterest');
const tradTotalFeesSpan = document.getElementById('tradTotalFees');
const tradTotalCostSpan = document.getElementById('tradTotalCost');

// Savings
const totalSavingsSpan = document.getElementById('totalSavings');

// Constants for Carta Franca (from Whitepaper)
const CF_MONTHLY_INTEREST_RATE = 0.03; // 3%
const CF_MONTHLY_FEE = 5; // USD

// Function to calculate loan details (simplified for demonstration)
function calculateLoan(principal, monthlyInterestRate, monthlyFee, installments) {
    if (installments === 0) { // Should not happen with select, but for safety
        return { monthlyPayment: principal, totalInterest: 0, totalFees: 0, totalCost: principal };
    }
    
    // For 1 installment, it's a single payment including interest and fee
    if (installments === 1) {
        const interest = principal * monthlyInterestRate;
        const totalCost = principal + interest + monthlyFee;
        return {
            monthlyPayment: totalCost,
            totalInterest: interest,
            totalFees: monthlyCost,
            totalCost: totalCost
        };
    }

    // Simple interest calculation for demonstration over multiple installments
    // Note: Real credit cards use more complex calculations (e.g., compound interest on remaining balance)
    const totalInterest = principal * monthlyInterestRate * installments;
    const totalFees = monthlyFee * installments;
    const totalCost = principal + totalInterest + totalFees;
    const monthlyPayment = totalCost / installments;

    return {
        monthlyPayment: monthlyPayment,
        totalInterest: totalInterest,
        totalFees: totalFees,
        totalCost: totalCost
    };
}

function updateSimulation() {
    const purchaseAmount = parseFloat(purchaseAmountInput.value);
    const installments = parseInt(installmentsSelect.value);
    const traditionalInterestRate = parseFloat(traditionalInterestInput.value) / 100;
    const traditionalFee = parseFloat(traditionalFeeInput.value);

    // Update range value displays
    amountValueSpan.textContent = purchaseAmount.toFixed(0);
    tradInterestValueSpan.textContent = traditionalInterestInput.value;
    tradFeeValueSpan.textContent = traditionalFeeInput.value;

    // Calculate for Carta Franca
    const cfResults = calculateLoan(purchaseAmount, CF_MONTHLY_INTEREST_RATE, CF_MONTHLY_FEE, installments);
    cfMonthlyPaymentSpan.textContent = cfResults.monthlyPayment.toFixed(2);
    cfTotalInterestSpan.textContent = cfResults.totalInterest.toFixed(2);
    cfTotalFeesSpan.textContent = cfResults.totalFees.toFixed(2);
    cfTotalCostSpan.textContent = cfResults.totalCost.toFixed(2);

    // Calculate for Traditional Card
    const tradResults = calculateLoan(purchaseAmount, traditionalInterestRate, traditionalFee, installments);
    tradMonthlyPaymentSpan.textContent = tradResults.monthlyPayment.toFixed(2);
    tradTotalInterestSpan.textContent = tradResults.totalInterest.toFixed(2);
    tradTotalFeesSpan.textContent = tradResults.totalFees.toFixed(2);
    tradTotalCostSpan.textContent = tradResults.totalCost.toFixed(2);

    // Calculate Savings
    const totalSavings = tradResults.totalCost - cfResults.totalCost;
    totalSavingsSpan.textContent = totalSavings.toFixed(2);

    // Update savings display color
    const differenceElement = totalSavingsSpan.parentElement;
    if (totalSavings > 0) {
        differenceElement.style.backgroundColor = '#d4edda'; /* Light green */
        differenceElement.style.borderColor = '#c3e6cb';
        differenceElement.style.color = '#155724'; /* Dark green */
    } else if (totalSavings < 0) {
        differenceElement.style.backgroundColor = '#f8d7da'; /* Light red */
        differenceElement.style.borderColor = '#f5c6cb';
        differenceElement.style.color = '#721c24'; /* Dark red */
    } else {
        differenceElement.style.backgroundColor = '#e2e3e5'; /* Light gray */
        differenceElement.style.borderColor = '#d6d8db';
        differenceElement.style.color = '#383d41'; /* Dark gray */
    }
}

// Event Listeners for real-time updates
purchaseAmountInput.addEventListener('input', updateSimulation);
installmentsSelect.addEventListener('change', updateSimulation);
traditionalInterestInput.addEventListener('input', updateSimulation);
traditionalFeeInput.addEventListener('input', updateSimulation);

// Initial calculation on page load
updateSimulation();