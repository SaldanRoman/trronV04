"use strict";
let arrayOfAllArticles;
let arrayOfArticles;
let sumOfPages;
(function ajaxGetJson() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      arrayOfArticles = JSON.parse(xhr.response).articles;
      arrayOfAllArticles = JSON.parse(xhr.response).articles;
      createPages();
      createContent(arrayOfArticles, 0);
    }
  };
  xhr.open("GET", "./jsons/articles.json", true);
  xhr.send();
})();

function createContent(arrayOfArticles, numOfPage) {
  let arr = arrayOfArticles.slice(numOfPage, numOfPage + 8);
  if (numOfPage + 8 > arrayOfArticles.length) {
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
  description.innerText = articleObj.text.slice(0, 260) + "   ...";
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

function createPages() {
  let articlescount = 0;
  const pagesOfContent = document.querySelector(".blog-pages");
  sumOfPages = Math.ceil(arrayOfArticles.length / 8);
  if (arrayOfArticles.length <= 8) {
    return;
  }
  for (let pagesindex = 1; pagesindex <= sumOfPages; pagesindex++) {
    const pageIndex = document.createElement("a");
    pageIndex.setAttribute("href", "#");
    pageIndex.setAttribute("class", "blog-pages-links");
    pageIndex.setAttribute("data", articlescount);
    pageIndex.innerText = pagesindex;
    pagesOfContent.appendChild(pageIndex);
    articlescount += 8;
  }
}

//this function add switch pages property on pages links
function switchPages() {
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
}
setTimeout(switchPages, 500);

document.querySelectorAll(".blog-links").forEach(function(item) {
  item.addEventListener("click", function(event) {
    arrayOfArticles = [];
    arrayOfArticles = arrayOfAllArticles.filter(function(item) {
      return item.categorie === event.target.innerText;
    });
    document.querySelector(".blog-content").innerHTML = "";
    createContent(arrayOfArticles, 0);
    document.querySelector(".blog-pages").innerHTML = "";
    createPages();
    switchPages();
    document.querySelector("h1").innerText = event.target.innerText;
    document.querySelector(".nav-links-add").innerHTML =
      "» " +
      '<a href="#" class="nav-links">' +
      " " +
      event.target.innerText +
      "</a>";
  });
});
