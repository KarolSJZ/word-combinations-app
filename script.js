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

async function fetchWord(file) {
  const response = await fetch(file);
  return (await response.text()).split("\n").filter(Boolean);
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

let keys = [];
let currentPage = 0;

function displayKeys(page) {
  const start = page * 10;
  const end = start + 10;
  const displayedKeys = keys.slice(start, end);
  const keyList = document.getElementById('key-list');
  keyList.innerHTML = '';

  displayedKeys.forEach((key, index) => {
    const li = document.createElement('li');
    li.textContent = `${start + index + 1}. ${key}`;
    keyList.appendChild(li);
  });
}

document.getElementById('generate').addEventListener('click', async () => {
  const words = await fetchWords();
  keys = generateCombinations(words);
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
