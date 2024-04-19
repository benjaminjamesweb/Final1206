let purchasesList = [];

function checkIfUserLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'https://final1206.onrender.com';
    }
    return token;
}

async function createPurchase(event) {
    event.preventDefault();

    const token = checkIfUserLoggedIn();

    const itemName = document.getElementById('itemName').value;
    const itemDescription = document.getElementById('itemDescription').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const dateOfPurchase = document.getElementById('dateOfPurchase').value;
    const itemCategory = document.getElementById('itemCategory').value;

    const purchaseData = {
        itemName,
        itemDescription,
        itemPrice,
        dateOfPurchase,
        itemCategory
    }


    if (!token) {
        alert("Token not found.");
        return;
    }

    try {
        const createdPurchase = await fetch('/api/v1/user/purchases', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(purchaseData)
        });

        const createdPurchaseJSON = await createdPurchase.json();

        if (createdPurchaseJSON) {
            alert(createdPurchaseJSON.message);
        }
    } catch(error) {
        alert('Sorry, there was an error adding this purchase to the expense tracker.')
    }
}

async function getAllPurchases() {
    try {
        const allPurchases = await fetch('/api/v1/user/purchases');

        const allPurchasesJson = await allPurchases.json();
        purchasesList = allPurchasesJson.data;

        generateAllPurchases(purchasesList);
    } catch(error) {
        alert('There was an err!')
    }
}
 
async function generateAllPurchases(purchasesList) {
    const purchasedElements = document.getElementById('purchasedItems');

    purchasedElements.innerHTML = "";

    for (let purchase of purchasesList) {

        const date = new Date(purchase.dateOfPurchase);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });


        const purchasedItem = `
<div class="post" id="${purchase._id}>
    <p class="itemPrice">On ${formattedDate}, you bought ${purchase.itemName} (${purchase.itemDescription}) for ${purchase.itemPrice}</p>
    <button onClick="deletePurchase(event)" class="delete-button">Delete purchase</button>
</div>
        `

        purchasedElements.innerHTML += purchasedItem;
    }
    
}

function deletePurchase(){
    alert("I could not sucessfuly make this function, so purchases cannot be deleted.")
}
function logout(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.href = 'https://final1206.onrender.com';
}

checkIfUserLoggedIn();
getAllPurchases();