import { gql } from '@apollo/client'
export const GET_MODULES = gql`
    query getModules($data: IQModule!){
        modules(input: $data) {
            mId
            mName
            mPath
            mPriority
            mIcon
            mState
            subModules {
                smId
                mId
                smPath
                smName
                smPriority
                smState
            }
        }
    }
`

export const UPDATE_MODULES = gql`
mutation createModule($input: IModule){
    createModule(input: $input){
    mName
    mPath
    mPriority
    mIcon
    mState
  }
}
`
export const UPDATE_SUB_MODULES = gql`
mutation createSubModule($input: ISubModule){
    createSubModule(input: $input){
    mId
    smPath
    smName
    smPriority
    smState
  }
}
`
export const GET_ALL_SIN_PERMITS_MODULES = gql`
query moduleSinPermits{
    moduleSinPermits{
        mId
        mName
        mPath
        mPriority
        mIcon
        mState

    }
}
`
export const GET_ALL_SUBMODULES = gql`
query subModules{
    subModules{
    smId
    mId
    smPath
    smName
    smPriority
    smState

    }
}
`