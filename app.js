/* 
START reference: https://www.youtube.com/watch?v=T33NN_pPeNI
copy-pasted
*/
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
/* END */

/* 
START reference: https://www.youtube.com/watch?v=TpwpAYi-p2w 
*/
// let greenRing = document.querySelector('.mouse-ring');

// window.addEventListener('mousemove', (e) => {
//   greenRing.style.left = e.clientX + 'px';
//   greenRing.style.top = e.clientY + 'px';
// });

/* END */

/* START reference: https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/#aa-using-custom-properties
 */
/* For switching between color modes and toggle states.
  Saves user preferences in local storage. */
// call input with class

async function createToggle() {
  const toggle = document.getElementById('toggle');

  // call current mode saved in local storage
  const currentMode = localStorage.getItem('mode');

  // checks if current mode is light
  if (currentMode == 'light') {
    document.body.classList.add('light-mode'); // sets CSS color values to light mode
    toggle.checked = true; // sets toggle state to true
  }

  // checks if toggle switch is clicked
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode'); // add 'light-mode' class to body

    let mode = 'dark'; // declares mode
    if (document.body.classList.contains('light-mode')) { // checks if body has 'light-mode' class
      mode = 'light'; // sets mode to light
    }
    localStorage.setItem('mode', mode); // stores mode in local storage
  });
}
/* END */


function loadComponent(componentName, targetId) {
  fetch(`components/${componentName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load component ${componentName}`);
      }
      return response.text();
    })
    .then(data => {
      document.querySelector(`#${targetId}`).innerHTML = data;
      if (componentName === "header.html") {
        createToggle(); // calls createToggle only when header is loaded
      }
    })

    .catch(error => {
      console.error(error);
    });
}

loadComponent("header.html", "header");
loadComponent("footer.html", "footer");


async function createSlider() {
  // Get the slider element and stop if it is not found
  const slider = document.querySelector('.carousel');
  if (!slider) return;

  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch anime data');
    }

    const animeData = await response.json();

    const slidesHTML = animeData
      .filter((anime) => anime.type === "anime")
      .map((anime) => {
        return `
          <a class="slide" href="anime.html?type=anime&id=${anime.id}">
            <img src="${anime.attributes.posterImage.local}" alt="${anime.attributes.canonicalTitle}">
            <div class="slide-text">
              <p>${anime.attributes.canonicalTitle}</p>
            </div>
          </a>
        `;
      })
      .join('');

    slider.insertAdjacentHTML('beforeend', slidesHTML);
  } catch (error) {
    console.error('Error:', error);
  }
}


createSlider();


// const moveLine = document.querySelectorAll('.move-line');

// const lastChild = document.querySelector('#about-members .member:last-child');

// const aboutHero = document.getElementById('about-hero');


// window.addEventListener('scroll', () => {
//   const aboutHeroBox = aboutHero.getBoundingClientRect();
//   const lastChildBox = lastChild.getBoundingClientRect();
//   const aboutHeroBottom = aboutHeroBox.top + scrollY + aboutHeroBox.height;


//   moveLine.forEach((e) => {
//     e.style.top = aboutHeroBottom + 'px';
//     if (scrollY <= lastChildBox.top) {
//       e.style.height = scrollY * 1.9 + 'px';
//     } else {
//       e.style.height = (lastChildBox.top) + 'px';
//     }
//   });

// });