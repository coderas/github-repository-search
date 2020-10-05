import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, wait } from '@testing-library/react';
import { GET_REPOSITORIES } from './Repositories.query';
import { Repositories } from './Repositories';

const mocks = [
  {
    request: {
      query: GET_REPOSITORIES,
      variables: {
        search: 'react in:name sort:forks',
        page: null,
        pageSize: 8
      }
    },
    result: {
      data: {
        search: {
          pageInfo: {
            endCursor: 'XYZ'
          },
          nodes: [
            {
              __typename: 'Repository',
              id: 'id',
              name: 'A React Repo',
              url: 'url',
              forks: { __typename: 'RepositoryConnection', totalCount: 12 },
              stargazers: { __typename: 'StargazerConnection', totalCount: 13 }
            }
          ],
          repositoryCount: 1
        }
      }
    }
  }
];

const errorMocks = [
  {
    request: {
      query: GET_REPOSITORIES,
      variables: {
        search: 'react in:name sort:forks',
        page: null,
        pageSize: 8
      }
    },
    result: {
      errors: [new Error('Error!')]
    }
  }
];

it('renders a loading message', async () => {
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Repositories />
    </MockedProvider>
  );

  expect(await getByText(/Loading/i)).toBeInTheDocument();

  await wait();
});

it('handles errors', async () => {
  const { getByText } = render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <Repositories />
    </MockedProvider>
  );

  await wait();

  expect(await getByText(/Error:/i)).toBeInTheDocument();
});

it('fetches and renders the initial search results', async () => {
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Repositories />
    </MockedProvider>
  );
  await wait();

  expect(await getByText(/A React Repo/i)).toBeInTheDocument();
});
