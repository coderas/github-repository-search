import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($search: String!, $page: String, $pageSize: Int) {
    search(query: $search, type: REPOSITORY, first: $pageSize, after: $page) {
      pageInfo {
        endCursor
      }
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
      repositoryCount
    }
  }
`;
