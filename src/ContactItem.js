import React, { useState } from 'react';

const ContactItem = ({ contact, updateContact, deleteContact }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);

  const handleUpdate = () => {
    updateContact(contact.id, { name, email });
    setEditing(false);
  };

  const handleDelete = () => {
    deleteContact(contact.id);
  };

  return (
    <li>
      {editing ? (
        <>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <div>{contact.name}</div>
          <div>{contact.email}</div>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </li>
  );
};

export default ContactItem;
