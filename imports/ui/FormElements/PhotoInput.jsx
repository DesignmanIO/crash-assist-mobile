import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Cloudinary} from 'meteor/lepozepo:cloudinary';
import { createContainer } from 'meteor/react-meteor-data';

if (Meteor.isClient) {
    Ons = require('react-onsenui');
    Icon = Ons.Icon;
    Modal = Ons.Modal;
    require('./PhotoInput.scss');
}


class PhotoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogShown: false,
            enlargeImageModal: false,
            activeImageId: '',
            uploadingImages: {}
        };
    }

    componentDidMount() {
        // console.log(packageOpts.name);
    }

    getPicture = (source)=> {
        if (Meteor.isCordova) {
            let actionSheetOptions = {
                androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT, // material
                title: 'Upload an Image',
                subtitle: 'Where would you like to upload from?', // supported on iOS only
                buttonLabels: ['Take a Picture', 'Choose from Library'],
                addCancelButtonWithLabel: 'Cancel',
                androidEnableCancelButton: true,
                winphoneEnableCancelButton: true,
                destructiveButtonLast: true // you can choose where the destructive button is shown
            };
            window.plugins.actionsheet.show(actionSheetOptions, (index)=> {
                source = index === 1 ? 1 : 0;
                console.log(source);
                navigator.camera.getPicture((res)=> {
                    console.log('got picture');
                    window.resolveLocalFileSystemURL(res,
                        (FileEntry) => {
                            FileEntry.file((file)=> {
                                console.log('resolved file url');
                                const context = this;
                                Cloudinary.upload(file, {
                                    eager: [
                                        {width: 55, height: 55, crop: "fill"}
                                    ]
                                }, function (err, res) {
                                    let value = (context.props.value || []);
                                    console.log(`got fileid with value ${res.public_id}`);
                                    value.push(res.public_id);
                                    context.props.onChange(value);
                                    context.props.submitForm(true);
                                });
                            }, (err) => {
                                console.log("error getting file", err);
                            });
                        },
                        (err)=> {
                            console.log("error resolving url", err);
                        }
                    );
                }, (err)=> {
                    console.log(err);
                }, {
                    sourceType: source
                });
            });
        }
    };

    removePhoto = (index)=> {
        let doDelete = confirm("Are you sure you want to delete this photo?");
        if (doDelete) {
            //delete picture
            console.log(`picture ${index} deleted`);
            // const newValue = _.without(this.props.value, publicId);
            this.props.value.splice(index, 1);
            this.props.onChange(this.props.value);
        }
        return false;
    };

    enlargeImage = (index)=> {
        this.props.showModal(this.props.value, index);
    };

    renderImage = ()=> {
        let image = Cloudinary._helpers.url(this.state.activeImageId, {
            hash: {}
        });
        return (
            <img src={image}/>
        )
    };

    renderPhotos = ()=> {
        if (!this.props.value) return;
        return (this.props.value).map((publicId, index) => {
            let bgImage = Cloudinary._helpers.url(publicId, {
                hash: {
                    width: 55, height: 55, crop: 'fill'
                }
            });
            return (
                <div className="photo" key={index}>
                    {/*todo: change the url to include publicId, but not just be publicId*/}
                    <div
                        className="image"
                        style={{backgroundImage: `url('${bgImage}')`}}
                        onClick={()=> {
                            this.enlargeImage(index)
                        }}
                    >
                    </div>
                    <Button modifier="large" className="delete-photo" onClick={()=> {
                        this.removePhoto(index)
                    }}>
                        <Icon icon="md-delete"/>
                    </Button>
                </div>
            )
        });
    };

    renderUploads = ()=> {
        return this.props.uploadingImages.map((image)=>{
            console.log(image);
            return (
                <div className="photo">
                    <div
                        className="image"
                        style={{backgroundImage: `url('${image.preview}')`}}>
                    </div>
                    <div className="progress" style={{width:`${image.percent_uploaded}%`}}></div>
                </div>
            )
        })
    };

    hideDialog = ()=> {
        // this.setState({dialogShown: false});
    };

    render() {
        return (
            <div className="photo-input">
                <label htmlFor="">{this.props.label}</label>
                <div className="photos">
                    {this.renderPhotos()}
                    {this.renderUploads()}
                    <a className="photo-button" onClick={()=> {
                        {/*this.setState({dialogShown: true})*/
                        }
                        this.getPicture();
                    }}>
                        <Icon icon="md-camera"/>
                    </a>
                    <div className="spacer"></div>
                </div>
                
            </div>
        )
    }
}

export default PhotoInputContainer = createContainer((props)=>{
    return {
        uploadingImages:Cloudinary.collection.find({status:{$ne:"complete"}}).fetch(),
        ...props,
        ...props.passProps
    }
}, PhotoInput);