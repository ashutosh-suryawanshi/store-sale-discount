class BillingOutputHandler {
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

export default BillingOutputHandler;
