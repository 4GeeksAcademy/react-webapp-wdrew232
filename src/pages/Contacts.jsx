import React, { useContext, useState } from "react";
import { useContactContext } from "../context/ContactContext"; // Import custom hook
import ContactCard from "../components/ContactCard"; // Import ContactCard

const Contacts = () => {
  const { state, dispatch } = useContactContext(); // Access context
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
    <div className="contacts-container">
      <h2>Contacts</h2>

      {/* Form to Add/Edit Contacts */}
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
            <ContactCard key={contact.id} contact={contact} setContact={setContact} />
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default Contacts;
