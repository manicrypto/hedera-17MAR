import {
    Client,
    AccountBalanceQuery,
    TransferTransaction,
    Hbar,
    PrivateKey,
    AccountId,
    TopicMessageSubmitTransaction
  } from "@hashgraph/sdk";
  
  import dotenv from "dotenv";
  dotenv.config();
  
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
    const tx = new TopicMessageSubmitTransaction({
      topicId: process.env.TOPIC_ID,
      message: `this is a timestamp from message submit: ${Date.now().toString()}`,
    });

    const txResponse = await tx.execute(client);

    const receipt = await txResponse.getReceipt(client);

    console.log(`transaction status is ${receipt.status}`);

    process.exit();
  }

  main()

 