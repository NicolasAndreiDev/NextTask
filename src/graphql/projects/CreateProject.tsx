import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation createProject($project: CreateProject!) {
    createProject(data: $project) {
      userId
      titleProject
      participantes
    }
}
`