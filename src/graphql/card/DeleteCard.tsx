import { gql } from '@apollo/client';

export const DELETE_CARD = gql`
    mutation deleteCard($userId: String!, $projectId: String!, $cardId: String!) {
        deleteCard(userId: $userId, projectId: $projectId, cardId: $cardId) {
            id
            titleCard
        }
    }
`