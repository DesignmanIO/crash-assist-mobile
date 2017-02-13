import React from 'react';
import ReactDOM from 'react-dom';
import App from '/imports/ui/App.jsx';
import { Meteor } from 'meteor/meteor';
import '/imports/shared/client/cloudinary-config.js'

import loginByDeviceId from '/imports/startup/client/accounts.js';

Meteor.startup(() => {
    ReactDOM.render(<App/>, document.getElementById("react-app"));
});
