// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import { fetchItems, createItem, updateItem, deleteItem } from '../apiService';
import EditModal from './EditModal';

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [editingItem, setEditingItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch items when component loads
    useEffect(() => {
        const loadItems = async () => {
            const itemsData = await fetchItems();
            setItems(itemsData);
        };
        loadItems();
    }, []);

    // Handle creating a new item
    const handleCreateItem = async () => {
        if (newItem) {
            await createItem(newItem);
            setNewItem("");
            // Refresh items
            const updatedItems = await fetchItems();
            setItems(updatedItems);
        }
    };

    // Handle opening modal
    const handleEditItem = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    // Handle saving edited item
    const handleSaveEdit = async (id, name) => {
        await updateItem(id, name);
        const updatedItems = await fetchItems();
        setItems(updatedItems);
    };

    // Handle deleting an item with confirmation
    const handleDeleteItem = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await deleteItem(id);
            const updatedItems = await fetchItems();
            setItems(updatedItems);
        }
    };

    return (
        <div>
            <h2>CRUD Application</h2>

            {/* Add new item */}
            <div>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter item name"
                />
                <button onClick={handleCreateItem}>Add Item</button>
            </div>

            {/* Items table */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item[0]}>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>
                                <button onClick={() => handleEditItem(item)}>Edit</button>
                                <button onClick={() => handleDeleteItem(item[0])}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            <EditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEdit}
                currentItem={editingItem}
            />
        </div>
    );
};

export default Dashboard;
