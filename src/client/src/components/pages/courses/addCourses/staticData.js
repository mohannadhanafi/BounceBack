export const state = {
  course_name: '',
  type: 'trainings',
  project_type: 'out for good',
  course_start: '',
  course_end: '',
  description: '',
};
export const fields = [
  [
    {
      tag: 'DropDown',
      label: 'Intervention Type',
      name: 'type',
      width: '42rem',
      options: ['trainings', 'pastoral'],
    },
  ],
  [
    {
      tag: 'Input',
      label: 'Intervention Name',
      name: 'course_name',
      width: '42rem',
      placeholder: 'intervention name',
    },
  ],
  [
    {
      tag: 'DropDown',
      label: 'Intervention Name',
      name: 'course_name',
      width: '42rem',
      options: [
        'Referral',
        'Further Training',
        'Employment Engagement',
        'Phone Call',
        'Mentoring',
        'Interview Skills',
        'CV writing',
        'Probation Advocacy',
        'Self Employment workshops',
        'UTR Registration',
      ],
    },
  ],
  [
    {
      tag: 'DropDown',
      label: 'Project Type',
      name: 'project_type',
      width: '42rem',
      options: [
        'out for good',
        'mind the gap',
        'olass',
        'cf03',
        'divert',
        'standard offer',
      ],
    },
  ],
  [
    {
      tag: 'Input',
      label: 'Intervention Start',
      name: 'course_start',
      width: '20rem',
      type: 'date',
    },
    {
      tag: 'Input',
      label: 'Intervention End',
      name: 'course_end',
      width: '20rem',
      type: 'date',
    },
  ],
  [
    {
      tag: 'Textarea',
      label: 'Description',
      name: 'description',
      width: '42rem',
      height: '10rem',
    },
  ],
  [
    {
      tag: 'Button',
      value: 'Add Intervention',
      staticField: true,
      color: '#272727',
    },
    {
      tag: 'Button',
      value: 'Clear Fields',
      staticField: true,
      color: '#FF4800',
    },
  ],
];
export const validationForm = (Fields) => {
  const keys = Object.keys(Fields);
  for (let index = 0; index < keys.length; index += 1) {
    if (Fields[keys[index]] === '') { return `Please check ${keys[index]}`; }
  }
  const startDate = new Date(Fields.course_start).getTime();
  const endDate = new Date(Fields.course_end).getTime();
  if (startDate > endDate) return 'Please check the start date and the end date';
  return null;
};
