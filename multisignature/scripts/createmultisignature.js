import {
  Client,
  PrivateKey,
  Hbar,
  AccountCreateTransaction,
  AccountId,
  KeyList,
} from "@hashgraph/sdk";

import dotenv from "dotenv";
dotenv.config();
import { accounts } from "../../utils/getAccountDetails.js";

const myAccountId = accounts.mainAccount.id;
const myPrivateKey = accounts.mainAccount.privateKey;

//First Account
const firstAccountId = AccountId.fromString(process.env.FIRST_ACCOUNT_ID);
const firstAccountPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

//second Account
const secondAccountId = AccountId.fromString(process.env.SECOND_ACCOUNT_ID);
const secondAccountPrivateKey = PrivateKey.fromString(
  process.env.SECOND_PRIVATE_KEY
);
//third Account
const thirdAccountId = AccountId.fromString(process.env.THIRD_ACCOUNT_ID);
const thirdAccountPrivateKey = PrivateKey.fromString(process.env.THIRD_PRIVATE_KEY);

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
  const keyList = new KeyList(
    [
      firstAccountPrivateKey.publicKey,
      secondAccountPrivateKey.publicKey,
      thirdAccountPrivateKey.publicKey,
    ],
    2
  );

  const transaction = new AccountCreateTransaction()
    .setInitialBalance(new Hbar(20))
    .setKey(keyList);

  //Sign the transaction with the client operator private key and submit to a Hedera network
  const txResponse = await transaction.execute(client);

  //Request the receipt of the transaction
  const receipt = await txResponse.getReceipt(client);

  //Get the account ID
  const accountId = receipt.accountId;

  console.log("Multisig account ID: " + accountId?.toString());

  process.exit();
}

main();
