export const master_fields = [{
	id: 1,
	field_label: 'first_name',
	display_name: 'First name',
	description: '[Validation: Only alphabets]',
	input_type: 'text',
	value_type: 'string',
	validation: [{
		key: 'regex_check',
		type: 'equal',
		value: '^[a-zA-Z]+$',
		error_message: 'First name can only have characters.'
	}]
}, {
	id: 2,
	field_label: 'last_name',
	display_name: 'Last name',
	description: '[Validation: Only alphabets]',
	input_type: 'text',
	value_type: 'string',
	validation: [{
		key: 'regex_check',
		type: 'equal',
		value: '^[a-zA-Z]+$',
		error_message: 'Last name can only have characters.'
	}]
}, {
	id: 3,
	field_label: 'age',
	display_name: 'Age',
	description: '[18 - 70 years]',
	input_type: 'text',
	value_type: 'number',
	validation: [{
		key: 'regex_check',
		type: 'equal',
		value: '^[0-9]+$',
		error_message: 'Age can only be an integer.'
	}, {
		logic: 'and',
		key: 'value_check',
		type: 'greater',
		value: '18',
		error_message: 'Age has to be greater than 18.'
	}, {
		logic: 'and',
		key: 'value_check',
		type: 'lesser',
		value: '70',
		error_message: 'Age has to be lesser than 70.'
	}]
}, {
	id: 4,
	field_label: 'languages',
	display_name: 'Languages',
	description: '',
	input_type: 'checkbox',
	alignment:"Horizontal",
	value_type: 'string',
	options: ['Hindi', 'English', 'Marathi', 'Others'],
	validation: []
}, {
	id: 5,
	field_label: 'gender',
	display_name: 'Gender',
	description: '',
	input_type: 'radio',
	alignment:"Horizontal",
	value_type: 'string',
	options: ['Male', 'Female', 'Others'],
	validation: []
}, {
	id: 6,
	field_label: 'education',
	display_name: 'Education',
	description: 'Select your education level',
	input_type: 'select',
	value_type: 'string',
	options: ['10th pass', '12th pass', 'Graduate', 'Post-graduate'],
	validation: []
}, {
	id: 7,
	field_label: 'board',
	display_name: 'Board',
	description: 'Select your education level',
	input_type: 'select',
	value_type: 'string',
	options: ['CBSE', 'ICSE', 'Maharashtra'],
	validation: [],
	preRequisites: [{
		field_label: 'education',
		value: '10th pass'
	}, {
		field_label: 'education',
		value: '12th pass',
		logic: 'or'
	}, {
		field_label: 'citizenship',
		value: 'Indian',
		logic: 'and'
	}]
}, {
	id: 8,
	field_label: 'specialization',
	display_name: 'Specialization',
	description: '',
	input_type: 'select',
	value_type: 'string',
	options: ['IT', 'Mechanical', 'Electronics', 'Computer Science'],
	validation: [],
	preRequisites: [{
		field_label: 'education',
		value: 'Graduate'
	}, {
		field_label: 'education',
		value: 'Post-graduate',
		logic: 'or'
	}, {
		field_label: 'citizenship',
		value: 'Indian',
		logic: 'and'
	}]
}, {
	id: 9,
	field_label: 'marital_status',
	display_name: 'Marital Status',
	description: '',
	input_type: 'radio',
	alignment:"Horizontal",
	value_type: 'string',
	options: ['Married', 'Unmarried'],
	validation: [],
	preRequisites: [{
		field_label: 'education',
		value: '10th pass'
	}]
}, {
	id: 10,
	field_label: 'citizenship',
	display_name: 'Citizenship',
	description: 'Select your education level',
	input_type: 'radio',
	alignment:"Horizontal",
	value_type: 'string',
	options: ['Indian', 'Non-Indian'],
	validation: []
}, {
	id: 11,
	field_label: 'specify_language',
	display_name: 'Language',
	description: 'please specify language',
	input_type: 'text',
	value_type: 'string',
	validation: [],
	preRequisites: [{
		field_label: 'languages',
		value: 'Others'
	}]
}, {
	id: 12,
	field_label: 'country',
	display_name: 'Country',
	description: '',
	input_type: 'select',
	value_type: 'string',
	options: ['India', 'USA', 'UK','Australia', 'Others'],
	validation: [],
	preRequisites: [{
		field_label: 'citizenship',
		value: 'Non-Indian'
	}]
}, {
	id: 13,
	field_label: 'specify_country',
	display_name: 'Country',
	description: 'please specify country',
	input_type: 'text',
	value_type: 'string',
	validation: [],
	preRequisites: [{
		field_label: 'country',
		value: 'Others'
	}]
}, {
	id: 14,
	field_label: 'state',
	display_name: 'State',
	description: '',
	input_type: 'select',
	value_type: 'string',
	options: ['Gujarat', 'Maharashtra', 'Karnataka', 'Bihar', 'Others'],
	validation: [],
	preRequisites: [{
		field_label: 'citizenship',
		value: 'Indian'
	}]
}, {
	id: 15,
	field_label: 'specify_state',
	display_name: 'State',
	description: 'please specify state',
	input_type: 'text',
	value_type: 'string',
	validation: [],
	preRequisites: [{
		field_label: 'state',
		value: 'Others'
	}]
}, {
	id: 16,
	field_label: 'password',
	display_name: 'Password',
	input_type: 'password',
	value_type: 'string',
	validation: []
}, {
	id: 17,
	field_label: 'confirm_password',
	display_name: 'Confirm Password',
	input_type: 'password',
	value_type: 'string',
	validation: [{
		key: 'value_check',
		type: 'equal',
		field_label: 'password',
		error_message: 'Passwords should match.'
	}]
}, {
	id: 18,
	field_label: 'income',
	display_name: 'Annual Income Range',
	description: '',
	input_type: 'select',
	value_type: 'string',
	options: ['0 - 5 lakhs', '5 - 10 lakhs', '10 - 25 lakhs', '> 25 lakhs'],
	validation: []
}, {
	id: 19,
	field_label: 'tax_paid',
	display_name: 'Tax paid last year',
	description: '',
	input_type: 'select',
	value_type: 'string',
	options: ['0 - 2 lakhs', '2 - 5 lakhs', '5 - 10 lakhs', '> 10 lakhs'],
	validation: [],
	preRequisites: [{
		field_label: 'income',
		value: '5 - 10 lakhs'
	}, {
		logic: 'or',
		field_label: 'income',
		value: '10 - 25 lakhs'
	}, {
		logic: 'or',
		field_label: 'income',
		value: '> 25 lakhs'
	}]
}, {
	id: 20,
	field_label: 'occupation',
	display_name: 'Occupation',
	description: '',
	input_type: 'select',
	value_type: 'string',
	options: ['Salaried', 'Business', 'Student', 'None'],
	validation: []
}, {
	id: 21,
	field_label: 'dob',
	display_name: 'Date Of Birth',
	description: '',
	input_type: 'date',
	value_type: 'string',
	validation: []
}]

export const data={
    "form_name": "Create New Bank Account",
    "form_description": "New User To Bank",
    "bank_name": "SBI",
    "tabs": [
      {
        "tab_name": "Personal Details",
        "tab_desc": "Mandatory fields are marked with asterisk(*).",
        "order": 1,
        "fields": [
          {
            "id": 1,
            "field_label": "first_name",
            "display_name": "First name",
            "description": "[Validation: Only alphabets]",
            "input_type": "text",
            "value_type": "string",
            "validation": [
              {
                "key": "regex_check",
                "type": "equal",
                "value": "^[a-zA-Z]+$",
                "error_message": "First name can only have characters."
              }
            ],
            "order": 1,
            "showFieldName": true,
            "showField": true,
            "showDescription": false,
            "required": true
          },
          {
            "id": 2,
            "field_label": "last_name",
            "display_name": "Last name",
            "description": "[Validation: Only alphabets]",
            "input_type": "text",
            "value_type": "string",
            "validation": [
              {
                "key": "regex_check",
                "type": "equal",
                "value": "^[a-zA-Z]+$",
                "error_message": "Last name can only have characters."
              }
            ],
            "order": 2,
            "showFieldName": true,
            "showField": true,
            "showDescription": false,
            "required": true
          },
          {
            "id": 3,
            "field_label": "age",
            "display_name": "Age",
            "description": "[18 - 70 years]",
            "input_type": "text",
            "value_type": "number",
            "validation": [
              {
                "key": "regex_check",
                "type": "equal",
                "value": "^[0-9]+$",
                "error_message": "Age can only be an integer."
              },
              {
                "logic": "and",
                "key": "value_check",
                "type": "greater",
                "value": "18",
                "error_message": "Age has to be greater than 18."
              },
              {
                "logic": "and",
                "key": "value_check",
                "type": "lesser",
                "value": "70",
                "error_message": "Age has to be lesser than 70."
              }
            ],
            "order": 3,
            "showFieldName": true,
            "showField": true,
            "showDescription": false,
            "required": true
          },
          {
            "id": 5,
            "field_label": "gender",
            "display_name": "Gender",
            "description": "",
            "input_type": "radio",
            "alignment": "Vertical",
            "value_type": "string",
            "options": [
              "Male",
              "Female",
              "Others"
            ],
            "validation": [],
            "order": 4,
            "showFieldName": true,
            "showField": true,
            "showDescription": true,
            "required": false
          },
          {
            "id": 4,
            "field_label": "languages",
            "display_name": "Languages",
            "description": "",
            "input_type": "checkbox",
            "alignment": "Vertical",
            "value_type": "string",
            "options": [
              "Hindi",
              "English",
              "Marathi",
              "Others"
            ],
            "validation": [],
            "order": 5,
            "showFieldName": true,
            "showField": true,
            "showDescription": true,
            "required": false
          }
        ]
      },
      {
        "tab_name": "Education Details",
        "tab_desc": "All fields are compulsory.",
        "order": 2,
        "fields": [
          {
            "id": 6,
            "field_label": "education",
            "display_name": "Education",
            "description": "Select your education level",
            "input_type": "select",
            "value_type": "string",
            "options": [
              "10th pass",
              "12th pass",
              "Graduate",
              "Post-graduate"
            ],
            "validation": [],
            "order": 1,
            "showFieldName": true,
            "showField": true,
            "showDescription": true,
            "required": true
          }
        ]
      },
      {
        "tab_name": "Parent Details",
        "tab_desc": "Fill all the details *",
        "order": 3,
        "fields": [
          {
            "id": 1,
            "field_label": "first_name",
            "display_name": "First name",
            "description": "[Validation: Only alphabets]",
            "input_type": "text",
            "value_type": "string",
            "validation": [
              {
                "key": "regex_check",
                "type": "equal",
                "value": "^[a-zA-Z]+$",
                "error_message": "First name can only have characters."
              }
            ],
            "order": 1,
            "showFieldName": true,
            "showField": true,
            "showDescription": true,
            "required": false
          },
          {
            "id": 2,
            "field_label": "last_name",
            "display_name": "Last name",
            "description": "[Validation: Only alphabets]",
            "input_type": "text",
            "value_type": "string",
            "validation": [
              {
                "key": "regex_check",
                "type": "equal",
                "value": "^[a-zA-Z]+$",
                "error_message": "Last name can only have characters."
              }
            ],
            "order": 2,
            "showFieldName": true,
            "showField": true,
            "showDescription": true,
            "required": false
          },
          {
            "id": 3,
            "field_label": "age",
            "display_name": "Age",
            "description": "[18 - 70 years]",
            "input_type": "text",
            "value_type": "number",
            "validation": [
              {
                "key": "regex_check",
                "type": "equal",
                "value": "^[0-9]+$",
                "error_message": "Age can only be an integer."
              },
              {
                "logic": "and",
                "key": "value_check",
                "type": "greater",
                "value": "18",
                "error_message": "Age has to be greater than 18."
              },
              {
                "logic": "and",
                "key": "value_check",
                "type": "lesser",
                "value": "70",
                "error_message": "Age has to be lesser than 70."
              }
            ],
            "order": 3,
            "showFieldName": true,
            "showField": true,
            "showDescription": true,
            "required": false
          }
        ]
      }
    ],
    "Layouts": [
      {
        "tabId": 1,
        "tabName": "Personal Details",
        "tabDesc": "Mandatory fields are marked with asterisk(*).",
        "layout": [
          {
            "type": "row",
            "id": "Kxc-7YkSk",
            "children": [
              {
                "type": "column",
                "id": "EVqWrT8FP",
                "children": [
                  {
                    "id": 1,
                    "type": "component"
                  }
                ]
              },
              {
                "type": "column",
                "id": "lHS8oEpsLX",
                "children": [
                  {
                    "id": "e-1",
                    "type": "component"
                  }
                ]
              }
            ]
          },
          {
            "type": "row",
            "id": "Mh9pnFltle",
            "children": [
              {
                "id": "yoDsDlnRL",
                "type": "column",
                "children": [
                  {
                    "id": "e-2",
                    "type": "component"
                  }
                ]
              }
            ]
          },
          {
            "type": "row",
            "id": "QPjh4CVLK",
            "children": [
              {
                "type": "column",
                "id": "QGYLjV4SV",
                "children": [
                  {
                    "id": 3,
                    "type": "component"
                  },
                  {
                    "id": 2,
                    "type": "component"
                  }
                ]
              },
              {
                "id": "n8UieRwAyb",
                "type": "column",
                "children": [
                  {
                    "id": 5,
                    "type": "component"
                  }
                ]
              },
              {
                "id": "hOG4EyiF0T",
                "type": "column",
                "children": [
                  {
                    "id": 4,
                    "type": "component"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "tabId": 2,
        "tabName": "Education Details",
        "tabDesc": "All fields are compulsory.",
        "layout": [
          {
            "type": "row",
            "id": "kJ_Q5DEI6",
            "children": [
              {
                "type": "column",
                "id": "puzapTMh5i",
                "children": [
                  {
                    "id": 6,
                    "type": "component"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "tabId": 3,
        "tabName": "Parent Details",
        "tabDesc": "Fill all the details *",
        "layout": [
          {
            "type": "row",
            "id": "mT0uon4ZT",
            "children": [
              {
                "type": "column",
                "id": "Zd5JWtMI9",
                "children": [
                  {
                    "id": 3,
                    "type": "component"
                  }
                ]
              },
              {
                "type": "column",
                "id": "DsIQR3Qg3W",
                "children": [
                  {
                    "id": 1,
                    "type": "component"
                  }
                ]
              }
            ]
          },
          {
            "type": "row",
            "id": "DOGsamRHH",
            "children": [
              {
                "type": "column",
                "id": "2qT4N0t6L0",
                "children": [
                  {
                    "id": 2,
                    "type": "component"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }