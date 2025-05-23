document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const fetchPostsBtn = document.getElementById('characters');
    const fetchUsersBtn = document.getElementById('elements');
    const fetchSinglePostBtn = document.getElementById('worlds');
    const postIdInput = document.getElementById('postId');
    const dataContainer = document.getElementById('dataContainer');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    // Base API URL
    const API_URL = 'https://hsr-api.vercel.app/api/v1/characters';
    
    // Helper function to show loading state
    function showLoading() {
        loadingElement.classList.remove('hidden');
        dataContainer.innerHTML = '';
        errorElement.classList.add('hidden');
    }
    
    // Helper function to hide loading state
    function hideLoading() {
        loadingElement.classList.add('hidden');
    }
    
    // Helper function to show error
    function showError(message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    // Function to fetch posts
    async function fetchPosts() {
        showLoading();
        try {
            const response = await fetch(`${API_URL}/posts`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = await response.json();
            displayPosts(posts.slice(0, 10)); // Display first 10 posts
        } catch (error) {
            showError(`Failed to fetch posts: ${error.message}`);
        } finally {
            hideLoading();
        }
    }
    
    // Function to fetch users
    async function fetchUsers() {
        showLoading();
        try {
            const response = await fetch(`${API_URL}/users`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = await response.json();
            displayUsers(users.slice(0, 5)); // Display first 5 users
        } catch (error) {
            showError(`Failed to fetch users: ${error.message}`);
        } finally {
            hideLoading();
        }
    }
    
    // Function to fetch a single post
    async function fetchSinglePost() {
        const postId = postIdInput.value;
        if (!postId || isNaN(postId)) {
            showError('Please enter a valid post ID');
            return;
        }
        
        showLoading();
        try {
            const response = await fetch(`${API_URL}/posts/${postId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const post = await response.json();
            displayPosts([post]); // Display as array to reuse displayPosts
        } catch (error) {
            showError(`Failed to fetch post: ${error.message}`);
        } finally {
            hideLoading();
        }
    }
    
    // Function to display posts
    function displayPosts(posts) {
        dataContainer.innerHTML = posts.map(post => `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <p><strong>Post ID:</strong> ${post.id}</p>
                <p><strong>User ID:</strong> ${post.userId}</p>
            </div>
        `).join('');
    }
    
    // Function to display users
    function displayUsers(users) {
        dataContainer.innerHTML = users.map(user => `
            <div class="user">
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> ${user.website}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
            </div>
        `).join('');
    }
    
    // Event listeners
    fetchPostsBtn.addEventListener('click', fetchPosts);
    fetchUsersBtn.addEventListener('click', fetchUsers);
    fetchSinglePostBtn.addEventListener('click', fetchSinglePost);
});