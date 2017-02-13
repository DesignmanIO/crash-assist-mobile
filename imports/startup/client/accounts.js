import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { cookie } from 'cookie';

export default loginByDeviceId = (deviceId = "fP5Ru5QqsjQdXdAod"/*browser default*/, callback) => {
    if (!Meteor.userId()) {
        Accounts.callLoginMethod({
            methodArguments: [{
                deviceId
            }],
            userCallback: function (error, result) {
                if(error) {
                    callback && callback(error);
                } else {
                    callback && callback();
                }
            }
        });
    }
}