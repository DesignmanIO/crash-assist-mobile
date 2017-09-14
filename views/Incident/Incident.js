/**
 * Created by Julian on 2/13/17.
 */
import React, { Component } from "react";
import {
  View,
  Heading,
  Subtitle,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  Spinner
} from "@shoutem/ui";
import Swiper from "react-native-swiper";
import HTMLView from "react-native-htmlview";
import { Field } from "simple-react-form";
import Meteor, { createContainer } from "react-native-meteor";
import hoistNonReactStatic from "hoist-non-react-statics";
import { connect } from "react-redux";
import _ from "lodash";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connectStyle } from "@shoutem/theme";
import { flatten } from "flat";
import { Alert } from "react-native";

import renderIf from "../../lib/renderIf";
import { Incidents } from "../../schema/Incidents";
import { colors } from "../../config/theme";
import {
  safetyFirst,
  dosDonts,
  witnessInfo,
  driverInfo,
  sceneInfo,
  nextSteps
} from "../../components/Steps";
import { Form } from "../../components/FormControls";
// import {
//   TextInput,
//   NumberInput,
//   TextareaInput,
//   DateInput,
//   PhotoInput,
//   TelInput,
//   EmailInput,
//   ArrayInput,
// } from '../../components/FormControls';

import pageSchema from "../../page-schema";

class Incident extends Component {
  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    // title: ({ state }) => {
    //   console.log(state);
    //   return `Incident #${state.params.incidentId}`
    // },
    headerVisible: false
  };

  constructor(props) {
    super(props);

    this.state = {
      incident: {},
      loading: true,
      stagedChanges: {}
    };

    this.saveIncident = _.debounce(this.saveIncident, 1000, {
      trailing: true
    }).bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.incident) {
      if (nextProps.incident) {
        console.log("found incident, setting state");
        this.setState({ incident: nextProps.incident });
      }
    } else if (nextProps.incident !== this.state.incident) {
      // console.log("Incident updated, setting state");
      this.setState({ incident: nextProps.incident });
    }
  }

  setIndex(index) {
    // console.log("setting index", this.props.incident._id);
    this.props.incidents.update(
      this.props.incident._id,
      { $set: { currentStep: index } },
      (err, res) => {
        // console.log(err, res);
      }
    );
  }

  updateIncident(changesToStage) {
    const incident = { ...this.state.incident, ...changesToStage };
    console.log("update", _.merge(this.state.stagedChanges, changesToStage) );
    this.setState(
      {
        incident,
        // aggregate staged changes with previous staged changes
        stagedChanges: _.merge(this.state.stagedChanges, changesToStage),
        loading: true
      },
      () => {
        this.saveIncident();
      }
    );
  }

  saveIncident() {
    const { incident } = this.props;
    const mongoReadyChanges = flatten(this.state.stagedChanges, { safe: true });
    console.log("save", this.state.stagedChanges, mongoReadyChanges);
    // const toBeUpdated = _.omit(incident, this.state.incident)
    this.props.incidents.update(
      incident._id,
      {
        $set: mongoReadyChanges
      },
      (err, res) => {
        console.log("saved", err, res);
        this.setState({ stagedChanges: {}, loading: false });
      }
    );
  }

  render() {
    // console.log(this.props.navigation);
    const formParts = [
      safetyFirst,
      dosDonts,
      witnessInfo,
      driverInfo,
      sceneInfo,
      nextSteps
    ];
    return (
      <View>
        {renderIf(this.state.loading, () => (
          <Spinner style={{ position: "absolute", top: 15, right: 15 }} />
        ))}
        <Swiper
          loop={false}
          scrollEnabled={false}
          onResponderRelease={(e, state, context) => this.setIndex(state.index)}
          index={this.props.incident ? this.props.incident.currentStep || 0 : 0}
          renderPagination={(index, total, context) => {
            return (
              <View
                styleName="vertical"
                style={{
                  backgroundColor: "white",
                  shadowOpacity: 0.4,
                  shadowRadius: 4,
                  paddingTop: 7
                }}
              >
                <View
                  styleName="vertical"
                  style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#ccc",
                    paddingBottom: 8
                  }}
                >
                  <View
                    style={{
                      backgroundColor: colors.green,
                      alignSelf: "stretch",
                      height: 4,
                      bottom: -14
                    }}
                  />
                  <View styleName="horizontal v-center space-between">
                    {_.range(total).map(sIndex => {
                      const dimension = index === sIndex ? 24 : 16;
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            const newIndex = sIndex - index;
                            context.scrollBy(newIndex);
                            this.setIndex(newIndex);
                          }}
                          key={`page-${sIndex}`}
                        >
                          <View
                            style={{
                              backgroundColor: colors.green,
                              width: dimension,
                              height: dimension,
                              borderRadius: dimension,
                              marginHorizontal: 10
                            }}
                            styleName="horizontal v-center h-center"
                          >
                            <Text styleName="bright h-center v-center">
                              {sIndex === index && sIndex + 1}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                <View styleName="horizontal">
                  <Button
                    styleName="full-width"
                    onPress={() => {
                      if (context.state.index > 0) {
                        context.scrollBy(-1);
                        this.setIndex(context.state.index - 1);
                      }
                    }}
                    style={{
                      borderColor: "#ccc",
                      borderRightWidth: 0.5,
                      marginTop: 5,
                      marginBottom: 12
                    }}
                  >
                    <Icon name="chevron-left" />
                    <Text>Back</Text>
                  </Button>
                  {renderIf(
                    context.state.index + 1 !== context.state.total,
                    () => (
                      <Button
                        styleName="full-width"
                        onPress={() => {
                          context.scrollBy(1);
                          this.setIndex(context.state.index + 1);
                        }}
                        style={{
                          marginTop: 5,
                          marginBottom: 12
                        }}
                      >
                        <Text>Next</Text>
                        <Icon name="chevron-right" />
                      </Button>
                    ),
                    () => (
                      <Button
                        styleName="full-width"
                        onPress={async () => {
                          const finished = await new Promise(resolve => {
                            Alert.alert(
                              "Finalize?",
                              "You can always come back and edit this later",
                              [
                                {
                                  text: "Proceed",
                                  type: "default",
                                  onPress: () => resolve(true)
                                },
                                {
                                  text: "Cancel",
                                  type: "cancel",
                                  onPress: () => resolve(false)
                                }
                              ]
                            );
                          });
                          if (finished) {
                            this.props.navigation.navigate("IncidentComplete");
                            {
                              /*context.scrollBy(1);
                            this.setIndex(0);*/
                            }
                          }
                        }}
                        style={{
                          marginTop: 5,
                          marginBottom: 12
                        }}
                      >
                        <Text>Done</Text>
                        <Icon name="check" />
                      </Button>
                    )
                  )}
                </View>
              </View>
            );
          }}
          showsPagination
        >
          {formParts.map(step => (
            <Form
              key={`step-${step._id}`}
              step={step}
              doc={this.props.incident}
              updateDoc={params => this.updateIncident(params)}
            />
          ))}
          {/*<View styleName="fill-parent" key="finished">
            <Icon name="thumb-up"/>
            <Heading>All Done!</Heading>
            <Subtitle>Great job, we knew you could do it!</Subtitle>
          </View>*/}
        </Swiper>
      </View>
    );
  }
}

export default hoistNonReactStatic(
  connect(({ appState }) => {
    return { incidentId: appState.incidentId };
  })(
    createContainer(props => {
      // const { incidentId } = props.navigation.state.params;
      const { incidentId } = props;
      const incidents = Meteor.collection("incidents");
      incidents.simpleSchema = Incidents.simpleSchema;
      const incidentSubscription = Meteor.subscribe(
        "SingleIncident",
        incidentId
      );
      return {
        incidentId,
        incidents,
        incident: Meteor.collection("incidents").findOne({}),
        incidentReady: incidentSubscription.ready()
      };
    }, connectStyle("ca.view.Incident", {})(Incident))
  ),
  Incident
);
