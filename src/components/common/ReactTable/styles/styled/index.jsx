import styled, { css } from 'styled-components'

export const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid #f6f6f6;
    border-radius: .25rem;
    margin-bottom: 24px;
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
`

export const CardBody = styled.div`
    flex: 1 1 auto;
    padding: 1.25rem;
`

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(var(--rt-gutter-y) * -1);
    margin-right: calc(var(--rt-gutter-x) / -2);
    margin-left: calc(var(--rt-gutter-x) / -2);
`

export const RowCol = styled.div`
    position: relative;
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-right: calc(var(--rt-gutter-x) / 2);
    padding-left: calc(var(--rt-gutter-x) / 2);
    margin-top: var(--rt-gutter-y);

    @media (min-width: 576px) {
        flex: 0 0 auto;

        ${ ({ size }) => {
        if (size === 'rt-sm-4') return css`width: 33.3333333333%;`
        else if (size === 'rt-sm-8') return css`width: 66.6666666667%;`
        else if (size === 'rt-sm-12') return css`width: 100%;`
    } }
    }
`

export const InputSearch = styled.input`
    border-radius: 30px;
    display: block;
    width: 100%;
    padding: .47rem .75rem .47rem 40px;
    font-size: .8125rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    appearance: none;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin: 0;
    font-family: inherit;

    &:focus {
        color: #495057;
        background-color: #fff;
        border-color: #b9bfc4;
        outline: 0;
        box-shadow: none;
    }
`

export const SelectEntries = styled.select`
    min-height: calc(1.5em + .5rem + 2px);
    padding: .25rem .5rem;
    font-size: .7109375rem;
    border-radius: .2rem;
    display: block;
    width: 100%;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    appearance: none;

    &:focus {
        color: #495057;
        background-color: #fff;
        border-color: #b9bfc4;
        outline: 0;
        box-shadow: none;
    }
`

export const SearchIcon = styled.div`
    position: absolute;
    left: 11px;
    top: 7px;
`

export const Pagination = styled.div`
    display: flex;
    padding-left: 0;
`

export const PaginationList = styled.ul`
    display: flex;
    padding-left: 0;
    list-style: none;
    margin-top: 0;
    margin-bottom: 1rem;
`

export const PaginationItem = styled.a`
    position: relative;
    display: block;
    border-radius: 30px!important;
    margin: 0 3px!important;
    border: none;
    width: 32px;
    height: 32px;
    padding: 0;
    color: var(--rt-table-page-item-color);
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    user-select: none;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;

    ${ ({ disabled }) => disabled && css`
        color: #ced4da;
        pointer-events: none;
        background-color: #fff;
        border-color: #ced4da;
    ` }

    ${ ({ active }) => active && css`
        color: #fff;
        background-color: var(--rt-table-primary-color);
        border-color: var(--rt-table-primary-color);
    ` }

    &:focus,:hover {
        color: var(--rt-table-primary-color);;
        background-color: #eff2f7;
        text-decoration: none;
    }
`

export const TableResponsive = styled.div`
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
`

export const Table = styled.table`
    width: 100%;
    margin-bottom: 1rem;
    color: #495057;
    border-color: #eff2f7;
    caption-side: bottom;
    border-collapse: collapse;

    ${ ({ nowrap }) => nowrap && css`
        & th,& td {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    ` }

    &>:not(:last-child)>:last-child>* {
        border-bottom-color: #eff2f7;
    }

    &>:not(caption)>*>* {
        padding: .75rem;
        background-color: var(--rt-table-bg);
        border-bottom-width: 1px;
        box-shadow: inset 0 0 0 9999px var(--rt-table-accent-bg);
    }
`

export const THead = styled.thead`
    vertical-align: bottom;
`

export const TBody = styled.tbody`
    vertical-align: inherit;
`

export const Tr = styled.tr`
    position: relative;
    ${ ({ child }) => child && css`
        padding: 0.5em 1em;
        display: ${ ({ show }) => show ? 'table-row' : 'none' };
        ${ ({ alwayCollapse }) => !alwayCollapse && css`
            @media (min-width: 992px) {
                display: none;
            }
        ` }
    ` }

    ${ ({ odd }) => odd && css`
        background-color: var(--rt-table-striped-bg);
    ` }

    ${ ({ selectable, selected, disabled }) => {
        if (selectable) {
            if (disabled) return css`background-color: var(--rt-table-disable-bg);`
            if (!selected) {
                return css`
                    cursor: pointer;
                    &:hover {
                        background-color: var(--rt-table-hover-bg);
                    }`
            }
            return css`
                cursor: pointer;
                background-color: var(--rt-table-select-bg);
            `
        }
    } }

    ${ ({ collapse }) => collapse && css`
        &>th:not(:nth-child(1)):not(:nth-child(2)),
        &>td:not(:nth-child(1)):not(:nth-child(2)) {
            display: none;
        }

        @media (min-width: 576px) {
            &>td:nth-child(3),
            &>th:nth-child(3) {
                display: table-cell!important;
            }
        }

        @media (min-width: 768px) {
            &>td:nth-child(4),
            &>th:nth-child(4) {
                display: table-cell!important;
            }
        }

        @media (min-width: 992px) {
            &>td:not(:first-child),&>th:not(:first-child) {
                display: table-cell!important;
            }
        }
    ` }
`

export const Th = styled.th`
    position: relative;
    font-weight: 600;
    text-align: -webkit-match-parent;
    user-select: none;
    ${ ({ orderable }) => orderable && css`
        padding-right: 24px !important;
    ` }
    ${ ({ collapse }) => collapse && css`
        width: 10px;
        ${ ({ always }) => !always && css`
            @media (min-width: 992px) {
                display: none!important;
            }
        ` }
    ` }
`

export const Td = styled.td`
    position: relative;
    max-width: 230px;
    ${ ({ collapse }) => collapse && css`
        width: 10px;
        ${ ({ always }) => !always && css`
            @media (min-width: 992px) {
                display: none!important;
            }
        ` }
    ` }
    padding: .75rem;
    background-color: var(--tr-table-bg);
    border-bottom-width: 1px;
    box-shadow: inset 0 0 0 9999px var(--tr-table-accent-bg);
`

export const RowDetails = styled.ul`    
    display: inline-block;
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
    list-style: none;
    transition: .14s linear;
    &>li {
        border-bottom: 1px solid #efefef;
        padding: 0.5em 0;
        text-indent: 0;
    }

    &>li:last-child {
        border-bottom: none;
    }

    &>li:first-child{
        display: none;
    }

    ${ ({ alwayCollapse }) => !alwayCollapse && css`
        @media (min-width: 576px) {
            &>li:first-child,&>li:nth-child(2){
                display: none;
            }
        }

        @media (min-width: 768px) {
            &>li:first-child,&>li:nth-child(2),&>li:nth-child(3){
                display: none;
            }
        }

        @media (min-width: 992px) {
            display: none;
            &>li {
                display: none!important;
            }
        }
    ` }
`

export const BtnDetail = styled.button`
    border: none;
    outline: none;
    padding: 0;
    background-color: var(--rt-table-primary-color);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    text-align: center;
    align-items: center;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    cursor: pointer;

    ${ ({ alwayCollapse }) => !alwayCollapse && css`
        @media (min-width: 992px) {
            display: none;
        }
    ` }
`

export const ThOrder = styled.div`
    position: absolute;
    right: 0;
    top: 7px;
    display: block;
    height: 30px;
    width: 30px;
    display: flex;
    flex-direction: column;
`