import {
  Client,
  TokenFeeScheduleUpdateTransaction,
  CustomRoyaltyFee,
  CustomFixedFee,
  Hbar,
} from "@hashgraph/sdk";

import dotenv from "dotenv";
dotenv.config();
import { accounts } from "../../../utils/getAccountDetails.js";

//main account
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

const tokenId = accounts.tokenId;

// Check if master accountid and privatekey are set, if not throws error
if (myAccountId == null || myPrivateKey == null) {
  throw new Error(
    "Environment variables myAccountId and myPrivateKey must be present"
  );
}

const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);

async function main() {
  console.log(myAccountId);
  console.log(firstAccountId);
  console.log(firstAccountPrivateKey);

  const customFee = new CustomRoyaltyFee()
    .setNumerator(1)
    .setDenominator(10)
    .setFallbackFee(
      new CustomFixedFee()
        .setHbarAmount(new Hbar(200))
        .setFeeCollectorAccountId(secondAccountId)
    );

  //update transaction
  const transaction = await new TokenFeeScheduleUpdateTransaction()
    .setTokenId(tokenId)
    .setCustomFees([customFee])
    .freezeWith(client);

  //sign trasaction
  const signTx = await transaction.sign(myPrivateKey);

  //submit transaction
  const txResponse = await signTx.execute(client);

  //get receipt
  const receipt = await txResponse.getReceipt(client);

  const transactionStatus = receipt.status.toString();
  console.log("The transaction consensus status is " + transactionStatus);

  process.exit();
}

main();
