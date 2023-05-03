function checkWallet(seedPhrase) {
  const mnemonic = seedPhrase;
  const seed = bitcoin.bip39.mnemonicToSeedSync(mnemonic);
  const root = bitcoin.bip32.fromSeed(seed);
  const path = "m/44'/145'/0'/0/0";
  const child = root.derivePath(path);
  const keyPair = child.toWIF();

  const { address } = bitcoin.payments.p2pkh({
    pubkey: child.publicKey,
    network: bitcoin.networks.bitcoin
  });

  const apiKey = "your_blockchair_api_key";
  const url = `https://api.blockchair.com/bitcoin/dashboards/address/${address}?key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const balance = data.data[address].address.balance;
      console.log(`Adres: ${address}, Saldo: ${balance}`);
    })
    .catch((error) => console.error(error));
}

// Get reference to the crack button
const crackButton = document.getElementById("crack-button");

// Get reference to the clear button
const clearButton = document.getElementById("clear-button");

// Add click event listener to the crack button
crackButton.addEventListener("click", () => {
  // Get the seed phrase from the input field
  const seedPhrase = document.getElementById("seed-phrase").value.trim();

  // Call the checkWallet function with the seed phrase as an argument
  checkWallet(seedPhrase);
});

// Add click event listener to the clear button
clearButton.addEventListener("click", () => {
  // Clear the input field
  document.getElementById("seed-phrase").value = "";
});
