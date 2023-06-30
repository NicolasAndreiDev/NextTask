import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
  mutation userLogin($user: AutenticacaoUser!){
    userLogin(data: $user){
      id
      email
    }
}
`