Data Storage App Development Flow
---------------------------------

### Goals:
- Allow users to submit messages
- Save messages in a databse
- Display all messages on the page

##### Guiding thought - "Follow the Data"

### PART 1 - SETUP
1. Open Command Prompt and cd into folder with code files
2. Run `npm install` to grab dependencies listed in package.json file
3. Run `node --watch index.js` to serve the app
4. Make a change on the server side to confirm `--watch` is working

### PART 2 - GET + DISPLAY DATA:
5.  **SERVER** - create a route to serve the data
```
app.get('/messages', (request, response) => {
    //Send data as an object
    response.json(defaultData);
});
```
6. **CLIENT** - use `fetch()` to make a `GET` request for the data
```
fetch('/messages')
    .then(response => response.json())
    .then(data => {
        console.log(data);

    })
    .catch(error => {
        console.log(error)
    });
```
7. **CLIENT** - add the data to the page
```
//Select for element on the page
let feed = document.getElementById('feed');
//Loop through data and append to the page
for (let i = 0; i < data.length; i++){
    let currentName = data[i].name;
    let currentMessage = data[i].message;
    let currentEl = document.createElement('p');
    currentEl.innerHTML = currentName + " - " + currentMessage;
    feed.appendChild(currentEl);
}
```
### PART 3 - POST + STORE DATA
8. **CLIENT** - add an event listener to the button
```
//Create an event listener to collect and POST data
let msgButton = document.getElementById('msg-submit');
msgButton.addEventListener('click', () => {
    console.log("Button was clicked!");

});
```
9. **CLIENT** - in the callback function for the button event listener, grab the input value(s) and create an object to store the values.
```
let nameInput = document.getElementById('name-input');
let currentName = nameInput.value;

let msgInput = document.getElementById('msg-input')
let currentMessage = msgInput.value;

let messageObj = {
    name: currentName,
    message: currentMessage
};
console.log(messageObj);
```
10. **CLIENT** - convert the object into JSON using `JSON.stringify()`
```
let messageObjJSON = JSON.stringify(messageObj);
```
11. **CLIENT** - inside the callback function use `fetch()` to make a POST request to the server. 
```
fetch('/newMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: //JSON data goes here
    })
    .then(response => response.json())
    .then(data => {
        console.log("Did this work?");
        console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
```
12. **CLIENT** - attach the data as part of the “body” of the `fetch()` request, which will send the data to the server
```
body: messageObjJSON
```
13. **SERVER** - create an `app.post()` route to listen for the new message data
```
app.post('/newMessage', (request, response) => {
  // console.log(request.body);
});
```
14. **SERVER** - add json parse middleware so the server can read json data
```
app.use(express.json());
```
15. **SERVER** - in the callback function of the `app.post()` route, update the message data with a timestamp
```
let newMessage = request.body;
newMessage.time = Date();
```
16. **SERVER** - Store the new message data in the existing daa array
```
defaultData.push(newMessage);
```
17. **SERVER** - Send a response object back to the client with a “success” message
```
response.json({'msg': 'Success'});
```
18. **CLIENT** - Receive a response to the `fetch()` request (see Step #11)
19. **CLIENT** - Add the new message data to the page and clear the input box
```
let feed = document.getElementById('feed');
let currentEl = document.createElement('p');
currentEl.innerHTML = currentName + " - " + currentMessage;
feed.appendChild(currentEl);

nameInput.value = ''
msgInput.value = '';
```
### PART 4 - ADD A DATABASE
20. **SERVER** - install lowdb
```
npm install lowdb@6.1.1
```
21. Load lowdb using `import` keyword (ESM - ecmascript module)
```
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
```
22. **SERVER** - add "type": "module" to package.json
23. **SERVER** - update the express import from `require`
```
import express from 'express';
```
24. **SERVER** - initilaize the database
```
const defaultData = { messages: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);
```
25. **SERVER** - write a new message to the database, not the messages array, in the `app.post` route
```
db.data.messages.push(newMessage)
db.write()
    .then(() => {
      //send message back to the client
    });
```
26. **SERVER** - read the messages from the database, not the messages array, in the `app.get` route
```
db.read()
    .then(() => {
      //save the messages to an object
      let theData = {messages : db.data.messages};
      //send the messages to the client
      response.json(theData);
    });
```
27. **CLIENT**: check the fetch on window load to make sure the messages are still displaying
```
let theData = data.messages;
```