import { gql } from '@apollo/client';

export const GET_FAV_PROJECTS = gql`
    query getFavProjects($userId: String!) {
        getProjectsById(userId: $userId) {
            id
            titleProject
            dataAcesso
            dataAcesso
            participantes
            colorProject
            finishedProject
            cardTasks {
                id
                titleCard
                tasks {
                    id
                    titleTask
                    infoTask
                    finishedTask
                }
            }
        }
}
`