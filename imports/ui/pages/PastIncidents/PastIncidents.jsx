import React, { Component } from 'react';
import { Page, Toolbar, BackButton, ListItem, List } from 'react-onsenui';
import { createContainer } from 'meteor/react-meteor-data';
import SingleIncident from '/imports/ui/pages/SingleIncident/SingleIncident.jsx';
import { Incidents } from '/imports/shared/collections/Incidents.js';


class PastIncidents extends Component {
    renderToolbar() {
        return (
            <Toolbar>
                <div className="left">
                    <BackButton>
                        Back
                    </BackButton>
                </div>
                <div className="center">
                    Past Incidents
                </div>
            </Toolbar>
        );
    }

    render(){
        let { navigator } = this.props.appContext;

        return (
            <Page renderToolbar={this.renderToolbar}>
                <List
                    dataSource={this.props.pastIncidents}
                    renderRow={(incident) =>
                        <ListItem
                            key={incident._id}
                            modifier="chevron"
                            tappable
                            onClick={()=> navigator.pushPage({component:SingleIncident, props:{_id:incident._id, key:"SingleIncident"}}) } >
                            <div className="center">{incident.title}</div>
                        </ListItem>
                    }
                />
            </Page>
        );
    }
}

export default PastIncidentsContainer = createContainer(() => {
    const pastIncidentsHandle = Meteor.subscribe('PastIncidents');
    const loading = !pastIncidentsHandle.ready();
    const pastIncidents = Incidents.find({completed:true}).fetch();

    return {
        pastIncidentsHandle,
        loading,
        pastIncidents
    }
}, PastIncidents);
