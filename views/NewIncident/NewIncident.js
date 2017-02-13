/**
 * Created by Julian on 2/13/17.
 */
import React from 'react';
import {View, Heading, Subtitle} from '@shoutem/ui';
import Swiper from 'react-native-swiper';
import HTMLView from 'react-native-htmlview';

import pageSchema from '../../page-schema';

const getSlides = () => {
  const slides = [];
  pageSchema.forEach((page) => {
    slides.push({_id: page._id, primary: true, title: page.title, subtitle: page.subtitle});
    page.accordions.forEach((step, index) => {
      slides.push({_id: `${page._id}-${index}`, title: step.title, subtitle: step.text});
    });
  });
  return slides;
};

const NewIncident = (props) => {
  return (
    <View>
      <Swiper loop={false}>
        {
          getSlides().map((step) => {
            return (
              <View key={step._id}>
                <Heading styleName="h-center">{step.title}</Heading>
                {
                  step.primary ?
                    <Subtitle styleName="h-center">{step.subtitle}</Subtitle> :
                    <HTMLView value={step.subtitle}/>
                }
              </View>
            )
          })
        }
      </Swiper>
    </View>
  );
};

NewIncident.navigationOptions = {};

export default NewIncident;
