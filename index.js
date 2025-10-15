//Data array
let defaultData = [
  {
    name: "Me",
    message: "This is my first message"
  },
  {
    name: "You",
    message: "Hello hello!"
  }
];

//Set up the server
let express = require('express');
let app = express();

//Serve static files from a public folder
app.use(express.static('public'));

//Set port variable to listen for requests
let port = 3000;
app.listen(port, () => {
  console.log('Server listening on localhost:', port);
});

/*ROUTES */

