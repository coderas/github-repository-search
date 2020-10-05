import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Input } from 'antd';
import { RepositoryTable, IRepositoryTableProps } from '../components';
import { INITIAL_SEARCH_TERM } from '../constants';
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

const Repositories = () => {
  const [searchTerm, setSearchTerm] = useState(INITIAL_SEARCH_TERM);

  const onSearch = (value: string) => setSearchTerm(value);

  const { loading, data, error } = useQuery<SearchResult, SearchQueryVariables>(
    GET_REPOSITORIES,
    { variables: { search: buildSearchQuery(searchTerm) } }
  );

  if (loading) return <p>Loading...</p>;

  if (error || !data || !data.search)
    return <p>Error: {JSON.stringify(error)}</p>;

  const {
    nodes,
    repositoryCount
  } = data.search;

  const dataSource = nodes.map(transformRepositoryToRespositoryItem);

  const tableProps: IRepositoryTableProps = {
    dataSource,
    repositoryCount
  };

  return (
    <>
      <Search placeholder={searchTerm} onSearch={onSearch} />
      <RepositoryTable {...tableProps} />
    </>
  );
};

export { Repositories, GET_REPOSITORIES };