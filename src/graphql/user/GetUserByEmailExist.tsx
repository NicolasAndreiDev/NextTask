import { gql } from '@apollo/client';

export const GET_USER_BY_EMAIL_EXIST = gql`
    query getUserByEmail($email: String!) {
        getUserByEmail(data: $email) {
            id
            email
        }
    }
`