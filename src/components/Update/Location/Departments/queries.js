import { gql } from '@apollo/client';

export const UPDATE_DEPARTMENT = gql`
mutation($input: IDepartment!){
  createDepartments(input: $input ){
    dId
    cId
    dName
    dState
  }
  
}
`

export const GET_DEPARTMENT = gql`
query  departments{
  department{
    dId
    cId
    dName
    dState
  }
}
`
export const EDIT_DEPARTMENT = gql`
mutation($input: IEditDepartments!){
editDepartments(input: $input){
  c_id
  d_name
  d_name
  d_state
}
}
`