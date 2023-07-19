import { gql } from '@apollo/client';

export const GET_PARTICIPATE_PROJECTS = gql`
    query getParicipateProjects($userId: String!) {
        getParticipateProjects(userId: $userId) {
            id
            titleProject
            participantes
            userId
            dataAcesso
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