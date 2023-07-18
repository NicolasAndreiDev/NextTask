import { gql } from '@apollo/client';

export const CREATE_USER_NEXT = gql`
  mutation createUserNext($user: CreateUserNextInput!) {
	createUserNext(user: $user) {
        id
		email
    } 
}
`