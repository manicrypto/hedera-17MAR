import {
  TransferTransaction,
  Client,
  ScheduleCreateTransaction,
  PrivateKey,
  Hbar,
  Wallet,
  Transaction,
} from "@hashgraph/sdk";

import dotenv from "dotenv";
dotenv.config();
import { accounts } from "../../utils/getAccountDetails.js";

// const { sleep } = require("../../utils/utils.js");

const myAccountId = accounts.mainAccount.id;
const myPrivateKey = accounts.mainAccount.privateKey;

console.log(myAccountId);
console.log(myPrivateKey);

//First Account
const firstAccountId = accounts.account1.id;
const firstAccountPrivateKey = accounts.account1.privateKey;

//Second Account
const secondAccountId = accounts.account2.id;
const secondAccountPrivateKey = accounts.account2.privateKey;

// Check if master accountid and privatekey are set, if not throws error
if (myAccountId == null || myPrivateKey == null) {
  throw new Error(
    "Environment variables myAccountId and myPrivateKey must be present"
  );
}

const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);

async function main() {
  // const adminUser = new Wallet(accountId, privateKey);

  //Create a transaction to schedule
  const transaction = new TransferTransaction()
    .addHbarTransfer(firstAccountId, new Hbar(-1))
    .addHbarTransfer(secondAccountId, new Hbar(1));

  //Schedule a transaction
  const scheduleTransaction = await new ScheduleCreateTransaction()
    .setScheduledTransaction(transaction)
    .setScheduleMemo("Scheduled transaction!")
    .setAdminKey(myPrivateKey)
    .execute(client);

  //Get the receipt of the transaction
  const receipt = await scheduleTransaction.getReceipt(client);

  //Get the schedule ID
  const scheduleId = receipt.scheduleId;
  console.log("The schedule ID is " + scheduleId);

  //Get the scheduled transaction ID
  const scheduledTxId = receipt.scheduledTransactionId;
  console.log("The scheduled transaction ID is " + scheduledTxId);

  // Serialise and export the transaction to a base 64
  let serializedData = JSON.stringify(scheduleTransaction);
  let scheduledTxIdBase64 = Buffer.from(serializedData).toString("base64");

  console.log(
    "The scheduled transaction ID in base64 is " + scheduledTxIdBase64
  );

  process.exit();
}

async function sleep(n) {
  return new Promise((resolve) => setTimeout(resolve, n));
}

main();
