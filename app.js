// Get the word inputs
const wordInputs = document.querySelectorAll(".word-input");

// Generate an array of words from the non-empty inputs
function getWords() {
  const words = [];
  for (let i = 0; i < wordInputs.length; i++) {
    const word = wordInputs[i].value.trim();
    if (word !== "") {
      words.push(word);
    }
  }
  return words;
}

// Generate combinations using the selected words
function generateCombinations() {
  const words = getWords();
  const combinations = [];

  // Generate combinations
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (i !== j) {
        const combination = words[i] + " " + words[j];
        combinations.push(combination);
      }
    }
  }

  // Display combinations
  const combinationsElement = document.getElementById("combinations");
  combinationsElement.innerHTML = "";
  for (let i = 0; i < combinations.length; i++) {
    const combinationElement = document.createElement("div");
    combinationElement.className = "combination";
    combinationElement.textContent = combinations[i];
    combinationsElement.appendChild(combinationElement);
  }
}

// Paginate the combinations
function paginateCombinations() {
  const combinationsElement = document.getElementById("combinations");
  const combinations = combinationsElement.querySelectorAll(".combination");
  const pagesElement = document.getElementById("pages");
  const numCombinations = combinations.length;
  const combinationsPerPage = 100000;
  const numPages = Math.ceil(numCombinations / combinationsPerPage);
  pagesElement.textContent = numPages + " pages";

  // Display first page of combinations
  for (let i = 0; i < combinationsPerPage && i < numCombinations; i++) {
    combinations[i].style.display = "block";
  }

  // Hide all other combinations
  for (let i = combinationsPerPage; i < numCombinations; i++) {
    combinations[i].style.display = "none";
  }
}

// Call paginateCombinations when the page loads
window.addEventListener("load", paginateCombinations);
