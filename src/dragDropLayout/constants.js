import shortid from "shortid";
export const SIDEBAR_ITEM = "sidebarItem";
export const ROW = "row";
export const COLUMN = "column";
export const COMPONENT = "component";



export const SIDEBAR_ITEMS = [
  {
    id: 1001,
    type: SIDEBAR_ITEM,
    component: {
      type: "first_name",
      content: "first_name"
    },
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
    id: 1002,
    type: SIDEBAR_ITEM,
    component: {
      type: "last_name",
      content: "last_name"
    },
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
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "input",
      content: "Some input"
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "name",
      content: "Some name"
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "email",
      content: "Some email"
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "phone",
      content: "Some phone"
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "image",
      content: "Some image"
    }
  }
];
