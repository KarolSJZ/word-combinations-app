const wordsPerFile = 12;
const combinationsPerPage = 100000;
let currentPage = 0;
let combinations = [];
let totalPages = 0;

function generateCombinations() {
  currentPage = 0;
  combinations = [];
  for (let i = 0; i < wordsPerFile; i++) {
    const fileWords = wordlist[i];
    const newCombinations = [];
    for (const word of fileWords) {
      if (combinations.length === 0) {
        newCombinations.push(word);
      } else {
        for (const base of combinations) {
          newCombinations.push(base + " " + word);
        }
      }
    }
    combinations = newCombinations;
  }
  totalPages = Math.ceil(combinations.length / combinationsPerPage);
  renderCombinations();
}

function copyText(text) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function renderCombinations() {
  const start = currentPage * combinationsPerPage;
  const end = start + combinationsPerPage;
  const visibleCombinations = combinations.slice(start, end);
  const combinationsDiv = document.getElementById("combinations");
  const pagination = document.getElementById("pages");

  combinationsDiv.innerHTML = "";
  pagination.innerHTML = "";

  visibleCombinations.forEach(combination => {
    const combinationElement = document.createElement("p");
    combinationElement.textContent = combination;
    combinationElement.onclick = () => copyText(combination);
    combinationElement.style.cursor = "pointer";
    combinationsDiv.appendChild(combinationElement);
  });

  for (let i = 0; i < totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = (i * combinationsPerPage + 1)
      + " - " + ((i + 1) * combinationsPerPage);
    pageButton.onclick = () => {
      currentPage = i;
      renderCombinations();
    };
    pagination.appendChild(pageButton);
  }
}

generateCombinations();
