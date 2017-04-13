/**
 * Created by Julian on 2/13/17.
 */
import React, { Component } from 'react';
import { View, Heading, Subtitle, ScrollView } from '@shoutem/ui';
import Swiper from 'react-native-swiper';
import HTMLView from 'react-native-htmlview';
import { Form, Field } from 'simple-react-form';
import Meteor, { createContainer } from 'react-native-meteor';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { connect } from 'react-redux';

import renderIf from '../../lib/renderIf';
import { Incidents } from '../../schema/Incidents';
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

import pageSchema from '../../page-schema';

class NewIncident extends Component {

  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    // title: ({ state }) => {
    //   console.log(state);
    //   return `Incident #${state.params.incidentId}`
    // },
    header: {
      visible: false,
    }
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  getSlides = () => {
    const slides = [];
    pageSchema.forEach((page) => {
      slides.push({ _id: page._id, primary: true, title: page.title, subtitle: page.subtitle });
      page.accordions.forEach((step, index) => {
        slides.push({
          _id: `${page._id}-${index}`,
          title: step.title,
          subtitle: step.text,
          fields: step.fields,
        });
      });
    });
    return slides;
  };

  renderForm(fields) {
    const { incidents } = this.props;
    // console.log('rendering form', incidents);
    return (
      <ScrollView styleName="fill-parent">
        <Form
          useFormTag={false}
          collection={incidents}
          type='update'
          state={this.state}
          ref='form'
          doc={this.props.incident}
          onChange={(changes) => {
            console.log(changes);
            this.setState(changes);
          }}
          onSuccess={(docId) => {
            console.log(`succeeded saving ${docId}`)
          }}
          onSubmit={(docId) => {
            console.log(`submitted ${docId}`)
          }}
        // className="IncidentUpdateForm"
        >
          <View styleName="fill-parent">
            {
              fields.map((field, index) => {
                let arrayText = field.arrayText ? field.arrayText : 'Item';
                // console.log(field);
                return (
                  <Field
                    fieldName={field.name}
                    key={index}
                    label={field.label}
                    placeHolder={field.label}
                    arrayText={arrayText}
                    showModal={this.props.showModal}
                    submitForm={this.submitForm}
                  />
                );
              })
            }
          </View>
        </Form>
      </ScrollView>
    );
  };

  setIndex(index) {
    console.log('setting index', this.props.incident._id);
    this.props.incidents.update(
      this.props.incident._id,
      { $set: { currentStep: index } },
      (err, res) => {
        console.log(err, res);
      });
  }

  render() {
    // console.log(this.props.navigation);
    console.log(this.props);
    return (
      <View>
        <Swiper
          loop={false}
          onResponderRelease={(e, state, context) => this.setIndex(state.index)}
          index={this.props.incident ? (this.props.incident.currentStep || 0) : 0}
        >
          {
            this.getSlides().map((step) => {
              return (
                <View key={step._id} style={{ flex: 1 }}>
                  <Heading styleName="h-center">{step.title}</Heading>
                  {
                    step.primary ?
                      <Subtitle styleName="h-center">{step.subtitle}</Subtitle> :
                      <HTMLView value={step.subtitle} />
                  }
                  {
                    renderIf(this.props.incident && step.fields,
                      () => {
                        return this.renderForm(step.fields);
                      },
                    )
                  }
                </View>
              )
            })
          }
        </Swiper>
      </View>
    );
  }
}

export default hoistNonReactStatic(
  connect(({ appState }) => {
    return { incidentId: appState.incidentId };
  })
    (createContainer((props) => {
      console.log(props);
      // const { incidentId } = props.navigation.state.params;
      const { incidentId } = props;
      const incidents = Meteor.collection('incidents');
      incidents.simpleSchema = Incidents.simpleSchema;
      const incidentSubscription = Meteor.subscribe('SingleIncident', incidentId);
      return {
        incidentId,
        incidents,
        incident: Meteor.collection('incidents').findOne({}),
        incidentReady: incidentSubscription.ready(),
      }
    }, NewIncident))
  , NewIncident);
