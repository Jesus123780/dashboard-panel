import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { ButtonDelete, DropZone, FileText, Image, ImgCont, InputFile, Label, Preview, Box } from './styled'

export const InputFilesProductos = ({ onChange, reset }) => {
    const [images, setImages] = useState([])
    const [previewImg, setPreviewImg] = useState([])
    const fileInputRef = useRef(null)

    const onFileInputChange = event => {
        const { files } = event.target
        setImages([...images, ...files])
        onChange([...images, ...files])

        let newFiles = []
        for (let i = 0; i < files.length; i++) newFiles = [...newFiles, files[i]]

        let newFilesPreview = []
        for (let i = 0; i < newFiles.length; i++) {
            newFilesPreview = [
                ...newFilesPreview,
                {
                    temPath: URL.createObjectURL(files[i]),
                    name: files[i]?.name,
                    ext: files[i]?.name?.substring(files[i]?.name?.lastIndexOf('.'), files[i]?.name?.length)
                }
            ]
        }

        setPreviewImg([
            ...previewImg,
            ...newFilesPreview
        ])
    }

    useEffect(() => {
        if (reset){
            setImages([])
            setPreviewImg([])
        }
    }, [reset])

    const handleDelete = (e, item, index) => {
        e.stopPropagation()
        const newImages = images.filter((x, i) => (x.name !== item.name && i !== index))
        const previewNewImages = previewImg.filter((x, i) => (x.temPath !== item.temPath && i !== index))

        setImages(newImages)
        setPreviewImg(previewNewImages)
    }

    // const onTargetClick = () => {
    //     fileInputRef.current.click()
    // }
    return (
        <>
            <Box>
                <InputFile
                    onChange={onFileInputChange}
                    ref={fileInputRef}
                    id="dropZone"
                    type="file"
                    multiple
                />
                <DropZone
                    onClick={e => {
                        e.stopPropagation()
                        document.getElementById('dropZone').click()
                    }}>
                    {!previewImg?.length && (
                        <Label>Click para subir Archivos</Label>
                    )}
                    <Preview>
                        {!!previewImg?.length && previewImg?.map((x, i) => (
                            <Fragment key={i}>
                                <ImgCont title={x.name}>
                                    <ButtonDelete onClick={e => handleDelete(e, x, i)}>
                                        <i>Delete</i>
                                    </ButtonDelete>
                                    {(x.ext === '.png' || x.ext === '.svg' || x.ext === '.jpg' || x.ext === '.jpeg') ?
                                        <Image src={x?.temPath} />
                                        : (x.ext === '.docx' || x.ext === '.docm' || x.ext === '.dotx' || x.ext === '.dotm') ?
                                            <i>DocWord</i>
                                            : (x.ext === '.xlsx' || x.ext === '.xlsm' || x.ext === '.xlsb' || x.ext === '.xltx' || x.ext === '.xls') ?
                                                <i>Execl</i>
                                                : <i>FILE COMUN</i>
                                    }
                                    <FileText>{x.name}</FileText>
                                </ImgCont>
                            </Fragment>
                        ))}
                    </Preview>
                </DropZone>
            </Box>
        </>
    )
}

InputFilesProductos.propTypes = {
    onChange: PropTypes.func.isRequired,
    reset: PropTypes.bool
}