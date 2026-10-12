import { createContext, useContext, useReducer, useState } from "react";

const UserContext = createContext(null);

const initialState = {
  users: [],
  error: "",
};

const emptyForm = {
  name: "",
  lastName: "",
  age: "",
};

function usersReducer(state, action) {
  if (action.type === "ADD_USER") {
    if (state.users.length >= 10) {
      return {
        ...state,
        error: "მაქსიმუმ 10 მომხმარებლის დამატებაა შესაძლებელი.",
      };
    }

    return {
      users: [...state.users, action.payload],
      error: "",
    };
  }

  return state;
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

function UserForm({ onClose }) {
  const { dispatch } = useContext(UserContext);
  const [formData, setFormData] = useState(emptyForm);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch({
      type: "ADD_USER",
      payload: { ...formData },
    });

    setFormData(emptyForm);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="მომხმარებლის სახელი"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="lastName"
        placeholder="მომხმარებლის გვარი"
        value={formData.lastName}
        onChange={handleChange}
      />

      <input
        type="number"
        name="age"
        placeholder="მომხმარებლის ასაკი"
        value={formData.age}
        onChange={handleChange}
      />

      <button type="submit">დამატება</button>
    </form>
  );
}

function UserList() {
  const { state } = useContext(UserContext);

  return (
    <div>
      <h2>მომხმარებლების სია</h2>

      {state.error && <p>{state.error}</p>}

      <ul>
        {state.users.map((user, index) => (
          <li key={index}>
            {user.name} {user.lastName}, {user.age}
          </li>
        ))}
      </ul>
      {state.error && (
        <p>{state.error && <p style={{ color: "red" }}>{state.error}</p>}</p>
      )}
    </div>
  );
}

function AppContent() {
  const [formOpen, setFormOpen] = useState(false);

  if (formOpen) {
    return <UserForm onClose={() => setFormOpen(false)} />;
  }

  return (
    <main
      style={{ display: "flex", justifyContent: "space-between", gap: "40px" }}
    >
      <section>
        <button onClick={() => setFormOpen(true)}>მომხმარებლის დამატება</button>
      </section>

      <UserList />
    </main>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
