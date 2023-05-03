// Get form inputs
const wordInputs = document.querySelectorAll('.word-input');

// Generate all combinations of words
function generateCombinations(words) {
  const result = [];
  function helper(arr, i) {
    for (let j = 0; j < words[i].length; j++) {
      const a = arr.slice(0);
      a.push(words[i][j]);
      if (i === words.length - 1) {
        result.push(a.join(' '));
      } else {
        helper(a, i + 1);
      }
    }
  }
  helper([], 0);
  return result;
}

// Generate pagination links
function generatePaginationLinks(currentPage, pageCount) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  const maxLinks = 7;
  let startLink = Math.max(1, currentPage - Math.floor(maxLinks / 2));
  let endLink = Math.min(pageCount, startLink + maxLinks - 1);
  startLink = Math.max(1, endLink - maxLinks + 1);
  for (let i = startLink; i <= endLink; i++) {
    const link = document.createElement('button');
    link.innerText = i;
    if (i === currentPage) {
      link.disabled = true;
    } else {
      link.addEventListener('click', () => showPage(i));
    }
    pagination.appendChild(link);
  }
}

// Display page
function showPage(pageNumber) {
  const combinations = document.getElementById('combinations');
  combinations.innerHTML = '';
  const pageSize = 50;
  const start = (pageNumber - 1) * pageSize;
  const end = pageNumber * pageSize;
  const pageData = window.allCombinations.slice(start, end);
  const p = document.createElement('p');
  p.innerText = pageData.join('\n');
  combinations.appendChild(p);
  generatePaginationLinks(pageNumber, Math.ceil(window.allCombinations.length / pageSize));
}

// Generate seeds
function generateSeeds() {
  const words = Array.from(wordInputs).map(input => input.value.split(' '));
  window.allCombinations = generateCombinations(words);
  showPage(1);
}

// Register event listeners
document.getElementById('generate-seeds').addEventListener('click', generateSeeds);
wordInputs.forEach(input => input.addEventListener('input', generateSeeds));
