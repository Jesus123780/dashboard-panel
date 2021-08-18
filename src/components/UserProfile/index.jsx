import { useEffect, useState } from 'react'
import { AwesomeModal } from '../AwesomeModal'
import { Text, Container, Circular, ContentOptions } from './styled'
import useAuth from '../hooks/useAuth'
import { InputFile } from '../MultiInputs/inputs'
import styled from 'styled-components'
import { TagsInput } from '../InputTags'

export const UserProfile = ({ params, data, loading, error, handleFileChange }) => {

    if (error) return <h1>Usuario no existe</h1>
    const [modal, setModal] = useState(false)
    const { auth } = useAuth()
    const [tags, setTags] = useState([]);
    const [errors, setErrors] = useState({});
    const changeHandler = (name, value) => {
        if (name === 'tags') {
            setTags(value);
            if (value.length > 0 && errors.tags) {
                setErrors(prev => {
                    const prevErrors = { ...prev };
                    delete prevErrors.tags;
                    return prevErrors;
                });
            }
        }
    }
    useEffect(() => {
        const Title = data ? data?.getUser?.name : auth.uUsername
        document.title = `${ Title } |  Ifood`
    }, [data])
    return (
        <Container bg={auth.uUsername} style={{ backgroundas: `${ <svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='200px'><text x='15' y='27%' fill='white' font-size='4rem' font-weight='600' opacity='0.1' font-family='Roobert,Helvetica Neue,Helvetica,Arial,sans-serif'>jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao </text><text x='5' y='60%' fill='white' font-size='4rem' font-weight='600' opacity='0.1' font-family='Roobert,Helvetica Neue,Helvetica,Arial,sans-serif'>inao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuv</text><text x='0' y='93%' fill='white' font-size='4rem' font-weight='600' opacity='0.1' font-family='Roobert,Helvetica Neue,Helvetica,Arial,sans-serif'>sjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesu</text></svg> }` }} >
            {loading && 'cargando'}
            <Circular onClick={() => data?.getUser.username === auth.uUsername && setModal(!modal)}>
            </Circular>
            <h1>Bienvenido {params?.uUsername}</h1>
            <AwesomeModal
                show={modal}
                backdrop
                onCancel={() => setModal(false)}
                onHide={() => setModal(false)}
                btnConfirm={false}
                header={true}
                footer={false}
                padding='0px'
                title={`Usuario ${ params?.uUsername }`}
            >
                <ContentOptions>
                    <Text color='2' bottom> <InputFile label={'Cambiar foto de perfil'} type="file" onChange={handleFileChange} name="" id="" /> </Text>
                    <Text color='1' bottom>Eliminar foto de perfil</Text>
                    <Text onClick={() => setModal(false)} bottom>Cancelar</Text>
                </ContentOptions>
            </AwesomeModal>
            <br />
            <br />
            <br />
            <Table>
                <tbody>
                    <tr>
                        <th className="andes-table">Nombre de usuario</th>
                        <td><span>{data?.getUser?.username}</span></td>
                    </tr>
                    <tr>
                        <th className="andes-table">Nombre</th>
                        <td><span>{data?.getUser?.name ? data?.getUser?.name : ''}</span></td>
                    </tr>
                    <tr>
                        <th className="andes-table">Email</th>
                        <td><span>{data?.getUser?.email ? data?.getUser?.email : ''}</span></td>
                    </tr>
                    <tr>
                        <th className="andes-table">Description</th>
                        <td><span>{data?.getUser?.description ? data?.getUser?.description : ''}</span></td>
                    </tr>
                    <tr>
                        <th className="andes-table">Pagina Web</th>
                        <td><span><a target='_blank' href={data?.getUser?.siteWeb}>{data?.getUser?.siteWeb}</a></span></td>
                    </tr>
                </tbody>
            </Table>

            <TagsInput
                label="Tags"
                id="tags"
                name="tags"
                placeholder="Add tag"
                onChange={changeHandler}
                error={errors.tags}
                defaultTags={tags}
            />
        </Container>
    )
}
const Table = styled.table`
tbody tr:nth-child(2n) .andes-table:first-child,
tbody tr:nth-child(2n) .andes-table:first-child,
tbody tr:nth-child(odd),

tbody tr:nth-child(odd):hover {
    padding: 13px;
    background: #f5f5f5
}

tbody tr:nth-child(odd) .andes-table:first-child,
tbody tr:nth-child(odd) .andes-table:first-child {
    background: #ebebeb;
    padding: 13px;
}
`