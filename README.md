# EtherCast
EtherCast is a blockchain-based e-voting system with zero-trust principle that takes advantage of the decentralized and immutable nature of blockchain technology to provide a tamper-proof and auditable voting module.
The current version of EtherCast's smart contract is written in Solidity and the contract is deployed on the Sepolia testnet.

### Features
- Privacy-enhanced Decentralized Identity solution using Hyperledger Aries, Indy and Ursa
- Ensures voter anonymity using Zero-Knowledge Proof
- Automated result calculation

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/shazzad5709/chirp-up.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
DATABASE_URL=
NEXTAUTH_JWT_SECRET=
NEXTAUTH_SECRET=
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
| `build`         | Builds a production instance of the app  |

