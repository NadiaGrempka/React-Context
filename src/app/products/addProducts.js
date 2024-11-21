import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.css";

export default function AddProducts({ onAdd }) {
    const formik = useFormik({
        initialValues: {
            name: "",
            category: "",
            quantity: "",
            unitPrice: "",
            dateAdded: "",
            supplier: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required").min(3, "Must be 3 characters or more"),
            category: Yup.string().required("Required").oneOf(["Elektronika", "Odzież", "Żywność"]),
            quantity: Yup.number().positive().integer().required("Required"),
            unitPrice: Yup.number().positive().required("Required"),
            dateAdded: Yup.date().required("Required"),
            supplier: Yup.string().required("Required").min(3, "Must be 3 characters or more"),
        }),
        onSubmit: (values, { resetForm }) => {
            const newProduct = { id: Date.now(), ...values }; // Unikalny identyfikator
            onAdd(newProduct); // Dodanie nowego produktu za pomocą funkcji przekazanej z rodzica
            resetForm();
        },
    });

    return (
        <div className="add-container">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Nazwa: </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

                <label htmlFor="category">Kategoria: </label>
                <select
                    id="category"
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                >
                    <option value="" label="Select category" />
                    <option value="Elektronika" label="Elektronika" />
                    <option value="Odzież" label="Odzież" />
                    <option value="Żywność" label="Żywność" />
                </select>
                {formik.touched.category && formik.errors.category ? <div>{formik.errors.category}</div> : null}

                <label htmlFor="quantity">Ilość: </label>
                <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.quantity}
                />
                {formik.touched.quantity && formik.errors.quantity ? <div>{formik.errors.quantity}</div> : null}

                <label htmlFor="unitPrice">Cena: </label>
                <input
                    id="unitPrice"
                    name="unitPrice"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.unitPrice}
                />
                {formik.touched.unitPrice && formik.errors.unitPrice ? <div>{formik.errors.unitPrice}</div> : null}

                <label htmlFor="dateAdded">Data dodania: </label>
                <input
                    id="dateAdded"
                    name="dateAdded"
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateAdded}
                />
                {formik.touched.dateAdded && formik.errors.dateAdded ? <div>{formik.errors.dateAdded}</div> : null}

                <label htmlFor="supplier">Dostawca: </label>
                <input
                    id="supplier"
                    name="supplier"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.supplier}
                />
                {formik.touched.supplier && formik.errors.supplier ? <div>{formik.errors.supplier}</div> : null}

                <button type="submit">Dodaj</button>
            </form>
        </div>
    );
}
