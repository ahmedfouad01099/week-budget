// classes

class Budget {
    constructor(budget) {
        this.budget = Number( budget );
        // bugetLeft is going to updated evrey time that the user add another Name and amount
        this.budgetLeft = this.budget;

    }
    //Subtract from the budget
    subtractFromBudget(amount){
        return this.budgetLeft -= amount;
    }
}

//Every thing related to HTML
class HTML {
    //Insert the budget when the user submit it
        insertBudget(amount) {
        // Insert Into Html 
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }

        // display a message (correct or invalid)
        printMessage(message, className){
            const messageWrapper = document.createElement('div');
            messageWrapper.classList.add('text-center', 'alert', className);
            messageWrapper.appendChild(document.createTextNode(message));

            // Insert Into Html
            document.querySelector('.primary').insertBefore(messageWrapper, addExpensForm)
            //insertBefore takes to parameter the newChild, refChild we will insert before
        
            //clear the error message
            setTimeout(() => {
                messageWrapper.style.display = 'none';
                addExpensForm.reset();
            }, 3000);

        }

        //Display the expensesList from the form into the list
        addExpensToList(name, amount){
            const expensesList = document.querySelector('#expenses ul');


            //create a li
            const li = document.createElement('li');
            li.className = "list-group-item d-flex justify-content-between align-items-center";

            //create a templeate 
            li.innerHTML = `
                ${name}
                <span class="badge badge-primary badge-pill">$${amount}</span>
            `

            //Insert Into the Html

            expensesList.appendChild(li);

 
        }

        //subtract expense amount from budget
        trackBudget(amount){
            const budgetLeftDollars = budget.subtractFromBudget(amount);
            budgetLeft.innerHTML = `
                ${budgetLeftDollars}
            `
            // Check when the budget spent 25%
            if( (budget.budget / 4 ) > budgetLeftDollars ){
                // remove Some classes

                budgetLeft.parentElement.parentElement.classList.remove('alert-success', 
                'alert-warning');

                // Add some others
                budgetLeft.parentElement.parentElement.classList.add('alert-danger');
            }else if( (budget.budget / 2 ) > budgetLeftDollars ) {
                // remove Some classes

                budgetLeft.parentElement.parentElement.classList.remove('alert-success');

                // Add some others
                budgetLeft.parentElement.parentElement.classList.add('alert-warning')
            }
        }
}






//variables
const addExpensForm = document.querySelector('#add-expense'),
      budgetTotal = document.querySelector('span#total'),
      budgetLeft = document.querySelector('span#left');  

let budget,  userBudget;

// Instanciate the HTML class
const html = new HTML(); 




// Event Listener
eventListener();
function eventListener(){

    document.addEventListener('DOMContentLoaded', function(){
        //Ask the vistor to weekly budget
        userBudget = prompt('what\'s your budget for this week? ');
        //validate the user budget
        if(userBudget === null || userBudget === '' || userBudget === '0'){
            window.location.reload();
        }
        else {
            // Budget is valid then instaniate the budget class
            budget = new Budget(userBudget);

            // console.log(budget); this is going to print object which contain variables
            //whics exist in the budget Object class
            //Instanciate Html Class

            html.insertBudget(budget.budget);//Fiest budget is for object & the second one for the property
            // if we pass budget only not budget.budget the we pass budget of Object 
            //and we have two variables in the object so we have to select one of this two values
        }
    })


    addExpensForm.addEventListener('submit', function(e){
        e.preventDefault();
        //Read the values from the budget form  
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;
        
        if(expenseName === '' || amount === ''){
            html.printMessage('there was error, all the fields aren\'t faild',
             'alert-danger');//alert-danger is a class you will find in bootstrap

        }else {
            //Add the expense to the list
            html.addExpensToList(expenseName, amount); 
            html.trackBudget(amount);

        }
    
    })
}










