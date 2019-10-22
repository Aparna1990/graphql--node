var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
const LoginSummaryManager = require('./manager/login-summary-manager');
const LoggedInUserManager = require('./manager/logged-in-user-manager');
const LoggedInUserAccessor = require('./data-layer/logged-in-user-accessor');

class schemaInit{
    constructor(){
        this.loginSummaryManager = new LoginSummaryManager();
        this.loggedInUserManager = new LoggedInUserManager();
}
    // Building Graphql schema
    initSchema(){
var schema = buildSchema(`
    type Query {
        loggedInUser(user_id: Int!): LoggedInUser
        loggedInUsers: [LoggedInUser]
        loginSummary: [LoginSummary]
    },
     type LoggedInUser{
                user_id: Int
                first_name: String
                last_name: String
                address_line1: String
                address_line2: String
                city: String
                postal_code: String
                contact_number: String
                last_logged_in: String
   },
    type LoginSummary{
                user_id: Int
                logged_in_at: String
                logged_out_at: String
                browser_name: String
                device_name: String
            }
`);

var root = {
    loggedInUser: this.loggedInUserManager.getLoggedInUserById,
    loggedInUsers: this.loggedInUserManager.getAllLoggedInUsers,
    loginSummary: this.loginSummaryManager.getLoginSummary
};
this.initServer(schema,root);
    }


initServer(schema,root)
{
    var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
    }
}
// Create an express server and a GraphQL endpoint



module.exports = schemaInit;