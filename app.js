// Get reference to the import button
const importButton = document.getElementById("import");

// Get reference to the clear button
const clearButton = document.getElementById("clear");

// Add click event listener to the import button
importButton.addEventListener("click", () => {
  // Get the seed phrase from the input field
  const seedPhrase = document.getElementById("seed-phrase").value.trim();

  // Check if the seed phrase is empty
  if (seedPhrase === "") {
    alert("Please enter a seed phrase.");
    return;
  }

  // Check if the seed phrase is valid
  if (!bitcoin.bip39.validateMnemonic(seedPhrase)) {
    alert("Invalid seed phrase. Please check your input and try again.");
    return;
  }

  // Generate a bitcoin address from the seed phrase
  const mnemonic = seedPhrase;
  const seed = bitcoin.bip39.mnemonicToSeedSync(mnemonic);
  const root = bitcoin.bip32.fromSeed(seed);
  const path = "m/44'/0'/0'/0/0";
  const child = root.derivePath(path);
  const keyPair = child.toWIF();
  const { address } = bitcoin.payments.p2pkh({
    pubkey: child.publicKey,
    network: bitcoin.networks.bitcoin,
  });

  // Redirect to the generated address page
  const url = `https://www.blockchain.com/btc/address/${address}`;
  window.open(url, "_blank");
});

// Add click event listener to the clear button
clearButton.addEventListener("click", () => {
  // Clear the input field
  document.getElementById("seed-phrase").value = "";
});
