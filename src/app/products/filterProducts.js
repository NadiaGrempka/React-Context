import React from "react";

export default function FilterProducts({category, onFilterChange}) {

    const handleCategoryChange = (e) => {
        onFilterChange(e.target.value);
    };

    return (
        <div className="filter-container">
            <label>
                Filtruj:
                <select name="category" onChange={handleCategoryChange} value={category}>
                    <option value="Wszystko">Wszystko</option>
                    <option value="Elektronika">Elektronika</option>
                    <option value="Odzież">Odzież</option>
                    <option value="Żywność">Żywność</option>
                </select>
            </label>
        </div>
    );
}
