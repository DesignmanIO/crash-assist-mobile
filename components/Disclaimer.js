import React from "react";
import { View, Subtitle, Text, ScrollView } from "@shoutem/ui";

const Disclaimer = () => {
  return (
    <ScrollView
      styleName="vertical h-center"
      style={{ padding: 20 }}
    >
      <Subtitle style={{ marginBottom: 20 }}>
        LIMITS OF LIABILITY / DISCLAIMER OF WARRANTY:{" "}
      </Subtitle>
      <Text style={{ marginBottom: 20 }}>
        The content of this app is provided for information purposes only. The content is intended to provide you with information only and not replace the advice and counsel of a doctor of chiropractic nor constitute a doctor-patient relationship. NEVER DISREGARD MEDICAL ADVICE, OR DELAY SEEKING TREATMENT, BECAUSE OF INFORMATION THAT YOU HAVE READ IN THIS APP. The information presented is not to be considered complete, nor does it contain all medical resource information that may be relevant, and therefore is not intended as a substitute for seeking appropriate care.
      </Text>
      <Text style={{ marginBottom: 20 }}>
        Any views or opinions presented in this app are solely those of the author and do not represent those of the publisher. All content, including text, graphics, images and information available in this app are for educational purposes only and are not sufficient for medical decisions. The content is not intended to be a substitute for professional medical advice, diagnosis or
        treatment.
      </Text>
      <Text style={{ marginBottom: 20 }}>
        By using this app you agree to hold harmless and shall not seek remedy from Christopher J. Quigley, D.C., C.C.S.T The author disclaims all liability to you for damages, costs and expenses, including legal fees because of your reliance on anything derived from this app, and furthermore assume no liability for any and all claims arising out of the said use... regardless of the cause, effect or fault.
      </Text>
    </ScrollView>
  );
};

export default Disclaimer;
