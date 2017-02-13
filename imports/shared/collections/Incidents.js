/**
 * Created by Julian on 9/15/16.
 */
const Incidents = new Mongo.Collection("incidents");
import moment from 'moment';
import {BaseModel} from 'meteor/socialize:base-model';
import {Users} from './Users.js';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// import {Ground} from 'meteor/ground:db';

import '../SimpleSchemaExtension.js';

let Schemas = {};

Schemas.Incidents = new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return this.userId;
            }
        },
        index: 1,
        denyUpdate: true
    },
    title: {
        type: String,
        autoValue: function () {
            if (this.isInsert && !this.isSet) {
                return `${moment().format('MM/DD/YY')} incident`;
            }
        }
    },
    dateCreated: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        },
        denyUpdate: true,
        index: 1
    },
    currentStep: {
        type: Number,
        optional: true
    },
    completed: {
        type: Boolean,
        defaultValue: false,
        index: 1
    }
});

Incidents.attachSchema(Schemas.Incidents);

const formSchema = new SimpleSchema({
    //driver info
    "driverInfo.licensePhoto": {type: [String]},
    "driverInfo.name": {type: String},
    "driverInfo.address": {type: String},
    "driverInfo.phone": {type: String},
    "driverInfo.email": {type: String},
    "driverInfo.license": {type: String},
    //[passenger info]
    "passengerInfo": {type: [Object], optional: true},
    "passengerInfo.$.name": {type: String, optional: true},
    "passengerInfo.$.phone": {type: String, optional: true},
    "passengerInfo.$.email": {type: String, optional: true},
    //vehicle info
    "vehicleInfo.make": {type: String},
    "vehicleInfo.model": {type: String},
    "vehicleInfo.year": {type: Number},
    "vehicleInfo.plate": {type: String},
    //owner info
    "ownerInfo.name": {type: String},
    "ownerInfo.address": {type: String},
    "ownerInfo.phone": {type: String},
    "ownerInfo.email": {type: String},
    "ownerInfo.license": {type: String},
    //insurance info
    "insuranceInfo.photo": {type: [String]},
    "insuranceInfo.company": {type: String},
    "insuranceInfo.policyNumber": {type: String},
    "insuranceInfo.agent": {type: String},
    //time & location
    "timeLocation.date": {type: String},
    "timeLocation.time": {type: String},
    "timeLocation.location": {type: String},
    //Traffic Information
    "trafficInfo.roadConditions": {type: String},
    "trafficInfo.trafficControls": {type: String},
    //Witness Information
    "witnessInfo": {type: [Object], optional: true},
    "witnessInfo.$.name": {type: String},
    "witnessInfo.$.phone": {type: String, optional: true},
    "witnessInfo.$.email": {type: String, optional: true},
    "witnessInfo.$.testimony": {type: String, optional: true},
    //driver statement
    "driverStatement": {type: String, optional: true},
    //sketch photo public id
    "sketch": {type: [String], optional: true},
    //array of photo public ids
    "photos": {type: [String], optional: true},
    //injuries
    "injuries": {type: [String], optional: true},
    //Symptoms
    "symptoms": {type: String, optional: true}
});

Incidents.attachSchema(formSchema);

//collection hooks

// UserIncidents.before.insert((userId, doc) => {});
// UserIncidents.after.insert((userId, doc) => {});
// UserIncidents.before.update((userId, doc, fieldNames, modifier, options) => { });
// UserIncidents.after.update((userId, doc, fieldNames, modifier, options) => {});
// UserIncidents.before.remove((userId, doc) => {});
// UserIncidents.after.remove((userId, doc) => {});
// UserIncidents.before.upsert((userId, selector, modifier, options) => {});
// UserIncidents.before.find((userId, selector, options) => {});
// UserIncidents.after.find((userId, selector, options, cursor) => {});
// UserIncidents.before.findOne((userId, selector, options) => {});
// UserIncidents.after.findOne((userId, selector, options, doc) => {});

//base model

class Incident extends BaseModel {
    constructor(document) {
        super(document);  //Must call super passing in the document.
    }

    markCompleted() {
        this.update({$set: {completed: true}});
    }

    user() {
        return Users.findOne(this.userId);
    }

    setStep(value){
        this.update({$set: {currentStep: value}});
    }
}

Incident.attachCollection(Incidents);


//allow/deny

Incidents.allow({
    insert(userId, Incident){
        return Incident.checkOwnership();
    },
    update(userId, Incident){
        return Incident.checkOwnership();
    },
    remove(userId, Incident) {
        return Incident.checkOwnership();
    }
});

// Ground.Collection(Incidents);

export {Incidents, Incident};
