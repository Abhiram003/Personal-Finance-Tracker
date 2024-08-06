// Authentication Logic
const authContainer = document.getElementById('auth');
const dashboardContainer = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'user' && password === 'password') {
        authContainer.classList.remove('active');
        dashboardContainer.classList.add('active');
    } else {
        alert('Invalid credentials');
    }
});

// Transaction Logic
let transactions = [];

function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    
    if (description && !isNaN(amount)) {
        transactions.push({ description, amount, type });
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        renderTransactions();
        renderChart();
    } else {
        alert('Please enter valid description and amount');
    }
}

function renderTransactions() {
    const transactionsContainer = document.getElementById('transactions');
    transactionsContainer.innerHTML = '';
    transactions.forEach(transaction => {
        const transactionDiv = document.createElement('div');
        transactionDiv.innerHTML = `
            <span>${transaction.description}</span>
            <span>${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}</span>
        `;
        transactionsContainer.appendChild(transactionDiv);
    });
}

// Chart Logic
function renderChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    
    // If a chart already exists, destroy it before creating a new one
    if (window.myChart) {
        window.myChart.destroy();
    }
    
    window.myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Income', 'Expense'],
            datasets: [{
                label: 'Amount',
                data: [income, expense],
                backgroundColor: ['#28a745', '#dc3545'],
            }]
        }
    });
}

// Initial Setup
authContainer.classList.add('active');
