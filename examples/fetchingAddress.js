const thorchain = require("thorchain.js");

(async () => {
  const client = new thorchain.client({
    phrase: "Seed Phrase Goes Here",
  });
  let thorAddress = await client.getAddressByChain(thorchain.Chains.THORChain); // => thor1f82mlyynnjj9sxfykfelwt2zyctaz7zaqa3jt7
  let bitcoinAddress = await client.getAddressByChain(
    thorchain.Chains.BTCChain // bc1q6d6txm7d8qxmjuknuw44lskx4u80f6ecypej9r
  );
})();
