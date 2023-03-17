import { PrivateKey, PublicKey } from "@hashgraph/sdk";
import dotenv from "dotenv";
dotenv.config();

export const accounts = {
  mainAccount: {
    name: "main",
    id: process.env.MY_ACCOUNT_ID,
    privateKeyStr: process.env.MY_PRIVATE_KEY,
    publicKeyStr: process.env.MY_PUBLIC_KEY,
    privateKey: PrivateKey.fromString(process.env.MY_PRIVATE_KEY),
    publicKey: PublicKey.fromString(process.env.MY_PUBLIC_KEY),
  },
  account1: {
    name: "account1",
    id: process.env.FIRST_ACCOUNT_ID,
    privateKeyStr: process.env.FIRST_PRIVATE_KEY,
    publicKeyStr: process.env.FIRST_PUBLIC_KEY,
    privateKey: PrivateKey.fromString(process.env.FIRST_PRIVATE_KEY),
    publicKey: PublicKey.fromString(process.env.FIRST_PUBLIC_KEY),
  },
  account2: {
    name: "account2",
    id: process.env.SECOND_ACCOUNT_ID,
    privateKeyStr: process.env.SECOND_PRIVATE_KEY,
    publicKeyStr: process.env.SECOND_PUBLIC_KEY,
    privateKey: PrivateKey.fromString(process.env.SECOND_PRIVATE_KEY),
    publicKey: PublicKey.fromString(process.env.SECOND_PUBLIC_KEY),
  },
  account3: {
    name: "account3",
    id: process.env.THIRD_ACCOUNT_ID,
    privateKeyStr: process.env.THIRD_PRIVATE_KEY,
    publicKeyStr: process.env.THIRD_PUBLIC_KEY,
    privateKey: PrivateKey.fromString(process.env.THIRD_PRIVATE_KEY),
    publicKey: PublicKey.fromString(process.env.THIRD_PUBLIC_KEY),
  },
  account4: {
    name: "account4",
    id: process.env.FOURTH_ACCOUNT_ID,
    privateKeyStr: process.env.FOURTH_PRIVATE_KEY,
    publicKeyStr: process.env.FOURTH_PUBLIC_KEY,
    privateKey: PrivateKey.fromString(process.env.FOURTH_PRIVATE_KEY),
    publicKey: PublicKey.fromString(process.env.FOURTH_PUBLIC_KEY),
  },
  account5: {
    name: "account5",
    id: process.env.FIFTH_ACCOUNT_ID,
    privateKeyStr: process.env.FIFTH_PRIVATE_KEY,
    publicKeyStr: process.env.FIFTH_PUBLIC_KEY,
    privateKey: PrivateKey.fromString(process.env.FIFTH_PRIVATE_KEY),
    publicKey: PublicKey.fromString(process.env.FIFTH_PUBLIC_KEY),
  },
  scheduleId: process.env.SCHEDULE_ID,
  topicId: process.env.TOPIC_ID,
  tokenId: process.env.TOKEN_ID,
  multiSignAccId: process.env.MULTISIG_ACCOUNT_ID,
  contractId: process.env.CONTRACT_ID,
  serialisedTransaction: process.env.SERIALIZED_VALUE,
};
