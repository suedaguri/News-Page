const news = document.querySelector(".news-container");
const Albania = document.querySelector(".news__header--Albania");
const Bulgaria = document.querySelector(".news__header--Bulgaria");
const Croatia = document.querySelector(".news__header--Croatia");
const btn = document.querySelector(".button");
const btnWrapper = document.querySelector(".button-wrapper");
const loader = document.querySelector(".loader--1");
const loader1 = document.querySelector(".loader-wrapper");

const idAl = 206, idBg = 211, idCr = 191;
let currentPage = 1;
let active = sessionStorage.getItem("activeCategory") || idAl;

const updateDisplay = (element, display) => {
  element.style.display = display;
};

const fetchNews = (data) => {
  data.forEach((res) => {
    const html = `
      <a href='single.html?post_id=${res.id}' class="news-container__link">
        <article class="news-container__article">            
          <div class="news-container__name">
            <h3>${res.title.rendered}</h3>
          </div>
          <div class="news-container__img">
            <img src="${
              res.yoast_head_json.og_image[0].url
            }" alt="image" loading="lazy"/>
          </div>
          <div class="news-container__date">
            <p>${res.yoast_head_json.article_published_time.slice(0, 10)}</p>
          </div>
          <p class="news-container__content">${
            res.yoast_head_json.description
          }</p>
        </article>
      </a>
    `;
    news.insertAdjacentHTML("beforeend", html);
  });
  updateDisplay(loader1, "none");
};

const fetchCategory = async (id) => {
  try {
    updateDisplay(loader, "block");
    updateDisplay(btnWrapper, "none");
    activeCategory = id;
    sessionStorage.setItem("activeCategory", activeCategory);
    const fetchnews = await fetch(
      `https://balkaninsight.com/wp-json/wp/v2/posts?page=${currentPage}&per_page=10&_embed=1&categories=${id}`
    );
    const response = await fetchnews.json();
    updateDisplay(loader, "none");
    updateDisplay(btnWrapper, "grid");
    fetchNews(response);
  } catch (err) {
    console.error("Something went badly!", err);
  }
};

fetchCategory(active);

const setActive = (newsEl, id) => {
  newsEl.addEventListener("click", function () {
    currentPage = 1;
    active = id;
    news.innerHTML = "";
    document.querySelector(".active").classList.remove("active");
    this.classList.add("active");
    fetchCategory(id);
  });
};

setActive(Albania, idAl);
setActive(Bulgaria, idBg);
setActive(Croatia, idCr);

if (active) {
  if (active == idCr) {
    Croatia.classList.add("active");
  } else if (active == idBg) {
    Bulgaria.classList.add("active");
  } else {
    Albania.classList.add("active");
  }
}
updateDisplay(loader1, "none");

btn.addEventListener("click", function () {
  currentPage++;
  fetchCategory(active);
  updateDisplay(loader1, "grid");
});
