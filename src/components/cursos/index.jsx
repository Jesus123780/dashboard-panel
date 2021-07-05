import { useLazyQuery, useQuery } from '@apollo/client';
import React from 'react'
import { GET_COURSES } from '../../gql/cursos';
import { GET_BOOKS } from '../../gql/libros';

export const Books = () => {
    const { data, loading, error } = useQuery(GET_COURSES);
    const [getBooks, { data: dataBooks, loading: loadBooks, error: errBooks }] = useLazyQuery(GET_BOOKS)
    return (
        <div>
            {!!((loading && !error) || (loading && !error)) && <span>Cargando datos...</span>}
            {data?.courses?.map(courses => <span key={courses.id}>{courses.title}<br />{courses.description}<br />{courses.description}<br />{courses.topic}</span>)}
            <h1>lista de libros</h1>

            <button onClick={() => getBooks()}>obtener libros</button>

            {!!((loading && !error) || (loadBooks && !errBooks)) && <span>Cargando Libros...</span>}
            {dataBooks?.books?.map(books => <span key={books.id}>{books.description}, {books.title}<br /></span>)}
        </div>
    )
}
// use useLazyQuery se ejecuta cuando espera una acción