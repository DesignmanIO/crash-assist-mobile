import SimpleSchema from 'simpl-schema';
import {Incident, Incidents} from '../imports/shared/collections/Incidents.js';

import {
  TextInput,
  NumberInput,
  TextareaInput,
  DateInput,
  PhotoInput,
  TelInput,
  EmailInput,
  ArrayInput,
} from '../components/FormControls';

const formSchema = new SimpleSchema({
  //driver info
  "driverInfo.licensePhoto": {type: Array, srf: {type: PhotoInput}},
  "driverInfo.name": {type: String, srf: {type: TextInput}},
  "driverInfo.address": {type: String, srf: {type: TextInput}},
  "driverInfo.phone": {type: String, srf: {type: TelInput}},
  "driverInfo.email": {type: String, srf: {type: EmailInput}},
  "driverInfo.license": {type: String, srf: {type: TextInput}},
  //[passenger info]
  "passengerInfo": {type: Array, optional: true, srf: {type: ArrayInput}},
  "passengerInfo.$.name": {type: String, srf: {type: TextInput}},
  "passengerInfo.$.phone": {type: String, srf: {type: TelInput}, optional: true},
  "passengerInfo.$.email": {type: String, srf: {type: EmailInput}, optional: true},
  //vehicle info
  "vehicleInfo.make": {type: String, srf: {type: TextInput}},
  "vehicleInfo.model": {type: String, srf: {type: TextInput}},
  "vehicleInfo.year": {type: Number, srf: {type: NumberInput}},
  "vehicleInfo.plate": {type: String, srf: {type: TextInput}},
  //owner info
  "ownerInfo.name": {type: String, srf: {type: TextInput}},
  "ownerInfo.address": {type: String, srf: {type: TextInput}},
  "ownerInfo.phone": {type: String, srf: {type: TelInput}},
  "ownerInfo.email": {type: String, srf: {type: EmailInput}},
  "ownerInfo.license": {type: String, srf: {type: TextInput}},
  //insurance info
  "insuranceInfo.photo": {type: Array, srf: {type: PhotoInput}},
  "insuranceInfo.company": {type: String, srf: {type: TextInput}},
  "insuranceInfo.policyNumber": {type: String, srf: {type: TextInput}},
  "insuranceInfo.agent": {type: String, srf: {type: TextInput}},
  //time & location
  "timeLocation.date": {type: String, srf: {type: DateInput}},
  "timeLocation.time": {type: String, srf: {type: TextInput}},
  "timeLocation.location": {type: String, srf: {type: TextInput}},
  //Traffic Information
  "trafficInfo.roadConditions": {type: String, srf: {type: TextareaInput}},
  "trafficInfo.trafficControls": {type: String, srf: {type: TextareaInput}},
  //Witness Information
  "witnessInfo": {type: Array, optional: true, srf: {type: ArrayInput}},
  "witnessInfo.$.name": {type: String, srf: {type: TextInput}},
  "witnessInfo.$.phone": {type: String, srf: {type: TelInput}, optional: true},
  "witnessInfo.$.email": {type: String, srf: {type: EmailInput}, optional: true},
  "witnessInfo.$.testimony": {type: String, srf: {type: TextareaInput}, optional: true},
  //driver statement
  "driverStatement": {type: String, srf: {type: TextareaInput}, optional: true},
  //sketch photo public id
  "sketch": {type: Array, srf: {type: PhotoInput}, optional: true},
  //array of photo public ids
  "photos": {type: Array, srf: {type: PhotoInput}, optional: true},
  //injuries
  "injuries": {type: Array, srf: {type: PhotoInput}, optional: true},
  //Symptoms
  "symptoms": {type: String, srf: {type: TextareaInput}, optional: true}
});

Incidents.simpleSchema = (doc, options, query) => formSchema;

export {Incidents, Incident};