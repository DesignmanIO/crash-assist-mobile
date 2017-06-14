import React, { PropTypes } from "react";
import { View, Heading, Subtitle } from "@shoutem/ui";
import HTMLView from "react-native-htmlview";

import SafetyFirst from "./1SafetyFirst";
import DosDonts from "./2DosDonts";
import WitnessInfo from "./3WitnessInfo";
import DriverInfo from "./4DriverInfo";

const Step = props => {
  const { slide, children } = props;
  return (
    <View
      key={slide._id}
      style={{
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 30,
        paddingBottom: 100,
      }}
    >
      <Heading styleName="h-center" style={{marginBottom: 10}}>{slide.title}</Heading>
      <HTMLView value={slide.subtitle} />
      {children}
    </View>
  );
};

Step.propTypes = {
  slide: PropTypes.object,
  children: PropTypes.any
};

Step.SafetyFirst = SafetyFirst;
Step.DosDonts = DosDonts;
Step.WitnessInfo = WitnessInfo;
Step.DriverInfo = DriverInfo;

export default Step;
