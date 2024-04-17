

async function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const newUser = {
        name,
        email,
        password
    }

    try {
        const createdUser = await fetch('/api/blog/v1/users/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });

        const createdUserJSON = await createdUser.json();

        if (createdUserJSON) {
            alert(createdUserJSON.message);
        }
    } catch(error) {
        alert('There was an err!')
    }
}

async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userSigninData = {
        email,
        password
    }

    try {
        const loggedInUser = await fetch('/api/blog/v1/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userSigninData)
        });

        const loggedInUserJSON = await loggedInUser.json();

        if (loggedInUserJSON) {
            localStorage.setItem('token', loggedInUserJSON.data.token);
            alert(loggedInUserJSON.message);
            window.location.href = 'https://final1206.onrender.com/';

        }
    } catch(error) {
        alert('There was an err!')
    }
}