import React, { useState, useEffect } from 'react';
import './App.css';
import ContactItem from './ContactItem';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const ContactListApp = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error('Error fetching contacts:', error));
  };

  const addContact = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then(response => response.json())
      .then(data => {
        setContacts([...contacts, data]);
        setName('');
        setEmail('');
      })
      .catch(error => console.error('Error adding contact:', error));
  };

  const updateContact = (id, updatedData) => {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(() => {
        const updatedContacts = contacts.map(contact =>
          contact.id === id ? { ...contact, ...updatedData } : contact
        );
        setContacts(updatedContacts);
      })
      .catch(error => console.error('Error updating contact:', error));
  };

  const deleteContact = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        const filteredContacts = contacts.filter(contact => contact.id !== id);
        setContacts(filteredContacts);
      })
      .catch(error => console.error('Error deleting contact:', error));
  };

  return (
    <div>
      <h1>Contact List</h1>
      <form onSubmit={(e) => { e.preventDefault(); addContact(); }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add Contact</button>
      </form>
      <ul>
        {contacts.map(contact => (
          <ContactItem key={contact.id} contact={contact} updateContact={updateContact} deleteContact={deleteContact} />
        ))}
      </ul>
    </div>
  );
};

export default ContactListApp;
