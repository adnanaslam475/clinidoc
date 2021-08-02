import moment from "moment";
import DummyImage from '../../../assets/resceptionst-profile-img.png'
import DummyImage1 from '../../../assets/profile-img.png'
import DummyImage2 from '../../../assets/pateint-profile-history.png'

function createData(name, type) {
    return { name, type };
}


export const columns = [
    { id: 'patient_name', label: 'Patient Name', minWidth: 151, align: 'center' },
    { id: 'date_time', label: 'Date & Time', minWidth: 160, align: 'center' },
    { id: 'duration', label: 'Duration', minWidth: 100, align: 'center' },
    { id: 'type', label: 'Type', minWidth: 100, align: 'center' },
    { id: 'information', label: 'Information', minWidth: 100, align: 'center' },
];



export const dummy_data = [
    {
        img: DummyImage, type: 'Receptionist', date: '15', day: 'mon',
        place: 'Las Vegas', email: 'recpetionist1@clinidoc.com', phone: '+324 4232 4343', call: '34', lorem: 'lorem ipsum dolor',
        tabledata: [
            createData('lorem  insum1', 'call'),
            createData('lorem  insum2', 'call'),
            createData('lorem  insum3', 'call'),
            createData('lorem  insum4', 'call'),
            createData('lorem  insum5', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
        ]
    },
    {
        img: DummyImage2, type: 'Receptionist', date: '16', day: 'tue',
        place: 'Las Vegas', email: 'recpetionist2@clinidoc.com', phone: '+324 4232 4343', call: '34', lorem: 'lorem ipsum dolor',
        tabledata: [
            createData('lorem  insum11', 'call'),
            createData('lorem  insum12', 'call'),
            createData('lorem  insum13', 'call'),
            createData('lorem  insum14', 'call'),
            createData('lorem  insum15', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
        ]
    },
    {
        img: DummyImage1, type: 'Receptionist', date: '17', day: 'wed',
        place: 'Las Vegas', phone: '+324 4232 4343', email: 'recpetionist3@clinidoc.com', call: '34', lorem: 'lorem ipsum dolor',
        tabledata: [
            createData('lorem  insum21', 'call'),
            createData('lorem  insum21', 'call'),
            createData('lorem  insum32', 'call'),
            createData('lorem  insum24', 'call'),
            createData('lorem  insum25', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
        ]
    },
    {
        img: DummyImage2, type: 'Receptionist', date: '18', day: 'thurs',
        place: 'Las Vegas', phone: '+324 4232 4343', email: 'eweervwf@gg.vc', call: '34', lorem: 'lorem ipsum dolor',
        tabledata: [
            createData('lorem  insum31', 'call'),
            createData('lorem  insum32', 'call'),
            createData('lorem  insum33', 'call'),
            createData('lorem  insum34', 'call'),
            createData('lorem  insum35', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
        ]
    },
    {
        img: DummyImage1, type: 'Receptionist', date: '19', day: 'tue',
        place: 'Las Vegas', phone: '+324 4232 4343', email: 'eweervwf@gg.vc', call: '34', lorem: 'lorem ipsum dolor',
        tabledata: [
            createData('lorem  insum41', 'call'),
            createData('lorem  insum42', 'call'),
            createData('lorem  insum43', 'call'),
            createData('lorem  insum44', 'call'),
            createData('lorem  insum45', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
        ]
    },
    {
        img: DummyImage1, type: 'Receptionist', date: '20', day: 'fri',
        place: 'Las Vegas', phone: '+324 4232 4343', email: 'someone@clinidoc.com', call: '34', lorem: 'lorem ipsum dolor',
        tabledata: [
            createData('lorem  insum51', 'call'),
            createData('lorem  insum52', 'call'),
            createData('lorem  insum53', 'call'),
            createData('lorem  insum54', 'call'),
            createData('lorem  insum55', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
        ]
    },
    {
        img: DummyImage1, type: 'Receptionist', date: '20', day: 'sat',
        place: 'Las Vegas', phone: '+324 4232 4343', email: 'tester@clinidoc.com', call: '34', lorem: 'lorem ipsum dolor',
        tabledata: [
            createData('lorem  insum61', 'call'),
            createData('lorem  insum62', 'call'),
            createData('lorem  insum63', 'call'),
            createData('lorem  insum64', 'call'),
            createData('lorem  insum65', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
        ]
    }, {
        img: DummyImage, type: 'Receptionist', date: '20', day: 'tue',
        place: 'Las Vegas', phone: '+324 4232 4343', email: 'recpetionist4@clinidoc.com', call: '34', lorem: 'lorem ipsum dolor',
        tabledata: [
            createData('lorem  insum71', 'call'),
            createData('lorem  insum72', 'call'),
            createData('lorem  insum73', 'call'),
            createData('lorem  insum74', 'call'),
            createData('lorem  insum75', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
        ]
    }, {
        img: DummyImage, type: 'Receptionist', date: '20', day: 'sun',
        place: 'Las Vegas', phone: '+324 4232 4343', email: 'eweervwf@gg.vc', call: '34', lorem: 'lorem ipsum dolor',
        tabledata: [
            createData('lorem  insum81', 'call'),
            createData('lorem  insum82', 'call'),
            createData('lorem  insum83', 'call'),
            createData('lorem  insum84', 'call'),
            createData('lorem  insum85', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
        ]
    }, {
        img: DummyImage2, type: 'Receptionist', date: '20', day: 'mon',
        place: 'Las Vegas', phone: '+324 4232 4343', email: 'recpetionist@clinidoc.com', call: '34', lorem: 'lorem ipsum dolor',
        tabledata: [
            createData('lorem  insum91', 'call'),
            createData('lorem  insum92', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
            createData('lorem  insum1', 'call'),
        ]
    },

]
