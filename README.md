# ThorChain.js

Thorchain.js is a libary that allows you to work with mutiple chains including, Thorchain, Bitcoin, Dogecoin, Ethereum, Etc<br>
Currently this libary isnt really fully released so it doesnt support swapping, liquidity adding/removing, Etc. However if you just want to do some basic stuff you can.

# BETA

This project isnt fully released so it is missing many features i want to add to it in the future.

| Supported Chains | Swapping | Liquidity |
| ---------------- | -------- | --------- |
| Bitcoin          | No       | No        |
| Thorchain        | No       | No        |

<!-- | Dogecoin         | No       | No        | -->

# Getting Started

1. First you will have to install the project<br>
   `yarn add thorchain.js`
   <br>or<br>
   `npm i thorchain.js`
2. You will want to initalize your thor client like so

```js
const thorchain = require("thorchain.js");

const client = new thorchain.client({
  network: "mainnet", // Defaults to testnet if you dont provide
  seed: "12 word seed phrase", // Defaults to "" if you dont provide a mnemonic
});
```

3. After you get your client setup youre all good to start using this libary

4. Check out the examples folder to learn how to do things. Official documentation wont be made until package is done
