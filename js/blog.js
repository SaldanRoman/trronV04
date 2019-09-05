let blogArrObj;

fetch("./jsons/articles.json")
  .then(response => response.json())
  .then(data => {
    blogArrObj = data;
    parse();
  });

function parse() {
  const searchIdObject = +window.location.search.slice(3);
  let blog = blogArrObj.articles.filter(item => item.id === searchIdObject);
  window.blogContent = document.querySelector(".blog-content");
  const image = document.createElement("img");
  image.setAttribute("src", blog[0].image);
  image.setAttribute("alt", blog[0].title);
  image.setAttribute("class", "blog-content-image");

  const title = document.createElement("p");
  title.setAttribute("class", "blog-content-title");
  title.innerText = blog[0].title;

  const text = document.createElement("p");
  text.setAttribute("class", "blog-content-text");
  text.innerText = blog[0].text;

  blogContent.appendChild(image);
  blogContent.appendChild(title);
  blogContent.appendChild(text);
}
