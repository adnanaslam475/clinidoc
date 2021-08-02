export const filterFields = [
    {
        label: "From",
        required: true,
        id: "from_date",
        type: "date",
        placeholder: 'To',
        name: "from_date",
    },
    {
        label: "To",
        required: true,
        id: "from_to",
        placeholder: 'To',
        type: "date",
        name: "from_to",
    },
    {
        label: "Patient Name",
        required: true,
        id: "patient_name",
        placeholder: 'Patient Name',
        type: "text",
        name: "patient_name",
    },
    {
        label: "Patient Id",
        required: true,
        id: "patient_id",
        placeholder: 'Patient Id',
        type: "number",
        name: "patient_id",
    },
    {
        label: "Doctor Name",
        required: true,
        id: "doctor_name",
        placeholder: 'Doctor Name',
        type: "text",
        name: "doctor_name",
    },
    {
        label: "Patient Email",
        required: true,
        id: "patient_email",
        placeholder: 'Patient Email',
        type: "email",
        name: "patient_email",
    },
];
export const eventArr = [
    {
        display: 'background', borderColor: 'black',
        title: 'event 1', date: '2021-04-01',
        extendedProps: {
            name: 'john Mark',
            date: '22 March 2021 9 AM to 10AM',
            body: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print',
            doctor: 'DR. philips singh',
            phone: '451-245-164'
        }
    },
    {
        display: 'background',
        title: 'event 2', date: '2021-04-07', textColor: 'black',
        extendedProps: {
            name: 'john Mark',
            date: '22 March 2021 9 AM to 10AM',
            body: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print',
            doctor: 'DR. philips singh',
            phone: '451-245-164'
        }
    },
    {
        display: 'background',
        title: 'event 3', date: '2021-04-10',
        textColor: 'black',
        extendedProps: {
            name: 'john Mark',
            date: '22 March 2021 9 AM to 10AM',
            body: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print',
            doctor: 'DR. philips singh',
            phone: '451-245-164'
        }
    },
]
export const Fields1 = [
    {
        label: "Patient Name",
        required: true,
        id: "patient_name",
        type: "text",
        name: "patient_name",
    },
    {
        label: "Date",
        required: true,
        id: "Date",
        type: "datePicker",
        name: "patient_name",
    },
    {
        label: "Start time",
        required: true,
        id: "start_time",
        type: "timePicker",
        name: "Start time",
    },
    {
        label: "End time",
        required: true,
        id: "end_time",
        type: "timePicker",
        name: "End time",
    },
    {
        label: "Time length",
        required: true,
        id: "time_length",
        type: "text",
        name: "Time Length",
    },
    {
        label: "Event Notes",
        required: true,
        id: "event_notes",
        type: "textarea",
        multiline: true,
        rowsMin: 4,
        maxLength: 100,
        cols: 32,
        rowsMax: 5,
        name: "event Notes",
    },
];