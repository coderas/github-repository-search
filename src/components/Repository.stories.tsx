
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { RepositoryTable, IRepositoryTableProps } from './RepositoryTable';
import 'antd/dist/antd.css';

export default {
  title: 'RepositoryTable',
  component: RepositoryTable
} as Meta;

const Template: Story<IRepositoryTableProps> = (args) => (
  <RepositoryTable {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  dataSource: [{
    key: 'ABC890',
    name: 'Repo Name 1',
    url: 'http://localhost:3000',
    forks: 1313,
    stars: 2424
  }, {
    key: 'XYZ123',
    name: 'Repo Name 2',
    url: 'http://localhost:3000',
    forks: 999,
    stars: 777
  }]
};