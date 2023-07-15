import { gql } from '@apollo/client';

export const MOVE_CARD = gql`
    mutation moveCard($userId: String!, $projectId: String!, $cardId: String!, $position: Float!) {
        moveCard(userId: $userId, projectId: $projectId, cardId: $cardId, position: $position) {
            titleCard
    }
}
`