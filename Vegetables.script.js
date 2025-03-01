document.addEventListener('DOMContentLoaded', () => {
    const favoritesList = document.getElementById('favorites-list');
    const deliveryList = document.getElementById('delivery-list'); 
    const resultsContainer = document.getElementById('results');
    const searchButton = document.getElementById('searchButton');
    const minBudgetInput = document.getElementById('minBudget');
    const maxBudgetInput = document.getElementById('maxBudget');
    const minBudgetValue = document.getElementById('minBudgetValue');
    const maxBudgetValue = document.getElementById('maxBudgetValue');

    // Function to add ingredients to the favorites list
    function addToFavorites(ingredients) {
        ingredients.forEach(ingredient => {
            const listItem = document.createElement('div');
            listItem.style.display = 'flex';
            listItem.style.alignItems = 'center';

            const ingredientText = document.createElement('span');
            ingredientText.textContent = ingredient;
            ingredientText.style.flexGrow = '1';

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '❌';
            deleteBtn.style.marginLeft = '10px';
            deleteBtn.addEventListener('click', () => {
                favoritesList.removeChild(listItem);
                removeFromDeliveryList(ingredient);
            });

            const deliveryCheckbox = createDeliveryCheckbox(ingredient);
            listItem.append(ingredientText, deleteBtn, deliveryCheckbox);
            favoritesList.appendChild(listItem);
        });
    }

    // Function to create a delivery checkbox
    function createDeliveryCheckbox(ingredient) {
        const deliveryCheckbox = document.createElement('input');
        deliveryCheckbox.type = 'checkbox';
        deliveryCheckbox.value = ingredient;
        deliveryCheckbox.style.marginLeft = '10px';

        deliveryCheckbox.addEventListener('change', () => {
            if (deliveryCheckbox.checked) {
                const deliveryItem = document.createElement('div');
                deliveryItem.textContent = ingredient;
                deliveryList.appendChild(deliveryItem);
            } else {
                removeFromDeliveryList(ingredient);
            }
        });

        return deliveryCheckbox;
    }

    // Function to remove an ingredient from the delivery list
    function removeFromDeliveryList(ingredient) {
        const deliveryItems = Array.from(deliveryList.children);
        deliveryItems.forEach(deliveryItem => {
            if (deliveryItem.textContent === ingredient) {
                deliveryList.removeChild(deliveryItem);
            }
        });
    }

    // Event delegation for favorite buttons in the results container
    resultsContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.favorite-btn');
        if (button) {
            const dish = button.closest('.dish');
            const ingredients = JSON.parse(dish.getAttribute('data-ingredients'));
            addToFavorites(ingredients);
        }
    });

    // Search functionality
    searchButton.addEventListener('click', () => {
        const keyword = document.getElementById('keyword').value.toLowerCase();
        const minBudget = parseFloat(minBudgetInput.value);
        const maxBudget = parseFloat(maxBudgetInput.value);
        resultsContainer.innerHTML = '';

        const boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            const dish = box.querySelector('.dish');
            const dishName = dish.querySelector('h2').innerText.toLowerCase();
            const priceText = dish.querySelector('.price').innerText.replace('₱', '').replace(',', '');
            const price = parseFloat(priceText);

            if (dishName.includes(keyword) && price >= minBudget && price <= maxBudget) {
                resultsContainer.appendChild(box.cloneNode(true));
            }
        });

        if (resultsContainer.children.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    });

    // Budget updates
    minBudgetInput.addEventListener('input', () => {
        minBudgetValue.innerText = '₱' + minBudgetInput.value;
    });

    maxBudgetInput.addEventListener('input', () => {
        maxBudgetValue.innerText = '₱' + maxBudgetInput.value;
    });

    // Toggle sidebar functionality
    document.getElementById('toggle-btn').addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('main-content');
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('collapsed');
    });

    // Print functionality
    document.getElementById('print-btn').addEventListener('click', () => {
        window.print();
    });

    // Menu toggle functionality
    const menu = document .querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    window.onscroll = () => {
        menu.classList.remove('bx-x');
        navbar.classList.remove('active');
    };
});