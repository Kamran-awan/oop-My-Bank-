#! /usr/bin/env node
import inquirer from "inquirer";

// Bank Account Interface
interface BankAccount{
    accountNumber:number,
    balance:number,
    withdraw(amount:number) : void
    deposit(amount:number) : void
    checkbalance():void
}

// Bank Account Class

class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber:number, balance:number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }
    // Debit Money

    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`withdrawl of $${amount} successful.Remaining Balance is: $${this.balance}`);
            
        }else{
            console.log("Insufficient Balance.");
        }

}
// Credit Money
deposit(amount: number): void {
    if(amount>100){
        amount-=1;  // S1 fee charges deposit on 100 USD 
    } this.balance +=amount
    console.log(`deposit of $${amount} successful. Remaining Balance is: $${this.balance}`);
    
}

// Check Balance 
checkbalance(): void {
    console.log(`Current Balance is:$${this.balance}`);
    
}
}
// Customer Class

class customer{
    firstName:string;
    lastName:string;
    gender:string;
    age:number;
    mobileNumber:number;
    account:BankAccount;

    constructor(firstName:string,lastName:string,gender:string,age:number,mobileNumber:number,account:BankAccount,)
    {
        this.firstName=firstName;
        this.lastName=lastName;
        this.gender=gender;
        this.age=age;
        this.mobileNumber=mobileNumber;
        this.account=account;
    }

}

// Create Bank Account

const accounts:BankAccount[] = [
    new BankAccount(1247,2000),
    new BankAccount(1248,4500),
    new BankAccount(1249,500),
];

// Create Customers
const Customers:customer[]=[
    new customer ("Khurram","Iqbal","Male",30,3213276868,accounts[0]),
    new customer ("Ubaid","Maqsod","Male",31,3203245671,accounts[1]),
    new customer ("Kamran","Awan","Male",32,3438756432,accounts[2]),
]


// Function to interact with bank account 
async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name:"accountNumber",
            type:"number",
            message:"Entre Your Account Number!"

        })
        const customer = Customers.find(Customer =>Customer.account.accountNumber===accountNumberInput.accountNumber);
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans= await inquirer.prompt([{
                name:"Select",
                type:"list",
                message:"Select option",
                choices:["Deposit","Withdraw","Check Balance","Exit",]
            }]);

            switch(ans.Select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message:"Entre the amount to deposit!"
                    })
                    customer.account.deposit(depositAmount.amount)
                    break;
                    case "Withdraw":
                    const drawAmount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message:"Entre the amount to Withdraw!"
                    })
                    customer.account.withdraw(drawAmount.amount)
                    break;

                    case"Check Balance":
                    customer.account.checkbalance();
                    break;
                    case"Exit":
                    console.log("Existing the Bank Program...");
                    console.log("\n Thank you for using our services. Have a great day");
                    return;
                    
                    

            }
        }else{
            console.log("Invalid account number...Please try again");
            
        }
    } while(true)

}
service()














