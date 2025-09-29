import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { actions } from "../store.js";

export const Login = () => {
  const { dispatch } = useGlobalReducer();
  const act = actions(dispatch, () => ({}));
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) return;

    await act.createAgenda(username);   // crear agenda si no existe
    act.setAgenda(username);
    navigate("/home");                  // redirige al Home
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Mi Agenda de Contactos</h1>
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Escribe tu usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
      </form>
    </div>
  );
};
