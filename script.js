
let postsData = "";
const postsContainer = document.querySelector(".posts-container");
const searchDisplay = document.querySelector(".search-display");

fetch(
  "natty.json"
).then(async (response) => {
  postsData = await response.json();
  postsData.map((post) => createPost(post));
});

const createPost = (postData) => {
  const { title, link, image, categories } = postData;
  const post = document.createElement("div");
  post.className = "post";
  post.innerHTML = 
      <a class="post-preview" href="${link}">
        <img class="post-image" src="${image}" >
      </a>
      <div class="post-content">
        <p class="post-title">${title}</p>
        <div class="post-tags">
          ${categories
            .map((category) => {
              return '<span class="post-tag">' + category + "</span>";
            })
            .join("")}
        </div>
      </div>
  ;

  postsContainer.append(post);
};

const handleSearchPosts = (query) => {
  const searchQuery = query.trim().toLowerCase();
  
  if (searchQuery.length <= 1) {
    resetPosts()
    return
  }
  
  let searchResults = [...postsData].filter(
    (post) =>
      post.categories.some((category) => category.toLowerCase().includes(searchQuery)) ||
      post.title.toLowerCase().includes(searchQuery)
  );
  
  if (searchResults.length == 0) {
    searchDisplay.innerHTML = "No results found"
  } else if (searchResults.length == 1) {
    searchDisplay.innerHTML = 1 result found for your query: ${query}
  } else {
    searchDisplay.innerHTML = ${searchResults.length} results found for your query: ${query}
  }

  postsContainer.innerHTML = "";
  searchResults.map((post) => createPost(post));
};

const resetPosts = () => {
  searchDisplay.innerHTML = ""
  postsContainer.innerHTML = "";
  postsData.map((post) => createPost(post));
};

const search = document.getElementById("search");

let debounceTimer;
const debounce = (callback, time) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};

search.addEventListener(
  "input",
  (event) => {
    const query = event.target.value;
    debounce(() => handleSearchPosts(query), 500);
  },
  false
);



window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hide-preloader");

    // Initialize Isotope
    $('.entry-container').isotope({
      itemSelector: '.entry-item',
      layoutMode: 'masonry'
    });
    
  });



let postsData = "";
const postsContainer = document.querySelector(".posts-container");
const searchDisplay = document.querySelector(".search-display");
const postsPerPage = 9;
let currentPage = 1;

// Fetch data and display initial 9 posts
fetch("natty.json").then(async (response) => {
  postsData = await response.json();
  displayPosts(1);
});

const displayPosts = (page) => {
  postsContainer.innerHTML = "";
  
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = page * postsPerPage;
  const currentPosts = postsData.slice(startIndex, endIndex);
  
  currentPosts.map((post) => createPost(post));
  
  if (endIndex >= postsData.length) {
    document.querySelector(".seemore").style.display = "none";
  } else {
    document.querySelector(".seemore").style.display = "block";
  }
};

const createPost = (postData) => {
  // Same as your original createPost function
};

const handleSeeMore = () => {
  currentPage++;
  displayPosts(currentPage);
};

const seeMoreButton = document.querySelector(".seemore");
seeMoreButton.addEventListener("click", handleSeeMore);