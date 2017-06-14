import React, { PropTypes } from "react";

import Step from "../Step";
import { Form } from "../../FormControls";

const WitnessInfo = props => {
  const { step, doc, collection, Slide } = props;
  return (
    <Step
      slide={{
        _id: "sf1",
        title: "Gather Witness Info",
        subtitle: "If any witnesses saw the collision, collect their info below:"
      }}
    >
      <Form
        doc={doc}
        formId="witness-info"
        collection={collection}
        fields={[
          {
            name: "witnessInfo",
            type: "array",
            label: "Witness Information",
            arrayText: "Witness",
            fields: [
              {
                name: "infoPhoto",
                type: "photo",
                label: "Witness Information",
                arrayText: "Witness"
              },
              {
                name: "name",
                type: "text",
                label: "Name",
                arrayText: "Witness"
              },
              {
                name: "phone",
                type: "phone",
                label: "Phone Number",
                arrayText: "Witness"
              },
              {
                name: "email",
                type: "email",
                label: "Email address",
                arrayText: "Witness"
              },
              {
                name: "testimony",
                type: "textarea",
                label: "Testimony or statement",
                arrayText: "Witness"
              }
            ]
          }
        ]}
      />
    </Step>
  );
};

export default WitnessInfo;
