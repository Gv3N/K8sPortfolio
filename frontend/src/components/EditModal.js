import React from 'react';
import './EditModal.css'; // Create a CSS file for modal styling

const EditModal = ({ isOpen, onClose, onSave, currentItem }) => {
    const [itemName, setItemName] = React.useState(currentItem ? currentItem[1] : '');

    const handleSave = () => {
        onSave(currentItem[0], itemName);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Item</h2>
                <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Enter item name"
                />
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default EditModal;
