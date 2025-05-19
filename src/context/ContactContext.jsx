import React, { createContext, useReducer, useEffect, useContext } from "react";

// Create Contact Context
const ContactContext = createContext();

// Reducer function to manage contact state
const contactReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
      };
    default:
      return state;
  }
};

// Context Provider
export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, { contacts: [] });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("https://playground.4geeks.com/contact/docs");
        if (!response.ok) throw new Error("Failed to fetch contacts");
        const data = await response.json();
        dispatch({ type: "SET_CONTACTS", payload: data });
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

// Custom hook for easy access to ContactContext
export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) throw new Error("useContactContext must be used within a ContactProvider");
  return context;
};

// Export both ContactContext and ContactProvider
export { ContactContext};
export default ContactContext;
