import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation createTask(
        $userId: String!, 
        $projectId: String!, 
        $cardId: String!, 
        $task: CreateTask!
    ) {
    createTask(
        userId: $userId, 
        projectId: $projectId, 
        cardId: $cardId, 
        task: $task
    ) {
        titleTask
        infoTask
    }
 }
`