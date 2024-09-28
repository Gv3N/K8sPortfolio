const API_URL = "http://localhost:5000/items";

// Fetch all items
export const fetchItems = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

// Create a new item
export const createItem = async (name) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    return response.json();
};

// Update an item
export const updateItem = async (id, name) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
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
