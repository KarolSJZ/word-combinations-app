const wordFiles = [
  "word_files/word1.txt",
  "word_files/word2.txt",
  "word_files/word3.txt",
  "word_files/word4.txt",
  "word_files/word5.txt",
  "word_files/word6.txt",
  "word_files/word7.txt",
  "word_files/word8.txt",
  "word_files/word9.txt",
  "word_files/word10.txt",
  "word_files/word11.txt",
  "word_files/word12.txt",
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
  keys = await generateKeys();
  currentPage = 0;
  displayKeys(currentPage);
  document.getElementById('previous').disabled = currentPage === 0;
  document.getElementById('next').disabled = currentPage === Math.ceil(keys.length / 10) - 1;
});

document.getElementById('previous').addEventListener('click', () => {
  currentPage -= 1;
  displayKeys(currentPage);
  document.getElementById('previous').disabled = currentPage === 0;
  document.getElementById('next').disabled = currentPage === Math.ceil(keys.length / 10) - 1;
});

document.getElementById('next').addEventListener('click', () => {
  currentPage += 1;
  displayKeys(currentPage);
  document.getElementById('previous').disabled = currentPage === 0;
  document.getElementById('next').disabled = currentPage === Math.ceil(keys.length / 10) - 1;
});
