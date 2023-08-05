const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId.toString()
  );

  if (contactIndex === -1) {
    throw new Error(`Contact not found: ${contactId}`);
  }

  const removedContact = contacts.splice(contactIndex, 1)[0];
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const existingContact = contacts.find(
    (contact) => contact.email === email || contact.phone === phone
  );

  if (existingContact) {
    console.log(
        "A contact with this email address or phone number already exists"
    );
    return null;
  }

  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
