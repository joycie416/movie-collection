// 영화 데이터 불러오기

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzAxZjllMDM3NGQzOTRjN2QzNGQ1OWQxMTBlM2IxZCIsIm5iZiI6MTcyMTgyNDk5Mi4xOTU3NSwic3ViIjoiNjZhMGY0YjVhZTlhZDAyNTY4MGJlYWQ3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LnSYIENpQG-5UzkHE5QJXPytyel5zn0488wqOcDxC3k'
  }
};

const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

fetch(url, options)
  .then(response => response.json())
  .then(response => {
    
    data = response.results;
    // console.log(data);

    const cardSection = document.querySelector('.row');

    data.forEach(movie => {
      let title = movie.title;
      let overview = movie.overview;
      let poster_path = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
      // let score = movie.vote_average;

      cardSection.insertAdjacentHTML('beforeend', `
        <div class="col" id="movie-card">
          <div class="card-set">
            <div class="card h-100">
              <img src="${poster_path}" class="card-img-top"
                alt="example">
              <!-- <div class="card-body"> -->

              <div class="card-title">
                <h5>${title}</h5>
              </div>
            </div>
            <div class="card-hover">
              <div class="card-title">
                <h5>${title}</h5>
              </div>

              <p class="card-text">${overview}</p>
            </div>
          </div>
        </div>`);

    });

  })
  .catch(err => console.error(err));




// 검색 기능

async function searchMovie(val) {
  console.log('Begin searching...');

  let response = await fetch(url);
  let data = (await response.json()).results;
  console.log('data :',data)

  const cardSection = document.querySelector('.row');
  cardSection.innerHTML = ''

  data.forEach(movie => {
    if (movie.title.toLowerCase().includes(val)) {
      let title = movie.title;
      let overview = movie.overview;
      let poster_path = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
      // let score = movie.vote_average;

      cardSection.insertAdjacentHTML('beforeend', `
        <div class="col" id="movie-card">
          <div class="card h-100">
            <img src="${poster_path}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <!-- <p class="card-text">${overview}</p> -->
            </div>
          </div>
        </div>`);
    }
  })
  console.log('Done!')
}


// searchMovie(''); // 실행 확인

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');


searchBtn.addEventListener('click', (event)=> {
  event.preventDefault();
  const val = searchInput.value;
  console.log(val)
  searchMovie(val);
})


// ==============================================================
