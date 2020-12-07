import ApiData from './apiData.js'
// import ApiData from './apiData.js';

let apiData = new ApiData();
console.log(apiData.API_KEY);

// Fetch data using fetch api based on the category parameter
async function fetchData(category){
  const url = `${apiData.URL}${category}.json?api-key=${apiData.API_KEY}`
  
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


async function fetchDataForHome(){
  console.log('fetchDataForHome');
  //fetch data using fetch api
  const homeData = await fetchData('home');
  // populate container home with this data
  populateHomeSection(homeData);
}

function populateHomeSection(homeData){
  console.log(homeData);
  homeData.results.forEach(article => {
      const div = document.createElement('div');
      div.innerHTML = `<div class="card">
                      <div class="row">
                        <div class="col-md-8 col-12">
                          <div class="card-body">
                            <h4 class="card-title text-uppercase">${article.section}</h4>
                            <h6 class="card-title text-capitalize">${article.title}</h6>
                            <h6 class="card-title">${formatDate(article.published_date)}</h6>
                            <p class="card-text">${article.abstract}</p>
                            <a href="#" class="btn btn-primary">Continue Reading</a>
                          </div>
                        </div>
                        <div class="col-md-4 col-12">
                          <img class="img-thumbnail" src="${article.multimedia[0].url}" alt="Card image cap">
                        </div>
                      </div>
                    </div>`
      document.getElementById('columnHome').append(div);              
  });
}

function formatDate(publishedDate){
  const _date = new Date(publishedDate);
  const month = _date.toLocaleDateString('default', {month: 'long'});
  const day = _date.getDay();
  return month + ' '+ day; 
}

function delay(timer){
  return new Promise((res, rej) => {
    setTimeout(()=> {
      res();
    }, timer);
  })
}

document.getElementById('home').addEventListener('click', (e)=>{
  fetchDataForHome();
});