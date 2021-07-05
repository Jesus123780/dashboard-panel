import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

export const InputTags = ({ name = 'inputTag', id = 'itemKey', onChange = () => {}, valuesDoc }) => {
    const [values, setValues] = useState([])
    const [input, setInput] = useState('')
    
    useEffect(() => {
        valuesDoc && 
        setValues(valuesDoc?.map(x => ({ sName: x?.sName || x?.spName })))
            
    }, [valuesDoc])
   
    const insertTags = () => {
        const newTags = [...values, { [id]: input }]
        setValues(newTags)
        setInput('')
        onChange(name, newTags)
        console.log(...values)
    }
    const handleKeyDown = e => (e.key === 'Enter' && input) && insertTags()

    const handleRemove = index => {
        const newTags = values?.filter((_x, i) => i !== index)
        setValues(newTags)
        onChange(name, newTags)
    }

    return (<>
        <Box>
            <InputTagsS>
                {values?.map((x, i)=> <div key={`input_tag_item_key_${i}`}>
                    <Span>{x[id]}<IconContent onClick={() => handleRemove(i)}>X</IconContent> </Span>
                </div>
                )}
                <InputText placeholder="Escriba Aquí" value={input} onChange={({ target }) => setInput(target?.value)} onKeyDown={handleKeyDown}/>
            </InputTagsS>
        </Box>
    </>
    )
}

const Box = styled.div`
    display: block;
    ${ ({ width }) => width && css`width: ${ width };` }
    flex-direction: ${ ({ direction }) => direction ? direction : 'row' };
    position: relative;
    box-sizing: border-box;
    /* align-items: center; */
`
const InputText = styled.input`
    border: none;
    box-shadow: none;
    outline: none;
    background-color: transparent;
    padding: 0 6px;
    margin: 0;
    width: 100%;
    max-width: inherit;
    display: inline-block;
    max-height: 50px;
    color: ${ ({ theme }) => theme.PColor };

`
const InputTagsS = styled.div`
    border: 1px solid ${ ({ theme }) => theme.InpBorColor };
    background-color: ${ ({ theme }) => theme.TColor };
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    display: flex;
    padding: 4px 6px;
    color: ${ ({ theme }) => theme.InvTColor };
    vertical-align: middle;
    border-radius: 4px;
    max-width: 100%;
    line-height: 20px;
    cursor: text;
    width: 100%;
    ${ ({ maxHeight }) => maxHeight && css`max-height: ${ maxHeight };` }


`
const Span = styled.span`
    background-color: #20c0f3;
    color: #fff;
    display: flex;
    font-size: 14px;
    font-weight: normal;
    margin: 2px;
    padding: 11px 15px;
    border-radius: 0;
    
`
const IconContent = styled.div`
    margin-left: 8px;
    cursor: pointer;
`

InputTags.propTypes = {
    onChange: PropTypes.func,
    error: PropTypes.func,
    numeric: PropTypes.bool,
    letters: PropTypes.bool

}