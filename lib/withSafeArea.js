import React from 'react';
import { SafeAreaContext } from 'react-native-safe-area-context';

const withSafeArea = WrappedComponent => props =>
  (
    <SafeAreaContext>
      {insets => <WrappedComponent insets={insets} {...props} />}
    </SafeAreaContext>
  );

export default withSafeArea;
