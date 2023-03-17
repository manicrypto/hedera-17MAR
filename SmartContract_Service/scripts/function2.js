const {
  Client,
  ContractFunctionParameters,
  ContractExecuteTransaction,
  PrivateKey,
  ContractId,
} = require("@hashgraph/sdk");
const env = require("dotenv").config({ path: ".env" });

console.log(process.env.FIRST_ACCOUNT_ID);
console.log(process.env.FIRST_PRIVATE_KEY);

const account1Id = process.env.FIRST_ACCOUNT_ID;
const account1PrivateKey = PrivateKey.fromString(process.env.FIRST_PRIVATE_KEY);

// Throw error if not set
if (account1Id == null || account1PrivateKey == null) {
  throw new Error(
    "Environment variables myAccountId and myPrivateKey must be present"
  );
}

// Connection to Hedera network
const client = Client.forTestnet();

client.setOperator(account1Id, account1PrivateKey);

async function main() {
  const tx = new ContractExecuteTransaction()
    .setContractId(process.env.CONTRACT_ID)
    .setGas(100000)
    .setFunction("function2", new ContractFunctionParameters().addUint16(42))
    .freezeWith(client);

  const signTx = await tx.sign(account1PrivateKey);

  const txResponse = await signTx.execute(client);

  const receipt = await txResponse.getReceipt(client);

  console.log(`transaction status is ${receipt.status}`);

  const record = await txResponse.getRecord(client);

  console.log(
    `the result of function2 is: ${record.contractFunctionResult?.getUint32()}`
  );

  process.exit();
}

main();
