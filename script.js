import ApiData from './apiData.js'
let apiData = new ApiData();
let previousSection = '';
let previousBtn = '';

// Fetch data using fetch api based on the category parameter
async function fetchSectionData(category){
  try{
    const url = `${apiData.URL}${category}.json?api-key=${apiData.API_KEY}`  
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(err){
    console.log(err);
  }
}

async function fetchData(section){
  if(previousSection !== ''){
    document.getElementById(previousSection).classList.add('hidden');
  }

  document.getElementById(section).classList.remove('hidden');
  //fetch data using fetch api
  document.getElementById('loadingIndicator').classList.remove('hidden');
  const data = await fetchSectionData(section);
  document.getElementById('loadingIndicator').classList.add('hidden');
  // populate container home with this data
  populateSection(data, section+'Column');
  previousSection = section;
}

function populateSection(data, columnId){
  const section = data.section || '';
  data.results.forEach(article => {
      const div = createCard(article, section);
      document.getElementById(columnId).append(div);                  
  });
}

function createCard(article, section){
  let imageUrl = '';
  if(article.multimedia){
    imageUrl = article.multimedia[0].url;
  }
  const card = createDomElement('div', 'card mt-3');
    const cardRow = createDomElement('div', 'row');
      const column1 = createDomElement('div','col-md-8 col-12');
        const cardBody = createDomElement('div', 'card-body');
          const sectionTitle = createDomElement('h4', 'card-title text-uppercase');
            sectionTitle.innerHTML = `${section}`;
          const articleTitle = createDomElement('h6', 'card-title text-capitalize');
            articleTitle.innerHTML = `${article.title}`;
          const articlePublishedDate = createDomElement('h6', 'card-title');
            articlePublishedDate.innerHTML = `${formatDate(article.published_date)}`;   
          const articleAbstract = createDomElement('p', 'card-text');
            articleAbstract.innerHTML = `${article.abstract}`; 
          const articleLink = createDomElement('a', 'text-primary');
            articleLink.innerHTML = `Continue Reading`;
            articleLink.setAttribute('href', `${article.url}`);
            articleLink.setAttribute('target', '_blank');
        cardBody.append(sectionTitle, articleTitle, articlePublishedDate, articleAbstract, articleLink);
      column1.append(cardBody);       

      const column2 = createDomElement('div','col-md-4 col-12');
        const image = createDomElement('img', 'img-thumbnail');
          image.setAttribute('src', `${imageUrl}`);
          image.setAttribute('alt', 'image not found');
      column2.append(image);
    cardRow.append(column1, column2);
  card.append(cardRow);
  return card;        
}

function createDomElement(element, elementClass = '', elementId = ''){
  const newElement = document.createElement(element);
  elementClass !== ''? newElement.setAttribute('class', elementClass): '';
  elementId !== ''? newElement.setAttribute('id', elementId): '';
  return newElement;
}

function generateLoadingIndicator(){
    const container = createDomElement('div', 'container mt-2');
      const row = createDomElement('div', 'row');
        const column = createDomElement('div', 'col-12 order-lg-12 text-center');
        const div = createDomElement('div', 'loading', 'loadingIndicator');
          const img = createDomElement('img', 'img-fluid');
            img.setAttribute('src', './images/loading4.gif');
            img.setAttribute('alt', 'loading');
            div.append(img);
          column.append(div);  
          row.append(column);
        container.append(row);        
      document.body.append(container); 
}

function generatePageHeader(){
    const pageHeaderContainer = createDomElement('div', 'container mt-2');
      const pageHeaderRow = createDomElement('div', 'row');
        const pageHeaderColumn = createDomElement('div', 'col-12 order-lg-12 text-center');
          const pageTitle = createDomElement('p', 'pageTitle')
            pageTitle.innerHTML = 'The New York Times'
        pageHeaderColumn.append(pageTitle);
      pageHeaderRow.append(pageHeaderColumn);
    pageHeaderContainer.append(pageHeaderRow);        
  document.body.append(pageHeaderContainer);  
}

function createLink(section){
  const li = createDomElement('li', 'nav-item');
    const a = createDomElement('a', 'nav-link text-uppercase', `${section}Btn`);
    a.text = section;
  li.append(a);
  return li;  
}

function generateNav(){
    const navContainer = createDomElement('div','container');
      const navRow = createDomElement('div', 'row');
        const navColumn = createDomElement('div', 'col-12');
          const nav = createDomElement('nav', 'navbar navbar-expand-lg navbar-dark bg-dark');
            const navButton = createDomElement('button', 'navbar-toggler');
              navButton.setAttribute('type' ,'button');
              navButton.setAttribute('data-toggle' ,'collapse');
              navButton.setAttribute('data-target' ,'#navbarNav');
              navButton.setAttribute('aria-controls' ,'navbarNav');
              navButton.setAttribute('aria-expanded' ,'false');
              navButton.setAttribute('aria-label' ,'Toggle navigation');
            const span = createDomElement('span', 'navbar-toggler-icon');
            navButton.append(span);

            const navLinksDiv = createDomElement('div', 'collapse navbar-collapse', 'navbarNav');
              const navLinksUl = createDomElement('ul', 'navbar-nav');
                const liHome = createLink('home');
                const liWorld = createLink('world');
                const liPolitics = createLink('politics');
                const liMagazine = createLink('magazine');
                const liTechnology = createLink('technology');
                const liScience = createLink('science');
                const liHealth = createLink('health');
                const liSports = createLink('sports');
                const liArts = createLink('arts');
                const liFashion = createLink('fashion');
                const liFood = createLink('food');
                const liTravel = createLink('travel');
              navLinksUl.append(liHome, liWorld, liPolitics, liMagazine, liTechnology, liScience, liHealth, liSports, liArts, liFashion, liFood, liTravel);
            navLinksDiv.append(navLinksUl);  
          nav.append(navLinksDiv);
          nav.append(navButton);
        navColumn.append(nav);
      navRow.append(navColumn);
    navContainer.append(navRow);    
  document.body.append(navContainer);
}

function createContainer(section){
  const div = createDomElement('div', 'container mt-5 hidden', section);
    const row = createDomElement('div', 'row');
      const column = createDomElement('div', 'col-12', `${section}Column`);
    row.append(column);
  div.append(column);
  return div;    
}

function generateSections(){
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

function generateHtmlBody(){
  generatePageHeader();
  generateNav();
  generateLoadingIndicator();
  generateSections();
  fetchData('home');
  document.getElementById('homeBtn').classList.add('active');
  previousBtn = 'homeBtn';
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

//#homeBtn /html/body/div[2]/div/div/nav/div/ul/li[1]/a
//document.querySelector("#homeBtn")

const links = document.querySelectorAll('a[id*="Btn"]');

links.forEach(link => {
  link.addEventListener('click', (event)=> {
    if(previousBtn !==''){
      document.getElementById(previousBtn).classList.remove('active');
    }
    const anchor = event.target;
    anchor.classList.add('active');
    fetchData(anchor.text);
    previousBtn = `${anchor.text}Btn`;
  });
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