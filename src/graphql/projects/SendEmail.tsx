import {gql } from '@apollo/client';

export const SEND_EMAIL = gql`
   mutation enviarEmail($user: SendConviteInput!){
	sendConvite(user: $user)
}
`