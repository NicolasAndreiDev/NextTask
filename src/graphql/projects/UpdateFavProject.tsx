import { gql } from '@apollo/client';

export const UPDATE_FAV_PROJECTS = gql`
    mutation updateFavProjects($userId: String!, $projectId: UpdateFavProjects!) {
        updateFavProjects(userId: $userId, projectId: $projectId) {
            projectId
        }
    }
`