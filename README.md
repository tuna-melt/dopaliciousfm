# dopaliciousfm

Every good song ever done by anybody

# The Stack

Dopalicious is a full-stack web application with the purpose of creating an online radio station. The idea is to create an app where everyone can listen to the same spotify playlist at once, and either talk about it or use similar to how you would listen to a regular radio station.

The project uses React on the front-end in conjunction with Redux for state management. The front-end also has Spotify's SDK player integrated in so we can play a user's spotify in the browser.

The back-end is using Node.js as a RESTful server with a MongoDb database (this is an NoSQL database, but it's pretty simple but different from your basic relational database). We use Mongoose to add schema's to our database.

This project also makes use of web-sockets, which creates a continous connection between the client and the server. Web-sockets allow the server and the client to send messages very quickly bewteen eachother. This helps a lot with live chat capabilities.

Our file system looks something like this:

client -  
├── components (these are all the react components)
├── app.js (this where React starts)
├── store.js (this is Redux for state management)
└── socket.js (this is the socket on the client side)

public -
├── index.html (this is where we mount React, it's the first page the user sees)
└── styles.css (styyyyles babyyy)

server -
├── index.js (this is the main Node.js server business. We're using a package called Express.js)
├── api (this holds all our routes where the user requests data, right now just comments in the db)
├── auth (this is for spotify authorization, one day it will also have apple music)
├── db (this has all the database models defined using Mongoose)
└── socket (this is the websocket on the server side. Whenever a comment is posted by someone, it is emmited to everyone else)

So, full stack application. If we were to integrate machine learning we could use a Tensorflow in Javascript, but we could also write another server and have the two servers talk to eachother. This is essentially what we're doing with the Mongo databse. We could write another server in Python using Django that takes in data, runs it through whatever ML stuff we want, and sends it back to the Node server which then looks at in and sends it back to the client (that would be super cool). Then we could do whatever ML we wanted.
