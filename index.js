//Data array
// let defaultData = [
//   {
//     name: "Me",
//     message: "This is my first y message"
//   },
//   {
//     name: "You",
//     message: "Hello hello!"
//   }
// ];

//load lowdb module
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const defaultData = { myMessages: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

// db.data = { ygmessages: [] };

//Set up the server
// let express = require('express');
import express from 'express';
let app = express();

//Serve static files from a public folder
app.use(express.static('public'));
app.use(express.json());

//Set port variable to listen for requests
let port = process.env.PORT || 3000;
app.listen(port, () => {
console.log('listening at ', port);
});

/*ROUTES */
app.get('/messages', (request, response) => {
  //Send data as an object
  // response.json(defaultData);

  // db.read --> get the latest value from db.data
  db.read()
    .then(() => {
      //save the messages to an object
      let theData = {messages : db.data.myMessages};
      //send the messages to the client
      response.json(theData);
    });

});

app.post('/newMessage', (request, response) => {
  // console.log(request.body);

  let newMessage = request.body;
  newMessage.time = Date();

  // defaultData.push(newMessage);
  db.data.myMessages.push(newMessage)

  // write the latest db.data to the db.json file
  db.write()
    .then(() => {
      //send message back to the client
      response.json({ 'msg': 'Success' });
    });

  
});