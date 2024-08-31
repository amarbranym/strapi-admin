import moment from 'moment';

export interface FormData {
  name: string;
  type?: 'text' | 'date' | 'textarea' | 'select' | 'file' | 'email' | 'number' | 'ref:strapi';
  label?: string;
  rules?: {
    min_length?: number;
    max_length?: number;
    model?: string;
    field?: string;
    options?: { label: string; value: string }[];
  };
  multiple?: boolean;
  help?: string;
  cols?: number;
  row?: number;
  as?: string;
  rows?: string;
  required?: boolean;
}


const startYear = 2000;
const currentYear = moment().year(); // Fetches the current year
const yearOptions = [];
yearOptions.push({ label: "Choose here", value: "" });
for (let year = startYear; year <= currentYear; year++) {
    yearOptions.push({ label: `y${year.toString()}`, value: `y${year.toString()}` });
}

export const personalSchema: FormData[] = [
  {
    name: 'FirstName',
    type: 'text',
    label: 'First Name',
    required: true,
    rules: {
      min_length: 5,
      max_length: 80
    },
    help: '',
    cols: 6,
    row: 1
  },

  {
    name: 'LastName',
    type: 'text',
    label: 'Last Name',
    rules: {
      min_length: 5,
      max_length: 80
    },
    help: '',
    cols: 6,
    row: 1
  },
  {
    name: 'Email',
    type: 'email',
    label: 'Email',
    rules: {
      min_length: 5,
      max_length: 80
    },
    help: '',
    cols: 6,
    row: 1
  },

  {
    name: 'FatherName',
    type: 'text',
    label: 'Father Name',
    rules: {
      min_length: 5,
      max_length: 80
    },
    help: '',
    cols: 6,
    row: 1
  }
];

export const AddressSchema: FormData[] = [
  {
    name: 'City',
    type: 'ref:strapi',
    label: 'City',
    rules: {
      model: 'cities',
      field: 'Name'
    },
    help: '',
    cols: 6,
    row: 1
  },
  {
    name: 'AddressType',
    type: 'select',
    label: 'Address Type',
    rules: {
      options: [
        { label: 'Choose here', value: '' },
        { value: 'permanent', label: 'Permanent' },
        { value: 'alternate', label: 'Alternate' }
      ]
    },
    help: '',
    cols: 6,
    row: 1
  },
  {
    name: 'Street',
    type: 'textarea',
    label: 'Street',
    rules: {
      min_length: 5,
      max_length: 80
    },
    help: '',
    cols: 12,
    row: 1,
    rows: '3'
  }
];


export const experienceSchema: FormData[] = [
  {
      name: 'Company',
      type: 'ref:strapi',
      label: 'Company',
      rules: {
          model: "companies",
          field: "Name",
      },
      help: '',
      cols: 6,
      row: 1,
  },
  {
      name: 'Designation',
      type: 'ref:strapi',
      label: 'Designation',
      rules: {
          model: "designations",
          field: "Name"
      },
      help: '',
      cols: 6,
      row: 1,
  },

  {
      name: 'Duration',
      type: 'number',
      label: 'Duration',
      required: true,
      rules: {
          min_length: 5,
          max_length: 80,
      },
      help: '',
      cols: 6,
      row: 1,
  },
]

export const ContactSchema: FormData[] = [

  {
      name: 'CountryCode',
      type: 'select',
      label: 'Country Code',
      required: true,
      rules: {
          options: [
              { label: "Choose here", value: "" },
              { value: 'USA (+1)', label: 'USA (+1)' },
              { value: 'India (+91)', label: 'India (+91)' },
              { value: 'UK (+44)', label: 'UK(+44)' },
              { value: 'Australia (+61)', label: 'Australia (+61)' },
              { value: 'Japan (+81)', label: 'Japan (+81)' },
              { value: 'Germany (+49)', label: 'Germany (+49)' },
              { value: 'France (+33)', label: 'France (+33)' },
              { value: 'China (+86)', label: 'China (+86)' },
              { value: 'Italy (+39)', label: 'Italy (+39)' },
              { value: 'Russia (+7)', label: 'Russia (+7)' },
          ],
      },
      help: '',
      cols: 6,
      row: 1,
  },
  {
      name: 'Number',
      type: 'text',
      label: 'Number',
      rules: {
          min_length: 5,
          max_length: 80,
      },
      help: '',
      cols: 6,
      row: 1,
  },
  {
      name: 'Type',
      type: 'select',
      label: 'Type',

      rules: {
          options: [
              { label: "Choose here", value: "" },
              { value: "primary", label: "Primary" },
              { value: "alternate", label: "Alternate" },
              { value: "work", label: "Work" },
              { value: "home", label: "Home" },

          ],
      },
      help: '',
      cols: 12,
      row: 1,
  },

]

export const qualificationSchema: FormData[] = [
  {
      name: 'school',
      type: 'ref:strapi',
      label: 'School',
      rules: {
          model: "schools",
          field: "Name",
      },
      help: '',
      cols: 6,
      row: 1,

  },
  {
      name: 'Year',
      type: 'select',
      label: 'Year',
      rules: {
          options: yearOptions,
      },
      help: '',
      cols: 6,
      row: 1,
  },
  {
      name: 'qualification',
      type: 'ref:strapi',
      label: 'Qualification ',
      rules: {
          model: "qualifications",
          field: "Name",
      },
      help: '',
      cols: 6,
      row: 1,
  },
  {
      name: 'Score',
      type: 'text',
      label: 'Score ',
      rules: {
          min_length: 5,
          max_length: 80,
      },
      help: '',
      cols: 6,
      row: 1,
  },
]

export const otherDetailSchema: FormData[] = [

  {
      name: 'IndustriesPreference',
      type: 'ref:strapi',
      label: 'Industry',
      rules: {
          model: "industries",
          field: "Name",
      },
      multiple: true,
      help: '',
      cols: 6,
      row: 1,

  },
  {
      name: 'Skills',
      type: 'ref:strapi',
      label: 'Skills',
      rules: {
          model: "skills",
          field: "name",
      },
      multiple: true,
      help: '',
      cols: 6,
      row: 1,
  },
  {
      name: 'DOB',
      type: 'date',
      label: 'DOB',
      rules: {
          min_length: 5,
          max_length: 80,
      },
      help: '',
      cols: 6,
      row: 1,
  },
  {
      name: 'Gender',
      type: 'select',
      label: 'Gender',
      rules: {
          options: [
              { label: "Choose here", value: "" },
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" }
          ]
      },
      help: '',
      cols: 6,
      row: 1,
  },
  {
      name: 'MaritalStatus',
      type: 'select',
      label: 'Marital Status',
      rules: {
          options: [
              { label: "Choose here", value: "" },
              { label: "Unmarried", value: "unmarried" },
              { label: "Married", value: "married" },
              { label: "Divorced", value: "divorced" },
          ]
      },
      help: '',
      cols: 6,
      row: 1,
  },
]