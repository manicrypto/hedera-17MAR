const {
    Client,
    PrivateKey,
    ContractCreateFlow} = require("@hashgraph/sdk");
const env = require("dotenv").config({ path: ".env" });
console.log(env.FIRST_ACCOUNT_ID);
console.log(process.env.FIRST_PRIVATE_KEY);

const account1Id = process.env.FIRST_ACCOUNT_ID;
const account1PrivateKey = PrivateKey.fromString(process.env.FIRST_PRIVATE_KEY);

// Throw error if not set
if (account1Id == null || account1PrivateKey == null ) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
}

// Connection to Hedera network
const client = Client.forTestnet();

client.setOperator(account1Id, account1PrivateKey);

async function main() {
    let contract = require("../artifacts/contracts/certificationC3.sol/CertificationC1.json");
    const bytecode = contract.bytecode;
    // console.log(bytecode);

    // Create the transaction
    const contractCreate = new ContractCreateFlow()
        .setGas(100000)
        .setAdminKey(account1PrivateKey.publicKey)
        .setBytecode(bytecode);

    // Sign the transaction with the client operator key and submit to a Hedera network
    const txResponse = contractCreate.execute(client);

    // Get the receipt of the transaction
    const receipt = (await txResponse).getReceipt(client);

    // Get the new contract ID
    const newContractId = (await receipt).contractId;

    //Log the smart contract ID
    console.log("The smart contract ID is " + newContractId);

    process.exit();
}

main();