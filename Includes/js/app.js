let links = document.getElementsByTagName('a');
let contentSpace = document.getElementById('contentSpace');

Array.from(links).forEach(element => {
  element.addEventListener('click', function() {
    if (!element.classList.contains('page')) {
      if(element.classList.contains('DataUnit'))
      {
        const contentClass = contentSpace.classList[0];
        const a = 'pages/' + element.href.split('#')[1] + '.html';
        const b = contentSpace;
        setJustContent(a, b);
        element.classList.add('activeUnit')
        return
      }
    }

    const a = 'pages/' + element.href.split('#')[1] + '.html';
    const b = contentSpace;
    setContent(a, b);
  });
});

function setContent(a, b) {
  fetch(a)
    .then(response => {
      if (!response.ok) {
        throw new Error(`File ${a} not found`);
      }
      return response.text();
    })
    .then(text => {
      b.innerHTML = text;
      b.className = "";
      b.classList.add(a.split('/')[1].split('.')[0])
      setActive(links, contentSpace);
    })
    .catch(error => {
      console.error('Error loading content:', error);
    });
}

function setJustContent(a, b) {
  fetch(a)
    .then(response => {
      if (!response.ok) {
        throw new Error(`File ${a} not found`);
      }
      return response.text();
    })
    .then(text => {
      b.innerHTML = text;
    })
    .catch(error => {
      console.error('Error loading content:', error);
    });
}

if (!contentSpace.textContent.trim()) {
  const a = 'pages/_home.html';
  const b = contentSpace;

  setContent(a, b);
}

function setActive(links, contentSpace) {
  Array.from(links).forEach(element => {
    if (element.classList.contains('active')) {
      element.classList.remove('active')
    }
    if (element.classList.contains('activeUnit')) {
      element.classList.remove('activeUnit')
    }
  });

  // Get the class of the contentSpace
  const contentClass = contentSpace.classList[0];

  // If the contentSpace is not empty
  if (contentClass) {
    // Loop through the <a> tags
    Array.from(links).forEach(element => {
      // Check if the href attribute of the <a> tag matches the class of the contentSpace
      if (element.getAttribute('href') === '#' + contentClass) {
        element.classList.add('active');
      }
    });
  }
}
