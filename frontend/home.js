let blogsList = [];

function checkIfUserLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'https://final1206.onrender.com/';
    }
}

async function createBlog(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('imageUrl').value;

    const blogData = {
        title,
        description,
        image
    }

    const token = localStorage.getItem('token');

    if (!token) {
        alert("TOKEN NOT FOUND!");
        return;
    }

    try {
        const createdBlog = await fetch('/api/v1/user/blogs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(blogData)
        });

        const createdBlogJSON = await createdBlog.json();

        if (createdBlogJSON) {
            alert(createdBlogJSON.message);
        }
    } catch(error) {
        alert('There was an err!')
    }
}

async function getAllBlogs() {
    try {
        const allBlogs = await fetch('/api/v1/user/blogs');

        const allBlogsJson = await allBlogs.json();
        blogsList = allBlogsJson.data;

        generateAllBlogs(blogsList);
    } catch(error) {
        alert('There was an err!')
    }
}
 
async function generateAllBlogs(blogsList) {
    const blogsElements = document.getElementById('blogItems');
    console.log(blogsElements, 'blogsElements')
    blogsElements.innerHTML = "";

    for (let blog of blogsList) {
        const blogItem = `
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src=${blog.image} alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${blog.title}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${blog.description}</p>
    </div>
</div>
        `

        blogsElements.innerHTML += blogItem;
    }
    
}

function logout(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.href = 'https://final1206.onrender.com/';
}

checkIfUserLoggedIn();
getAllBlogs();