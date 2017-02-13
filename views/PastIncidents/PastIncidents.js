/**
 * Created by Julian on 2/13/17.
 */
import React, {Component} from 'react';
import {View, ListView, Row, TouchableOpacity} from '@shoutem/ui';
import Meteor, {createContainer} from 'react-native-meteor';
import {connectStyle} from '@shoutem/theme';

class PastIncidents extends Component {
  static navigationOptions = {
    title: 'Past Incidents',
    drawer: () => ({
      label: 'Past Incidents',
    })
  };

  render() {
    let {navigation, style} = this.props;

    return (
      <View style={style.wrapper}>
        <ListView
          data={this.props.pastIncidents}
          renderRow={(incident) =>
            <Row
              key={incident._id}
              onPress={()=> navigator.pushPage({
                component: SingleIncident,
                props: {_id: incident._id, key: "SingleIncident"}
              }) }>
              <TouchableOpacity>
                <Text>{incident.title}</Text>
              </TouchableOpacity>
            </Row>
          }
        />
      </View>
    );
  }
}

PastIncidents.propTypes = {
  style: React.PropTypes.object,
  navigation: React.PropTypes.object,
};

export default PastIncidentsContainer = createContainer(() => {
  const pastIncidentsHandle = Meteor.subscribe('PastIncidents');
  const loading = !pastIncidentsHandle.ready();
  const pastIncidents = Meteor.collection('Incidents').find({completed: true});

  return {
    pastIncidentsHandle,
    loading,
    pastIncidents
  }
}, connectStyle('ca.views.PastIncidents', {})(PastIncidents));
