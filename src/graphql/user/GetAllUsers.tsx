import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query getUsersById($users: [String!]!) {
        getUsersById(users: $users) {
            id
            email
            username
            perfilColor
            bannerColor
        }
    }
`