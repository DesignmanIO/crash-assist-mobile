import {Incidents, Incident} from '../collections/Incidents.js';

Meteor.publish('PastIncidents', function(){
   return Incidents.find({userId:this.userId, completed:true});
});
