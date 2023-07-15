import { gql } from '@apollo/client';

export const UPDATE_TASK = gql`
    mutation updateTask(
        $userId: String!, 
        $projectId: String!, 
        $cardId: String!, 
        $taskId: String!, 
        $task: UpdateTask!) {
            updateTask(
                userId: $userId, 
                projectId: $projectId, 
                cardId: $cardId, 
                taskId: $taskId, 
                task: $task ) {
                    titleTask
                    infoTask
                    finishedTask
                }
        }
`