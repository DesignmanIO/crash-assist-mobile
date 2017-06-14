import React, { Component, PropTypes } from "react";
import {
  KeyboardAvoidingView,
  Animated,
  Dimensions,
  Keyboard
} from "react-native";
import { ScrollView, View, Heading, Subtitle, Spinner } from "@shoutem/ui";
import { Form as SRForm, Field } from "simple-react-form";
import _ from "lodash";
import { flatten } from "flat";
import HTMLView from "react-native-htmlview";

import {
  NumberInput,
  CheckBox,
  ArrayInput,
  DateInput,
  EmailInput,
  PhotoInput,
  TelInput,
  TextareaInput,
  TextInput
} from "../";
import renderIf from "../../../lib/renderIf";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.formHeight = new Animated.Value(0);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = _.throttle(this.handleSubmit, 1000, {
      leading: false,
      trailing: true
    });
  }

  componentWillMount() {
    this.showKeyboardSub = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.hideKeyboardSub = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.showKeyboardSub.remove();
    this.hideKeyboardSub.remove();
  }

  keyboardWillShow(event) {
    Animated.parallel([
      Animated.timing(this.formHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height
      })
    ]).start();
  }

  keyboardWillHide(event) {
    Animated.parallel([
      Animated.timing(this.formHeight, {
        duration: event.duration,
        toValue: 0
      })
    ]).start();
  }

  handleSubmit(changes) {
    // console.log("4: submitting", changes);
    const { collection, doc } = this.props;
    const mongoReadyChanges = flatten({ ...changes });
    // console.log(doc, mongoReadyChanges);
    this.formRef.submit();
    // collection.update(doc._id, { $set: mongoReadyChanges }, (err, res) => {
    //   console.log("updated", err, res);
    // });
  }

  render() {
    const { collection, doc, formId, updateIncident, step } = this.props;
    const { fields, title, subtitle, _id } = step;
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 30,
          paddingBottom: 100
        }}
      >
        <Heading styleName="h-center" style={{ marginBottom: 10 }}>
          {title}
        </Heading>
        <HTMLView value={subtitle} />
        <ScrollView styleName="fill-parent" style={{ marginTop: 20 }}>
          {renderIf(
            true,
            () => (
              <SRForm
                autoSave
                useFormTag={false}
                keepArrays={false}
                ref={form => this.formRef = form}
                formId={formId}
                state={this.state}
                onChange={changes => {
                  //console.log("3: passing to submit", changes);
                  updateIncident(changes);
                  //this.handleSubmit(changes);
                  // this.setState(changes);
                }}
                onSuccess={docId => {
                  //console.log(`succeeded saving ${docId}`);
                }}
                onSubmit={docId => {
                  //console.log(`submitted ${docId}`);
                }}
              >
                <View styleName="vertical">
                  {fields.map((field, index) => {
                    let arrayText = field.arrayText ? field.arrayText : "Item";
                    if (field.type === "divider") {
                      return (
                        <Heading style={{ fontSize: 17 }} key={index}>
                          {field.label}
                        </Heading>
                      );
                    }
                    const getFieldType = type => {
                      switch (type) {
                        case "checkbox": {
                          return CheckBox;
                        }
                        case "array": {
                          return ArrayInput;
                        }
                        case "photo": {
                          return PhotoInput;
                        }
                        case "textarea": {
                          return TextareaInput;
                        }
                        case "phone": {
                          return TelInput;
                        }
                        case "email": {
                          return EmailInput;
                        }
                        default: {
                          return TextInput;
                        }
                      }
                    };
                    if (field.type === "array") {
                      //console.log("array field", field.name, field.fields);
                      return (
                        <Field
                          form={this.formRef}
                          type={ArrayInput}
                          fieldName={field.name}
                          key={`field-${field.name}`}
                          label={field.label}
                          placeHolder={field.label}
                          arrayText={arrayText}
                        >
                          <View>
                            {field.fields.map(subField => {
                              //console.log(subField);
                              return (
                                <Field
                                  form={this.formRef}
                                  type={getFieldType(subField.type)}
                                  fieldName={subField.name}
                                  key={`field-${subField.name}`}
                                  label={subField.label}
                                  placeHolder={subField.label}
                                  arrayText={arrayText}
                                />
                              );
                            })}
                          </View>
                        </Field>
                      );
                    }
                    return (
                      <Field
                        form={this.formRef}
                        type={getFieldType(field.type)}
                        fieldName={field.name}
                        key={`field-${field.name}`}
                        label={field.label}
                        placeHolder={field.label}
                        arrayText={arrayText}
                      />
                    );
                  })}
                </View>
              </SRForm>
            ),
            () => <Spinner />
          )}
          <Animated.View
            transition={["height"]}
            style={{ height: this.formHeight }}
          />
        </ScrollView>
      </View>
    );
  }
}
export default Form;
