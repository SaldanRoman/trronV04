let articleArrObj;

fetch("./jsons/articles.json")
  .then(response => response.json())
  .then(data => {
    articleArrObj = data;
    makeArticle();
  });

function makeArticle() {
  const searchableIDOfObject = +window.location.search.slice(3);
  let article = articleArrObj.articles.filter(
    item => item.id === searchableIDOfObject
  );
  const articleContent = document.querySelector(".article-content");
  const image = document.createElement("img");
  image.setAttribute("src", article[0].image);
  image.setAttribute("alt", article[0].title);
  image.setAttribute("class", "article-content-image");

  const title = document.createElement("p");
  title.setAttribute("class", "article-content-title");
  title.innerText = article[0].title;

  const text = document.createElement("p");
  text.setAttribute("class", "article-content-text");
  text.innerText = article[0].text;

  articleContent.appendChild(image);
  articleContent.appendChild(title);
  articleContent.appendChild(text);
}
