import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const ContactForm = () => {
  const { store, actions } = useGlobalReducer();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!store.agenda_slug) {
      alert("Primero selecciona una agenda.");
      return;
    }

    await actions.addContact(store.agenda_slug, form);

    // Limpiar formulario
    setForm({ name: "", email: "", phone: "", address: "" });
  };

  return (
    <div className="card p-3 my-3">
      <h5 className="mb-3">Agregar nuevo contacto</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          className="form-control mb-2"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="form-control mb-2"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          className="form-control mb-2"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          className="form-control mb-3"
          value={form.address}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-success w-100">
          Guardar contacto
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
