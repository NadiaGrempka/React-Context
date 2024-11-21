export default function RenderAll({ data, onRemove = f => f, onClick = g => g, onEdit = h => h }) {
    return (
        <div id="products">
            {data.map((product) => (
                <div key={product.id} className="product-item">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">Kategoria: {product.category}</p>
                    <p>Ilość: {product.quantity}</p>
                    <p>Cena: {product.unitPrice}</p>
                    <button className="remove-button" onClick={() => onRemove(product.id)}>Usuń</button>
                    <br/>
                    <button className="details-button" onClick={() => onClick(product.id)}>Szczegóły</button>
                    <br/>
                    <button className="edit-button" onClick={() => onEdit(product)}>Edytuj</button>
                </div>
            ))}
        </div>
    );
}