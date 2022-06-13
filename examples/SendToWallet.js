const thorchain = require("thorchain.js");

(async () => {
  const client = new thorchain.client({
    phrase: "",
  });
  function assetToBase(asset) {
    return client.assetToBase(asset);
  } // asset is a float.
  function baseToAsset(base) {
    return client.baseToAsset(base);
  } // REMEMBER base must be of type BaseAmount

  //   Transfer = {
  //   recipient: string;
  //   amount: string;
  //   memo?: string;
  // };

  let amountTransfer = 0.1; // However much you want to send.

  // Then your gonna want to convert it to Base Amount
  let baseAmount = assetToBase(amountTransfer);

  // Then you will want to build your Transfer object
  const Transfer = {
    recipient: "Address you want to send to",
    amount: baseAmount, // Must be of type BaseAmount
    memo: "Transaction memo",
  };
  let tx = await client.transfer(thorchain.Chains.BTCChain, Transfer); // Will return the tx of the transaction
})();
