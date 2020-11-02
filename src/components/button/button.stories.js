import React from 'react';
import Button from './button';

export default {
  component: Button,
  title: 'Button'
};

const Template = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Войти',
};
