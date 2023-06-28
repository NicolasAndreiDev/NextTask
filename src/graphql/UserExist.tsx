import { gql } from '@apollo/client';

export const USER_EXIST = gql`
  mutation userLogin($user: AutenticacaoUser!){
    userLogin(data: $user){
      email
    }
}
`