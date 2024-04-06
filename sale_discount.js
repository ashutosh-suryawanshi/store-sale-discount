const itemsInventory = [
  {itemName: "Milk", itemUnitPrice: 3.97, itemSalePrice: {saleQuantity: 2, salePrice: 5.00}},
  {itemName: "Bread", itemUnitPrice: 2.17, itemSalePrice: {saleQuantity: 3, salePrice: 6.00}},
  {itemName: "Banana", itemUnitPrice: 0.99},
  {itemName: "Apple", itemUnitPrice: 0.89}
]

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Billing {
  _itemsBought = []

  constructor(itemsBought){
    this._itemsBought = itemsBought
  }

  // Calculate total price of all the purchased items
  calculateTotalPrice(){
    let totalPrice = 0
    // Calculate total price here
    return totalPrice
  }

  // Calculate total discounted price of all the purchased items
  calculateTotalDiscountedPrice(){
    let totalDiscountedPrice = 0
    // Calculate total price here
    return totalDiscountedPrice
  }
  
  // Calculate total saved price
  calculateSavedPrice(){
    const totalSaved = this.calculateTotalPrice() - this.calculateTotalDiscountedPrice()
    return totalSaved
  }
}

// Ask user to enter list of purchased items
readline.question(`Please enter all the items purchased separated by a comma `, (items) => {

  const itemsBought = items.split(",").map(item => item.trim())
  const billing = new Billing(itemsBought)

  const totalPrice = billing.calculateTotalPrice()
  console.log("Total price: ", totalPrice)

  const totalDiscount = billing.calculateSavedPrice()
  console.log("Total discount: ", totalDiscount)

  readline.close();
});