class BillingInputHandler {
  constructor(readline) {
    this.readline = readline;
  }

  // Ask question to the user
  question(query, callback) {
    this.readline.question(query, (input) => {
      callback(input);
    });
  }

  // Close the readline input
  close() {
    this.readline.close();
  }
}

export default BillingInputHandler;
