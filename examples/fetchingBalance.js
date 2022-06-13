const thorchain = require("thorchain.js");

async () => {
  const client = new thorchain.client({
    phrase: "Seed Phrase Goes Here",
  });
  let thorBalance = await client.getBalanceByChain(thorchain.Chains.THORChain);
  let bitcoinBalance = await client.getBalanceByChain(
    thorchain.Chains.BTCChain
  );
};
