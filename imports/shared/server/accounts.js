import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';


Accounts.onCreateUser(function(options, user){
    const { deviceId } = options;
    
    //create list for deviceId in case user has multiple devices.
    if(deviceId){
        user.devices = [deviceId];
    }
    return user;
});

Accounts.registerLoginHandler('device', function(options) {
    let userId;
    const { deviceId } = options;

    //user can't be logged in, and we need a deviceId to look for
    if(!Meteor.userId() && deviceId) {
        //find the user by the supplied deviceId
        const user = Meteor.users.findOne({devices:deviceId});

        if(user) {
            /*  Since we set the username as the password we check here to make
                sure that it's still the same. If the passwords don't match
                then the user has set a password for the account and an error is
                thrown and propagated to the client. The client should check this
                in the callback for `loginByDeviceId` and prompt the user to login
             */
            const result = Accounts._checkPassword(user, user.username);
            if(result.error){
                //matched deviceId is registered to a passworded account
                throw new Meteor.Error(403, "Must Login With Password")
            }else{
                //we have an account but password is not set yet
                userId = user._id;
            }
        }else {
            /* account must have a username or email. Since username isn't really
               used we'll just set it to a random string and the user can set an
               email and password to login.
             */
            const username = Random.id(100);

            /*  We set the password to the username here so that the password can
                be changed easily by knowing the username on the client. If we don't
                set a password then we have to use a method call and send the password
                potentially in plain text.
             */
            userId = Accounts.createUser({username, deviceId, password:username});
        }
        
        //finally if we found or created a user, return the userId so they get logged in
        return { userId };
   }
});