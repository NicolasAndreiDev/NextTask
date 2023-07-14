import { gql } from '@apollo/client';

export const DELETE_PROJECT = gql`
    mutation deleteProject($userId: String!, $projectId: String!) {
        deleteProject(userId: $userId, projectId: $projectId) {
            titleProject
        }
    }
`