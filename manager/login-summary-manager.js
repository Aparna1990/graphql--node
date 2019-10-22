const LoginSummaryAccessor = require('../data-layer/login-summary-accessor');

class LoginSummarymanager {
    constructor(){
           
    }

 getLoginSummary(){
     return LoginSummaryAccessor.LoginSummaryAccessor.login_summary_details;
 }

}

module.exports = LoginSummarymanager;