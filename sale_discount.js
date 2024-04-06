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

  constructor(itemsBought) {
    this.itemsBought = itemsBought;
    this.itemCounts = this.itemsBought.reduce((acc, item) => {
      acc[item] = acc[item] ? acc[item] + 1 : 1;
      return acc;
    }, {});
  }

  listAllBoughtItems() {
    // List all the items bought
  }

  // Calculate total price of all the purchased items
  calculateTotalPriceWithoutDiscount() {
    let totalWithoutDiscount = 0;
    Object.entries(this.itemCounts).forEach(([item, quantity]) => {
      const inventoryItem = itemsInventory.find(i => i.itemName.toLowerCase() === item);
      if (!inventoryItem) return;
      const unitPrice = inventoryItem.itemUnitPrice;
      totalWithoutDiscount += unitPrice * quantity;
    });
    return totalWithoutDiscount;
  }

  // Calculate total discounted price of all the purchased items
  calculateTotalPriceWithDiscount() {
    let totalWithDiscount = 0;
    Object.entries(this.itemCounts).forEach(([item, quantity]) => {
      const inventoryItem = itemsInventory.find(i => i.itemName.toLowerCase() === item);
      if (!inventoryItem) return;

      const unitPrice = inventoryItem.itemUnitPrice;
      if (inventoryItem.itemSalePrice) {
        const { saleQuantity, salePrice } = inventoryItem.itemSalePrice;
        const discountBatches = Math.floor(quantity / saleQuantity);
        const remainingItems = quantity % saleQuantity;
        totalWithDiscount += (discountBatches * salePrice) + (remainingItems * unitPrice);
      } else {
        totalWithDiscount += unitPrice * quantity;
      }
    });
    return totalWithDiscount;
  }

  // Calculate total saved price
  calculateSavedPrice() {
    const totalSaved = this.calculateTotalPriceWithoutDiscount() - this.calculateTotalPriceWithDiscount();
    return totalSaved;
  }
}

// Ask user to enter list of purchased items
readline.question('Please enter all the items purchased separated by a comma ', (items) => {
  const itemsBought = items.split(',').map((item) => item.trim());
  const billing = new Billing(itemsBought);

  const totalPriceWithDiscount = billing.calculateTotalPriceWithDiscount();
  console.log('Total price: ', totalPriceWithDiscount);

  const savedPrice = billing.calculateSavedPrice();
  console.log('Total discount: ', savedPrice);

  readline.close();
});
