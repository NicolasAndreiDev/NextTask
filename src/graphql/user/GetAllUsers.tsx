import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query getUsersByEmail($users: [String!]!) {
        getUsersByEmail(users: $users) {
            id
            email
            username
            perfilColor
            bannerColor
        }
    }
`