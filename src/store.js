// Estado inicial
export const initialStore = () => {
  return {
    message: null,
    agenda_slug: null,
    contacts: [],
  };
};

// Reducer
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_agenda":
      return {
        ...store,
        agenda_slug: action.payload,
      };

    case "set_contacts":
      return {
        ...store,
        contacts: action.payload,
      };

    default:
      throw Error("Unknown action: " + action.type);
  }
}

// 🔹 Acciones con la API
export const actions = (dispatch, getStore) => ({
  // Guardar agenda en store
  setAgenda: (slug) => {
    dispatch({ type: "set_agenda", payload: slug });
  },

  // Crear agenda
  createAgenda: async (slug) => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_AGENDA_URL}/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: "set_agenda", payload: slug });
        console.log("Agenda creada:", data);
      } else if (resp.status === 400) {
        console.warn("Agenda ya existente:", slug);
        dispatch({ type: "set_agenda", payload: slug });
      } else {
        const errorText = await resp.text();
        throw new Error("Error creando agenda: " + errorText);
      }
    } catch (error) {
      console.error("Error en createAgenda:", error);
    }
  },

  // Obtener contactos de una agenda
  getContacts: async (slug) => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_AGENDA_URL}/${slug}/contacts`
      );

      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: "set_contacts", payload: data.contacts || [] });
      } else if (resp.status === 404) {
        console.warn("La agenda no existe, creando:", slug);
        await actions(dispatch, getStore()).createAgenda(slug);
        dispatch({ type: "set_contacts", payload: [] });
      } else {
        throw new Error("Error fetching contacts");
      }
    } catch (error) {
      console.error("Error en getContacts:", error);
    }
  },

  // Agregar contacto
  addContact: async (slug, contact) => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_AGENDA_URL}/${slug}/contacts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contact),
        }
      );

      if (resp.ok) {
        console.log("Contacto agregado");
        await actions(dispatch, getStore()).getContacts(slug);
      } else {
        const errorText = await resp.text();
        throw new Error("Error agregando contacto: " + errorText);
      }
    } catch (error) {
      console.error("Error en addContact:", error);
    }
  },

  // Editar contacto
  updateContact: async (slug, contactId, updatedContact) => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_AGENDA_URL}/${slug}/contacts/${contactId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedContact),
        }
      );

      if (resp.ok) {
        console.log("Contacto actualizado:", contactId);
        await actions(dispatch, getStore()).getContacts(slug);
      } else {
        const errorText = await resp.text();
        throw new Error("Error actualizando contacto: " + errorText);
      }
    } catch (error) {
      console.error("Error en updateContact:", error);
    }
  },

  // Borrar contacto
  deleteContact: async (slug, contactId) => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_AGENDA_URL}/${slug}/contacts/${contactId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (resp.ok) {
        console.log("Contacto eliminado:", contactId);
        await actions(dispatch, getStore()).getContacts(slug);
      } else {
        const errorText = await resp.text();
        throw new Error("Error eliminando contacto: " + errorText);
      }
    } catch (error) {
      console.error("Error en deleteContact:", error);
    }
  },
});
