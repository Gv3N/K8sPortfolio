// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { fetchItems, createItem, updateItem, deleteItem } from '../apiService';
import EditModal from './EditModal';

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        repo_url: '',
        external_url: ''
    });
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
        if (newItem.name) {
            await createItem(newItem);
            setNewItem({
                name: '',
                description: '',
                repo_url: '',
                external_url: ''
            });
            // Refresh items
            const updatedItems = await fetchItems();
            setItems(updatedItems);
        }
    };

    // Handle input changes for the new item form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle opening modal
    const handleEditItem = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    // Handle saving edited item
    const handleSaveEdit = async (id, updatedItem) => {
        await updateItem(id, updatedItem); // Pass the full updated item
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
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                    placeholder="Enter project name"
                />
                <input
                    type="text"
                    name="description"
                    value={newItem.description}
                    onChange={handleInputChange}
                    placeholder="Enter description"
                />
                <input
                    type="text"
                    name="repo_url"
                    value={newItem.repo_url}
                    onChange={handleInputChange}
                    placeholder="Enter repository URL"
                />
                <input
                    type="text"
                    name="external_url"
                    value={newItem.external_url}
                    onChange={handleInputChange}
                    placeholder="Enter external URL"
                />
                <button onClick={handleCreateItem}>Add Project</button>
            </div>

            {/* Items table */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Repo URL</th>
                        <th>External URL</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.repo_url}</td>
                            <td>{item.external_url}</td>
                            <td>
                                <button onClick={() => handleEditItem(item)}>Edit</button>
                                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
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
