/* 
START reference: https://www.youtube.com/watch?v=T33NN_pPeNI
copy-pasted
*/
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('hidden');
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
// const toggle = document.querySelector('.toggle-switch');

// // call current mode saved in local storage
// const currentMode = localStorage.getItem('mode');

// // checks if current mode is light
// if (currentMode == 'light') {
//   document.body.classList.add('light-mode'); // sets CSS color values to light mode
//   toggle.checked = true; // sets toggle state to true
// }

// // checks if toggle switch is clicked
// toggle.addEventListener('click', () => {
//   document.body.classList.toggle('light-mode'); // add 'light-mode' class to body

//   let mode = 'dark'; // declares mode
//   if (document.body.classList.contains('light-mode')) { // checks if body has 'light-mode' class
//     mode = 'light'; // sets mode to light
//   }
//   localStorage.setItem('mode', mode); // stores mode in local storage
// });

/* END */

// get trending anime from Kitsu
async function fetchData() {
  const response = await fetch("https://kitsu.io/api/edge/trending/anime");
  const apiData = await response.json();
  createSlider(apiData.data);
}

function createSlider(animeData) {
  const slider = document.querySelector('.carousel');

  const slidesHTML = animeData.map((anime) => {
    return `
        <a class="slide" href="#">
            <img src="${anime.attributes.posterImage.medium}" alt="${anime.attributes.canonicalTitle}">
            <div class="slide-text">
              <p>${anime.attributes.canonicalTitle}</p>
            </div>
         </a>
    `;
  }).join('');
  slider.insertAdjacentHTML('beforeend', slidesHTML);
}

fetchData();