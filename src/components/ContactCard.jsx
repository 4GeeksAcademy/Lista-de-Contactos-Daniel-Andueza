import React from "react";
import { Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={rigoImageUrl}
            alt="Avatar"
            className="rounded-circle me-3"
            width="50"
            height="50"
          />
          <div>
            <h5 className="card-title">{contact.name}</h5>
            <p className="mb-1">📧 {contact.email}</p>
            <p className="mb-1">📱 {contact.phone}</p>
            <p className="mb-0">🏠 {contact.address}</p>
          </div>
        </div>
        <div>
          <Link
            to={`/edit/${contact.id}`}
            className="btn btn-sm btn-warning me-2 text-white"
          >
            Editar
          </Link>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(contact.id)}
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
