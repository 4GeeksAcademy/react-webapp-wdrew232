import React, { useReducer, useEffect, useContext, useState } from "react";
import ContactContext, { ContactProvider } from "../context/ContactContext"; // Import ContactContext & Provider
import ContactCard from "../components/ContactCard"; // Import ContactCard component

const AddContacts = () => {
  const { state, dispatch } = useContext(ContactContext);
  const [contact, setContact] = useState({ id: null, name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contact.name || !contact.email) {
      alert("Please fill in all fields.");
      return;
    }

    if (contact.id) {
      dispatch({ type: "UPDATE_CONTACT", payload: contact });
    } else {
      dispatch({ type: "ADD_CONTACT", payload: { ...contact, id: Date.now() } });
    }

    setContact({ id: null, name: "", email: "" });
  };

  return (
    <ContactProvider> {/* Ensure ContactProvider wraps the component */}
      <div className="add-contact-container">
        <h2>{contact.id ? "Update Contact" : "Add Contact"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
          <button type="submit">{contact.id ? "Update Contact" : "Add Contact"}</button>
        </form>

        {/* Display Contact List */}
        <div className="contacts-list">
          {state.contacts.length > 0 ? (
            state.contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          ) : (
            <p>No contacts found.</p>
          )}
        </div>
      </div>
    </ContactProvider>
  );
};

export default AddContacts;
