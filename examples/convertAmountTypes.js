const thorchain = require("thorchain.js");

(async () => {
  const client = new thorchain.client({
    phrase: "Seed Phrase Goes Here",
  });
  function assetToBase(asset) {
    return client.assetToBase(asset);
  } // asset is a float.
  function baseToAsset(base) {
    return client.baseToAsset(base);
  } // REMEMBER base must be of type BaseAmount
})();
