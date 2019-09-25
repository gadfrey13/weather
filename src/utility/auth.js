class Auth{
    construtor(){
        this.authenticated = false;
    }

    //login authetication
    login(cb){
        this.authenticated = true;
        cb();
    }
    //logout 
    logout(cb){
        this.authenticated = false;
        cb();
    }
    //register user
    register(cb){
        this.authenticated = true;
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }
}
//The reason why you do this is to prevent the creation of 
//new instantion. This prevents users from having multiple auth.
//this allows multiple components to share the same data.
export default new Auth();//mimics the singleton pattern