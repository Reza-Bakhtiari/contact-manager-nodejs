const fs = require("fs");

const addContact = (fullname, phone) => {
  const contacts = loadContacts();
  const duplicateContact = contacts.find(
    (contact) => contact.fullname === fullname
  );

  if (!duplicateContact) {
    contacts.push({ fullname, phone });
    saveContacts(contacts);
    console.log("contact saved!!!");
  } else {
    console.log("contact already exist!");
  }
};

// a function for loadContacts
const loadContacts = () => {
  try {
    const dataBuffer = fs.readFileSync("contacts.json");
    const contacts = dataBuffer.toString();
    return JSON.parse(contacts);
  } catch (ex) {
    console.log(ex);
    return [];
  }
};

const saveContacts = (contacts) => {
  const data = JSON.stringify(contacts);
  fs.writeFileSync("contacts.json", data);
};

const listContacts = () => {
  const contacts = loadContacts();
  if (contacts.length > 0) {
    console.log("your contacts : \n");
    // contacts.forEach((contact) => {
    //   console.log(`\t Fullname : ${contact.fullname}`);
    //   console.log(`\t phone : ${contact.phone}`);
    //   console.log("\t------------------------------------------------------");
    // });
    console.table(contacts);
  } else {
    console.log("you don't have any contacts");
  }
};

const removeContacts = (fullname) => {
  const contacts = loadContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.fullname !== fullname
  );

  if (contacts.length > filteredContacts.length) {
    saveContacts(filteredContacts);
    console.log(`${fullname} has been removed`);
  } else {
    console.log("contact not found");
  }
};

module.exports = {
  addContact,
  listContacts,
  removeContacts,
};
