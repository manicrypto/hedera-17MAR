import {
  Client,
  AccountCreateTransaction,
  AccountBalanceQuery,
  PrivateKey,
  Hbar,
} from "@hashgraph/sdk";
import { writeFileSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const myAccountId = process.env.MY_ACCOUNT_ID;
  const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

  console.log(myAccountId);
  console.log(myPrivateKey);

  // Check if master accountid and privatekey are set, if not throws error
  if (myAccountId == null || myPrivateKey == null) {
    throw new Error(
      "Environment variables myAccountId and myPrivateKey must be present"
    );
  }

  const client = Client.forTestnet();

  client.setOperator(myAccountId, myPrivateKey);
  var accountDetailsAll = {};

  //Creating five accounts
  for (let i = 1; i <= 5; i++) {
    //Create new keys
    const newAccountPrivateKey = PrivateKey.generateED25519();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    //Create a new account with 300 Hbar starting balance
    const newAccount = await new AccountCreateTransaction()
      .setKey(newAccountPublicKey)
      .setInitialBalance(new Hbar(1000))
      .setTransactionMemo("Create new account")
      .setAccountMemo("Create new account")
      .execute(client);

    // Get the new account ID
    const getReceipt = await newAccount.getReceipt(client);
    const newAccountId = getReceipt.accountId;

    console.log("The new account " + i + " ID is " + newAccountId);

    const accountBalance = await new AccountBalanceQuery()
      .setAccountId(newAccountId)
      .execute(client);

    console.log(
      "Account balance is: " + accountBalance.hbars.toTinybars() + " tinybar."
    );
    console.log("=========================================================");

    const accountDetails = {
      accountId: newAccountId.toString(),
      publicKey: newAccountPublicKey.toString(),
      privateKey: newAccountPrivateKey.toString(),
      balance: accountBalance.hbars,
    };

    const Key = "ACCOUNT".concat(i);
    accountDetailsAll = await Object.assign(
      { [Key]: accountDetails },
      accountDetailsAll
    );

    // Writting account details in a JSON file
    await createAccountOutputFile(accountDetailsAll);
  }
  process.exit();
}

async function createAccountOutputFile(config) {
  const path = "./new-accounts.json";

  try {
    writeFileSync(path, JSON.stringify(config, null, 2), "utf8");
    console.log("Account details saved.");
  } catch (error) {
    console.log("An error has occurred ", error);
  }
}

main();
