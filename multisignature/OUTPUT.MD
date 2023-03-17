
## create multi signature

run ```node multisignature/scripts/createmultisignature.js ```

Multisig account ID: 0.0.3841344


## invalid signature error

node multisignature/scripts/invalidTxn.js 
0.0.3518962
5ef30c76bd36a00aee1550a47026be86ed1357b2e442744f408f990daf50b165
The multisig ID is 0.0.3841344
Doing transfer from 0.0.3841344 to 0.0.3836613
file:///Users/manikandanchinnadurai/manikandan/Projects/hedera/hedera-exam-MAR10/node_modules/@hashgraph/sdk/src/ReceiptStatusError.js:37
        super(
        ^

ReceiptStatusError: receipt for transaction 0.0.3518962@1679062259.308988753 contained error status INVALID_SIGNATURE
    at new ReceiptStatusError (file:///Users/manikandanchinnadurai/manikandan/Projects/hedera/hedera-exam-MAR10/node_modules/@hashgraph/sdk/src/ReceiptStatusError.js:37:9)
    at TransactionReceiptQuery._mapStatusError (file:///Users/manikandanchinnadurai/manikandan/Projects/hedera/hedera-exam-MAR10/node_modules/@hashgraph/sdk/src/transaction/TransactionReceiptQuery.js:329:16)
    at TransactionReceiptQuery.execute (file:///Users/manikandanchinnadurai/manikandan/Projects/hedera/hedera-exam-MAR10/node_modules/@hashgraph/sdk/src/Executable.js:692:32)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async TransactionResponse.getReceipt (file:///Users/manikandanchinnadurai/manikandan/Projects/hedera/hedera-exam-MAR10/node_modules/@hashgraph/sdk/src/transaction/TransactionResponse.js:81:25)
    at async main (file:///Users/manikandanchinnadurai/manikandan/Projects/hedera/hedera-exam-MAR10/multisignature/scripts/invalidTxn.js:89:19) {
  status: Status { _code: 7 },
  transactionId: TransactionId {
    accountId: AccountId {
      shard: Long { low: 0, high: 0, unsigned: false },
      realm: Long { low: 0, high: 0, unsigned: false },
      num: Long { low: 3518962, high: 0, unsigned: false },
      aliasKey: null,
      aliasEvmAddress: null,
      _checksum: null
    },
    validStart: Timestamp {
      seconds: Long { low: 1679062259, high: 0, unsigned: false },
      nanos: Long { low: 308988753, high: 0, unsigned: false }
    },
    scheduled: false,
    nonce: null
  },
  transactionReceipt: TransactionReceipt {
    status: Status { _code: 7 },
    accountId: null,
    fileId: null,
    contractId: null,
    topicId: null,
    tokenId: null,
    scheduleId: null,
    exchangeRate: ExchangeRate {
      hbars: 30000,
      cents: 189113,
      expirationTime: 2023-03-17T15:00:00.000Z,
      exchangeRateInCents: 6.303766666666666
    },
    topicSequenceNumber: Long { low: 0, high: 0, unsigned: false },
    topicRunningHash: Uint8Array(0) [],
    totalSupply: Long { low: 0, high: 0, unsigned: false },
    scheduledTransactionId: null,
    serials: [],
    duplicates: [],
    children: []
  }
}

Node.js v18.12.1

## valid transaction

The multisig ID is 0.0.3841344
Doing transfer from 0.0.3841344 to 0.0.3836613
The transaction consensus status is 22
Multisig account balance 10 ℏ HBar, account 4 balance 1010 ℏ