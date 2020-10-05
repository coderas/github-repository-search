import React from 'react';
import { Table } from 'antd';

const { Column } = Table;

type Repository = {
  key: string;
  name: string;
  url: string;
  forks: number;
  stars: number;
};

const RepositoryLink = (name: string, record: Repository) => (
  <a href={record.url}>{name}</a>
);

export interface IRepositoryTableProps {
  dataSource: Repository[] | undefined;
  repositoryCount: number
}

export const RepositoryTable: React.FC<IRepositoryTableProps> = ({
  dataSource
}) => (
    <Table
      dataSource={dataSource}
      pagination={false}
    >
      <Column
        title="Name"
        dataIndex="name"
        key="name"
        render={RepositoryLink}
      />
      <Column title="🌟 Stars" dataIndex="stars" key="stars" />
      <Column title="🍴 Forks" dataIndex="forks" key="forks" />
    </Table>
  );