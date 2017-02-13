import React from 'react';
// import {FieldType} from 'simple-react-form';
import TextInput from './TextInput.jsx';

// number input
export default class NumberInput extends TextInput {
    constructor(props) {
        super(props);
        //inputmode="numeric" pattern="[0-9]*"
        this.type = 'number';
    }
}