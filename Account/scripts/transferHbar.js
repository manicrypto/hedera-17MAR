// const {
//     Client,
//     AccountBalanceQuery,
//     TransferTransaction,
//     Hbar,
//     PrivateKey
// } = require("@hashgraph/sdk");
// require('dotenv').config({ path: '.env' });

import {
  Client,
  AccountBalanceQuery,
  TransferTransaction,
  Hbar,
  PrivateKey,
} from "@hashgraph/sdk";
import dotenv from "dotenv";
dotenv.config();

const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

const otherAccountId = process.env.FIRST_ACCOUNT_ID;
const otherPrivateKey = PrivateKey.fromString(process.env.FIRST_PRIVATE_KEY);

async function main() {
  const client = Client.forTestnet();

  client.setOperator(otherAccountId, otherPrivateKey);

  // Create the transfer transaction
  const transaction = new TransferTransaction()
    .addHbarTransfer(otherAccountId, new Hbar(-100))
    .addHbarTransfer(myAccountId , new Hbar(100));

  console.log(`Doing transfer from ${myAccountId} to ${otherAccountId}`);

  // Sign with the client operator key and submit the transaction to a Hedera network
  const txId = await transaction.execute(client);

  // console.log(JSON.stringify(txId));

  // Request the receipt of the transaction
  const receipt = await txId.getReceipt(client);

  // console.log(JSON.stringify(receipt));

  // Get the transaction consensus status
  const transactionStatus = receipt.status;

  console.log("The transaction consensus status is " + transactionStatus);

  // Create the queries
  const queryMine = new AccountBalanceQuery().setAccountId(myAccountId);
  const queryOther = new AccountBalanceQuery().setAccountId(otherAccountId);

  const accountBalanceMine = await queryMine.execute(client);
  const accountBalanceOther = await queryOther.execute(client);

  console.log(
    `My account balance ${accountBalanceMine.hbars} HBar, other account balance ${accountBalanceOther.hbars}`
  );
}

main();
