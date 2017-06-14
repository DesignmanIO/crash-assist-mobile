import React, { PropTypes } from "react";

import Step from "../Step";
import { Form } from "../../FormControls";

const DosDonts = props => {
  const { step, doc, collection, Slide } = props;
  return (
    <Step
      slide={{
        _id: "sf1",
        title: "Do's and Don'ts",
        subtitle: "If nothing else, follow these 6 guidelines."
      }}
    >
      <Form
        doc={doc}
        formId="dos-donts"
        collection={collection}
        fields={[
          {
            type: 'divider',
            label: 'Don\'t',
          },
          {
            name: "dont.admitFault",
            type: "checkbox",
            label: "Don’t admit fault, even if you think it is."
          },
          {
            name: "dont.discussAccident",
            type: "checkbox",
            label: "Turn off your car and stay close to the accident site."
          },
          {
            name: "dont.diminishInjury",
            type: "checkbox",
            label: "Don’t say that you’re uninjured, it may take time for symptoms to appear."
          },
          {
            name: "dont.acceptPayment",
            type: "checkbox",
            label: "Don’t accept payment, it’s too risky."
          },
          {
            type: 'divider',
            label: 'Do',
          },
          {
            name: "do.cooperate",
            type: "checkbox",
            label: "Cooperate with the police."
          },
          {
            name: "do.collectInformation",
            type: "checkbox",
            label: "Collect information at the accident scene (that’s next)."
          },
          {
            type: 'divider',
            label: 'Do',
          },
          {
            name: "do.cooperateasd",
            type: "checkbox",
            label: "Cooperate with the police."
          },
          {
            name: "do.collectInformationasd",
            type: "checkbox",
            label: "Collect information at the accident scene (that’s next)."
          }
        ]}
      />
    </Step>
  );
};

export default DosDonts;
