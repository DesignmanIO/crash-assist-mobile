import React, { Component } from "react";
import PropTypes from "prop-types";
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
  TextInput,
  TimeInput,
  PasswordInput
} from "../";
import renderIf from "../../../lib/renderIf";

class Form extends Component {
  static defaultProps = {
    initialKeyboardSpacerHeight: 5
  };

  constructor(props) {
    super(props);

    this.state = {
      doc: this.props.doc,
      formHeight: undefined
    };

    this.spacerHeight = new Animated.Value(
      this.props.initialKeyboardSpacerHeight
    );
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleSubmit = _.throttle(this.handleSubmit, 1000, {
    //   leading: false,
    //   trailing: true
    // });
    this.fields = {};
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
      Animated.timing(this.spacerHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height
      })
    ]).start();
  }

  keyboardWillHide(event) {
    Animated.parallel([
      Animated.timing(this.spacerHeight, {
        duration: event.duration,
        toValue: this.props.initialKeyboardSpacerHeight
      })
    ]).start();
  }

  getFieldType(type) {
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
      case "date": {
        return DateInput;
      }
      case "time": {
        return TimeInput;
      }
      case "password": {
        return PasswordInput;
      }
      default: {
        return TextInput;
      }
    }
  }

  render() {
    const { collection, doc, formId, updateDoc, step } = this.props;
    const { formHeight } = this.state;
    const { fields, title, subtitle, _id } = step;
    // console.log(formHeight);
    return (
      <View styleName="inflexible md-gutter vertical space-around">
        <Heading styleName="h-center" style={{ marginBottom: 10 }}>
          {title}
        </Heading>
        <HTMLView value={subtitle} />
        <ScrollView
          styleName="sm-gutter-top"
          style={{ marginTop: 10, maxHeight: formHeight }}
        >
          {renderIf(
            true,
            () => (
              <SRForm
                autoSave
                useFormTag={false}
                keepArrays={false}
                ref={form => this.formRef = form}
                formId={formId}
                state={this.state.doc}
                onChange={newState => {
                  const changes = _.omitBy(
                    newState,
                    (v, k) => this.state.doc[k] === v
                  );
                  delete changes.dateCreated;
                  console.log("3: passing to submit");
                  updateDoc(changes);
                  //this.handleSubmit(changes);
                  this.setState(changes);
                }}
                onSuccess={docId => {
                  //console.log(`succeeded saving ${docId}`);
                }}
                onSubmit={docId => {
                  //console.log(`submitted ${docId}`);
                }}
              >
                <View
                  styleName="vertical"
                  onLayout={({ nativeEvent: { layout } }) => {
                    this.setState({ formHeight: layout.height });
                  }}
                >
                  {fields.map((field, index) => {
                    let arrayText = field.arrayText ? field.arrayText : "Item";
                    if (field.type === "divider") {
                      return (
                        <Heading
                          style={{ fontSize: 17 }}
                          key={index}
                          styleName="mediumGutter"
                        >
                          {field.label}
                        </Heading>
                      );
                    }

                    if (field.type === "array") {
                      //console.log("array field", field.name, field.fields);
                      return (
                        <Field
                          form={this.formRef}
                          fieldRef={field => console.log(field)}
                          type={ArrayInput}
                          fieldName={field.name}
                          key={`field-${field.name}`}
                          label={field.label}
                          placeHolder={field.label}
                          arrayText={arrayText}
                        >
                          <View>
                            {field.fields.map((subField, subIndex) => {
                              return (
                                <Field
                                  form={this.formRef}
                                  fieldRef={(field, fieldName) =>
                                    this.fields[fieldName] = field}
                                  getNextField={fieldName => {
                                    const nextFieldName = _.get(
                                      field,
                                      `fields[${subIndex + 1}].name`
                                    );
                                    if (nextFieldName) {
                                      return this.fields[
                                        fieldName.replace(
                                          /([^.]+)$/,
                                          nextFieldName
                                        )
                                      ];
                                    }
                                  }}
                                  type={this.getFieldType(subField.type)}
                                  fieldName={subField.name}
                                  key={`field-${subField.name}`}
                                  label={subField.label}
                                  placeHolder={subField.label}
                                  arrayText={arrayText}
                                  returnKeyType={
                                    field.fields.length === subIndex
                                      ? "done"
                                      : "next"
                                  }
                                />
                              );
                            })}
                          </View>
                        </Field>
                      );
                    }
                    return (
                      <View key={`field-${field.name}`}>
                        <Field
                          form={this.formRef}
                          type={this.getFieldType(field.type)}
                          fieldRef={(field, fieldName) =>
                            this.fields[fieldName] = field}
                          getNextField={() => {
                            const nextFieldName = _.get(
                              fields,
                              `[${index + 1}].name`
                            );
                            console.log(fields, nextFieldName, index + 1);
                            if (nextFieldName) {
                              return this.fields[nextFieldName];
                            }
                          }}
                          fieldName={field.name}
                          label={field.label}
                          placeHolder={field.label}
                          arrayText={arrayText}
                          returnKeyType={
                            fields.length === index ? "done" : "next"
                          }
                        />
                      </View>
                    );
                  })}
                  <Animated.View
                    transition={["height"]}
                    style={{ height: this.spacerHeight }}
                  />
                </View>
              </SRForm>
            ),
            () => <Spinner />
          )}
        </ScrollView>
      </View>
    );
  }
}
export default Form;
