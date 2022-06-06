const thorchain = require("@ducksquaddd/thorchain.js");

(async () => {
  const client = new thorchain.client({
    phrase: "",
  });
  let { average, fast, fastest } = await client.getFees(
    thorchain.Chains.THORChain
  );
  let bitcoinFees = await client.getFees(thorchain.Chains.BTCChain);
  console.log(client.baseToAsset(bitcoinFees.fastest).amount().toString());
})();
