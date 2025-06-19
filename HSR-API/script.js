document.addEventListener('DOMContentLoaded', function() {
    const fetchPostsBtn = document.getElementById('characters');
    const fetchUsersBtn = document.getElementById('elements');
    const fetchSinglePostBtn = document.getElementById('worlds');
    const postIdInput = document.getElementById('postId');
    const dataContainer = document.getElementById('dataContainer');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    

    const API_URL = 'https://hsr-api.vercel.app/api/v1/characters';

    function showLoading() {
        loadingElement.classList.remove('hidden');
        dataContainer.innerHTML = '';
        errorElement.classList.add('hidden');
    }
    

    function hideLoading() {
        loadingElement.classList.add('hidden');
    }
    

    function showError(message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    async function fetchPosts() {
        showLoading();
        try {
            const response = await fetch(`${API_URL}/posts`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = await response.json();
            displayPosts(posts.slice(0, 10)); 
        } catch (error) {
            showError(`Failed to fetch character: ${error.message}`);
        } finally {
            hideLoading();
        }
    }
    

    async function fetchUsers() {
        showLoading();
        try {
            const response = await fetch(`${API_URL}/users`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = await response.json();
            displayUsers(users.slice(0, 5));
        } catch (error) {
            showError(`Failed to fetch element: ${error.message}`);
        } finally {
            hideLoading();
        }
    }
    

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
            displayPosts([post]); 
        } catch (error) {
            showError(`Failed to fetch post: ${error.message}`);
        } finally {
            hideLoading();
        }
    }

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
 
    fetchPostsBtn.addEventListener('click', fetchPosts);
    fetchUsersBtn.addEventListener('click', fetchUsers);
    fetchSinglePostBtn.addEventListener('click', fetchSinglePost);
});