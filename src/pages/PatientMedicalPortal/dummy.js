import CheckMark from '../../assets/icon-new/checkmark@2x.png';


// import PersonImg from '../../assets/By-email-initial-contact-form1.png';
// import Check from '../../assets/icon-new/Group787@2x.png';

export const Lines = [{ img: CheckMark, text: 'We offer confortable and convenient 24/7 healthcare' },
{ img: CheckMark, text: 'We save Time - no waiting room ,no travel needed' },
{ img: CheckMark, text: 'We offer a wide variety of doctors to choose from' },
{ img: CheckMark, text: ' CliniDoc is chaeper than your average ER visit. Its even cheaper with our prepaid packages' },
{ img: CheckMark, text: 'CliniDoc comes with consultations, EMR, appoinment booking, homecare and prescriptions' }]

export const Twotabs = [{ text: 'Personal Information' },
{ text: 'Insurance details' }]

export const FirstInputFields = [{
    label: "Patient Name",
    required: true,
    id: "patient_name",
    type: "text",
    name: "patient_name",
}, {
    label: "Gender",
    required: false,
    id: "gender",
    type: "select",
    name: "gender",
}, {
    label: "Date Of Birth",
    required: true,
    id: "dob",
    type: "date",
    name: "dob",
}, {
    label: "Legal Guardian (if applicable age < 18)",
    required: true,
    id: "legal_guardian",
    type: "text",
    name: "legal_guardian",
}, {
    label: "Emergency Contact Name",
    required: false,
    id: "emergency_contact",
    type: "text",
    name: "emergency_contact",
},]


export const SecondInputFields = [{
    label: "Address",
    required: true,
    id: "address",
    type: "text",
    name: "address",
}, {
    label: "Email",
    required: false,
    id: "email",
    type: "email",
    name: "email",
}, {
    label: "SSN",
    required: true,
    id: "ssn",
    type: "text",
    name: "ssn",
}, {
    label: "Phone",
    required: false,
    id: "phone",
    type: "number",
    name: "phone",
}]

export const ThirdInputFields = [{
    label: "Phone",
    required: true,
    id: "phone_two",
    type: "number",
    name: "phone_two",
}, {
    label: "Race",
    required: false,
    id: "race",
    type: "text",
    name: "race",
}, {
    label: "Marital Status",
    required: false,
    id: "marital_status",
    type: "select",
    name: "marital_status",
}, {
    label: "Relationship",
    required: true,
    id: "relationship",
    type: "text",
    name: "relationship",
}]
export const FourthInputFields = [{
    label: "Insurance Name",
    required: true,
    id: "insurance_name",
    type: "text",
    name: "insurance_name",
}, {
    label: "Insurance Phone",
    required: false,
    id: "insurance_phone",
    type: "number",
    name: "insurance_phone",
}, {
    label: "Insured DOB (if not self)",
    required: false,
    id: "insured_dob",
    type: "date",
    name: "insured_dob",
}]

export const FifthInputFields = [{
    label: "Insurance member ID",
    required: true,
    id: "insurance_mem_id",
    type: "text",
    name: "insurance_mem_id",
}, {
    label: "Insured Person (if self, then finished)",
    required: false,
    id: "insured_person",
    type: "text",
    name: "insured_person",
}, {
    label: "Insured SSN",
    required: false,
    id: "insured_ssn",
    type: "text",
    name: "insured_ssn",
}]

export const sixInputFields = [{
    label: "Insurance group #",
    required: true,
    id: "insurance_group",
    type: "text",
    name: "insurance_group",
}, {
    label: "Relationship to insured",
    required: false,
    id: "insured_relationship",
    type: "text",
    name: "insured_relationship",
},]