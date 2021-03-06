const graphql = require('graphql');
const axios = require('axios');

// destructure properties from graphql
// GraphQLObjectType - instruct GraphQL about presence of a User

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql;


// Lec. 17 - need to define CompanyType above UserType
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                    .then(res => res.data);
            }
        }
    })
});

// instructs GraphQL on what a User object should look like
// fields - tells what properties the User has
// need to tell GraphQL what type of data each field has
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                console.log('parentValue =', parentValue);
                console.log('args =', args);
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(res => res.data);
            }
        }
    })
});



// allows GraphQL to jump and land on a specific node in data
// if provide a User id, GraphQL will return the User object
// args - minimum arguments for the query

// MOST IMPORTANT PART:
// resolve function - go into database or datastore and find the data we're looking for.
// args param in resolve is an object with the props from the args object

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(function(resp) {
                        return resp.data;
                    })
                    .catch(function(err) {
                        if(err.response) {
                            const errorStatus = err.response.status;
                            const errorText = err.response.statusText;
                            if(errorStatus === 404) {
                                console.log(`The requested user, ${args.id}, was not found.  Please try another User ID.`);
                            } else {
                                console.log('Error ', errorStatus, ': ', errorText);
                            }
                        }
                    });
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                    .then(function(resp) {
                        console.log('resp =', resp);
                        return resp.data;
                    })
                    .catch(function(err) {
                        createErrorMessage(err, args.id);
                    })
            }
        }
    }
});

function createErrorMessage(err, id) {
    if(err.response) {
        const errorStatus = err.response.status;
        const errorText = err.response.statusText;
        if(errorStatus === 404) {
            console.log(`The requested id, ${id}, was not found.  Please try again.`);
        } else {
            console.log('Error', errorStatus + ': ' + errorText);
        }
    } else {
        console.log('Error: ' + err);
    }
}

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            // type refers to the data eventualy returned from the resolve function
            // won't always return the same type as what we're working on
            type: UserType,
            // when call addUser, should pass along the following arguments
            // GraphQLNonNull - validation to ensure that an argument is provided
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.post(`http://localhost:3000/users`, args)
                    .then(res => res.data);
            }
        },
        deleteUser: {
            type: UserType,
            args: { 
                id: { type: new GraphQLNonNull(GraphQLString) } 
            },
            resolve(parentValue, {id}) {
                return axios.delete(`http://localhost:3000/users/${id}`, { id })
                    .then(res => res.data);
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.patch(`http://localhost:3000/users/${args.id}`, args);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    mutation,
    query: RootQuery
});

