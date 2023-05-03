const bitcoin = require("bitcoinjs-lib");
require("@muzamint/bitcoinjs-lib-networks");

// Get reference to the crack button
const crackButton = document.getElementById("crack-button");

// Add click event listener to the crack button
crackButton.addEventListener("click", () => {
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

  // Get the balance for the generated address
  const apiUrl = `https://explorer.e.cash/v1/address/${address}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const balance = data.balance;
      const txCount = data.transactionCount;

      // Display the address and balance
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = `<p>Address: ${address}</p><p>Balance: ${balance} XEC</p><p>Number of Transactions: ${txCount}</p>`;
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while fetching balance. Please try again later.");
    });
});

// Get reference to the clear button
const clearButton = document.getElementById("clear-button");

// Add click event listener to the clear button
clearButton.addEventListener("click", () => {
  // Clear the input field and results
