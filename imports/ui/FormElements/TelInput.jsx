import React from 'react';
import {FieldType} from 'simple-react-form';
import TextInput from './TextInput.jsx';

// textarea
export default class TelInput extends TextInput {
    constructor(props) {
        super(props);
        this.type = 'tel';
    }
}