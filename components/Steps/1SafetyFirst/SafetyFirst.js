import React, { PropTypes } from "react";
import Step from "../Step";
import { Form } from "../../FormControls";

const SafetyFirst = props => {
  const { step, doc, collection, Slide } = props;
  return (
    <Step
      slide={{
        _id: "sf1",
        title: "Safety First",
        subtitle: "Your safety is most important, if you can’t do something safely, don’t!"
      }}
    >
      <Form
        doc={doc}
        collection={collection}
        formId="safety-first"
        fields={[
          {
            name: "safety.carOff",
            type: "checkbox",
            label: "Turn off your car and stay close to the accident site."
          },
          {
            name: "safety.safePlace",
            type: "checkbox",
            label: "Make sure the car is in a safe place."
          },
          {
            name: "safety.medicalAttention",
            type: "checkbox",
            label: "See if imediate medical attention is needed. Avoid moving injured persons."
          },
          {
            name: "safety.call911",
            type: "checkbox",
            label: "Call 911 to report the collision."
          },
          {
            name: "safety.waitForPolice",
            type: "checkbox",
            label: "Wait for the police to arrive (the other driver should wait, too)."
          },
        ]}
      />
    </Step>
  );
};

export default SafetyFirst;
