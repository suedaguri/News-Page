const singleArticle = document.querySelector(".article__container");
const loader = document.querySelector(".loader1");
const btn = document.querySelector(".button");
const btnWrapper = document.querySelector(".button__wrapper");
const search = new URLSearchParams(document.location.search);
const id = search.get("post_id");

const fetchArticle = (res) => {
  let html = `
        <article class="article">
        <h3 class="article__name">${res.title.rendered}</h3>
        <img class="article__img" src="${res.yoast_head_json.og_image[0].url} " alt="image" />
            <p class="article__content">${res.content.rendered}</p>
        </article>
    `;
  singleArticle.insertAdjacentHTML("beforebegin", html);
};

const fetchSingleAPI = async () => {
  try {
    btnWrapper.style.display = "none";
    loader.style.display = "block";
    const fetchArt = await fetch(`https://balkaninsight.com/wp-json/wp/v2/posts/${id}?_embed=1`);
    const res = await fetchArt.json();
    fetchArticle(res);
    loader.style.display = "none";
    btnWrapper.style.display = "grid";
  } catch (err) {
    console.error("Something went badly!");
  }
};

fetchSingleAPI();

btn.addEventListener('click', function() {
  location.href='index.html';
});