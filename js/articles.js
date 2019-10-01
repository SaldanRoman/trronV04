(function() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.response).articles;
      for (let i = 0; i < 3; i++) {
        const randomArticleObj = ~~(Math.random() * (data.length - 1));
        bildArticle(data[randomArticleObj]);
      }
    }
  };
  xhr.open("GET", "./jsons/articles.json", true);
  xhr.send();
})();

function bildArticle(articleObject) {
  const articles = document.querySelector(".articles");
  let articlesContainer = document.createElement("div");
  articlesContainer.classList.add("articles-container");

  let imgLink = document.createElement("a");
  imgLink.href = "pages/article.html?" + articleObject.id;

  let articlesImgContainer = document.createElement("div");
  articlesImgContainer.classList.add("articles-img-container");

  let img = document.createElement("img");
  img.classList.add("articles-img");
  img.src = articleObject.image;
  img.title = articleObject.title;
  articlesImgContainer.appendChild(img);
  imgLink.appendChild(articlesImgContainer);
  articlesContainer.appendChild(imgLink);

  let articlesDate = document.createElement("span");
  articlesDate.classList.add("articles-date");
  articlesDate.innerHTML = articleObject.date;
  articlesContainer.appendChild(articlesDate);

  let articlesDescription = document.createElement("div");
  articlesDescription.classList.add("articles-description");

  let articlesDescriptionTitle = document.createElement("span");
  articlesDescriptionTitle.classList.add("articles-description-title");
  articlesDescriptionTitle.innerHTML = articleObject.title;
  articlesDescription.appendChild(articlesDescriptionTitle);

  let articlesDescriptionText = document.createElement("p");
  articlesDescriptionText.classList.add("articles-description-text");
  articlesDescriptionText.innerHTML = articleObject.text;
  articlesDescription.appendChild(articlesDescriptionText);

  let articlesDescriptionId = document.createElement("a");
  articlesDescriptionId.classList.add("articles-description-id");
  articlesDescriptionId.innerHTML = "more details";
  articlesDescriptionId.href = "pages/article.html?" + articleObject.id;
  articlesDescription.appendChild(articlesDescriptionId);
  articlesContainer.appendChild(articlesDescription);
  articles.appendChild(articlesContainer);
}
