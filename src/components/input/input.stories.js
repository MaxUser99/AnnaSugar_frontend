import React from 'react';
import Input from './input';

export default {
  component: Input,
  title: 'Input'
};

const Template = args => <Input {...args} />

export const Default = Template.bind({});
Default.args = {
  name: 'email',
  label: 'email',
  placeholder: 'email'
};
