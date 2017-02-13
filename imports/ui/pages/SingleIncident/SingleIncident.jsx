import React, {Component} from 'react';
import {Page, Toolbar, ToolbarButton, BackButton, List, ListItem, ListHeader, Button, Icon} from 'react-onsenui';
import {createContainer} from 'meteor/react-meteor-data';
import {Incidents} from '/imports/shared/collections/Incidents.js';
import _ from 'underscore';
import NewIncident from '/imports/ui/pages/NewIncident/NewIncident.jsx';
import ImageGallery from '/imports/ui/components/ImageGallery/ImageGallery.jsx'

import pageSchema from '/imports/shared/page-schema.js';

class SingleIncident extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openImageModal: false,
            imageIndex: 0,
            images: []
        }
    }

    renderToolbar = () => {
        return (
            <Toolbar>
                <div className="left">
                    <BackButton>
                        Back
                    </BackButton>
                </div>
                <div className="center">
                    {this.props.incident.title}
                </div>
                <div className="right">
                    <ToolbarButton onClick={this.editIncident}>
                        Edit
                    </ToolbarButton>
                </div>
            </Toolbar>
        );
    };

    editIncident = ()=> {
        this.props.appContext.navigator.pushPage({
            component: NewIncident,
            props: {currentStep: 1, key: "Steps", incidentId: this.props.incident._id}
        });
    };

    enlargeImage = (index, images)=> {
        console.log('image should be open now');
        this.setState({openImageModal: true, imageIndex: index, images: images});
    };
    
    closeModal = ()=>{
        this.setState({openImageModal: false});
    };

    renderField = (field, index)=> {
        let fieldParts = field.name.split('.');
        let baseField = this.props.incident[fieldParts[0]];
        let value;
        if (fieldParts.length > 1) {
            value = baseField ? baseField[fieldParts[1]] : baseField;
        } else {
            value = baseField;
        }
        index = field.name + index;
        if (field.type === "photo") {
            console.log(value);
            value = Array.isArray(value) ? value : [value];
            // if (photoIds && photoIds.length) {
            return (
                <ListItem key={`item-${index}`}>
                    {
                        value.map((photoId, index)=> {
                            let imageUrl = Cloudinary._helpers.url(photoId, {
                                hash: {
                                    width: 55, height: 55, crop: 'fill'
                                }
                            });
                            return <img src={imageUrl} style={{marginRight: 15}}key={`${field.name}-photo-${index}`} onClick={()=> {
                                this.enlargeImage(index, value)
                            }}/>
                        })
                    }
                </ListItem>
            );
            // }
        } else if (field.type === "array") {
            let arrayField = this.props.incident[field.name];
            if (arrayField && arrayField.length) {
                //getting the array of field value groups, i.e. fieldGroup.$
                return arrayField.map((fieldset, arrayIndex)=> {
                    //getting the fields, e.g. fieldGroup.$.field1, fieldGroup.$.field2
                    return Object.keys(fieldset).map((key, fieldIndex)=> {
                        return (
                            <ListItem key={`item-${index}-${arrayIndex}-${fieldIndex}`}>
                                <div className="left">{key}</div>
                                <div className="center">{fieldset[key]}</div>
                            </ListItem>
                        )
                    })
                });
            }
        } else {
            if (value) {
                return (
                    <ListItem key={`item-${index}`}>
                        <div className="left">{field.label}</div>
                        <div className="center">{value.toString()}</div>
                    </ListItem>
                );
            }
        }
    };

    deleteIncident = ()=> {
        if (confirm("Are you sure you want to delete this incident?")) {
            Incidents.remove(this.props.incident._id);
            this.props.appContext.navigator.popPage()
        }
    };

    render() {
        const accordions = _.flatten(_.pluck(pageSchema, 'accordions'), true);
        // console.log(accordions);
        return (
            <Page renderToolbar={this.renderToolbar}>
                {
                    accordions.map((accordion, index)=> {
                        if (accordion.fields) {
                            return <List dataSource={accordion.fields} renderRow={this.renderField}
                                         renderHeader={() => <ListHeader>{accordion.title}</ListHeader>}
                                         key={`list-${index}`}/>
                        }
                    })
                }
                <ImageGallery
                    images={this.state.images}
                    show={this.state.openImageModal}
                    index={this.state.imageIndex}
                    close={this.closeModal}
                />
                <Button modifier="large outline" onClick={this.deleteIncident}><Icon icon="md-delete"/> Delete</Button>
            </Page>
        );
    }
}

export default SingleIncidentContainer = createContainer((props)=> {
    const {_id} = props;

    const singleIncidentHandle = Meteor.subscribe("SingleIncident", _id);
    const ready = singleIncidentHandle.ready();
    const incident = Incidents.findOne(_id);

    return {
        singleIncidentHandle,
        ready,
        incident
    }
}, SingleIncident);
