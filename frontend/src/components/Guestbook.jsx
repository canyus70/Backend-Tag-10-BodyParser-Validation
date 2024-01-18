import { useState } from "react";

const Guestbook = ({ updateEntryArray }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addEntry = () => {
    fetch("http://localhost:3000/api/add-entry", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ success, entry, error }) => {
        if (!success) {
          console.log(error);
        } else {
          console.log("Entry added successfully:", entry);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            message: "",
          });
          updateEntryArray(entry);
        }
      });
  };

  return (
    <section className="guestbook-form">
      <input
        type="text"
        name="firstName"
        placeholder="Vorname"
        value={formData.firstName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Nachname"
        value={formData.lastName}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        className="guestbook-nachricht"
        type="text"
        name="message"
        placeholder="Nachricht"
        value={formData.message}
        onChange={handleInputChange}
      />
      <button onClick={addEntry}>Hinzufügen</button>
    </section>
  );
};

export default Guestbook;
