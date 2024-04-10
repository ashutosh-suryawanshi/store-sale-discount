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

class Billing {
  constructor(itemsBought, inventory) {
    this.itemsBought = itemsBought;
    this.inventory = inventory;
    this.itemCounts = this.itemsBought.reduce((acc, item) => {
      acc[item] = acc[item] ? acc[item] + 1 : 1;
      return acc;
    }, {});
  }

  // Calculate price per item
  calculatePriceForItem(itemName, quantity, withSale) {
    const inventoryItem = this.inventory.find((i) => i.itemName.toLowerCase() === itemName);
    if (!inventoryItem) return 0;

    const { itemUnitPrice, itemSalePrice } = inventoryItem;
    let price = 0;

    if (withSale) {
      if (itemSalePrice) {
        const { saleQuantity, salePrice } = itemSalePrice;
        const saleBatches = Math.floor(quantity / saleQuantity);
        const remainingItems = quantity % saleQuantity;
        price = (saleBatches * salePrice) + (remainingItems * itemUnitPrice);
      } else {
        price = quantity * itemUnitPrice;
      }
    } else {
      price = quantity * itemUnitPrice;
    }
    return price;
  }

  // Calculate total price of all the purchased items without sale price
  calculateTotalPriceWithoutSale() {
    let totalWithoutSale = 0;
    Object.entries(this.itemCounts).forEach(([item, quantity]) => {
      const inventoryItem = this.inventory.find((i) => i.itemName.toLowerCase() === item);
      if (!inventoryItem) return;
      totalWithoutSale += this.calculatePriceForItem(item, quantity, false);
    });
    return totalWithoutSale;
  }

  // Calculate total saled price of all the purchased items
  calculateTotalPriceWithSale() {
    let totalWithSale = 0;
    Object.entries(this.itemCounts).forEach(([item, quantity]) => {
      const inventoryItem = this.inventory.find((i) => i.itemName.toLowerCase() === item);
      if (!inventoryItem) return;
      totalWithSale += this.calculatePriceForItem(item, quantity, true);
    });
    return totalWithSale;
  }

  // Calculate total saved price
  calculateSavedPrice() {
    const totalSaved = this.calculateTotalPriceWithoutSale() - this.calculateTotalPriceWithSale();
    return totalSaved;
  }

  // Get count of items bought
  getItemCounts() {
    return this.itemCounts;
  }
}

class BillingOutputOperations {
  constructor(billing) {
    this.billing = billing;
  }

  // List all the bought items and their prices as per the sale price
  listAllBoughtItems() {
    console.log('\nItem\t\tQuantity\tPrice');
    console.log('--------------------------------------');
    const itemCounts = this.billing.getItemCounts();
    Object.entries(itemCounts).forEach(([item, quantity]) => {
      const price = this.billing.calculatePriceForItem(item, quantity, true).toFixed(2);
      console.log(`${item[0].toUpperCase() + item.slice(1)}\t\t${quantity}\t\t$${price}`);
    });
  }

  // Display total and saved price on console
  displayTotalAndSavedPrice() {
    const totalPriceWithSale = this.billing.calculateTotalPriceWithSale();
    console.log(`\nTotal price: $${totalPriceWithSale.toFixed(2)}`);

    const savedPrice = this.billing.calculateSavedPrice();
    console.log(`You saved $${savedPrice.toFixed(2)} today.`);
  }
}

// Ask user to enter list of purchased items
readline.question('Please enter all the items purchased separated by a comma ', (items) => {
  const itemsBought = items.split(',').map((item) => item.trim());
  const billing = new Billing(itemsBought, itemsInventory);
  const inputOutputOperations = new BillingOutputOperations(billing);

  inputOutputOperations.listAllBoughtItems();
  inputOutputOperations.displayTotalAndSavedPrice();

  readline.close();
});
