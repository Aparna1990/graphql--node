const _ = require('lodash');
const LoggedInUserAccessor = require('../data-layer/logged-in-user-accessor');

class LoggedInUserManager {
  
 getLoggedInUserById(args) { 
    var user_id = args.user_id;
    return LoggedInUserAccessor.LoggedInUserAccessor.LoggedInUserDetails.filter(userDetail => {
        return userDetail.user_id == user_id;
    })[0];
}

 getAllLoggedInUsers(){
    return LoggedInUserAccessor.LoggedInUserAccessor.LoggedInUserDetails;
 }
}

module.exports = LoggedInUserManager;
