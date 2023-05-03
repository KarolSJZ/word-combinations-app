function checkWallet(seedPhrase) {
  const mnemonic = seedPhrase;
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed);
  const path = "m/44'/145'/0'/0/0";
  const child = root.derivePath(path);
  const keyPair = child.toWIF();

  const { address } = payments.p2pkh({
    pubkey: child.publicKey,
    network: networks.bitcoin
  });

  const apiUrl = `https://explorer.e.cash/v1/address/${address}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const balance = data.balance;
      const txCount = data.transactionCount;
      console.log(`Adres: ${address}, Saldo: ${balance}, Liczba transakcji: ${txCount}`);
      // Display the results in the "results" div
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = `<p>Adres: ${address}</p><p>Saldo: ${balance}</p><p>Liczba transakcji: ${txCount}</p>`;
    })
    .catch((error) => console.error(error));
}

// Get reference to the crack button
const crackButton = document.getElementById("crack-button");

// Add click event listener to the crack button
crackButton.addEventListener("click", () => {
  // Get the seed phrase from the input field
  const seedPhrase = document.getElementById("seed-phrase").value.trim();

  // Call the checkWallet function with the seed phrase as an argument
  checkWallet(seedPhrase);
});

// Get reference to the clear button
const clearButton = document.getElementById("clear-button");

// Add click event listener to the clear button
clearButton.addEventListener("click", () => {
  // Clear the input field
  document.getElementById("seed-phrase").value = "";

  // Clear the results div
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
});
