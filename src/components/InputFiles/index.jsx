
import { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
export const InputFiles = () => {
    const [images, setImages] = useState([])
    const [previewImg, setPreviewImg] = useState([])
    const fileInputRef = useRef(null);
    const onFileInputChange = event => {
        const { files } = event.target;
        setImages([...images, ...files])
        let newFiles = []
        for (let i = 0; i < files.length; i++) {
            newFiles = [...newFiles, files[i]]
        }
        setPreviewImg([...previewImg, ...newFiles.map(x => URL.createObjectURL(x))])
        // do something with your files...
    }
    // const onTargetClick = () => {
    //     fileInputRef.current.click()
    // }
    return (<>
        <Box>
            <InputFile
                onChange={onFileInputChange}
                ref={fileInputRef}
                id='dropZone' type='file'
                multiple
                accept=".jpg, .png"
            />
            <DropZone onClick={() => document.getElementById('dropZone').click()}>
                {!previewImg?.length &&
                    <Label >Click para subir Archivos</Label>
                }
                <Preview>
                    {!!previewImg?.length && previewImg?.map((x, i) =><>
                        <ImgCont>
                            <Image key={ i } src={previewImg[i]}/>
                        </ImgCont>
                    </>
                    )
                    }
                </Preview>
            </DropZone>
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
const Label = styled.label`
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
    cursor: pointer;
`
const InputFile = styled.input`
    display: none;
`
const DropZone = styled.div`
    min-height: 150px;
    cursor: pointer;
    background-color: ${ ({ theme }) => theme.TColor };
    border: 2px dashed rgba(0, 0, 0, 0.1);
    display: grid;
    box-sizing: border-box;

`
const Preview = styled.div`
    position: relative;
    display: flex;
    vertical-align: top;
    margin: 16px;
    min-height: 100px;
    flex-flow: wrap;
`
const ImgCont = styled.div`
    border-radius: 20px;
    overflow: hidden;
    width: 120px;
    height: 120px;
    position: relative;
    display: block;
    z-index: 10;
    margin: 10px 12px;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

// const Progress = styled.div`
//     background: linear-gradient(to bottom, #666, #444);
//     position: absolute;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     width: 100%;
// `
// const SpanCont = styled.div`
//     overflow: hidden;
//     text-overflow: ellipsis;
// `
// const Span = styled.span`
//     background-color: rgba(255,255,255,0.4);
//     padding: 0 0.4em;
//     border-radius: 3px;
// `