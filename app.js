// Load the required libraries
Promise.all([
  import("https://cdn.jsdelivr.net/npm/bip39@^3.0.2/dist/bip39.min.js"),
  import("https://cdn.jsdelivr.net/npm/bitcoinjs-lib@^5.1.13/dist/bitcoinjs-lib.min.js"),
  import("https://cdn.jsdelivr.net/npm/@muzamint/bitcoinjs-lib-networks@^1.0.6/dist/bitcoinjs-lib-networks.min.js"),
  import("https://cdn.jsdelivr.net/npm/@muzamint/bitcoinjs-lib-payments@^1.0.7/dist/bitcoinjs-lib-payments.min.js"),
])
  .then((modules) => {
    console.log("Loaded all required libraries");

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
      if (!modules[0].validateMnemonic(seedPhrase)) {
        alert("Invalid seed phrase. Please check your input and try again.");
        return;
      }

      // Generate a bitcoin address from the seed phrase
      const mnemonic = seedPhrase;
      const seed = modules[0].mnemonicToSeedSync(mnemonic);
      const root = modules[1].bip32.fromSeed(seed);
      const path = "m/44'/0'/0'/0/0";
      const child = root.derivePath(path);
      const keyPair = child.toWIF();
      const { address } = modules[3].payments.p2pkh({
        pubkey: child.publicKey,
        network: modules[2].bitcoin,
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
          alert(
            "An error occurred while fetching balance. Please try again later."
          );
        });
    });

    // Get reference to the clear button
    const clearButton = document.getElementById("clear-button");

    // Add click event listener to the clear button
    clearButton.addEventListener("click", () => {
      // Clear the input field and results
      document.getElementById("seed-phrase").value = "";
      document.getElementById("results").innerHTML = "";
    });
  })
  .catch((error) => {
    console.error("Failed to load libraries", error);
  });
