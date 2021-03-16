class HashTransaction extends Transaction {
  transactionId;
  constructor(sender, recipient, funds = 0.0) {
    super(sender, recipient, funds);
    this.transactionId = this.calculateHash();
  }

  calculateHash() {
    const data = [this.sender, this.recipient, this.funds].join("");

    let hash = 0,
      i = 0;

    while (i < data.length) {
      hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
    }
    return hash ** 2;
  }

  displayTransacation() {
    return `${this.transactionId}: ${super.displayTransacation()}`;
  }
}

const tx = new HashTransaction(
  "dreamsandcode@gmail.com",
  "brian.palmer@live.com",
  300
);
tx.displayTransacation();
