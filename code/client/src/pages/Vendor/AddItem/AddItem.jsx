import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/InputField/InputField';
import Button from '../../../components/Button/Button';
import Card from '../../../components/Card/Card';
import './AddItem.css';

const AddItem = () => {
    const navigate = useNavigate();
    const [itemData, setItemData] = useState({
        itemName: '',
        price: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setItemData(prev => ({
                ...prev,
                image: files[0]
            }));
        } else {
            setItemData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleAddItem = () => {
        console.log('Item Added:', itemData);
        alert('Item Added Successfully (Dummy)!');
        navigate('/vendor/items');
    };

    return (
        <div className="container mt-4 d-flex justify-content-center">
            <Card className="p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h3 className="text-center mb-4">Add New Item</h3>

                <InputField
                    label="Item Name"
                    name="itemName"
                    value={itemData.itemName}
                    onChange={handleChange}
                    placeholder="Enter Item Name"
                />

                <InputField
                    label="Price"
                    type="number"
                    name="price"
                    value={itemData.price}
                    onChange={handleChange}
                    placeholder="Enter Price"
                />

                <div className="mb-3">
                    <label className="form-label">Item Image</label>
                    <input
                        type="file"
                        className="form-control"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                    />
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <Button onClick={() => navigate('/vendor/items')} className="btn-secondary">Cancel</Button>
                    <Button onClick={handleAddItem}>Add Item</Button>
                </div>
            </Card>
        </div>
    );
};

export default AddItem;
