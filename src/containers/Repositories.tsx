import React from 'react';
import { useQuery } from '@apollo/client';
import { RepositoryTable } from '../components';
import { GET_REPOSITORIES } from './Repositories.query';

interface Repository {
  id: string;
  name: string;
  url: string;
  forks: { totalCount: number };
  stargazers: { totalCount: number };
}

interface SearchResult {
  search: {
    nodes: Repository[];
  };
}

interface SearchQueryVariables {
  search: string;
}

const transformRepositoryToRespositoryTableItem = ({
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

export const Repositories = () => {
  const { loading, data, error } = useQuery<SearchResult, SearchQueryVariables>(
    GET_REPOSITORIES,
    { variables: { search: buildSearchQuery('react') } }
  );

  if (loading) return <p>Loading...</p>;

  if (error || !data || !data.search)
    return <p>Error: {JSON.stringify(error)}</p>;

  const { nodes } = data.search;

  const dataSource = nodes.map(transformRepositoryToRespositoryTableItem);

  return (
    <RepositoryTable dataSource={dataSource} />
  );
};
