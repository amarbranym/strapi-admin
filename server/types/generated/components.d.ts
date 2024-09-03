import type { Schema, Attribute } from '@strapi/strapi';

export interface VacancyCandidates extends Schema.Component {
  collectionName: 'components_vacancy_candidates';
  info: {
    displayName: 'Candidates';
    icon: 'bell';
  };
  attributes: {
    Student: Attribute.Relation<
      'vacancy.candidates',
      'oneToOne',
      'api::student.student'
    >;
    SalaryNegotiation: Attribute.Integer;
    Status: Attribute.Enumeration<
      ['Hired', 'Rejected', 'In Probation', 'In Process']
    >;
    DateOfHiring: Attribute.Date;
  };
}

export interface StudentQualification extends Schema.Component {
  collectionName: 'components_student_qualifications';
  info: {
    displayName: 'Qualification';
    description: '';
  };
  attributes: {
    school: Attribute.Relation<
      'student.qualification',
      'oneToOne',
      'api::school.school'
    >;
    Year: Attribute.Enumeration<
      [
        'y1999',
        'y2000',
        'y2001',
        'y2002',
        'y2003',
        'y2004',
        'y2005',
        'y2006',
        'y2007',
        'y2008',
        'y2009',
        'y2010',
        'y2011',
        'y2012',
        'y2013',
        'y2014',
        'y2015',
        'y2016',
        'y2017',
        'y2018',
        'y2019',
        'y2020',
        'y2021',
        'y2022',
        'y2023',
        'y2024'
      ]
    >;
    qualification: Attribute.Relation<
      'student.qualification',
      'oneToOne',
      'api::qualification.qualification'
    >;
    Score: Attribute.String;
  };
}

export interface StudentExperience extends Schema.Component {
  collectionName: 'components_student_experiences';
  info: {
    displayName: 'Experience';
    description: '';
  };
  attributes: {
    Company: Attribute.Relation<
      'student.experience',
      'oneToOne',
      'api::company.company'
    >;
    Designation: Attribute.Relation<
      'student.experience',
      'oneToOne',
      'api::designation.designation'
    >;
    Duration: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 12;
        },
        number
      > &
      Attribute.DefaultTo<1>;
  };
}

export interface StudentDocument extends Schema.Component {
  collectionName: 'components_student_documents';
  info: {
    displayName: 'Document';
    icon: 'file';
  };
  attributes: {
    DocumentType: Attribute.Enumeration<['AadharCard', 'PAN Card', 'License']>;
    Front: Attribute.Media<'images'>;
    Back: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ContactPhone extends Schema.Component {
  collectionName: 'components_contact_phones';
  info: {
    displayName: 'Phone';
    icon: 'phone';
    description: '';
  };
  attributes: {
    CountryCode: Attribute.Enumeration<
      [
        'USA (+1)',
        'India (+91)',
        'UK (+44)',
        'Australia (+61)',
        'Japan (+81)',
        'Germany (+49)',
        'France (+33)',
        'China (+86)',
        'Italy (+39)',
        'Russia (+7)'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'India (+91)'>;
    Number: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    Type: Attribute.Enumeration<['Primary', 'Alternate', 'Work', 'Home']> &
      Attribute.DefaultTo<'Primary'>;
  };
}

export interface ContactContacts extends Schema.Component {
  collectionName: 'components_contact_contacts';
  info: {
    displayName: 'Contacts';
    icon: 'user';
    description: '';
  };
  attributes: {
    contact: Attribute.Relation<
      'contact.contacts',
      'oneToOne',
      'api::contact.contact'
    >;
    Designation: Attribute.Enumeration<
      ['Owner', 'Manager', 'Employee', 'HelpDesk ']
    >;
  };
}

export interface ContactAddress extends Schema.Component {
  collectionName: 'components_contact_addresses';
  info: {
    displayName: 'Address';
    icon: 'house';
  };
  attributes: {
    Street: Attribute.Text;
    City: Attribute.Relation<'contact.address', 'oneToOne', 'api::city.city'>;
    AddressType: Attribute.Enumeration<['Permanent', 'Alternate']>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'vacancy.candidates': VacancyCandidates;
      'student.qualification': StudentQualification;
      'student.experience': StudentExperience;
      'student.document': StudentDocument;
      'contact.phone': ContactPhone;
      'contact.contacts': ContactContacts;
      'contact.address': ContactAddress;
    }
  }
}
