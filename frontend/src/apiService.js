const API_URL = "http://localhost:5000/curated_projects"; // Updated to reflect the correct endpoint

// Fetch all items
export const fetchItems = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

// Create a new item
export const createItem = async (itemDetails) => { // Updated to take the full item object
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemDetails) // Send the entire itemDetails object
    });
    return response.json();
};

// Update an item
export const updateItem = async (id, itemDetails) => { // Updated to take the full item object
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemDetails) // Send the entire itemDetails object
    });
    return response.json();
};

// Delete an item
export const deleteItem = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};
