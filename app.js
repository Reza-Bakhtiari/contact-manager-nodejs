const yargs = require("yargs");

const { addContact, listContacts, removeContacts } = require("./contacts");

yargs.scriptName = "contact manager app";

yargs.command({
  command: "create",
  aliases: ["c"],
  describe: "[create a new contact]",
  builder: {
    fullname: {
      alias: "f",
      describe: "person fullname",
      demandOption: true,
      type: "string",
    },
    phone: {
      alias: "p",
      describe: "person phone number",
      demandOption: true,
      type: "number",
    },
  },
  handler({ fullname, phone }) {
    // console.log(`${fullname} : ${phone}`);
    addContact(fullname, phone);
  },
});

yargs.command({
  command: "list",
  aliases: ["l"],
  describe: "[list contact]",
  describe: "listing the saved contacts",
  handler() {
    listContacts();
  },
});

yargs.command({
  command: "remove",
  aliases: ["r"],
  describe: "[remove contact]",
  builder: {
    fullname: {
      alias: "f",
      describe: "person fullname",
      demandOption: true,
      type: "string",
    },
  },
  handler({ fullname }) {
    removeContacts(fullname);
  },
});

yargs.parse();
