let arrayOfAllArticles;
let arrayOfArticles;
let sumOfPages;
(function ajaxGetJson() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      arrayOfArticles = JSON.parse(xhr.response).articles;
      arrayOfAllArticles = JSON.parse(xhr.response).articles;
      pages();
      createContent(arrayOfArticles);
    }
  };
  xhr.open("GET", "./jsons/articles.json", true);
  xhr.send();
})();

function createContent(arrayOfArticles, numOfPage = 0) {
  let arr = arrayOfArticles.slice(numOfPage, numOfPage + 6);
  if (numOfPage + 6 > arrayOfArticles.length) {
    arr = arrayOfArticles.slice(numOfPage, arrayOfArticles.length);
  }
  for (let i = 0; i < arr.length; i++) {
    createArticle(arr[i]);
  }
}

function createArticle(articleObj) {
  const blogContent = document.querySelector(".blog-content");
  const article = document.createElement("div");
  article.setAttribute("class", "blog-content-article");

  const imgLink = document.createElement("a");
  imgLink.setAttribute("class", "blog-content-article-img-wrapper");
  imgLink.setAttribute("href", "articles.html?" + articleObj.id);
  const img = document.createElement("img");
  img.setAttribute("class", "blog-content-article-img");
  img.setAttribute("src", articleObj.image);
  img.setAttribute("alt", articleObj.title);
  imgLink.appendChild(img);

  const text = document.createElement("div");
  text.setAttribute("class", "blog-content-article-text");
  const title = document.createElement("div");
  title.setAttribute("class", "blog-content-article-text-title");
  title.innerText = articleObj.title;

  const date = document.createElement("div");
  date.setAttribute("class", "blog-content-article-text-date");
  date.innerText = articleObj.date;

  const description = document.createElement("div");
  description.setAttribute("class", "blog-content-article-text-description");
  description.innerText = articleObj.text.slice(0, 450) + "  . . .";

  const link = document.createElement("a");
  link.setAttribute("class", "blog-content-article-text-link");
  link.setAttribute("href", "articles.html?" + articleObj.id);
  link.innerText = "more";

  text.appendChild(title);
  text.appendChild(date);
  text.appendChild(description);
  text.appendChild(link);

  article.appendChild(imgLink);
  article.appendChild(text);

  blogContent.appendChild(article);
}

function pages() {
  let articlescount = 0;
  const pagesOfContent = document.querySelector(".blog-pages");
  sumOfPages = Math.ceil(arrayOfArticles.length / 6);
  if (arrayOfArticles.length <= 6) {
    return;
  }
  for (let pagesindex = 1; pagesindex <= sumOfPages; pagesindex++) {
    const pageIndex = document.createElement("a");
    pageIndex.setAttribute("href", "#blog");
    pageIndex.setAttribute("class", "blog-pages-links");
    pageIndex.setAttribute("data", articlescount);
    pageIndex.innerText = pagesindex;
    pagesOfContent.appendChild(pageIndex);
    articlescount += 6;
  }
}

//this function add switch pages property on pages links
setTimeout(function() {
  const pageLinks = document.querySelectorAll(".blog-pages-links");
  pageLinks.forEach(function(item) {
    item.addEventListener("click", function(event) {
      pageLinks.forEach(function(item) {
        item.classList.remove("blog-pages-links--active");
      });
      event.target.classList.add("blog-pages-links--active");
      document.querySelector(".blog-content").innerHTML = "";
      createContent(arrayOfArticles, +item.getAttribute("data"));
    });
  });
}, 500);
