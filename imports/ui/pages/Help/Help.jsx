import React, {Component} from 'react';
import {Page, Button, Toolbar, BackButton} from 'react-onsenui';
import {Form, Field} from 'simple-react-form';
import TextInput  from '../../FormElements/TextInput.jsx';
import TextareaInput from '../../FormElements/TextareaInput.jsx'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import Landing from '../Landing/Landing.jsx';
import {notify} from 'react-notify-toast';

// import './Login.scss';

let contactSchema = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Enter your email",
        srf: {type: TextInput, fieldType: "email"}
    },
    subject: {
        type: String,
        min: 6,
        label: "Subject",
        srf: {type: TextInput, fieldType: "text"}
    },
    text: {
        type: String,
        label: "Message",
        srf: {type: TextareaInput}
    }
});

let navigator;
let isLogin;
let setState;

export default class Help extends Component {
    constructor(props) {
        super(props);
        navigator = props.appContext.navigator;
        this.state = {};
    }

    renderToolbar = () => {
        return (
            <Toolbar>
                <div className="left">
                    <BackButton>
                        Home
                    </BackButton>
                </div>
                <div className="center">Send a Message to Helpdesk</div>
            </Toolbar>
        );
    };

    handleSubmit = () => {
        this.setState({});
        this.refs.form.submit();
    };

    onSubmit(formData) {
        const {email, subject, text} = formData;
        Meteor.call('sendEmail', 'julian.kingman@gmail.com', email, `CrashAssistApp: ${subject}`, text, function (err, res) {
            if (!err) {
                notify.show('Message Sent', 'success');
            }
        });
    }

    render() {
        return (
            <Page id="login-page"
                  renderToolbar={this.renderToolbar}>
                <div id="login-form">
                    <div>
                        <p>Having a problem? Send us a message, we'll get back to you as soon as we can.</p>
                        <Form
                            schema={contactSchema}
                            type="function"
                            ref='form'
                            validate={true}
                            onSubmit={this.onSubmit}/>
                        <p>{this.state.loginError}</p>
                    </div>
                    <Button modifier="large"
                            onClick={this.handleSubmit}><Icon icon="md-send"/> Send</Button>
                </div>
            </Page>
        );
    }
}