import { gql } from '@apollo/client';

export const CREATE_CARD = gql`
    mutation addNewCard($userId: String!, $projectId: String!, $card: CreateCardAndUpdate!) {
        addNewCard(userId: $userId, projectId: $projectId, card: $card) {
            titleCard
        }
    }
`