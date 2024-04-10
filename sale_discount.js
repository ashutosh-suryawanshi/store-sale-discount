import Billing from './Billing';
import BillingInputHandler from './BillingInputHandler';
import BillingOutputHandler from './BillingOutputHandler';

const itemsInventory = [
  { itemName: 'Milk', itemUnitPrice: 3.97, itemSalePrice: { saleQuantity: 2, salePrice: 5.00 } },
  { itemName: 'Bread', itemUnitPrice: 2.17, itemSalePrice: { saleQuantity: 3, salePrice: 6.00 } },
  { itemName: 'Banana', itemUnitPrice: 0.99 },
  { itemName: 'Apple', itemUnitPrice: 0.89 },
];

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const billingInputHandler = new BillingInputHandler(readline);

// Ask user to enter list of purchased items
billingInputHandler.question('Please enter all the items purchased separated by a comma ', (items) => {
  const itemsBought = items.split(',').map((item) => item.trim());
  const billing = new Billing(itemsBought, itemsInventory);
  const billingOutput = new BillingOutputHandler(billing);

  billingOutput.listAllBoughtItems();
  billingOutput.displayTotalAndSavedPrice();

  readline.close();
});
