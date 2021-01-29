const Modal = {
    open(){
        // Abrir Modal, Adicionar a classe Active
        document.querySelector('.modal-overlay')
        .classList.add('active');
    },
    close(){
        // Fechar Modal, Removendo a classe Active
        document.querySelector('.modal-overlay')
        .classList.remove('active');
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50010,
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Criação de Website',
        amount: 500053,
        date: '23/01/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021'
    },
    {
        id: 4,
        description: 'App',
        amount: 200000,
        date: '23/01/2021'
    }
];


const Transaction = {
    incomes(){
        let income = 0;
        // pegar todas as transações
        // para cada transação
        transactions.forEach ((transaction)  => {
            // se ela for maior que zero
            if(transaction.amount > 0){
            // Somar e retornar variável
                income += transaction.amount;
            }
        })
        return income;
    },

    expenses(){
        // Somar todas as Saídas
        let expenses = 0;
        transactions.forEach ((transaction)  => {
            if(transaction.amount < 0){
                expenses += transaction.amount;
            }
        })
        return expenses; 
    },

    total(){
        // Entradas - Saídas
        return Transaction.incomes() + Transaction.expenses();
    }
    
}

const Utils = {
    formatCurrent(value){
        const signal = Number(value)  <  0 ?  "-" :  ""

        value = String(value).replace(/\D/g,  "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    },
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrent(transaction.amount)

        const html = ` 
                <td class="description">${transaction.description}</td>
                <td class="${CSSclass}"> ${amount}</td>
                <td class="date">${transaction.date} </td>
                <td>
                    <img src="./assets/minus.svg" alt="Remover Transação">
                </td>
        `
        return html
    }, 

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrent(Transaction.incomes())

        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrent(Transaction.expenses())

        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrent(Transaction.total())
    }
}

transactions.forEach(function (transaction) {
    DOM.addTransaction(transaction)
 })

 DOM.updateBalance();