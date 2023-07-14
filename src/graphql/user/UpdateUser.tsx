import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
    mutation updateUser($id: String!, $user: UpdateUserInput!) {
        updateUser(id: $id, data: $user) {
            username
            perfilColor
            bannerColor
        }
    }
`