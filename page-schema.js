const pageSchema = [
    {
        "_id": "1",
        "title": "Safety First",
        "subtitle": "Stay safe and follow along with the steps above.",
        "order": 1,
        "accordions": [
            {
                "title": "Stop, stay close",
                "text": "<p>Stop as close as you can to the crash site and turn off your car. If you are able, you want to make sure that everyone is safe. Check everyone in your car and anyone else involved in the collision.</p>",
                "fields": [
                    {
                        "name": "testField",
                        "type": "array",
                        "label": "Test Field",
                        "arrayText": "test"
                    },
                ],
            },
            {
                "title": "Are the vehicles in a safe place?",
                "text": "<p>Make sure that your vehicle and the other driver's are in a safe place out of heavy traffic, such as the shoulder, or the median if necessary.</p>"
            },
            {
                "title": "Any immediate attention needed? Tell people not to move",
                "text": "<p>Does anyone need immediate medical attention? Unless there is an urgent danger, do not move any injured people.</p>"
            },
            {
                "title": "Call 911 to report the incident",
                "text": "<p>As soon as you have completed your survey, call 911 and report the collision, location and injuries as best you can.</p>"
            },
            {
                "title": "Wait for the police to arrive",
                "text": "<p>Wait for the police to arrive. Do not leave, and insist that the other driver(s) remain at the scene.</p>"
            },
            {
                "title": "Don't admit fault",
                "text": "<p>Do not admit fault even if you think you’re wrong. The other person may be at fault according to the law. (When I was in college, my car died in the middle of a busy road and I was slammed into by another car. I felt it was my fault because my car died. However, it was the other persons fault because they  were traveling too fast to stop in time).</p>"
            },
            {
                "title": "Don't say you’re uninjured",
                "text": "<p>Do not tell the police officer that you are uninjured; tell him/her that you will go to your doctor to determine if there are any injuries.</p>"
            },
            {
                "title": "Don't accept payment",
                "text": "<p>Do not accept any immediate payment. Sometimes the other person who is at fault will attempt to pay you off on the spot to keep the accident off the record. Do not go there. There are still too many variables to determine. For example, there may be hidden damage to you or your car.</p>"
            }
        ]
    },
    {
        "_id": "2",
        "title": "Cooperate",
        "subtitle": "Cooperate with the police.",
        "order": 2,
        "accordions": [
            {
                "title": "Cooperate with the police",
                "text": "<p>The police are trained to handle all the details of an accident. Tell the officers how the accident happened. Fully describe the events that led up to the crash and those that followed after. The police should document what you told them in the police report. Always read it at your first opportunity. The police can also help with the next order of business.</p>"
            }
        ]
    },
    {
        "_id": "2.5",
        "title": "Witnesses",
        "subtitle": "Gather witness testimony.",
        "order": 2.5,
        "accordions": [
            {
                "title": "Witness information",
                "text": "<p>If there are any witnesses, gather their contact information and statements. Their testimony may be very helpful if there are discrepancies later on.</p>",
                "fields": [
                    {
                        "name": "witnessInfo",
                        "type": "array",
                        "label": "Witness Information",
                        "arrayText": "Witness"
                    }
                ]
            }
        ]
    },
    {
        "_id": "3",
        "title": "Get Info",
        "subtitle": "Gather information at the accident scene.",
        "order": 3,
        "accordions": [
            {
                "title": "Driver information",
                "text": "<p>Enter the other driver's information</p>",
                "form_id": "getInfo",
                "fields": [
                    {
                        "name": "driverInfo.licensePhoto",
                        "type": "photo",
                        "label": "Photo of License",
                    },
                    {
                        "name": "driverInfo.name",
                        "type": "text",
                        "label": "Name",
                    },
                    {
                        "name": "driverInfo.address",
                        "type": "textarea",
                        "label": "Address"
                    },
                    {
                        "name": "driverInfo.phone",
                        "type": "tel",
                        "label": "Phone"
                    },
                    {
                        "name": "driverInfo.email",
                        "type": "email",
                        "label": "Email"
                    },
                    {
                        "name": "driverInfo.license",
                        "type": "text",
                        "label": "License Number"
                    }
                ]
            },
            // {
            //     "title": "Passenger information",
            //     "text": "<p>Enter information for any additional passengers in the car with the other driver</p>",
            //     "fields": [
            //         {
            //             "name": "passengerInfo",
            //             "type": "array",
            //             "label": "Passenger Information",
            //             "arrayText": "Passenger"
            //         }
            //     ]
            // },
            {
                "title": "Vehicle information",
                "text": "<p>What vehicle was the other driver in?</p>",
                "fields": [
                    {
                        "name": "vehicleInfo.make",
                        "type": "text",
                        "label": "Vehicle Make",
                    },
                    {
                        "name": "vehicleInfo.model",
                        "type": "text",
                        "label": "Vehicle Model"
                    },
                    {
                        "name": "vehicleInfo.year",
                        "type": "number",
                        "label": "Vehicle Year"
                    },
                    {
                        "name": "vehicleInfo.plate",
                        "type": "text",
                        "label": "Vehicle Plate"
                    }
                ]
            },
            {
                "title": "Registered owner information",
                "text": "<p>If the other driver is not the registered owner of the vehicle, add their information below</p>",
                "fields": [
                    {
                        "name": "ownerInfo.name",
                        "type": "text",
                        "label": "Name",
                    },
                    {
                        "name": "ownerInfo.address",
                        "type": "textarea",
                        "label": "Address"
                    },
                    {
                        "name": "ownerInfo.phone",
                        "type": "tel",
                        "label": "Phone"
                    },
                    {
                        "name": "ownerInfo.email",
                        "type": "email",
                        "label": "Email"
                    },
                    {
                        "name": "ownerInfo.license",
                        "type": "text",
                        "label": "License Number"
                    }
                ]
            },
            {
                "title": "Insurance information",
                "text": "<p>Collect insurance information from the other driver, don't skip this step!</p>",
                "fields": [
                    {
                        "name": "insuranceInfo.photo",
                        "type": "photo",
                        "label": "Photo of Insurance Info",
                    },
                    {
                        "name": "insuranceInfo.company",
                        "type": "text",
                        "label": "Company Name",
                    },
                    {
                        "name": "insuranceInfo.policyNumber",
                        "type": "text",
                        "label": "Insurance Policy Number"
                    },
                    {
                        "name": "insuranceInfo.agent",
                        "type": "text",
                        "label": "Insurance Agent"
                    }
                ]
            },
            {
                "title": "Time and Location",
                "text": "<p>Fill out the time, date and location to the best of your ability</p>",
                "fields": [
                    {
                        "name": "timeLocation.date",
                        "type": "date",
                        "label": "Date"
                    },
                    {
                        "name": "timeLocation.time",
                        "type": "date",
                        "label": "time"
                    },
                    {
                        "name": "timeLocation.location",
                        "type": "textarea",
                        "label": "Location"
                    }
                ]
            },
            {
                "title": "Traffic Information",
                "text": "<p>Describe the road conditions</p>",
                "fields": [
                    {
                        "name": "trafficInfo.roadConditions",
                        "type": "textarea",
                        "label": "Road Conditions"
                    },
                    {
                        "name": "trafficInfo.trafficControls",
                        "type": "textarea",
                        "label": "Traffic Controls & Signs"
                    }
                ]
            },
            {
                "title": "Any symptoms",
                "text": "<p>List any symptoms you have begun to notice.</p>",
                "fields": [
                    {
                        "name": "symptoms",
                        "type": "text",
                        "label": "Symptoms"
                    }
                ]
            },
            {
                "title": "Driver statement",
                "text": "<p>Any statements the other driver makes, even if it is “I’m sorry” or “I didn’t see you”</p>",
                "fields": [
                    {
                        "name": "driverStatement",
                        "type": "textarea",
                        "label": "Driver Statement"
                    }
                ]
            },
            {
                "title": "Make a sketch of the collision",
                "text": "<p>Draw a picture of the accident, then take a picture of it with your phone.</p>",
                "form_id": "sketch",
                "fields": [
                    {
                        "name": "sketch",
                        "type": "photo",
                        "label": "Sketch of accident"
                    }
                ]
            },
            {
                "title": "Take pictures",
                "text": "<p>Take pictures of everything — the vehicles, the license plates, the licenses, damage to the cars, even skid marks if you are able.</p>",
                "fields": [
                    {
                        "name": "photos",
                        "type": "photo",
                        "label": "Pictures of the scene"
                    }
                ]
            },
            {
                "title": "Fill out an “Operator’s report.“",
                "text": "<p>As soon as is practical you should fill out an Operator’s Report. This can be downloaded at: <a href='http://www.massrmv.com/rmv/forms/21278.pdf'>massrmv.com/rmv/forms/21278.pdf</a> (This is for Massachusetts residents, but other states have similar options. You could always fill this one out first while researching where to get the form for your state.) The sooner you complete these steps the better, while your memory is focused on the events.</p>"
            }
        ]
    },
    {
        "_id": "4",
        "title": "Notify insurance",
        "subtitle": "Call your insurance company to report the incident.",
        "order": 4,
        "accordions": [
            {
                "title": "Notify Insurance",
                "text": "<p>Inform them of any injuries to you or your passengers. Remember that many times pain from these injuries may not happen for several hours or days after a collision. Do not volunteer much information here. Keep it simple. “I was in an accident, and my passenger and I have been hurt and we are going to the doctor.” Your insurance company may want other information, however you are not an expert in handling these situations. Leave it to a professional.</p>"
            }
        ]
    },
    {
        "_id": "5",
        "title": "Seek medical attention",
        "subtitle": "Don't minimize or discount your injuries.",
        "order": 5,
        "accordions": [
            {
                "title": "Speak to your Physician",
                "text": "<p>This is a critical aspect of your recovery from accident.</p><p>Unfortunately, most of us are trained to minimize our injuries. FIGHT THIS URGE! As soon as any complaints of pain arise, even if they are minimal, you need to document these injuries. The best way to document them is to seek medical attention and be detailed with your descriptions to your physician. Make sure they are documented in the health care record.</p>"
            }, {
                "title": "Document your Injuries",
                "text": "<p>Take photos of any bruises, abrasions, lacerations, redness, swelling, etc. Make sure to closely examine your face, neck, hands, arms, trunk, breasts, abdomen, knees or any other areas that hurt. /n Upload photos from your phone here</p>",
                "fields": [
                    {
                        "name": "injuries",
                        "type": "photo",
                        "label": "Photos of Injuries"
                    }
                ]
            }, {
                "title": "Keep an Injury Diary",
                "text": "<p>Describe how the injuries affect you at:</p>" +
                "<ul><li>Work</li><li>Household routines</li><li>Recreational activities</li><li>Child care</li><li>Personal care</li><li>Relationships with others</li><li>Driving</li><li>Sitting, standing or lying down</li><li>Getting into/out of a chair or car</li><li>Sexual relations</li><li>Sleep</li></ul>"
            }, {
                "title": "Injuries may not be obvious at first",
                "text": "<p>I cannot emphasize enough that it is not unusual for pain or problems to be delayed in appearing after an initial trauma. It can take weeks or months for symptoms to appear.</p>" +
                "<p>Minor symptoms can worsen and cause major pain and disability. Shoulder and spine problems especially are notorious for this kind of onset. Injuries can cause post-traumatic arthritis which rarely shows up for several months or later than that.</p>"
            },
        ]
    },
    {
        "_id": "6",
        "title": "Consult attorney",
        "subtitle": "Let professionals arbitrate on your behalf.",
        "order": 6,
        "accordions": [
            {
                "title": "Consult attorney",
                "text": "<p>You are a teacher, financial advisor, housewife, baseball coach, etc. You are not an expert in insurance procedures and case law. Do not even think about handling your claim on your own. Having dealt with insurance companies for 25 years, I would never entertain the thought of handling an auto injury claim on my own. There are literally dozens of mistakes you can make in dealing with all the aspects of a bodily injury and compensation claim. I repeat, do not try to handle these complex situations on your own.</p><p>Get help. The good news is that attorneys in this area work their cases on a contingent basis. This means they do not get paid unless you do.</p><p>Once you get the initial documentation completed and hand off the administration of your claim to a professional, your main mission is to get well. Make all your doctor’s appointments, do your home rehabilitation exercises and get well. Your attorney’s job is to protect  your legal rights including just compensation for pain, suffering, inconvenience, lost wages, future health care needs and for any permanent injuries.</p>"
            }
        ]
    },
    {
        "_id": "7",
        "title": "Info on whiplash",
        "subtitle": "Whiplash is a common crash injury.",
        "order": 7,
        "accordions": [
            {
                "title": "What is whiplash?",
                "text": "<p>According to the Mayo Clinic Whiplash is a neck injury due to forceful, rapid back-and-forth movement of the neck, like the cracking of a whip. Whiplash most often occurs during a rear-end auto accident, but the injury can also result from a sports accident, physical abuse or other trauma. Whiplash can result in injuries to the vertebrae, nerves, discs, muscles, joints, ligaments and tendons.</p>" +
                "<p>This force of whiplash can result in muscle strains and tears, vertebrae being shoved out of their normal position and the spinal cord being stretched and irritated. The brain may even be injured by hitting the inside of your skull.</p>" +
                "<p>Unlike broken bones or torn ligaments, a standard x-ray cannot detect whiplash, so it is much harder to diagnose and easier to go untreated. Stress and or motion x- rays are the best ways to document these soft tissue injuries, so it is essential that if you’ve been in an accident you seek treatment with someone who can provide these diagnostic tests.</p>"
            },
            {
                "title": "Symptoms of whiplash",
                "text": "<p>The most common whiplash symptoms are:</p>" +
                "<ul><li>Neck pain and/or stiffness</li><li>Blurred vision</li><li>Difficulty swallowing</li><li>Irritability</li><li>Fatigue</li><li>Dizziness</li><li>Pain between the shoulder blades</li><li>Pain in the arms or legs, feet and hands</li><li>Headache</li><li>Low back pain and/or stiffness</li><li>Shoulder pain</li><li>Nausea</li><li>Ringing in the ears</li><li>Vertigo</li><li>Numbness and tingling</li><li>Pain in the jaw or face</li></ul>"
            }, {
                "title": "Chronic injury resulting from whiplash",
                "text": "<p>Untreated, whiplash trauma can lead to chronic injuries such as:</p>" +
                "<ul><li>Neck pain</li><li>Headaches</li><li>Jaw problems</li><li>Brain injury</li><li>Low back problems</li><li>Shoulder problems</li><li>Disc injuries</li></ul>"
            }, {
                "title": "Healing from Whiplash",
                "text": "<p>After you have been examined by a health professional and found to have a soft tissue injury these are my recommended steps to healing better and faster.</p>" +
                "<ul><li>Ice: first 48 hours of any injury use straight ice. Try to gently move the injured area while applying the ice.</li> <li>Minimize the use of NSAIDS. The research is clear that these interfere with the quality of the healing response. On a practical note, I tell my patients if it were me and I needed help sleeping, that is when I would use them.</li> <li>Remain active despite of ongoing pain.</li> <li>Performance of exercises</li> <li>See a chiropractor to correct and assist in the healing of your spine and nervous system</li></ul>"
            }
        ]
    }
];

export default pageSchema;
