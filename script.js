const wordFiles = [
  "word_files/word1.txt",
  "word_files/word2.txt",
  // Dodaj pozostałe 10 plików ze słowami
];

const bchjs = new bch_js();

async function fetchWord(file) {
  const response = await fetch(file);
  return await response.text();
}

async function fetchWords() {
  return await Promise.all(wordFiles.map(fetchWord));
}

function generateCombinations(words, index = 0, current = []) {
  if (index === words.length) {
    return [current.join(' ')];
  }
  const combinations = [];
  for (const word of words[index]) {
    combinations.push(...generateCombinations(words, index + 1, [...current, word]));
  }
  return combinations;
}

async function generateKeys() {
  const words = await fetchWords();
  const keys = generateCombinations(words);
  return keys;
}

async function checkBalance(address) {
  try {
    const details = await bchjs.Address.details(address);
    console.log('Saldo:', details.balance, 'BCH dla adresu', address);
  } catch (error) {
    console.error('Błąd podczas sprawdzania salda:', error);
  }
}

document.getElementById('generate').addEventListener('click', async () => {
  const keys = await generateKeys();
  const combinationsDiv = document.getElementById('combinations');
  combinationsDiv.innerHTML = '';

  for (const key of keys) {
    const address = bchjs.Address.fromPrivKey(key);
    checkBalance(address);
    const keyElement = document.createElement('div');
    keyElement.textContent = key;
    combinationsDiv.appendChild(keyElement);
  }
});
