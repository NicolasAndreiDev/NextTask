import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($user: AutenticacaoUser!) {
	  createUser(data: $user) {
		  email
      password
    } 
}
`