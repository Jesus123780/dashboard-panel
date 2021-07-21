import { gql } from '@apollo/client'

export const GET_ALL_COUNTRIES = gql`
    query countries {
        countries {
            cId
            cName
            cCalCod
            cState
        }
    }
`
export const GET_ALL_DEPARTMENTS = gql`
    query getAllDeparments($cId: ID!) {
        departments(cId: $cId) {
            dId
                cId
                dName
                dState
            }
    }
`
export const GET_ALL_CITIES = gql`
    query getAllCities($dId: ID!) {
        cities(dId: $dId) {
            cId
            dId
            cName
            cState
        }
    }
`