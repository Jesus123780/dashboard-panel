import React from 'react'
import InputHooks from '../InputHooks/InputHooks';
// import { InputHook } from '../Update/Products/Input';
import { Container, Card, ContentUser, ImgUser, Name, ContentMessage, Message, HeaderMessage, Input } from './styled';

export const Messages = ({ data, setSelectedUser, messageData, loading, auth, selectedUser, er, handleSendMessage, values, handleChange, search, handleChangeFilter }) => {
    return (
        <Container>
            {er && 'Ocurrio un error'}
            <Card >
                <HeaderMessage>
                    <div>
                        <Input placeholder='Aa' name='search' value={search} onChange={handleChangeFilter} type='text' />
                        {loading && 'Buscando...'}
                        {data?.length === 0 && 'No se encontraron registros'}
                    </div>
                </HeaderMessage>

                {data?.map(x => (
                    <ContentUser bg={selectedUser === x?.name} key={x.id} onClick={() => setSelectedUser(x?.name)}>
                        <ImgUser>
                            {x?.name?.slice(0, 2).toUpperCase()}
                        </ImgUser>
                        <div>
                            <Name>{x?.name}</Name>
                            <Name>{x?.latestMessage?.content}</Name>
                        </div>
                    </ContentUser>
                ))}
            </Card>
            <Card ms>
                <>
                    {selectedUser &&
                        <HeaderMessage>
                            <ImgUser>
                                {selectedUser?.slice(0, 2).toUpperCase()}
                            </ImgUser>
                            <Name size='20px'>{selectedUser}</Name>
                        </HeaderMessage>
                    }
                    {messageData?.length > 0 ? messageData?.map(index => (
                        <ContentMessage user={auth?.auth?.uUsername} messageUser={index.from} key={index.uuid}>
                            <Message user={auth?.auth?.uUsername} messageUser={index.from}>{index?.content}</Message>
                        </ContentMessage>
                    )) : null}
                </>
                {selectedUser && <form onSubmit={handleSendMessage}>
                    <InputHooks
                        required
                        type="text"
                        errors={values?.content}
                        value={values?.content}
                        onChange={handleChange}
                        placeholder="Aa"
                        name='content'
                    />
                </form>}
            </Card>
        </Container>
    )
}