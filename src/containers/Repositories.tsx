import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Input } from 'antd';
import { RepositoryTable, IRepositoryTableProps } from '../components';
import { INITIAL_SEARCH_TERM, INITIAL_PAGE_SIZE } from '../constants';
import { GET_REPOSITORIES } from './Repositories.query';

const { Search } = Input;

interface Repository {
  id: string;
  name: string;
  url: string;
  forks: { totalCount: number };
  stargazers: { totalCount: number };
}

interface SearchResult {
  search: {
    pageInfo: {
      endCursor: string;
    };
    nodes: Repository[];
    repositoryCount: number;
  };
}

interface SearchQueryVariables {
  search: string;
  page: string | null;
  pageSize: number;
}

const transformRepositoryToRespositoryItem = ({
  id,
  name,
  url,
  forks: { totalCount: forks },
  stargazers: { totalCount: stars }
}: Repository) => ({
  key: id,
  name,
  url,
  forks,
  stars
});

const buildSearchQuery = (searchTerm: string) =>
  `${searchTerm} in:name sort:forks`;

const Repositories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(INITIAL_SEARCH_TERM);
  const [pageSize, setPageSize] = useState<number>(INITIAL_PAGE_SIZE);
  const [page, setPage] = useState<string | null>(null);

  const onSearch = (value: string) => setSearchTerm(value);

  const { loading, data, error } = useQuery<SearchResult, SearchQueryVariables>(
    GET_REPOSITORIES,
    { variables: { search: buildSearchQuery(searchTerm), page, pageSize } }
  );

  if (loading) return <p>Loading...</p>;

  if (error || !data || !data.search)
    return <p>Error: {JSON.stringify(error)}</p>;

  const {
    nodes,
    pageInfo: { endCursor = null },
    repositoryCount
  } = data.search;

  const dataSource = nodes.map(transformRepositoryToRespositoryItem);

  // todo : SPIKE limitation, only paginates forward does not update buttons yet
  const onChangePage = () => setPage(endCursor);

  const onShowSizeChange = (_: number, size: number) => {
    setPage(null);
    setPageSize(size);
  };

  const tableProps: IRepositoryTableProps = {
    dataSource,
    onChangePage,
    repositoryCount,
    pageSize,
    onShowSizeChange
  };

  return (
    <>
      <Search placeholder={searchTerm} onSearch={onSearch} />
      <RepositoryTable {...tableProps} />
    </>
  );
};

export { Repositories, GET_REPOSITORIES };