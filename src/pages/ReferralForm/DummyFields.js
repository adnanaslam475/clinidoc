export const top100Films = [
    { time: '09:00 AM', }, { time: '09:15 AM' },
    { time: '09:30 AM', },]

export const times = [
    { time: '09:00 AM', }, { time: '09:15 AM' },
    { time: '09:30 AM', },
];
// providersss
export const ProviderInformationFields = [
    {
        label: "Referral Source",
        required: false,
        id: "referral_source",
        type: "radio",
        name: "referral_source",
        collapse: "panel1",
        options:[
            "Inpatient",
            "Out Patient",
            "Emergency Room",
            "Urgent Care",
            "Other",
        ]
    },

    {
        label: "Referral Person",
        required: false,
        id: "referral_person",
        type: "radio",
        name: "referring_person",
        collapse: "panel1",
        options:[
            "Primary Care Provider",
            "Therapist",
            "Medical Specialist",
            "Counselor",
            "Social Worker",
            "Case Manager",
            "Other",
        ]
        
    },
    {
        label: "Referring Person Name",
        required: false,
        id: "referral_person_name",
        type: "text",
        name: "referring_person_name",
        collapse: "panel1",
    },
    {
        label: "Name of Practice / Institution",
        required: true,
        id: "name_of_practice",
        type: "text",
        name: "name_of_practice",
        collapse: "panel1",
    },
    {
        label: "Address of Practice / Institution",
        required: false,
        id: "address_of_practice",
        type: "text",
        name: "address_of_practice",
        collapse: "panel1",
    },
    {
        label: "Phone No. of Practice / Institution",
        required: true,
        id: "phone_no_practice",
        type: "tel",
        name: "phone_no_practice",
        collapse: "panel1",
        last: true,
    },
    {
        name: "Continue",
        type: "button",
        collapse: "panel1",
    },
];
//provider
export const PatientInformationFields = [
    {
        label: "Patient Name",
        required: true,
        id: "patient_name",
        type: "text",
        name: "patient_name",
        collapse: "panel2",
    },
    {
        label: "Patient Phone",
        required: true,
        id: "patient_phone",
        type: "tel",
        name: "patient_phone",
        collapse: "panel2",
    },
    {
        label: "Patient Email",
        required: false,
        id: "patient_email",
        type: "text",
        name: "patient_email",
        collapse: "panel2",
    },
    {
        label: "Patient DOB",
        required: true,
        id: "patient_dob",
        type: "date",
        name: "patient_dob",
        collapse: "panel2",
        last: true,

    },
    {
        name: "Continue",
        type: "button",
        collapse: "panel2",
    },
];
//provider
export const ReferralInformationFields = [
    {
        label: "Reason For Referral",
        required: false,
        id: "reason_for_referral",
        type: "select",
        name: "reason_for_referral_id",
        collapse: "panel3",
    },
    {
        label: "Cheif Complain",
        required: false,
        id: "cheif_complain",
        type: "select",
        name: "program_id",
        collapse: "panel3",
    },
    // {
    //     label: "Email Of Contact Person",
    //     required: false,
    //     id: "email_of_contact",
    //     type: "text",
    //     name: "email_of_contact_person",
    //     collapse: "panel3",
    // },
    // {
    //     label: "Phone Number Of Contact Person",
    //     required: false,
    //     id: "phone_of_contact",
    //     type: "text",
    //     name: "phone_of_contact_person",
    //     collapse: "panel3",

    // },
    {
        name: "Submit",
        type: "button",
        collapse: "panel3",
        last: true,
    },
];
// self
export const PatientInformationTwoField = [
    {
        label: "Your Name",
        required: false,
        id: "your_name",
        type: "text",
        name: "patient_name",
        collapse: "panel2",
    },
    {
        label: "Phone#",
        required: false,
        id: "phone",
        type: "text",
        name: "patient_phone",
        collapse: "panel2",
    },
    {
        label: "Email  ",
        required: false,
        id: "email",
        type: "text",
        name: "patient_email",
        collapse: "panel2",
    },
    {
        label: "DOB",
        required: false,
        id: "dob",
        type: "date",
        collapse: "panel2",
        name: "patient_dob",
    },
    {
        name: "Continue",
        type: "button",
        collapse: "panel2",
    },
];
//self
export const referralInformationTwoField = [
    {
        label: "Reason For Referral",
        required: false,
        id: "reason_for_referral",
        collapse: "panel3",
        type: "select",
        name: "reason_for_referral_id",
    },
    {
        label: "Cheif Complain",
        required: false,
        id: "cheif_complain",
        type: "select",
        name: "program_id",
        collapse: "panel3",
    },  
    // {
    //     label: "Available Programs/ Providers",
    //     required: false,
    //     collapse: "panel3",
    //     id: "available_programs_providers",
    //     type: "select",
    //     name: "program_id",
    // },
    // {
    //     label: "Email Of Contact Person",
    //     required: false,
    //     id: "email_of_contact_person",
    //     type: "text",
    //     collapse: "panel3",
    //     name: "email_of_contact_person",
    // },
    // {
    //     label: "Best Time to Contact",
    //     required: false,
    //     collapse: "panel3",
    //     id: "best_time_to_contact",
    //     type: "select",
    //     name: "best_time_to_contact",
    // },
    {
        name: "Submit",
        type: "button",
        collapse: "panel3",
        last: true,
    },
];
// other
export const ProvInformationFields = [
    {
        label: "Referral Source",
        required: false,
        id: "referral_source",
        type: "radio",
        name: "referral_source",
        collapse: "panel1",
        options:[
            "Inpatient",
            "Out Patient",
            "Emergency Room",
            "Urgent Care",
            "Other",
        ]
    },

    {
        label: "Referral Person",
        required: false,
        id: "referral_person",
        type: "radio",
        name: "referring_person",
        collapse: "panel1",
        options:[
            "Parent",
            "Spouse",
            "Sibling",
            "Child",
            "Guardian",
            "Friend",
            "Other",
        ]
        
    },

    {
        label: "Referring Person Name",
        required: false,
        id: "referral_person_name",
        type: "text",
        name: "referring_person_name",
        collapse: "panel1",
    },
   
    {
        name: "Continue",
        type: "button",
        collapse: "panel1",
        last: true,
    },
];
//secondfield for other ---> 
export const OtherInfoSecondFields = [

    {
        label: "Patient Name",
        required: true,
        id: "patient_name",
        type: "text",
        name: "patient_name",
        collapse: "panel2",
    },
    {
        label: "Patient Phone",
        required: true,
        id: "patient_phone",
        type: "tel",
        name: "patient_phone",
        collapse: "panel2",
    },
    {
        label: "Patient Email",
        required: false,
        id: "patient_email",
        type: "text",
        name: "patient_email",
        collapse: "panel2",
    },
    {
        label: "Patient DOB",
        required: true,
        id: "patient_dob",
        type: "date",
        name: "patient_dob",
        collapse: "panel2",
    },
    {
        label: "Best Time to Contact",
        required: false,
        collapse: "panel3",
        id: "best_time_to_contact",
        type: "select",
        name: "best_time_for_contact",

    },
    {
        label: "Phone Number Of Contact Person",
        required: false,
        id: "phone_no_of_contact",
        type: "text",
        collapse: "panel3",
        name: "phone_of_contact_person",
    },
    {
        label: "Email Of Contact Person",
        required: false,
        id: "email_of_contact_person",
        type: "text",
        collapse: "panel3",
        name: "email_of_contact_person",
        last: true,

    },
    
   
    {
        name: "Submit",
        type: "button",
        collapse: "panel3",
    },
];

//other referral information
export const ReferralInfoThreeFields = [
    {
        label: "Reason For Referral",
        required: false,
        id: "reason_for_referral",
        collapse: "panel3",
        type: "select",
        name: "reason_for_referral_id",
    },
    {
        label: "Cheif Complain",
        required: false,
        id: "cheif_complain",
        type: "select",
        name: "program_id",
        collapse: "panel3",
    },  
    
    
   
    {
        name: "Submit",
        type: "button",
        collapse: "panel3",
    },
];
