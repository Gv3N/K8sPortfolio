import React, { useEffect, useState } from 'react';
import './EditModal.css'; // Create a CSS file for modal styling

const EditModal = ({ isOpen, onClose, onSave, currentItem }) => {
    const [itemDetails, setItemDetails] = useState({
        name: '',
        description: '',
        repo_url: '',
        external_url: ''
    });

    useEffect(() => {
        if (currentItem) {
            setItemDetails({
                name: currentItem.name,
                description: currentItem.description,
                repo_url: currentItem.repo_url,
                external_url: currentItem.external_url
            });
        }
    }, [currentItem]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItemDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        onSave(currentItem.id, itemDetails); // Pass the full updated item details
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Project</h2>
                <input
                    type="text"
                    name="name"
                    value={itemDetails.name}
                    onChange={handleInputChange}
                    placeholder="Enter project name"
                />
                <input
                    type="text"
                    name="description"
                    value={itemDetails.description}
                    onChange={handleInputChange}
                    placeholder="Enter description"
                />
                <input
                    type="text"
                    name="repo_url"
                    value={itemDetails.repo_url}
                    onChange={handleInputChange}
                    placeholder="Enter repository URL"
                />
                <input
                    type="text"
                    name="external_url"
                    value={itemDetails.external_url}
                    onChange={handleInputChange}
                    placeholder="Enter external URL"
                />
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default EditModal;
