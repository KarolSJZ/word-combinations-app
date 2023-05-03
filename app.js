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
