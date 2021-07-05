import { useState, useRef } from 'react'

export const DashboardC = () => {
    const textareaRef = useRef(null)
    const [copyState, setCopyState] = useState('')

    const handleClick = () => {
        if (textareaRef.current) {
            textareaRef.current.focus()
            textareaRef.current.select()
            try {
                const wasSuccessful = document.execCommand('copy')
                setCopyState(wasSuccessful ? '👍 Text copied' : 'Unable to copy :(')
            } catch (err) {
                setCopyState('Error happened')
            }
            textareaRef.current.blur()
        }
    }

    return (
        <Dashboard
            handleClick={handleClick}
            copyState={copyState}
            textareaRef={textareaRef}
        />
    )
}