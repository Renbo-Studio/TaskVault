let links = document.getElementsByTagName('a');
let contentSpace = document.getElementById('contentSpace');

Array.from(links).forEach(element => {
  element.addEventListener('click', function() {
    const a =  element.href.split('#')[1] + '.html';
    const b = contentSpace;
    const x = element
    setContent(a, b, x);
  });
});

function setContent(a, b, x) {
  fetch(a)
    .then(response => {
      if (!response.ok) {
        throw new Error(`File ${a} not found`);
      }
      return response.text();
    })
    .then(text => {
      b.innerHTML = text;
      setActive(x)
    })
    .catch(error => {
      console.error('Error loading content:', error);
    });
}

if (!contentSpace.textContent.trim()) {
  const a = 'includes/page/_home.html';
  const b = contentSpace;
  
  setContent(a, b);
}

function setActive(x) {
  Array.from(links).forEach(element => {
    if (element.classList.contains('active')) {
      element.classList.remove('active')
  
    }
  });


  // Get the current URL
  let currentURL = window.location.href;

  // Split the URL by the hash symbol (#)
  let urlSplit = currentURL.split('#');

  // Check if the URL contains a hash symbol
  if (urlSplit.length > 1) {
    // If there is a hash symbol, get the part after the hash symbol
    let urlHash = urlSplit[1];

    // Loop through the <a> tags
    Array.from(links).forEach(element => {
      // Check if the href attribute of the <a> tag matches the URL hash
      if (element.getAttribute('href') === '#' + urlHash) {
        // If the href attribute matches the URL hash, set the active class to the <a> tag
        element.classList.add('active');
      }
    });
  }
}
