import React from 'react';
import {FieldType} from 'simple-react-form';
import TextInput from './TextInput.jsx';
import moment from 'moment';

// textarea
export default class DateInput extends TextInput {
    constructor(props) {
        super(props);
        this.type = 'date';
    }
    componentDidMount(){
        this.setState({value: this.props.value || moment().format('yyyy-MM-dd').toString()});
    }
}