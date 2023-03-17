import {
  Client,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
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
const secondaccountId = accounts.account2.id;
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
  console.log(myAccountId);
  console.log(firstAccountId);
  console.log(firstAccountPrivateKey);

  //create token transaction
  let createNFT = await new TokenCreateTransaction()
    .setTokenName("Hedera NFT Token")
    .setTokenSymbol("HNFT")
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(firstAccountId)
    .setSupplyType(TokenSupplyType.Finite)
    .setFeeScheduleKey(myPrivateKey)
    .setMaxSupply(5)
    .setSupplyKey(myPrivateKey)
    .freezeWith(client);

  //Sign the transaction
  let signTransaction = await createNFT.sign(firstAccountPrivateKey);

  //Submit the transaction
  let submitTransaction = await signTransaction.execute(client);

  //Get the receipt
  let getReceipt = await submitTransaction.getReceipt(client);

  //Get the token ID
  let tokenId = getReceipt.tokenId;

  //Log the token ID
  console.log(`HNFT Token ID is: ${tokenId} \n`);

  process.exit();
}

main();
