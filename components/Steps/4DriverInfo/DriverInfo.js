import React, { PropTypes } from "react";

import Step from "../Step";
import { Form } from "../../FormControls";

const DriverInfo = props => {
  const { step, doc, collection, Slide } = props;
  return (
    <Step
      slide={{
        _id: "sf1",
        title: "Driver Info",
        subtitle: "Collect information from the other driver."
      }}
    >
      <Form
        doc={doc}
        formId="driver-info"
        collection={collection}
        fields={[
          {
            name: "driverInfo.licensePhoto",
            type: "photo",
            label: "Photo of License",
          },
          {
            name: "driverInfo.name",
            type: "text",
            label: "Name",
          },
          {
            name: "driverInfo.address",
            type: "textarea",
            label: "Address",
          },
          {
            name: "driverInfo.phone",
            type: "phone",
            label: "Phone Number",
          },
          {
            name: "driverInfo.email",
            type: "email",
            label: "Email Address",
          },
          {
            name: "driverInfo.license",
            type: "text",
            label: "License Number",
          },
        ]}
      />
    </Step>
  );
};

export default DriverInfo;
