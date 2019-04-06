// Section 3, Lecture 6
// Wire-Up Express Server
// Friday, March 29, 2019

// express library
const express = require('express');
// compatibility layer between express and graphQL
const expressGraphQL = require('express-graphql');

const schema = require('./schema/schema');

/*
    Express is an HTTP server
    HTTP = HyperText Transfer Protocol
    Receives a request, processes it;
    Receives a response and sends it back to the client

    Request --> Express: Is request asking for GraphQL? 
                                --> YES --> GraphQL --> response
                                --> NO  --> process request as normal

*/

const app = express();

// app.use -> how we wire up middleware to an express appp
// middlewares - intercepts/modifies requests as they come through the express server
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening on Port 4000');
});