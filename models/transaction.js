function Transaction(sender, recipient) {
  this.sender = sender;
  this.recipient = recipient;
}

Transaction.prototype.displayTransaction = function displayTransaction() {
  return `Transaction from ${this.sender} to ${this.recipient}`;
};

function HashTransaction(sender, recipient) {
  if (!new.target) {
    return new HashTransaction(sender, recipient);
  }

  Transaction.call(this, sender, recipient);
}

HashTransaction.prototype.calculateHash = function calculateHash() {
  const data = [this.sender, this.recipient].join("");

  let hash = 0,
    i = 0;
  while (i < data.length) {
    hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
  }
  return hash ** 2;
};

HashTransaction.prototype = Object.create(Transaction.prototype);
HashTransaction.prototype.constructor = HashTransaction;

const tx = new HashTransaction(
  "dreamsandcode@gmail.com",
  "dreamsandcode@gmail.com"
);
const tx2 = new HashTransaction(
  "dreamsandcode@gmail.com",
  "dreamsandcode@gmail.com"
);

console.log(Transaction.prototype.isPrototypeOf(tx)); // true
console.log(tx.calculateHash === tx2.calculateHash); // true
console.log(tx.displayTransaction === tx2.displayTransaction); // true
console.log(tx.__proto__.__proto__); // Transaction { displayTransaction: [Function: displayTransaction] }
