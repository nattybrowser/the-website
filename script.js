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