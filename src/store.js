export const initialStore = () => {
  return {
    message: null,
    contacts: [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
      }
    ]
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "ADD_CONTACT":
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
      };

    case "UPDATE_CONTACT":
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };

    case "DELETE_CONTACT":
      return {
        ...store,
        contacts: store.contacts.filter((contact) => contact.id !== action.payload),
      };

    default:
      throw new Error("Unknown action.");
  }
}
