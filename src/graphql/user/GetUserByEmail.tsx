import { gql } from '@apollo/client';

export const GET_USER_BY_EMAIL = gql`
    query getUserByEmail($email: String!) {
        getUserByEmail(data: $email) {
            id   
            email
            username
            perfilColor
            bannerColor
            favProjects {
                projectId
            }
            projects {
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
    }
`