import React from 'react';
import {FieldType} from 'simple-react-form';
import TextInput from './TextInput.jsx';

// textarea
// email
export default class EmailInput extends TextInput {
    constructor(props) {
        super(props);
        this.type = 'email';
    }
}
