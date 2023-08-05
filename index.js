const argv = require("yargs").argv;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function invokeAction(argv) {
  const { action, id, name, email, phone } = argv;

  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        const contact = await getContactById(id);
        console.log(contact || "Contact not found");
        break;

      case "add":
        const addedContact = await addContact(name, email, phone);
        if (addedContact) {
          console.log("Added contact:", addedContact);
        }
        break;

      case "remove":
        const removedContact = await removeContact(id);
        if (removedContact) {
          console.log("Removed contact:", removedContact);
        }
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("An error has occurred:", error.message);
  }
}

invokeAction(argv);
