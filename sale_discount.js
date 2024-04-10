// Imports
import readline from 'readline';
import Billing from './Billing.mjs';
import BillingInputHandler from './BillingInputHandler.mjs';
import BillingOutputHandler from './BillingOutputHandler.mjs';

// Item invertory - Static
const itemsInventory = [
  { itemName: 'Milk', itemUnitPrice: 3.97, itemSalePrice: { saleQuantity: 2, salePrice: 5.00 } },
  { itemName: 'Bread', itemUnitPrice: 2.17, itemSalePrice: { saleQuantity: 3, salePrice: 6.00 } },
  { itemName: 'Banana', itemUnitPrice: 0.99 },
  { itemName: 'Apple', itemUnitPrice: 0.89 },
];

// Create interface for reading user input
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create an object for hadling user input
const billingInputHandler = new BillingInputHandler(readlineInterface);

// Ask user to enter list of purchased items
billingInputHandler.question('Please enter all the items purchased separated by a comma ', (items) => {
  const itemsBought = items.split(',').map((item) => item.trim());
  const billing = new Billing(itemsBought, itemsInventory);
  const billingOutput = new BillingOutputHandler(billing);

  billingOutput.listAllBoughtItems();
  billingOutput.displayTotalAndSavedPrice();

  readlineInterface.close();
});
