import {
  Client,
  Hbar,
  AccountBalanceQuery,
  TokenMintTransaction,
  TokenAssociateTransaction,
  TransferTransaction,
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
const firstPrivateKey = accounts.account1.privateKey;

//Second Account
const secondAccountId = accounts.account2.id;
const secondPrivateKey = accounts.account2.privateKey;

//Third account
const thirdAccountId = accounts.account3.id;
const thirdAccountPrivateKey = accounts.account3.privateKey;

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
  // Comment if necessary
  await mintNFTs();
  await associateNFT();
  await sendNFTs();

  let balanceCheckTx = await new AccountBalanceQuery()
    .setAccountId(firstAccountId)
    .execute(client);
  console.log(
    `- Treasury balance: ${balanceCheckTx.tokens._map.get(
      tokenId.toString()
    )} NFTs of ID ${tokenId}`
  );

  balanceCheckTx = await new AccountBalanceQuery()
    .setAccountId(secondAccountId)
    .execute(client);
  console.log(
    `- Buyer's balance: ${balanceCheckTx.tokens._map.get(
      tokenId.toString()
    )} NFTs of ID ${tokenId}`
  );

  process.exit();
}

main();

async function mintNFTs() {
  for (let i = 0; i < 5; i++) {
    let mintTx = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata([Buffer.from(`NFT ${i}`)])
      .freezeWith(client);

    let mintTxSign = await mintTx.sign(firstPrivateKey);
    let mintTxSubmit = await mintTxSign.execute(client);
    let mintRx = await mintTxSubmit.getReceipt(client);

    console.log(
      `- Created NFT ${tokenId} with serial: ${mintRx.serials[0].low} \n`
    );
  }

  let balanceCheckTx = await new AccountBalanceQuery()
    .setAccountId(firstAccountId)
    .execute(client);
  console.log(
    `- User balance: ${balanceCheckTx.tokens._map.get(
      tokenId.toString()
    )} units of token ID ${tokenId}`
  );
}

async function associateNFT() {
  let associateBuyerTx = await new TokenAssociateTransaction()
    .setAccountId(secondAccountId)
    .setTokenIds([tokenId])
    .freezeWith(client)
    .sign(secondPrivateKey);

  let associateBuyerTxSubmit = await associateBuyerTx.execute(client);
  let associateBuyerRx = await associateBuyerTxSubmit.getReceipt(client);
  console.log(
    `- Token association with the users account: ${associateBuyerRx.status} \n`
  );
}

async function sendNFTs() {
  for (let i = 0; i < 5; i++) {
    let tokenTransferTx = await new TransferTransaction()
      .addNftTransfer(tokenId, i, firstAccountId, secondAccountId)
      .freezeWith(client)
      .sign(firstPrivateKey);

    let tokenTransferSubmit = await tokenTransferTx.execute(client);
    let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);

    console.log(
      `\n- NFT transfer from Treasury to Buyer: ${tokenTransferRx.status} \n`
    );
  }
}
