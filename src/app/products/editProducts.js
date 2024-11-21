import React, { useState, useEffect } from "react";

export default function EditProduct({ product, onUpdate, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        quantity: "",
        unitPrice: "",
        dateAdded: "",
        supplier: "",
    });

    useEffect(() => {
        // Prewypełnianie formularza danymi produktu
        if (product) {
            setFormData({
                name: product.name,
                category: product.category,
                quantity: product.quantity,
                unitPrice: product.unitPrice,
                dateAdded: product.dateAdded,
                supplier: product.supplier,
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Walidacja formularza
        if (!formData.name || !formData.category || !formData.quantity || !formData.unitPrice || !formData.dateAdded || !formData.supplier) {
            alert("Wszystkie pola są wymagane.");
            return;
        }

        if (isNaN(formData.quantity) || formData.quantity <= 0) {
            alert("Ilość musi być liczbą całkowitą dodatnią.");
            return;
        }

        if (isNaN(formData.unitPrice) || formData.unitPrice <= 0) {
            alert("Cena jednostkowa musi być liczbą dodatnią.");
            return;
        }

        // Aktualizacja produktu
        const updatedProduct = { ...product, ...formData };
        onUpdate(updatedProduct);
    };

    return (
        <div className="edit-container">
            <h2>Edytuj Produkt</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nazwa:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                />

                <label htmlFor="category">Kategoria:</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="Elektronika">Elektronika</option>
                    <option value="Odzież">Odzież</option>
                    <option value="Żywność">Żywność</option>
                </select>

                <label htmlFor="quantity">Ilość:</label>
                <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                />

                <label htmlFor="unitPrice">Cena jednostkowa:</label>
                <input
                    id="unitPrice"
                    name="unitPrice"
                    type="number"
                    value={formData.unitPrice}
                    onChange={handleChange}
                />

                <label htmlFor="dateAdded">Data dodania:</label>
                <input
                    id="dateAdded"
                    name="dateAdded"
                    type="date"
                    value={formData.dateAdded}
                    onChange={handleChange}
                />

                <label htmlFor="supplier">Dostawca:</label>
                <input
                    id="supplier"
                    name="supplier"
                    type="text"
                    value={formData.supplier}
                    onChange={handleChange}
                />

                <button type="submit">Zapisz zmiany</button>
                <button type="button" onClick={onCancel}>Anuluj</button>
            </form>
        </div>
    );
}
