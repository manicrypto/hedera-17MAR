import {
  TransferTransaction,
  Client,
  ScheduleCreateTransaction,
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

const scheduleTxBase64 = accounts.serialisedTransaction;

async function main() {
  // const adminUser = new Wallet(accountId, privateKey);
  let deserializedData = Buffer.from(scheduleTxBase64, 'base64').toString();

  // deserialize the hash
  let transaction = JSON.parse(deserializedData);

  const scheduleTransaction = new ScheduleCreateTransaction(transaction)
      .sign(firstAccountPrivateKey);

  //Sign with the client operator key to pay for the transaction and submit to a Hedera network
  const txResponse = await scheduleTransaction.execute(client);

  //Get the receipt of the transaction
  const receipt = await txResponse.getReceipt(client);

  //Get the transaction status
  const transactionStatus = receipt.status;
  console.log("The transaction consensus status is " + transactionStatus);  

  process.exit();
}

async function sleep(n) {
  return new Promise((resolve) => setTimeout(resolve, n));
}

main();
