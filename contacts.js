const fs = require('fs/promises');

const path = require('path');

const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, '/db/contacts.json');

const updateContacts = async (contact) =>
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contact = await listContacts();
  const resault = contact.find((item) => item.id === id);
  return resault || null;
};

const removeContact = async (id) => {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contact.splice(index, 1);
  await updateContacts(contact);
  return result;
};

const addContact = async (name, email, phone) => {
  const contact = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contact.push(newContact);
  await updateContacts(contact);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
