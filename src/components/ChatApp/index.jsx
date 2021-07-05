import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import { RippleButton } from '../Ripple'
import { GET_MESSAGES, POST_MESSAGE } from '../../container/Chat/Querys'
import useAuth from '../hooks/useAuth'
import { Content, Overline } from './styled'
import { IconSendMessageTwo, IconLogo } from '../../assets/icons/icons'
import SvgComponent from './svg'

export const Messages = ({ user }) => {
    const { auth } = useAuth()
    const [show, setShow] = useState(false)
    useEffect(() => {
        const body = document.body
        body.addEventListener('keyup', e => e.code === 'Escape' && setShow(false))
        return () => body.removeEventListener('keyup', () => setShow)

    }, [setShow])
    const location = useLocation()
    useEffect(() => {
        setShow(false)
    }, [location]);
    const { data, loading, error } = useQuery(GET_MESSAGES, { pollInterval: 10, })
    if (error) return <h1>Error</h1>

    return (
        <>
            {loading && <>Cargando</>}
            <Overline onClick={() => setShow(!true)} show={show} />
            {auth && <Content >
                {data?.messages.length > 0 ? data?.messages.map(({ id, user: messageUser, content }) => (
                    <ContainerChat user={user} id={id} content={content} messageUser={messageUser} >
                        {messageUser !== user &&
                            <User > {messageUser.slice(0, 2).toUpperCase()}
                            </User>}
                        <Message>
                            {messageUser !== user &&
                            <ToolTipText >{messageUser}</ToolTipText>}
                            {content}
                        </Message>
                    </ContainerChat>
                )) : <SvgComponent />}
            </Content>}
        </>
    )
}
export const Chat = () => {
    const { auth } = useAuth()
    const [state, stateSet] = useState({
        user: auth?.Uname,
        content: '',
    });
    const [postMessage] = useMutation(POST_MESSAGE);

    const messagesEndRef = useRef(null)
    const input = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    const bottomRef = useRef();

    const scrollToBottomT = () => {
        bottomRef?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };
    const onSend = () => {
        if (state.content.length > 0) {
            postMessage({
                variables: state,
            });
        }
        stateSet({
            ...state,
            content: '',

        });
        scrollToBottom();
        input.current.focus();
        messagesEndRef?.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        scrollToBottom()
        scrollToBottomT()
    };
    useEffect(() => {
        messagesEndRef?.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        scrollToBottom()
        scrollToBottomT()
        input.current.focus();
    }, []);
    return (
        <Content>
            <Messages user={state?.user} hour={state?.hour} />
            <ContainerSendMessages ref={messagesEndRef} >
                <div style={{ width: '80%' }}>
                    <Input ref={input} placeholder='Aa' label="Content" value={state.content} onChange={evt => stateSet({ ...state, content: evt.target.value })} onKeyUp={evt => { if (evt.keyCode === 13) { onSend(); } }}
                    />
                </div>
                <div ref={bottomRef} style={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
                    <RippleButton padding='5px' bgColor='transparent' onClick={() => onSend()} style={{ width: '100%' }} >
                        {state?.content ? <IconSendMessageTwo size='40px' /> : <IconLogo color='red' size='40px' />}
                    </RippleButton>
                </div>
            </ContainerSendMessages>
        </Content>
    );
};

// const CardInfoUser = styled.div`
//     position: absolute;
// /* justify-content: ${ ({ messageUser, user }) => messageUser === user ? 'flex-end' : 'flex-start' }; */
// `
const ContainerChat = styled.div`
    width: 70%;
    padding-bottom: 1em;
    display: flex;
    justify-content: ${ ({ messageUser, user }) => messageUser === user ? 'flex-end' : 'flex-start' };
`
const Input = styled.input`
    padding: 10px;
    outline: 0;
    border: 1px solid #eee;
    font-weight: 200;
    font-size: 13px;
    width: 100%;
    border-radius: 5px;
`
const User = styled.div`
    height: 50px;
    width: 50px;
    margin-right: 0.5em;
    border: 2px solid #e5e6ea;
    border-radius: 25px;
    text-align: center;
    font-size: 18pt;
    position: relative;
    padding-top: 5px;
    /* background-color: ${ ({ user, messageUser }) => user === messageUser ? 'red' : 'blue' }; */
`

const ContainerSendMessages = styled.div`
    background-color:#94969c;
    background-color: ${ ({ theme }) => `${ theme.InvColor }32` };
    max-Width: 100%;
    padding: 1em;
    display: flex;
    flex-direction: row;
    width: 100%;
`
const ToolTipText = styled.span`
    visibility: hidden;
    background-color: #050505c1;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    bottom: 25%;
    left: 100%;
    padding: 5px;
    display: flex;
    flex-wrap: nowrap;
`
// const Message = styled.div`
//     background-color:#e5e6ea;
//     max-Width: 60%;
//     color: black;
//     position: relative;
//     padding: 1em;
//     background-color:#e5e6ea;
//     border-radius: 1em;
//     &:hover > ${ ToolTipText } {
//         visibility: 'visible'
//     }
// `
const Message = styled('div')({
    position: 'relative',
    maxWidth: '60%',
    color: 'black',
    padding: '1em',
    backgroundColor: '#e5e6ea',
    borderRadius: '1em',
    display: 'inline-block',
    ':hover span': {
        visibility: 'visible'
    }
});