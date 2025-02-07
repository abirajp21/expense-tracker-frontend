var expenseInput = document.getElementById("expense-name");
var amountInput = document.getElementById("amount");
var categoryInput = document.getElementById("category");
var dateInput = document.getElementById("date");
var buttonInput = document.getElementById("add-btn");
var filterInput = document.getElementById("filter-category");
var id = 0;

var expenseList = document.getElementById("expense-list");

var expenses = [];

function Expense(name, amount, category, date){
    this.name  = name;
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.id = ++id;
}
buttonInput.addEventListener("click",function(){

    if(!expenseInput.value || !amountInput.value || !categoryInput.value || !dateInput.value)
        return;
    
    const expenseObj = new Expense(expenseInput.value, amountInput.value, categoryInput.value, dateInput.value);
    expenses.unshift(expenseObj);
    showExpenses(expenses);
    expenseInput.value="";
    amountInput.value="";
    categoryInput.value="";
    dateInput.value = "";
})


filterInput.addEventListener("input",function(){

    if(this.value == "all")
    {
        showExpenses(expenses);
        return;
    }
    let filteredExpenses = expenses.filter((expense)=> expense.category == filterInput.value);
    showExpenses(filteredExpenses);

})

expenseList.addEventListener("click", function(e){
if(e.target.classList.contains("edit"))
    editExpense(e.target.dataset.id);

else if(e.target.classList.contains("delete"))
    deleteExpense(e.target.dataset.id);

})


function showExpenses(expenses){

    let total = 0;
    expenseList.innerHTML = "";
    expenses.forEach(expense => {
        total= total + parseFloat(expense.amount);
        const expenseElement = document.createElement("tr");
        expenseElement.innerHTML =  `<td>${expense.name}</td>
                <td>₹${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td class = "action">
                    <button type="button" class="edit button" data-id="${expense.id}">Edit</button>
                    <button type="button" class="delete button"data-id="${expense.id}">Delete</button>
                </td>`
        expenseList.appendChild(expenseElement);
    });

    document.getElementById("total-amount").textContent = total;

}

function deleteExpense(id)
{
    expenses = expenses.filter((expense)=> expense.id !=id);
    showExpenses(expenses); 
}

function editExpense(id){
    let idx = expenses.findIndex((expense)=>expense.id == id);

    let expense = expenses[idx];
    expenseInput.value= expense.name;
    amountInput.value= expense.amount;
    categoryInput.value= expense.category;
    dateInput.value = expense.date;
    expenses.splice(idx,1);
    showExpenses(expenses);
}
