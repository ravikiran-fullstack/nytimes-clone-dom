import ApiData from './apiData.js'
let apiData = new ApiData();
let previousSection = '';
let previousBtn = '';

// Fetch data using fetch api based on the category parameter
async function fetchSectionData(category){
  const url = `${apiData.URL}${category}.json?api-key=${apiData.API_KEY}`  
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchData(section){
  console.log('fetchDataForHome');
  if(previousSection !== ''){
    document.getElementById(previousSection).classList.add('hidden');
  }

  document.getElementById(section).classList.remove('hidden');
  //fetch data using fetch api
  //document.getElementById('loadingIndicator').classList.remove('hidden');
  const data = await fetchSectionData(section);
  //document.getElementById('loadingIndicator').classList.add('hidden');
  // populate container home with this data
  populateSection(data, section+'Column');
  previousSection = section;
}

function populateSection(data, columnId){
  console.log(data);
  const section = data.section || '';
  data.results.forEach(article => {
      const div = document.createElement('div');
      let url = '';
      if(article.multimedia){
        url = article.multimedia[0].url;
      }
      div.innerHTML = `<div class="card">
                      <div class="row">
                        <div class="col-md-8 col-12">
                          <div class="card-body">
                            <h4 class="card-title text-uppercase">${section}</h4>
                            <h6 class="card-title text-capitalize">${article.title}</h6>
                            <h6 class="card-title">${formatDate(article.published_date)}</h6>
                            <p class="card-text">${article.abstract}</p>
                            <a href="${article.url}" target="_blank" class="text-primary">Continue Reading</a>
                          </div>
                        </div>
                        <div class="col-md-4 col-12">
                          <img class="img-thumbnail" src="${url}" alt="Card image cap">
                        </div>
                      </div>
                    </div>`
      document.getElementById(columnId).append(div);                  
  });
}

function createDomElement(element, elementClass = '', elementId = ''){
  const newElement = document.createElement(element);
  elementClass !== ''? newElement.setAttribute('class', elementClass): '';
  elementId !== ''? newElement.setAttribute('id', elementId): '';
  return newElement;
}

function createContainer(section){
  const div = createDomElement('div', 'container mt-5 hidden', section);
    const row = createDomElement('div', 'row');
      const column = createDomElement('div', 'col-12', `${section}Column`);
    row.append(column);
  div.append(column);
  return div;    
}

function generateHtmlBody(){
  const homeContainer = createContainer('home');
  const worldContainer = createContainer('world');
  const politicsContainer = createContainer('politics');
  const magazineContainer = createContainer('magazine');
  const technologyContainer = createContainer('technology');
  const scienceContainer = createContainer('science');
  const healthContainer = createContainer('health');
  const sportsContainer = createContainer('sports');
  const artsContainer = createContainer('arts');
  const fashionContainer = createContainer('fashion');
  const foodContainer = createContainer('food');
  const travelContainer = createContainer('travel');
  document.body.append(homeContainer, worldContainer, politicsContainer, magazineContainer, technologyContainer, scienceContainer, healthContainer, sportsContainer, artsContainer, fashionContainer, foodContainer, travelContainer);
}

generateHtmlBody();


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

document.getElementById('homeBtn').addEventListener('click', (e)=>{
  if(previousBtn !==''){
    document.getElementById(previousBtn).classList.remove('active');
  }
  e.target.classList.add('active');
  fetchData('home');
  previousBtn = 'homeBtn';
});

document.getElementById('worldBtn').addEventListener('click', (e)=>{
  if(previousBtn !==''){
    document.getElementById(previousBtn).classList.remove('active');
  }
  e.target.classList.add('active');
  fetchData('world');
  previousBtn = 'worldBtn';
});

document.getElementById('politicsBtn').addEventListener('click', (e)=>{
  if(previousBtn !==''){
    document.getElementById(previousBtn).classList.remove('active');
  }
  e.target.classList.add('active');
  fetchData('politics');
  previousBtn = 'politicsBtn';
});

document.getElementById('magazineBtn').addEventListener('click', (e)=>{
  if(previousBtn !==''){
    document.getElementById(previousBtn).classList.remove('active');
  }
  e.target.classList.add('active');
  fetchData('magazine');
  previousBtn = 'magazineBtn';
});

document.getElementById('technologyBtn').addEventListener('click', (e)=>{
  if(previousBtn !==''){
    document.getElementById(previousBtn).classList.remove('active');
  }
  e.target.classList.add('active');
  fetchData('technology');
  previousBtn = 'technologyBtn';
});

document.getElementById('scienceBtn').addEventListener('click', (e)=>{
  if(previousBtn !==''){
    document.getElementById(previousBtn).classList.remove('active');
  }
  e.target.classList.add('active');
  fetchData('science');
  previousBtn = 'scienceBtn';
});

document.getElementById('healthBtn').addEventListener('click', (e)=>{
  if(previousBtn !==''){
    document.getElementById(previousBtn).classList.remove('active');
  }
  e.target.classList.add('active');
  fetchData('health');
  previousBtn = 'healthBtn';
});

document.getElementById('sportsBtn').addEventListener('click', (e)=>{
  if(previousBtn !==''){
    document.getElementById(previousBtn).classList.remove('active');
  }
  e.target.classList.add('active');
  fetchData('sports');
  previousBtn = 'sportsBtn';
});

document.getElementById('artsBtn').addEventListener('click', (e)=>{
  if(previousBtn !==''){
    document.getElementById(previousBtn).classList.remove('active');
  }
  e.target.classList.add('active');
  fetchData('arts');
  previousBtn = 'artsBtn';
});

document.getElementById('fashionBtn').addEventListener('click', (e)=>{
  if(previousBtn !==''){
    document.getElementById(previousBtn).classList.remove('active');
  }
  e.target.classList.add('active');
  fetchData('fashion');
  previousBtn = 'fashionBtn';
});

document.getElementById('foodBtn').addEventListener('click', (e)=>{
  if(previousBtn !==''){
    document.getElementById(previousBtn).classList.remove('active');
  }
  e.target.classList.add('active');
  fetchData('food');
  previousBtn = 'foodBtn';
});

document.getElementById('travelBtn').addEventListener('click', (e) => {
  if(previousBtn !==''){
    document.getElementById(previousBtn).classList.remove('active');
  }
  e.target.classList.add('active');
  fetchData('travel');
  previousBtn = 'travelBtn';
});

// document.body.addEventListener('load', fetchDataForHome);

// $(window).on('click', function(event){
//   // element over which click was made
//   var clickOver = $(event.target)
//   if ($('.navbar .navbar-toggler').attr('aria-expanded') == 'true' && clickOver.closest('.navbar').length === 0) {
//       // Click on navbar toggler button
//       $('button[aria-expanded="true"]').click();
//   }
// });

window.addEventListener('click', function(event){
  const btn = document.querySelector('.navbar-toggler');
  const ariaExpanded = btn.getAttribute('aria-expanded') === "true";
  if(ariaExpanded){
    btn.click();
  }
});