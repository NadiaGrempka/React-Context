'use client';
import { useState } from 'react';
import jsonData from '/src/app/data.json';
import RenderAll from "./renderAll.js";
import FilterProducts from "./filterProducts.js";
import AddProducts from "./addProducts.js";
import EditProduct from "./editProducts.js";
import style from './style.css';

export default function ProductsList() {
    const [originalProducts, setOriginalProducts] = useState(jsonData.data); // Lista oryginalna
    const [filteredProducts, setFilteredProducts] = useState(jsonData.data); // Lista filtrowana
    const [selectedCategory, setSelectedCategory] = useState("Wszystko");
    const [editingProduct, setEditingProduct] = useState(null); // Produkt do edycji

    const handleFilterChange = (category) => {
        setSelectedCategory(category);
        if (category === "Wszystko") {
            setFilteredProducts(originalProducts); // Wyświetlaj wszystkie aktualne produkty
        } else {
            setFilteredProducts(
                originalProducts.filter((product) => product.category === category)
            );
        }
    };

    const handleRemoveProduct = (id) => {
        const updatedProducts = originalProducts.filter((product) => product.id !== id);
        setOriginalProducts(updatedProducts);
        setFilteredProducts(
            selectedCategory === "Wszystko"
                ? updatedProducts
                : updatedProducts.filter((product) => product.category === selectedCategory)
        );
    };

    const handleAddProduct = (newProduct) => {
        const updatedProducts = [...originalProducts, newProduct];
        setOriginalProducts(updatedProducts);
        setFilteredProducts(
            selectedCategory === "Wszystko"
                ? updatedProducts
                : updatedProducts.filter((product) => product.category === selectedCategory)
        );
    };

    const handleEditProduct = (updatedProduct) => {
        const updatedProducts = originalProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
        );
        setOriginalProducts(updatedProducts);
        setFilteredProducts(
            selectedCategory === "Wszystko"
                ? updatedProducts
                : updatedProducts.filter((product) => product.category === selectedCategory)
        );
        setEditingProduct(null); // Zamknij formularz po zapisaniu
    };

    const handleCancelEdit = () => {
        setEditingProduct(null); // Zamknij formularz bez zapisania
    };

    const onClick = (id) => {
        const product = originalProducts.find((p) => p.id === id);
        if (product) {
            alert(`Product Details:\nAdded: ${product.dateAdded}\nSupplier: ${product.supplier}`);
        }
    };

    return (
        <div className="all">
            <h1>Produkty</h1>
            <FilterProducts
                products={filteredProducts}
                category={selectedCategory}
                onFilterChange={handleFilterChange}
            />
            <RenderAll data={filteredProducts} onRemove={handleRemoveProduct} onClick={onClick} onEdit={setEditingProduct} />
            {editingProduct && (
                <EditProduct
                    product={editingProduct}
                    onUpdate={handleEditProduct}
                    onCancel={handleCancelEdit}
                />
            )}
            <AddProducts onAdd={handleAddProduct} />
        </div>
    );
}
