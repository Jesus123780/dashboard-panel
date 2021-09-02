import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './styles/css/main.css'
import { ChevronDownIcon, ChevronUpIcon, SearchAltIcon } from './icons'

import { BtnDetail, Card, CardBody, InputSearch, Pagination, PaginationItem, PaginationList, Row, RowCol, RowDetails, SearchIcon, SelectEntries, Table, TableResponsive, TBody, Td, Th, THead, ThOrder, Tr } from './styles/styled'

export const ReactTable = ({
    data = [],
    columns = [],
    collapse = false,
    nowrap = false,
    selectable = false,
    resizable = false,
    serverSideRender = false,
    length = 0,
    extraActions = undefined,
    caption = undefined,
    disabled = [],
    isDisabled = undefined,
    renderDetail = undefined,
    alwayCollapse = false,
    orderable = false,
    loading = false,
    renderLoading = undefined,
    striped = false,
    searchable = true,
    init = () => {},
    isSelected = () => {},
    onClickRow = () => {},
    onFilter = () => {},
    onFetch = () => {},
    onOrder = () => {},
}) => {
    const [detailsOpen, setDetailsOpen] = useState([])
    const [selected, setSelected] = useState([])
    const [listLength, setListLength] = useState(10)
    const [currPage, setCurrPage] = useState(1)
    const [dataFilter, setDataFilter] = useState([])
    const [rangeData, setRangeData] = useState({ start: 0, end: listLength})
    const [isMount, setIsMount] = useState(false)
    const [currData, setCurrData] = useState(data)
    const [valueFilter, setValueFilter] = useState('')
    const [currOrder, setCurrOrder] = useState({ index: -1, type: 0 })
    const [tableId] = useState(Math.round(Math.random() * (999999 - 1) + 1))
    const [isResizable, setIsResizable] = useState(false)
    const [serverSideOrder, setServerSideOrder] = useState(false)

    const getCurrentData = () => serverSideRender ? currData : (dataFilter.length || valueFilter ? dataFilter : currData)

    // Obtiene la información de la columna según el path dado ej: user.name
    const resolveData = (path, obj) => path && path.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj)

    // Cuando la tabla es seleccionable verifica que filas están deshabilitadas para la selección.
    // Determina si valida la selección por defecto o si utiliza la función personalizada que recibe por los props
    const resolveDisabled = (row, index) => isDisabled !== undefined ? isDisabled(row, index) : disabled.find(k => k === index) >= 0

    // Calcula el total de páginas según la longitud de los datos y el limite de datos por página.
    const resolvePagination = () => Math.ceil((serverSideRender ? length : getCurrentData().length) / listLength)

    // Calcula la lista de paginas a mostrar en la paginación
    const getPageList = () => {
        let delta = 2, left = currPage - delta, right = currPage + delta + 1, result = []
        result = Array.from({ length: resolvePagination() }, (_, k) => k + 1).filter(i => i && i >= left && i < right)
        return result
    }

    // Si la tabla es seleccionable, agrega marca o desmarca la fila selecciona y ejecuta el evento recibido por props
    const handleClick = (e, row, index) => {
        e.stopPropagation()
        if (resolveDisabled(row, index)) return
        setSelected(prev => {
            const find = serverSideRender ? isSelected(row, index) : prev.find(x => x === index)
            if (serverSideRender ? find : find >= 0) return prev.filter(x => x !== index)
            return [...prev, index]
        })
        onClickRow(row, index)
        console.log(row)
    }

    const handleClickDetail = (e, index) => {
        e.stopPropagation()
        if ((window.screen.width < 992 && collapse) || alwayCollapse) setDetailsOpen(prev => {
                    const find = prev.find(x => x === index)
                    if (find >= 0) return prev.filter(x => x !== index)
                    return [...prev, index]
                })
        
    }


    // Actualiza la pagína actual al hacer click en la paginación
    const handlePagination = (page, noServerSide) => {
        setRangeData({ start: listLength * (page - 1), end: (listLength * (page - 1)) + listLength })
        setCurrPage(page)
        if (serverSideRender && !noServerSide) {
            setCurrData([])
            onFetch(page, listLength, valueFilter, { order: serverSideOrder })
        }
    }
    // Version de handlePagination en useCallback para actualizar la vista cuando la información cambie
    const paginationCallback = useCallback(handlePagination, [listLength, serverSideRender, onFetch, valueFilter, serverSideOrder])

    const handleFilter = e => {
        const { value } = e.target
        setValueFilter(value)
        if (serverSideRender) {
            onFilter(value, listLength)
            setDetailsOpen([])
        } else if (value) {
            const filter = currData.filter(x => !!columns.find(y => `${y?.accessor ? resolveData(y?.accessor, x) : y?.getValue !== undefined ? y?.getValue(x) : ''}`.toLowerCase().indexOf(value.toLowerCase()) > -1))
            setDataFilter(filter)
        } else setDataFilter([])
        handlePagination(1, true)
    }

    const handleOrder = (e, col, index) => {
        e.stopPropagation()
        if ((col.orderable === undefined || col.orderable) && e.target.id === `rt-th-id-${index}`) {
            const type = currOrder.type === 0 ? 1 : 0
            if (serverSideRender) {
                const colToOrder = col?.accessor?.split('.') || ''
                onOrder(col?.accessor && [colToOrder[colToOrder.length - 1] || '', type ? 'ASC' : 'DESC' ], col, index, { page: currPage, length: listLength, search: valueFilter })
                setServerSideOrder(col?.accessor && [col?.accessor || '', type ? 'ASC' : 'DESC' ])
            }
            else {
                const order = (a, b) => {
                    const dataA = col?.accessor ? resolveData(col?.accessor, a) : col?.getValue !== undefined ? col.getValue(a) : '', 
                        dataB = col?.accessor ? resolveData(col?.accessor, b) : col?.getValue !== undefined ? col.getValue(b) : ''
                    if (dataA < dataB) return type ? -1 : 1
                    else if (dataA > dataB) return type ? 1 : -1
                    return 0
                }
                setCurrData(prev => prev.sort(order))
                setDataFilter(prev => prev.sort(order))
            }
            setCurrOrder({ index: index, type })
        }
    }

    const handleChangeListLength = e => {
        setListLength(parseInt(e.target.value))
        onFetch(1, parseInt(e.target.value), valueFilter, { order: serverSideOrder })
    }

    const resizableGrid = () => {
        if (resizable && !isResizable) {
            setIsResizable(true)
            const table = document.getElementById(`rt-table-${tableId}`)
            const row = table.getElementsByTagName('tr')[0],
                cols = row ? row.children : undefined
            
            if (!cols) return

            const createDiv = (height, index) => {
                var div = document.createElement('div')
                div.id = `rt-resize-col-${index}`
                div.style.top = 0
                div.style.right = 0
                div.style.width = '5px'
                div.style.position = 'absolute'
                div.style.cursor = 'col-resize'
                div.style.borderRight = '1px solid #eff2f7'
                div.style.border = '0 1px 0 0 solid #333'
                div.style.userSelect = 'none'
                div.style.height = `${height}px`
                div.classList.add('rt-resize')
                return div
            }

            const setListeners = div => {
                let pageX, curCol, nxtCol, curColWidth, nxtColWidth
                div.addEventListener('mousedown', e => {
                    e.stopPropagation()
                    curCol = e.target.parentElement
                    nxtCol = curCol.nextElementSibling
                    pageX = e.pageX
                    curColWidth = curCol.offsetWidth
                    if (nxtCol) nxtColWidth = nxtCol.offsetWidth
                })

                document.addEventListener('mousemove', e => {
                    e.stopPropagation()
                    if (curCol) {
                        const diffX = e.pageX - pageX
                        if (nxtCol) nxtCol.style.width = `${nxtColWidth - diffX}px`
                        curCol.style.width = `${curColWidth + diffX}px`
                    }
                })

                document.addEventListener('mouseup', e => {
                    e.stopPropagation()
                    curCol = undefined
                    nxtCol = undefined
                    pageX = undefined
                    nxtColWidth = undefined
                    curColWidth = undefined
                })
            }

            for (let i = 0; i < cols.length - 1; i++) {
                const div = createDiv(row.offsetHeight, i)
                cols[i].appendChild(div)
                cols[i].style.position = 'relative'
                setListeners(div)
            }
        }
    }

    useEffect(resizableGrid, [tableId, resizable, isResizable])

    const functions = useMemo(() => ({
        remove: index => {
            setDataFilter(prev => prev.filter(x => x.rtIndex !== index))
            setCurrData(prev => prev.filter(x => x.rtIndex !== index))
            setSelected(prev => prev.filter(x => x !== index))
            setDetailsOpen(prev => prev.filter(x => x !== index))
        },
        reset: data => {
            setDataFilter([])
            setCurrData(data || [])
            setSelected([])
            setDetailsOpen([])
            setCurrPage(1)
            setCurrOrder({ index: -1, type: 0 })
            setRangeData({ start: 0, end: 10})
            setListLength(10)
            setValueFilter('')
        }
    }), [])
    
    useEffect(() => {
        if (!isMount) init(functions)
    }, [init, isMount, functions])

    useEffect(() => {
        if (!isMount && data.length && !serverSideRender) {
            setIsMount(true)
            setCurrData(data.map((x, i) => ({ rtIndex: i, ...x })))
        } else if (serverSideRender) {
            if (loading) setCurrData([])
            else setCurrData(data.map((x, i) => ({ rtIndex: listLength * (currPage - 1) + i, ...x })))
        }
    }, [data, isMount, serverSideRender, listLength, currPage, loading])

    // Refresca la vista cuando los datos cambian
    useEffect(() => {
        if (currData.length || dataFilter.length) {
            const totalPages = Math.ceil((serverSideRender ? length : (dataFilter.length ? dataFilter.length : currData.length)) / listLength) || 1
            if (currPage > totalPages) paginationCallback(totalPages)
       }
    }, [currPage, listLength, paginationCallback, dataFilter, currData, serverSideRender, length])

    useEffect(() => {
        setCurrPage(1)
        setRangeData({ start: 0, end: listLength })
    }, [listLength])
    return <Card className='react-table-container'>
        <CardBody>
            <Row className='rt-mb-2'>
                <RowCol size='rt-sm-12'>
                    <div className='rt-mb-2'>{!!caption && caption}</div>
                </RowCol>
                <RowCol size='rt-sm-4' className='rt-mb-2 rt-mb-sm-none'>
                    {searchable && <div className='rt-me-2 rt-mb-2 rt-d-inline-block rt-w-100 rt-w-sm-auto'>
                        <div className='rt-position-relative'>
                            <InputSearch type='search' placeholder='Buscar...' value={valueFilter} onChange={e => handleFilter(e)} />
                            <SearchIcon><SearchAltIcon /></SearchIcon>
                        </div>
                    </div>}
                </RowCol>
                <RowCol size='rt-sm-8' className='rt-mb-2 rt-mb-sm-none'>
                    <div className='rt-text-sm-end'>
                        {!!extraActions && extraActions}
                    </div>
                </RowCol>
            </Row>
            <Row className='rt-mb-2'>
                <RowCol size='rt-sm-12' className='rt-text-align-center rt-d-sm-flex rt-justify-content-sm-between'>
                    <p>{!!selected.length && `${selected.length} registro${selected.length > 1 ? 's' : ''} seleccionado${selected.length > 1 ? 's' : ''}.`}&nbsp;</p>
                    <label className='rt-d-inline-flex rt-align-items-center'>
                        Mostrar
                        <SelectEntries className='rt-mx-2' value={listLength} onChange={e => handleChangeListLength(e)}>
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                        </SelectEntries>
                        registros
                    </label>
                </RowCol>
            </Row>
            <TableResponsive>
                <Table id={`rt-table-${tableId}`} className='rt-align-middle' nowrap={nowrap}>
                    <THead>
                        <Tr collapse={collapse}>
                            {(collapse || alwayCollapse) && <Td collapse always={alwayCollapse}>&nbsp;</Td>}
                            {columns?.map((x, i) => <Th id={`rt-th-id-${i}`} orderable={x?.orderable === undefined || x?.orderable} key={`rt-th-${i}`} onClick={e => handleOrder(e, x, i)}>
                                {x?.name}
                                {orderable && (x.orderable === undefined || x?.orderable) && <ThOrder>
                                    <ChevronUpIcon size='24px' color={currOrder.index === i && currOrder.type === 1 ? '#495057' : '#c9cbce'} />
                                    <ChevronDownIcon size='24px' color={currOrder.index === i && currOrder.type === 0 ? '#495057' : '#c9cbce'}  />
                                </ThOrder>}
                            </Th>)}
                        </Tr>
                    </THead>
                    <TBody>
                        {loading && <Tr><Td colSpan='100%'>{renderLoading || <p className='rt-text-align-center'>Cargando...</p>}</Td></Tr>}
                        {!getCurrentData().length && !loading && <Tr><Td colSpan='100%'><p className='rt-text-align-center'>No se ha encontrado ningún resultado.</p></Td></Tr>}
                        {(serverSideRender ? getCurrentData() : getCurrentData().slice(rangeData.start, rangeData.end)).map((x, i) => <React.Fragment key={`rt-tr-${currPage}-${i}`}>
                            <Tr odd={striped && i % 2 === 0} collapse={collapse} selectable={selectable} selected={serverSideRender ? isSelected(x, x.rtIndex) : selected.find(k => k === x.rtIndex) >= 0} disabled={resolveDisabled(x, x.rtIndex)} onClick={e => (selectable && !resolveDisabled(x, x.rtIndex)) && handleClick(e, x, x.rtIndex)}>
                                {(collapse || alwayCollapse) && <Td collapse always={alwayCollapse}><BtnDetail alwayCollapse={alwayCollapse} onClick={e => handleClickDetail(e, x.rtIndex)}>{detailsOpen.find(n => n === x.rtIndex) >= 0 ? '-' : '+'}</BtnDetail></Td>}
                                {columns?.map((y, j) => <Td key={`rt-td-${currPage}-${j}`} title={y?.accessor && !y?.render ? resolveData(y?.accessor, x) : ''}>
                                    {y?.accessor && !y?.render && resolveData(y?.accessor, x)}
                                    {y?.render && typeof y?.render === 'function' && y?.render(x, x.rtIndex, y)}
                                    {!y?.render && y?.getValue && typeof y?.getValue === 'function' && y?.getValue(x)}
                                </Td>)}
                            </Tr>
                            {(collapse || alwayCollapse) && <Tr alwayCollapse={alwayCollapse} child={true} show={detailsOpen.find(n => n === x.rtIndex) >= 0}>
                                <Td colSpan='100%'>
                                    {alwayCollapse && renderDetail !== undefined
                                        ? renderDetail(x, x.rtIndex)
                                        : <RowDetails alwayCollapse={alwayCollapse}>
                                            {columns?.map((y, j) => <li key={`rt-detail-${currPage}-${j}`}>
                                                <span className='rt-detail-title'>{y?.name}</span>
                                                {y?.accessor && !y?.render && <span className='rt-detail-data'>{resolveData(y?.accessor, x)}</span>}
                                                {y?.render && typeof y?.render === 'function' && y?.render(x, x.rtIndex, y)}
                                                {!y?.render && y?.getValue && typeof y?.getValue === 'function' && y?.getValue(x)}
                                            </li>)}
                                        </RowDetails>
                                    }
                                </Td>
                            </Tr>}
                        </React.Fragment>)}
                    </TBody>
                </Table>
            </TableResponsive>
            {!!getCurrentData().length && <div className='rt-justify-content-center rt-mb-2'>
                {!!valueFilter
                    ? <p>Mostrando {getCurrentData().length} resultados de {serverSideRender ? length : currData?.length} registros.</p>
                    : <p>Mostrando del {rangeData.start + 1} al {rangeData.end > (serverSideRender ? length : getCurrentData().length) ? (serverSideRender ? length : getCurrentData().length) : rangeData.end} de {serverSideRender ? length : getCurrentData().length} resultados.</p>}
            </div>}
            <Pagination className='rt-justify-content-end rt-mb-2'>
                <PaginationList>
                    {(serverSideRender || !!getCurrentData().length) && <>
                        <li>
                            <PaginationItem onClick={() => handlePagination(currPage - 1)} disabled={currPage === 1}><span>«</span></PaginationItem>
                        </li>
                        {getPageList().map(x => <li key={`rt-page-item-${currPage}-${x}`}>
                            <PaginationItem onClick={() => x !== currPage && handlePagination(x)} active={x === currPage}>{x}</PaginationItem>
                        </li>)}
                        <li>
                            <PaginationItem onClick={() => handlePagination(currPage + 1)} disabled={currPage === resolvePagination()}><span>»</span></PaginationItem>
                        </li>
                    </>}
                </PaginationList>
            </Pagination>
        </CardBody>
    </Card>
}