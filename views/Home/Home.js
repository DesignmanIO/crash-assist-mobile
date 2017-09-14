import React, { Component } from "react";
import {
  View,
  Button,
  Image,
  Text,
  Heading,
  TouchableOpacity,
  ScrollView
} from "@shoutem/ui";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Constants } from "expo";
import { connectStyle } from "@shoutem/theme";
import Meteor, { createContainer, getData } from "react-native-meteor";
import { AsyncStorage, Alert, Modal } from "react-native";
import { NavigationActions } from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";

import { Store } from "../../main";
import theme from "../../config/theme";
const menuStyle = theme["ca.component.MenuIcon"];
import Disclaimer from "../../components/Disclaimer";
// console.log(menuStyle);
// import Icon from 'react-native-vector-icons/Ionicons';

// import './Landing.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAgreement: false
    };
  }

  async componentWillMount() {
    const token = await AsyncStorage.getItem("reactnativemeteor_usertoken");
    console.log(token);
    if (token) {
      console.log("should be logged in");
    } else {
      Meteor.call(
        "login",
        { deviceId: Constants.deviceId },
        (error, result) => {
          AsyncStorage.setItem("reactnativemeteor_usertoken", result.token);
          getData()._tokenIdSaved = result.token;
          Meteor._userIdSaved = result.id;
          console.log("logged in first time", error, result);
        }
      );
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

  renderFirstTimeDialog = () => {
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
  goToIncident() {
    const { navigation } = this.props;
    let incidentId;
    console.log('going to incident');
    if (!Meteor.userId()) {
      Alert.alert("Not logged in! Something's wrong...");
      return;
    }
    if (this.props.incompleteIncident) {
      incidentId = this.props.incompleteIncident._id;
    } else {
      incidentId = Meteor.collection("incidents").insert(
        { completed: false, userId: Meteor.userId() },
        (err, res) => console.log(err, res)
      );
    }

    // console.log(incidentId);
    Store.dispatch({ type: "SET_INCIDENTID", incidentId });
    navigation.navigate("Incident", { incidentId });
    // navigation.dispatch(
    //   NavigationActions.navigate({
    //     routeName: 'NewIncident',
    //     params: { incidentId },
    //     // action: NavigationActions.navigate({
    //     //   routeName: 'NewIncident',
    //     //   params: { incidentId },
    //     // }),
    //   }),
    // );
  }

  render() {
    const { style } = this.props;
    // console.log(this.props.user);
    return (
      <View style={style.wrapper} styleName="vertical h-center fill-parent">
        <Heading styleName="h-center" style={style.header}>
          Remain Calm, {"\n"}We'll help you through this!
        </Heading>
        <Image
          source={require("../../assets/crash.png")}
          style={{ width: 240, height: 48 }}
        />
        <Modal visible={this.state.showAgreement} animationType="slide">
          <View styleName="lg-gutter-top fill-parent space-around">
            <MaterialIcons
              name="close"
              size={22}
              onPress={() => this.setState({ showAgreement: false })}
              style={{ position: "absolute", top: 25, right: 20 }}
            />
            <Disclaimer />
            <Button
              onPress={() => {
                this.setState({ showAgreement: false });
                setTimeout(() => {
                  this.goToIncident();
                }, 300);
              }}
              style={style.incidentButton}
            >
              <Text styleName="bright">
                Agree
              </Text>
            </Button>
          </View>
        </Modal>
        <Button
          style={style.incidentButton}
          styleName="vertical h-center v-center"
          onPress={() => this.setState({ showAgreement: true })}
        >
          <Text styleName="bright">
            {this.props.incompleteIncident
              ? "Continue Incident"
              : "New Incident"}
          </Text>
        </Button>
      </View>
    );
  }
}

Home.propTypes = {
  style: React.PropTypes.object,
  incompleteIncident: React.PropTypes.object,
  completeIncidents: React.PropTypes.bool
};

export default createContainer(props => {
  const pastIncidentsHandle = Meteor.subscribe("PastIncidents");
  // const loading = !pastIncidentsHandle.ready();
  const pastIncidents = Meteor.collection("incidents").find({
    completed: true
  });
  const hideLoginDialog = true; //Meteor.user() || {}, "profile", "hideLoginDialog") || true;
  // console.log(Meteor.collection('incidents').find({}), Meteor.userId());
  return {
    user: Meteor.user(),
    incompleteIncident: Meteor.collection("incidents").findOne({
      completed: false
    }),
    completeIncidents: !!pastIncidents.length,
    hideLoginDialog
  };
}, connectStyle("ca.view.Home", {})(Home));
