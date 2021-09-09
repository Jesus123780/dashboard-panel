import { useContext, useState } from 'react'
import { Modules } from '../../../components/Modules'
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_SIN_PERMITS_MODULES, GET_ALL_SUBMODULES, UPDATE_MODULES, UPDATE_SUB_MODULES } from './queries';
import { Context } from '../../../Context';
import { useScrollY } from '../../../components/hooks/useScroll';
import { updateCache } from '../../../utils';

export const ModulesC = () => {
    // ESTADOS
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({})
    const { setAlertBox } = useContext(Context)
    const { offsetY } = useScrollY();

    // HANDLES
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    // QUERIES
    const [createModule] = useMutation(UPDATE_MODULES)
    const [createSubModule] = useMutation(UPDATE_SUB_MODULES)
    // Get all Modules sin permits
    const { data, loading, error: errorC } = useQuery(GET_ALL_SIN_PERMITS_MODULES)
    const { data: dataSub, loadingS } = useQuery(GET_ALL_SUBMODULES)
    const handleRegister = async e => {
        e.preventDefault()
        const { mName, mPath, priority, mIcon } = values
        const mPriority = parseInt(priority);
        try {
            createModule({
                variables: {
                    input: {
                        mName,
                        mPath,
                        mPriority,
                        mIcon
                    }
                },
                update: (cache, { data: { updateModule } }) => updateCache({
                    cache,
                    query: GET_ALL_SIN_PERMITS_MODULES,
                    nameFun: 'moduleSinPermits',
                    dataNew: updateModule
                })
            }).catch(err => setAlertBox({ message: `${ err }`, duration: 7000 }))
        }
        catch (error) {
            setAlertBox({ message: `${ error.message }`, duration: 7000 })
        }
    }
    const handleRegisterSubModule = async e => {
        e.preventDefault()
        const { mId, smPath, smName, subMPriority } = values
        const smPriority = parseInt(subMPriority);
        try {
            createSubModule({
                variables: {
                    input: {
                        mId,
                        smPath,
                        smName,
                        smPriority,
                    }
                },
                update: (cache, { data: { updateSubModule } }) => updateCache({
                    cache,
                    query: GET_ALL_SUBMODULES,
                    nameFun: 'subModules',
                    dataNew: updateSubModule
                })
            }).catch(err => setAlertBox({ message: `${ err }`, duration: 7000 }))
        }
        catch (error) {
            setAlertBox({ message: `${ error.message }`, duration: 7000 })
        }
    }
    return (
        <Modules
            errorC={errorC}
            handleChange={handleChange}
            handleRegister={handleRegister}
            handleRegisterSubModule={handleRegisterSubModule}
            values={values}
            loading={loading || loadingS}
            errors={errors}
            offsetY={offsetY}
            data={data?.moduleSinPermits}
            dataSub={dataSub?.subModules}
        />
    )
}