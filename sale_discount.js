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
    console.log('\n\nItem\t\tQuantity\tPrice');
    console.log('--------------------------------------');
    Object.entries(this.itemCounts).forEach(([item, quantity]) => {
      const price = this.calculatePriceForItem(item, quantity, true).toFixed(2);
      console.log(`${item[0].toUpperCase() + item.slice(1)}\t\t${quantity}\t\t$${price}`);
    });
  }

  // Calculate price per item
  static calculatePriceForItem(itemName, quantity, withDiscount) {
    const inventoryItem = itemsInventory.find((i) => i.itemName.toLowerCase() === itemName);
    if (!inventoryItem) return 0;

    const { itemUnitPrice, itemSalePrice } = inventoryItem;
    let price = 0;

    if (withDiscount) {
      if (itemSalePrice) {
        const { saleQuantity, salePrice } = itemSalePrice;
        const discountBatches = Math.floor(quantity / saleQuantity);
        const remainingItems = quantity % saleQuantity;
        price = (discountBatches * salePrice) + (remainingItems * itemUnitPrice);
      } else {
        price = quantity * itemUnitPrice;
      }
    } else {
      price = quantity * itemUnitPrice;
    }
    return price;
  }

  // Calculate total price of all the purchased items
  calculateTotalPriceWithoutDiscount() {
    let totalWithoutDiscount = 0;
    Object.entries(this.itemCounts).forEach(([item, quantity]) => {
      const inventoryItem = itemsInventory.find((i) => i.itemName.toLowerCase() === item);
      if (!inventoryItem) return;
      totalWithoutDiscount += this.calculatePriceForItem(item, quantity, false);
    });
    return totalWithoutDiscount;
  }

  // Calculate total discounted price of all the purchased items
  calculateTotalPriceWithDiscount() {
    let totalWithDiscount = 0;
    Object.entries(this.itemCounts).forEach(([item, quantity]) => {
      const inventoryItem = itemsInventory.find((i) => i.itemName.toLowerCase() === item);
      if (!inventoryItem) return;
      totalWithDiscount += this.calculatePriceForItem(item, quantity, true);
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

  billing.listAllBoughtItems();

  const totalPriceWithDiscount = billing.calculateTotalPriceWithDiscount();
  console.log(`Total price : $${totalPriceWithDiscount.toFixed(2)}`);

  const savedPrice = billing.calculateSavedPrice();
  console.log(`You saved $${savedPrice.toFixed(2)} today.`);

  readline.close();
});
