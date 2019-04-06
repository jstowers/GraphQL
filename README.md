# GraphQL

GraphQL is a query language for making efficient API requests to databases.

Developed by Facebook, GraphQL uses graphs to organize data.

Reference: _GraphQL with React: The Complete Developer's Guide_, Stephen Grider, Udemy


## Start Up Servers & GraphiQL Interface

You will need to start up two servers to make GraphQL requests:

1. GraphQL - an Express server that GraphQL uses to make HTTP Requests
2. JSON-Server - a mock database server that stores JSON data

---

### 1. GraphQL / Express Server

+ GraphQL uses this server and Express to make HTTP Requests
+ Server listens on Port 4000

```
    $ npm run dev

```

+ In a browser tab, navigate to the GraphiQL query interface:

```
    http://localhost:4000/graphql
```

### 2. JSON-Server

+ This nifty npm package provides a mock data store from which GraphQL can make CRUD requests

+ To install the library, run the following terminal command:

```
    $ npm install --save json-server
```

+ Add the following npm run script in your package.json file:

```
    "scripts": {
        "json:server": "json-server --watch db.json",
    }
```

+ Create a new file, _db.json_, and add data in JSON format:

```
    {
        "users": [
            {
                "id": "23",
                "firstName": "Bill",
                "age": 20,
                "companyId": "1"
            },
            {
                "id": "40",
                "firstName": "Alex",
                "age": 40,
                "companyId": "2"
            },
        ],
    }
```

+ In a new terminal window, start the json server:

```
    $ npm run json:server
```

+ This server will be running and listening on Port 3000

+ Open a new browser tab and navigate to this URL to see your users data:

```
    http://localhost:3000/users
```