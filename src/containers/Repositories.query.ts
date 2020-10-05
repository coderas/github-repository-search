import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($search: String!) {
    search(query: $search, type: REPOSITORY, first: 8) {
      nodes {
        ... on Repository {
          id
          name
          url
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
        }
      }
    }
  }
`;
