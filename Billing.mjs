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

export default Billing;
