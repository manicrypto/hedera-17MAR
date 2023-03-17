// const { Client, AccountBalanceQuery, PrivateKey } = require("@hashgraph/sdk");
// require("dotenv").config({ path: ".env" });
import { Client, AccountBalanceQuery, PrivateKey } from "@hashgraph/sdk";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  // const account1Id = AccountId.fromString(process.env.ACCOUNT1_ID);
  // const account1Key = PrivateKey.fromString(process.env.ACCOUNT1_PRIVATE_KEY);

  // const myAccountId = process.env.SECOND_ACCOUNT_ID;
  // const myPrivateKey = PrivateKey.fromString(process.env.SECOND_PRIVATE_KEY);
  const myAccountId = process.env.MY_ACCOUNT_ID;
  const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

  const client = Client.forTestnet();

  client.setOperator(myAccountId, myPrivateKey);

  // Create the query
  const query = new AccountBalanceQuery().setAccountId(myAccountId);

  // Sign with the client operator account private key and submit to a Hedera network
  const accountBalance = await query.execute(client);

  if (accountBalance) {
    console.log(
      `The account balance for account ${myAccountId} is ${accountBalance.hbars} HBar`
    );

    console.log("All account Info:");
    console.log(JSON.stringify(accountBalance));
  }

  process.exit();
}

main();
