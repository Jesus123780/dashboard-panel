import React from 'react'
import InputHooks from '../InputHooks/InputHooks';
import { Link } from 'react-router-dom';
import { BGColor, PColor } from '../../assets/colors';
import { IconLogo } from '../../assets/icons/icons';
import {
    Container,
    Card,
    ContentUser,
    ContentUserImg,
    InputContainer,
    Name,
    ContentMessage,
    Message,
    HeaderMessage,
    Input,
    ContainerMessage,
    CardMessage,
    ContentMessageShow,
    LeftMenu,
    Text,
    CardTwo,
    ContainerBurger,
} from './styled';

export const Messages = ({ data, setSelectedUser, messageData, loading, auth, selectedUser, er, handleSendMessage, values, handleChange, search, handleChangeFilter, OneUser, show, setShow }) => {
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
                    <ContentUser bg={selectedUser === x?.name} key={x.id} onClick={() => setSelectedUser(x?.name)} onDoubleClick={() => setShow(!show)}>
                        <ContentUserImg>
                            {x?.name?.slice(0, 2).toUpperCase()}
                        </ContentUserImg>
                        <div>
                            <Name>{x?.name}</Name>
                            <Name>{x?.latestMessage?.content}</Name>
                        </div>
                    </ContentUser>
                ))}
            </Card>
            <ContainerMessage>
                <CardMessage ms>
                    <div>
                        {selectedUser &&
                            <HeaderMessage>
                                <ContentUserImg onClick={() => setShow(!show)}>
                                    {selectedUser?.slice(0, 2).toUpperCase()}
                                </ContentUserImg>
                                <Name size='20px'>{selectedUser}</Name>
                            </HeaderMessage>
                        }
                        <ContentMessageShow>
                            {messageData?.length > 0 ? messageData?.map(index => (
                                <ContentMessage user={auth?.auth?.uUsername} messageUser={index.from} key={index.uuid}>
                                    <Message user={auth?.auth?.uUsername} messageUser={index.from}>{index?.content}</Message>
                                </ContentMessage>
                            )) : null}
                        </ContentMessageShow>
                    </div>
                    {selectedUser && <form onSubmit={handleSendMessage}>
                        <InputContainer>
                            <InputHooks
                                padding='0'
                                type="text"
                                errors={values?.content}
                                value={values?.content}
                                onChange={handleChange}
                                placeholder="Aa"
                                name='content'
                            />
                        </InputContainer>
                    </form>}
                </CardMessage>
                <LeftMenu show={show}>
                    <HeaderMessage>
                        <ContainerBurger onClick={() => setShow(!show)}>
                            <div className="BurgerMenu__container" role="button" >
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </ContainerBurger>
                        <Text size='16px'>Info. Del Usuario</Text>
                    </HeaderMessage>
                    <CardTwo>
                        <ContentUserImg width={'150px'} height={'150px'}>
                            <Text>{OneUser?.name?.slice(0, 2).toUpperCase()}</Text>
                        </ContentUserImg>
                        <CardMessage card>
                            <Text size='16px' >{OneUser?.email}</Text>
                            <Text size='16px' >{OneUser?.name}</Text>
                            <Text size='16px' >{OneUser?.description}</Text>
                            <Text bgColor='transparent' color='red'>{OneUser?.siteWeb}</Text>
                            {OneUser?.uPhoNum && <Text bgColor='transparent' color='red' widthButton='100%' color={BGColor}>{OneUser?.uPhoNum}</Text>}
                            <Link to={`/u/${ OneUser?.username }`}><IconLogo color={PColor} size={30} />Visitar Perfil</Link>
                        </CardMessage>
                    </CardTwo>
                </LeftMenu>
            </ContainerMessage>
        </Container>
    )
}