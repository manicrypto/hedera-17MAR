
import {
  Client,
  AccountBalanceQuery,
  TransferTransaction,
  Hbar,
  PrivateKey,
  AccountId,
} from "@hashgraph/sdk";

import dotenv from "dotenv";
dotenv.config();
import { accounts } from "../../utils/getAccountDetails.js";


// Main account
const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

//First Account
const firstAccountId = AccountId.fromString(process.env.FIRST_ACCOUNT_ID);
const firstAccountPrivateKey = PrivateKey.fromString(
  process.env.MY_PRIVATE_KEY
);

//second Account
const secondAccountId = AccountId.fromString(process.env.SECOND_ACCOUNT_ID);
const secondAccountPrivateKey = PrivateKey.fromString(
  process.env.SECOND_PRIVATE_KEY
);
//third Account
const thirdAccountId = AccountId.fromString(process.env.THIRD_ACCOUNT_ID);
const thirdAccountPrivateKey = PrivateKey.fromString(
  process.env.THIRD_PRIVATE_KEY
);

//fourth Account
const fourthAccountId = AccountId.fromString(process.env.FOURTH_ACCOUNT_ID);
const fourthAccountPrivateKey = PrivateKey.fromString(
  process.env.FOURTH_PRIVATE_KEY
);

// Throw error if not set
if (myAccountId == null || myPrivateKey == null) {
  throw new Error(
    "Environment variables myAccountId and myPrivateKey must be present"
  );
}

// Connection to Hedera network
const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);

async function main() {
  // Multisig account ID
  const multisignAccountId = AccountId.fromString(
    accounts.multiSignAccId
  );
  console.log("The multisig ID is " + multisignAccountId);

  // Accounts to sign, then freez
  const nodeIds = [];
  nodeIds.push(new AccountId(3)); 

  // Create the transfer transaction
  const transferTransaction = new TransferTransaction()
    .addHbarTransfer(multisignAccountId, new Hbar(-10))
    .addHbarTransfer(fourthAccountId, new Hbar(10))
    .setNodeAccountIds(nodeIds)
    .freezeWith(client);

  // Account 1 signing transaction
  transferTransaction.sign(firstAccountPrivateKey);
  // Account 2 signing transaction
  transferTransaction.sign(secondAccountPrivateKey);

  console.log(`Doing transfer from ${multisignAccountId} to ${fourthAccountId}`);

  // Sign with the client operator key and submit the transaction to a Hedera network
  const transactionResponse = await transferTransaction.execute(client);

  // Request the receipt of the transaction
  const receipt = await transactionResponse.getReceipt(client);

  // Get the transaction consensus status
  const transactionStatus = receipt.status;

  console.log("The transaction consensus status is " + transactionStatus);

  // Create the queries
  const queryMine = new AccountBalanceQuery().setAccountId(multisignAccountId);
  const queryOther = new AccountBalanceQuery().setAccountId(fourthAccountId);

  const multisigBalance = await queryMine.execute(client);
  const account4Balance = await queryOther.execute(client);

  console.log(
    `Multisig account balance ${multisigBalance.hbars} HBar, account 4 balance ${account4Balance.hbars}`
  );

  process.exit();
}

main();
