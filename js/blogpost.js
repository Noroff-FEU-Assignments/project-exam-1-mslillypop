const baseUrl = "https://exam.lillfre.co.uk/";
const apiEndpoint = "/wp-json/wp/v2/posts/";
const apiUrl = baseUrl + apiEndpoint;

function fetchBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    const postUrl = `${baseUrl}/wp-json/wp/v2/posts/${postId}`;

    fetch(postUrl)
        .then(response => response.json())
        .then(data => {
            const postTitle = data.title.rendered;
            const postContent = data.content.rendered;

            const postContentElement = document.getElementById("blog-post-content");
            postContentElement.innerHTML = `
                <h2>${postTitle}</h2>
                <div>${postContent}</div>
            `;
        })
        .catch(error => {
            console.error("Error fetching blog post:", error);
        });
}

fetchBlogPost();