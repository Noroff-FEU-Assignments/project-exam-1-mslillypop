const baseUrl = "https://exam.lillfre.co.uk/";
const apiEndpoint = "/wp-json/wp/v2/posts/";
const apiUrl = baseUrl + apiEndpoint;
let postsOffset = 0;
const postsPerPage = 5;

async function fetchBlogPosts() {
  try {
    const response = await fetch(`${apiUrl}?per_page=${postsPerPage}&offset=${postsOffset}`);
    const data = await response.json();

    const postsContainer = document.getElementById('posts-container');
    for (const post of data) {
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      const postLink = document.createElement('a'); 
      postLink.href = `blog.html?id=${post.id}`; 

      const titleElement = document.createElement('h2');
      const titleLink = document.createElement('a'); 
      titleLink.href = `blog.html?id=${post.id}`; 
      titleLink.textContent = post.title.rendered; 
      titleElement.appendChild(titleLink);

      const featuredImageId = post.featured_media;
      if (featuredImageId) {
        const featuredImageUrl = await fetchFeaturedImage(featuredImageId);
        if (featuredImageUrl) {
          const imgLink = document.createElement('a'); 
          imgLink.href = `blog.html?id=${post.id}`; 

          const imgElement = document.createElement('img');
          imgElement.src = featuredImageUrl;
          imgElement.alt = post.title.rendered;
          imgLink.appendChild(imgElement); 
          postElement.appendChild(imgLink); 
        }
      }

      postLink.appendChild(titleElement); 
      postElement.appendChild(postLink); 
      postsContainer.appendChild(postElement); 
    }

    if (data.length === 0) {
      const loadMoreButton = document.getElementById('load-more-btn');
      loadMoreButton.style.display = 'none';
    } else {
      postsOffset += postsPerPage;
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
}

async function fetchFeaturedImage(featuredImageId) {
  try {
    const response = await fetch(`${baseUrl}/wp-json/wp/v2/media/${featuredImageId}`);
    const imageData = await response.json();
    return imageData.source_url;
  } catch (error) {
    console.error('Error fetching featured image:', error);
    return ''; 
  }
}

document.getElementById('load-more-btn').addEventListener('click', fetchBlogPosts);

fetchBlogPosts();