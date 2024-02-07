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
	value_type: 'string',
	options: ['Hindi', 'English', 'Marathi', 'others'],
	validation: []
}, {
	id: 5,
	field_label: 'gender',
	display_name: 'Gender',
	description: '',
	input_type: 'radio',
	value_type: 'string',
	options: ['male', 'female', 'others'],
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
	options: ['IT', 'Mechanical', 'Electronics'],
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
	value_type: 'string',
	options: ['Indian', 'Non-Indian'],
	validation: []
}, {
	id: 11,
	field_label: 'language',
	display_name: 'Language',
	description: 'please specify',
	input_type: 'text',
	value_type: 'string',
	validation: [],
	preRequisites: [{
		field_label: 'languages',
		value: 'others'
	}]
}, {
	id: 12,
	field_label: 'country',
	display_name: 'Country',
	description: '',
	input_type: 'select',
	value_type: 'string',
	options: ['USA', 'UK', 'Others'],
	validation: [],
	preRequisites: [{
		field_label: 'citizenship',
		value: 'Non-Indian'
	}]
}, {
	id: 13,
	field_label: 'state',
	display_name: 'State',
	description: '',
	input_type: 'select',
	value_type: 'string',
	options: ['Gujarat', 'Maharashtra', 'Karnataka'],
	validation: [],
	preRequisites: [{
		field_label: 'citizenship',
		value: 'Indian'
	}]
}, {
	id: 14,
	field_label: 'password',
	display_name: 'Password',
	input_type: 'password',
	value_type: 'string',
	validation: []
}, {
	id: 15,
	field_label: 'confirm_password',
	display_name: 'Confirm Password',
	input_type: 'password',
	value_type: 'string',
	validation: [{
		key: 'value_check',
		type: 'equal',
		field_label: 'password',
		error_message: 'Password does not match.'
	}]
}]