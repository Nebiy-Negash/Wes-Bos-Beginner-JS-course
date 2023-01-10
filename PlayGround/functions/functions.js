console.log('connected');

/*
! red
/ blue
* green
& pink 
~ purple
^ yellow
*/

/* 
* Built in functions
& The data you pass to a function is called an { argument } .{ Math.max(10, 12) returns 12 } 10 and 12 are arguments.
*/

/* 
* Custom Function
& Function group together set of instruction often taking in values { arguments} and return a new value or set of values.

* How to define a function
^ functions are created and or defined and called on or invoked.
  function definition
~  function calculateBill() {
  function body
~  console.log('Running calculate bill');
~  }
  calling or running the function
~ calculateBill() // console logs Running calculate bill
 
*/

function calculateBill(billAmount, taxRate = 0.13, tipRate = 0.15) {
  console.log('Running calculate bill');
  const total = billAmount + billAmount * taxRate + billAmount * tipRate;
  return total;
}

const myTotal = calculateBill();
// console.log(`your total is $${myTotal}`);

const bill = calculateBill(100, undefined, 0.2);
console.log(bill);
