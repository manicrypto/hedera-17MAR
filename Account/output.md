##Output

 ``` npm run start:createaccount

> account_info@1.0.0 start:createaccount
> node Account/scripts/createAccount.js

0.0.3518962
PrivateKey {
  _key: PrivateKey {
    _key: Ed25519PrivateKey { _keyPair: [Object], _chainCode: null }
  }
}
The new account 1 ID is 0.0.3836607
Account balance is: 100000000000 tinybar.
=========================================================
Account details saved.
The new account 2 ID is 0.0.3836608
Account balance is: 100000000000 tinybar.
=========================================================
Account details saved.
The new account 3 ID is 0.0.3836610
Account balance is: 100000000000 tinybar.
=========================================================
Account details saved.
The new account 4 ID is 0.0.3836613
Account balance is: 100000000000 tinybar.
=========================================================
Account details saved.
The new account 5 ID is 0.0.3836615
Account balance is: 100000000000 tinybar.
=========================================================
Account details saved.```

## Output with both keys

{
  "ACCOUNT5": {
    "accountId": "0.0.3836615",
    "publicKey": "302a300506032b65700321008deb8929b1585be989fbcae6e992706a74a868b204e7777b4c699c8ae68ee7c1",
    "privateKey": "302e020100300506032b657004220420c320e61a7dc864f7997a6fa7668bb790eadf322b9dbde1d146ff3fd620218329",
    "balance": {
      "_valueInTinybar": "100000000000"
    }
  },
  "ACCOUNT4": {
    "accountId": "0.0.3836613",
    "publicKey": "302a300506032b6570032100583f8f6277fd1df39c611512b98b5e54b93df345e212a69a1a42e6d31af705b4",
    "privateKey": "302e020100300506032b6570042204202200acd2cf27a926a21dd0d81177340cf3d1a8ef487bdcec2f7114b980cb9695",
    "balance": {
      "_valueInTinybar": "100000000000"
    }
  },
  "ACCOUNT3": {
    "accountId": "0.0.3836610",
    "publicKey": "302a300506032b65700321000de7c61913da08180a20db0097505368b4123cdae3e3f92e46d30eda3868d4b6",
    "privateKey": "302e020100300506032b65700422042089c2064f7d54a7db2e1e685b1ca166f6147e5604fd8287f978ec27930ce5b75e",
    "balance": {
      "_valueInTinybar": "100000000000"
    }
  },
  "ACCOUNT2": {
    "accountId": "0.0.3836608",
    "publicKey": "302a300506032b6570032100d2b163d5a19be4c7c05fda7ec14c4a5dc85ea2a5c1fa5318b87809e44f83c49a",
    "privateKey": "302e020100300506032b657004220420625176e0628be019839e437fa47fdf0d1e50103bcd8905f2e011f3a9fa26f2ad",
    "balance": {
      "_valueInTinybar": "100000000000"
    }
  },
  "ACCOUNT1": {
    "accountId": "0.0.3836607",
    "publicKey": "302a300506032b6570032100b11eab74d152a5f78fe0de557e2160e964fdebe25cbe00f5ff205b073f8a8b5e",
    "privateKey": "302e020100300506032b6570042204205884556dff3d1deb11856f940ac2764f5d66507b11a4244835d89026368cea0f",
    "balance": {
      "_valueInTinybar": "100000000000"
    }
  }
}