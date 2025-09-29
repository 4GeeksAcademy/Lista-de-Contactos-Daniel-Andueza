import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { actions } from "../store.js";

export const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const act = actions(dispatch, () => store);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Buscar el contacto actual
  useEffect(() => {
    const current = store.contacts.find((c) => c.id === parseInt(id));
    if (current) {
      setForm(current);
    } else {
      // si no hay contactos cargados, intentamos traerlos
      if (store.agenda_slug) {
        act.getContacts(store.agenda_slug);
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await act.updateContact(store.agenda_slug, id, form);
    navigate("/home"); // volver a Home después de guardar
  };

  return (
    <div className="container mt-4">
      <h2>Editar contacto</h2>

      {form.name === "" && form.email === "" ? (
        <p>Cargando datos del contacto...</p>
      ) : (
        <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
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
            className="form-control mb-2"
            value={form.address}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>
          <Link to="/home" className="btn btn-secondary ms-2">
            Cancelar
          </Link>
        </form>
      )}
    </div>
  );
};
