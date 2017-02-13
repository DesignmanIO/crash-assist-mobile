import { Meteor} from 'meteor/meteor';
import {Email} from 'meteor/email';
import {check} from 'meteor/check';
import { Incidents } from '../collections/Incidents.js';
import {Users} from '../collections/Users.js';

Meteor.methods({
    /*
        if the user has created an incident on one devices as a anonymous user
        but has an account that the device is not registered on, then when they
        log in to their account we need to find that anonymous account and transfer
        the device and any incidents created to the old account
     */
    CheckDuplicateAccountByDevice: function(devices) {
        let userId = Meteor.userId();

        var duplicate = Meteor.users.findOne({userId:{$ne:userId}, devices});

        if(duplicate){
            Meteor.users.update(userId, {$addToSet:{devices}});
            Incidents.update({userId:duplicate._id}, {$set:{userId}});
        }
    },
    setEmailAddress: function(emailAddress, isSubscribed){
        Accounts.addEmail(Meteor.userId(), emailAddress);
        Users.update({_id: Meteor.userId()}, {$set: {'profile.subscribed': isSubscribed}});

        Meteor.defer(()=>Accounts.sendVerificationEmail(this.userId));
    },
    sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();
        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    }
});
