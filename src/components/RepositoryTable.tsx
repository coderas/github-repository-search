import React from 'react';
import { Table } from 'antd';
import { PAGINATION_PAGE_SIZES } from '../constants'

const { Column } = Table;

type Repository = {
  key: string;
  name: string;
  url: string;
  forks: number;
  stars: number;
};

interface RepositoryLinkProps {
  name: string;
  record: Repository;
};

const RepositoryLink: React.FC<RepositoryLinkProps> = (name, record) => (
  <a href={record.url}>{name}</a>
);

export interface IRepositoryTableProps {
  dataSource: Repository[] | undefined;
  onChangePage: () => void;
  repositoryCount: number;
  pageSize: number;
  onShowSizeChange: (current: number, newSize: number) => void;
}

export const RepositoryTable: React.FC<IRepositoryTableProps> = ({
  dataSource,
  onChangePage,
  repositoryCount,
  pageSize,
  onShowSizeChange
}) => (
    <Table
      dataSource={dataSource}
      onChange={onChangePage}
      pagination={{
        position: ['bottomCenter'],
        total: repositoryCount,
        pageSize,
        onShowSizeChange,
        pageSizeOptions: PAGINATION_PAGE_SIZES.map((size) => size.toString())
      }}
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