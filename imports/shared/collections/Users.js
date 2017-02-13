/**
 * Created by Julian on 9/15/16.
 */

import {BaseModel} from 'meteor/socialize:base-model';
import {Incidents} from './Incidents.js';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
// import {Ground} from 'meteor/ground:db';


const Users = Meteor.users;

//collection hooks

// Users.before.insert((userId, doc) => {});
// Users.after.insert((userId, doc) => {});
// Users.before.update((userId, doc, fieldNames, modifier, options) => { });
// Users.after.update((userId, doc, fieldNames, modifier, options) => {});
// Users.before.remove((userId, doc) => {});
// Users.after.remove((userId, doc) => {});
// Users.before.upsert((userId, selector, modifier, options) => {});
// Users.before.find((userId, selector, options) => {});
// Users.after.find((userId, selector, options, cursor) => {});
// Users.before.findOne((userId, selector, options) => {});
// Users.after.findOne((userId, selector, options, doc) => {});

class User extends BaseModel {
    constructor(document) {
        super(document);  //Must call super passing in the document.
    }

    incidents() {
        return Incidents.find({user_id: this._id});
    }

    // forms() {
    //     return UserForms.find({user_id: this._id});
    // }
    //
    // inputs() {
    //     return UserInputs.find({user_id: this._id});
    // }
}

Users.allow({
    insert(userId, userIncident){
    },
    update(userId, userIncident){
    },
    remove(userId, userIncident) {
    }
});

// Ground.Collection(Users);

export {Users, User};
