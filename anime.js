// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Get the anime ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');
    const type = urlParams.get('type');
    console.log(animeId, type);

    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const animeData = await response.json();
    const selectedAnime = animeData.find((item) => item.id === animeId && item.type === type);

    const animeInfo = document.getElementById('anime-info');

    if (selectedAnime) {
      if (type === 'anime') {
        const {
          attributes: {
            posterImage,
            canonicalTitle,
            titles,
            startDate,
            averageRating,
            episodeCount,
            status,
            synopsis
          },
        } = selectedAnime;

        animeInfo.innerHTML = `
        <section id="anime-title">
          <img src="${posterImage.local}" alt="${canonicalTitle}" />
          <div class="anime-text">
            <h3>${titles.en_jp}</h3>
            <span>${titles.ja_jp}</span>
            <p>Released: ${startDate}</p>
            <p>Rating: ${averageRating}</p>
            <p>Episodes: ${episodeCount}</p>
            <p>Status: ${status}</p>
          </div>
          </section>
          
          <section id="anime-synopsis">
          <h3>Synopsis</h3>
          <p>${synopsis}</p>
          </section>

          <div class="top-anime-grad section-blur"></div>
      `;
      } else if (type === 'article') {
        animeInfo.innerHTML = `
          <section id="article-title">
            <img src="${selectedAnime.bannerImage}" />
            <div class="article-text">
              <h3><i>${selectedAnime.title}</i></h3>
              <div class="article-author">
                <img class="profile-img" src="${selectedAnime.authorImage}" alt="${selectedAnime.author}"/>
                <div class"article-author-info">
                  <p>${selectedAnime.author}</p>
                  <span><i>${selectedAnime.role}</i></span>                
                </div>
              </div>
            </div>
          </section>
          <section id="article-content">
            <h3>Summary</h3>
            <div class="article-summary">
              <p>${selectedAnime.summary}</p>
            </div>
            <p>${selectedAnime.content}</p>
            <div class="article-author">
                <img class="profile-img" src="${selectedAnime.authorImage}" alt="${selectedAnime.author}"/>
                <div class"article-author-info">
                  <p>${selectedAnime.author}</p>
                  <span><i>${selectedAnime.role}</i></span>                
                </div>
              </div>
          </section>

          <div class="featured-grad section-blur"></div>
        `;
      }
    } else {
      // Handle the case where the anime with the specified ID was not found
      animeInfo.innerHTML = '<p>Anime not found.</p>';
    }
  } catch (error) {
    console.error('Error:', error);
  }
});