import { gql } from '@apollo/client';

export const FINISHED_PROJECT = gql`
    mutation fisishedProject($userId: String!, $projectId: String!) {
        finishedProject(userId: $userId, projectId: $projectId) {
            titleProject
            finishedProject
        }
    }
`