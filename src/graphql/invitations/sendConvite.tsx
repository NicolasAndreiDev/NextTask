import { gql } from '@apollo/client';

export const SEND_CONVITE = gql`
    mutation sendConvite($convite: ConviteInput!){
        sendConvite(convite: $convite)
    }
`