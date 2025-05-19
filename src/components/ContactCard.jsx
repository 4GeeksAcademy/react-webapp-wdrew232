import React from "react";
import { useContactContext } from "../context/ContactContext";

const ContactCard = ({ contact, setContact }) => {
  const { dispatch } = useContactContext();

  // Handle Delete Contact
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      dispatch({ type: "DELETE_CONTACT", payload: contact.id });
    }
  };

  // Handle Edit Contact
  const handleEdit = () => {
    setContact(contact); // Set the current contact for editing
  };

  return (
    <div className="contact-card">
      <h3>{contact.name}</h3>
      <p>{contact.email}</p>
      <button onClick={handleEdit} className="edit-btn">Edit</button>
      <button onClick={handleDelete} className="delete-btn">Delete</button>
    </div>
  );
};

export default ContactCard;
