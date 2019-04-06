# GraphQL

GraphQL is an API query language designed to make efficient database requests.

Developed by Facebook, GraphQL uses __graphs__ to organize and retrieve data.

Reference: _GraphQL with React: The Complete Developer's Guide_, Stephen Grider, Udemy

---

## Spin Up Servers & GraphiQL Interface

You will need to spin up two servers to make GraphQL requests:

    1. GraphQL - an Express server that GraphQL uses to make HTTP Requests
    2. JSON-Server - a mock database server that stores JSON data

### GraphQL / Express Server

+ GraphQL uses an Express server to make HTTP Requests
+ In a new terminal window, start the server:

```
    $ npm run dev
```
+ Server listens on Port 4000
+ In a browser tab, navigate to the GraphiQL query interface:

```
    http://localhost:4000/graphql
```

### JSON-Server

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

+ In a new terminal window, start JSON-Server:

```
    $ npm run json:server
```

+ Server listens on Port 3000

+ Open a new browser tab and navigate to this URL to see your users data:

```
    http://localhost:3000/users
```