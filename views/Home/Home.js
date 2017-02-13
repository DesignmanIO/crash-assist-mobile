import React, {Component} from 'react';
import {View, Button, Modal, Image, Text, Heading} from '@shoutem/ui';
// import Icon from 'react-native-vector-icons/Ionicons';
import {connectStyle} from '@shoutem/theme';

import Meteor, {createContainer} from 'react-native-meteor';

// import './Landing.scss';

class Home extends Component {

  constructor(props) {
    super(props);
    // this.state = {};
  }

  componentDidMount() {
    if (Meteor.userId()) {
      console.log('should be logged in');
    }
  }

  gotoNewIncident = () => {
    // if (!Incidents.findOne({completed: false})) {
    //   this.setState({hasIncompleteIncident: true});
    //   new Incident().save();
    // }
    // this.props.appContext.navigator.pushPage({
    //   component: NewIncident,
    //   props: {currentStep: 1, key: "Steps"}
    // });
  };

  // incompleteIncidentExists() {
  //     return Incidents.findOne({completed: false}) ? true : false;
  // }

  // startButton = ()=> {
    // console.log(this.refs.startButton);
    // return this.refs.startButton;
  // };

  // toggleTooltip = (state)=> {
    // if (state || this.state.tooltipOpen) {
    //   this.setState({toolTipOpen: false});
    // } else if (!state || !this.state.tooltipOpen) {
    //   this.setState({toolTipOpen: true});
    // }
  // };

  renderFirstTimeDialog = ()=> {
    // return (
    //     <Popover
    //         getTarget={this.startButton}
    //         isOpen={this.state.tooltipOpen}
    //         onOpen={this.toggleTooltip}
    //         onHide={this.toggleTooltip}
    //         isCancelable={true}
    //         direction="up down"
    //     >
    //         <p>In an accident? Start here.</p>
    //     </Popover>
    // )
  };

  // hideLoginDialog = ()=> {
    // console.log('hid dialog, preventing from seeing in the future');
    // Users.update(Meteor.userId(), {$set: {'profile.hideLoginDialog': true}});
    // this.setState({showLoginDialog: false});
  // };

  // renderLoginDialog = ()=> {
  //   if (true) {
  //     return (
  //       <Popover
  //         getTarget={()=> {
  //           return this.refs.menuActuator
  //         }}
  //         isOpen={this.props.completeIncidents && !this.props.hideLoginDialog}
  //         onOpen=""
  //         onHide={this.hideLoginDialog}
  //         onCancel={this.hideLoginDialog}
  //         isCancelable={true}
  //         direction="left right"
  //       >
  //         <p style={{textAlign: 'center'}}><Icon icon="md-thumb-up" className="center" size={32}
  //                                                style={{color: 'lightgreen'}}/></p>
  //         <p>Congrats, you completed filling out an incident report! If you need to access or edit your
  //           report, or set up your email and password to access your report on <a
  //             href="https://crashassistapp.com">crashassistapp.com</a>, click this menu icon.</p>
  //       </Popover>
  //     )
  //   }
  // };

  render() {
    const {style, navigation} = this.props;
    return (
      <View style={style.wrapper}>
        <Heading styleName="h-center">Remain Calm, We'll help you through this!</Heading>
        <Image/>
        <Button onPress={() => navigation.navigate('NewIncident')}>
          <Text>
            {this.props.incompleteIncidentExists ? "Continue Incident" : "New Incident"}
          </Text>
        </Button>
      </View>
    );
  }
}

Home.propTypes = {
  style: React.PropTypes.object,
  incompleteIncidentExists: React.PropTypes.bool,
  completeIncidents: React.PropTypes.bool,
};

export default createContainer((props) => {
  const pastIncidentsHandle = Meteor.subscribe('PastIncidents');
  // const loading = !pastIncidentsHandle.ready();
  const pastIncidents = Meteor.collection('Incidents').find({completed: true});
  const hideLoginDialog = true; //Meteor.user() || {}, "profile", "hideLoginDialog") || true;
  return {
    incompleteIncidentExists: !!Meteor.collection('Incidents').findOne({completed: false}),
    completeIncidents: !!pastIncidents.length,
    hideLoginDialog
  }
}, connectStyle('ca.view.Home', {})(Home));