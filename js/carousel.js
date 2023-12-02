//const queryString = document.location.search;
//const params = new URLSearchParams(queryString);
//const id = params.get("id");
//const blogPostContent = document.querySelector(".blog-content");
//fetch(`https://exam.lillfre.co.uk/wp-json/wp/v2/media/${featuredImageId}`)   


    function fetchMultipleBlogPosts() {
        const baseUrl = "https://exam.lillfre.co.uk/";
        const apiEndpoint = "/wp-json/wp/v2/posts/";
        const apiUrl = baseUrl + apiEndpoint;
     

        const carousel = document.getElementById("post-carousel");
    
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                let displayedPosts = 0; // Counter for displayed posts
    
                data.forEach(post => {
                    if (displayedPosts < 4) { // Limit to display only 4 posts
                        const postId = post.id;
                        const postTitle = post.title.rendered;
                        const featuredImageId = post.featured_media;
    
                        if (featuredImageId) {
                            fetch(`https://exam.lillfre.co.uk/wp-json/wp/v2/media/${featuredImageId}`)   

                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Network response for featured image was not ok.');
                                    }
                                    return response.json();
                                })
                                .then(imageData => {
                                    const featuredImageSrc = imageData.source_url; // Replace with the correct property for image URL
    
                                    // Create carousel item elements
                                    const postSlide = document.createElement("div");
                                    postSlide.classList.add("carousel-slide");
    
                                    const postLink = document.createElement("a");
                                    postLink.href = `blog.html?id=${postId}`;
    
                                    const postImage = document.createElement("img");
                                    postImage.src = featuredImageSrc;
                                    postImage.alt = postTitle;
    
                                    const postTitleElement = document.createElement("h4");
                                    postTitleElement.textContent = postTitle;
    
                                    postLink.appendChild(postImage);
                                    postLink.appendChild(postTitleElement);
                                    postSlide.appendChild(postLink);
    
                                    carousel.appendChild(postSlide);
    
                                    displayedPosts++; // Increment the counter for displayed posts
                                })
                                .catch(error => {
                                    console.error('Error fetching featured image data:', error);
                                });
                        }
                    }
                });
            })
            .catch(error => {
                console.error("Error fetching blog posts:", error);
            });
    }
    
    fetchMultipleBlogPosts();