// import React from 'react';
// import {FieldType} from 'simple-react-form';
//
// const propTypes = {
//     changeOnKeyDown: React.PropTypes.bool,
//     fieldType: React.PropTypes.string
// };
//
// const defaultProps = {
//     changeOnKeyDown: true
// };
//
// export default class TextInput extends FieldType {
//
//     constructor(props) {
//         super(props);
//         this.type = props.type || 'text';
//         this.state = { value: props.value };
//     }
//
//     componentWillReceiveProps(nextProps) {
//         this.setState({ value: nextProps.value });
//     }
//
//     onKeyDown(event) {
//         if (event.keyCode === 13) {
//             this.props.onChange(this.state.value);
//         }
//     }
//
//     onChange(event) {
//         this.setState({ value: event.target.value });
//         if (this.props.changeOnKeyDown) {
//             this.props.onChange(event.target.value);
//         }
//     }
//
//     render() {
//         let fieldType = this.props.fieldType || this.type;
//         return (
//          <Field fieldName={this.props.fieldName} type={fieldType} />
//         )
//     }
// }
//
// TextInput.propTypes = propTypes;
// TextInput.defaultProps = defaultProps;
