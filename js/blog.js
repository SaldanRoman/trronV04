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
      const serchLine = window.location.search.slice(1).replace("%20", " ");
      createPages();
      switchPages();
      createContent(arrayOfArticles, 0);
      document.querySelectorAll(".blog-links").forEach(function(item) {
        if (item.innerText === serchLine) {
          item.click();
        }
      });
    }
  };
  xhr.open("GET", "./jsons/articles.json", true);
  xhr.send();
})();

function createPages() {
  let articlescount = 0;
  window.pagesOfContent = document.querySelector(".blog-pages");
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
  const previousPage = document.createElement("p");
  previousPage.setAttribute("class", "blog-pages-links");
  previousPage.setAttribute("onclick", "changePages(this)");
  previousPage.setAttribute("data-next-page", 1);
  previousPage.setAttribute("direction", "prev");
  previousPage.style.cursor = "pointer";
  previousPage.style.width = "120px";
  previousPage.style.display = "none";
  previousPage.innerText = "‹ previous page";
  pagesOfContent.prepend(previousPage);

  const nextPage = document.createElement("p");
  nextPage.setAttribute("class", "blog-pages-links");
  nextPage.setAttribute("onclick", "changePages(this)");
  nextPage.setAttribute("data-next-page", 1);
  nextPage.setAttribute("direction", "next");
  nextPage.style.cursor = "pointer";
  nextPage.style.width = "90px";
  nextPage.innerText = " next page ›";
  pagesOfContent.appendChild(nextPage);
}

//this function add switch pages property on pages links
function switchPages() {
  const pageLinks = document.querySelectorAll("a.blog-pages-links");
  pageLinks.forEach(function(item) {
    item.addEventListener("click", function(event) {
      pageLinks.forEach(function(item) {
        item.classList.remove("blog-pages-links--active");
      });
      event.target.classList.add("blog-pages-links--active");
      document.querySelector(".blog-content").innerHTML = ""; // clear page
      createContent(arrayOfArticles, +item.getAttribute("data")); // create new content
      document
        .querySelectorAll("p.blog-pages-links")[0]
        .setAttribute("data-next-page", item.innerText);

      if (+item.innerText > 1) {
        document.querySelectorAll("p.blog-pages-links")[0].style.display =
          "flex";
      } else {
        document.querySelectorAll("p.blog-pages-links")[0].style.display =
          "none";
      }
      if (+item.innerText === 9) {
        document.querySelectorAll("p.blog-pages-links")[1].style.display =
          "none";
      } else {
        document.querySelectorAll("p.blog-pages-links")[1].style.display =
          "flex";
      }
      document
        .querySelectorAll("p.blog-pages-links")[1]
        .setAttribute("data-next-page", item.innerText);
    });
  });
}

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

  const imgLink = document.createElement("div");
  imgLink.setAttribute("class", "blog-content-article-img-wrapper");
  const link = document.createElement("a");
  link.setAttribute("class", "blog-content-article-img");
  link.setAttribute("href", "articles.html?" + articleObj.id);
  link.setAttribute("style", "background-image: url(" + articleObj.image + ")");
  link.setAttribute("alt", articleObj.title);
  imgLink.appendChild(link);

  const text = document.createElement("div");
  text.setAttribute("class", "blog-content-article-text");
  const title = document.createElement("a");
  title.setAttribute("href", "articles.html?" + articleObj.id);
  title.setAttribute("class", "blog-content-article-text-title");
  title.innerText = articleObj.title;
  const date = document.createElement("div");
  date.setAttribute("class", "blog-content-article-text-date");
  date.innerText = articleObj.date;
  const description = document.createElement("div");
  description.setAttribute("class", "blog-content-article-text-description");
  description.innerText = articleObj.text.slice(0, 200) + "   ...";
  const textLink = document.createElement("a");
  textLink.setAttribute("class", "blog-content-article-text-link");
  textLink.setAttribute("href", "articles.html?" + articleObj.id);
  textLink.innerText = "more";
  text.appendChild(title);
  text.appendChild(date);
  text.appendChild(description);
  text.appendChild(textLink);
  article.appendChild(imgLink);
  article.appendChild(text);
  blogContent.appendChild(article);
}

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

function changePages(buttondata) {
  const buttons = document.querySelectorAll("a.blog-pages-links");
  let buttonIndex = +buttondata.getAttribute("data-next-page") - 1;
  const direction = buttondata.getAttribute("direction");
  if (buttonIndex === buttons.length - 1) {
    document.querySelectorAll("p.blog-pages-links")[1].style.display = "none";
  }
  if (buttonIndex > 1) {
    document.querySelectorAll("p.blog-pages-links")[0].style.display = "flex";
  }

  if (direction === "prev") {
    buttonIndex--;
    buttondata.setAttribute("data-next-page", buttonIndex);
  } else {
    buttonIndex++;
    buttondata.setAttribute("data-next-page", buttonIndex + 1);
  }
  buttons[buttonIndex].click();
}
