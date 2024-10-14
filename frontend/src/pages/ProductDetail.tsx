import { useParams } from 'react-router-dom';
import QueryState from '../components/QueryState';
import { useFetch } from '../hooks/useFetch';
import { queryStates } from '../constants/constants';
import { useEffect } from 'react';

export default function ProductDetail() {
    const url = import.meta.env.VITE_URL;
    const { id } = useParams();
    const data = queryStates;
    const { data: productSSR, error, loading, fetchData } = useFetch<string>();

    // Solo hacer fetch si existe un id
    useEffect(() => {
        if (id) {
            fetchData(`${url}/api/items/${id}`);
        }
    }, [id, fetchData]);

    if (error) {
        return <QueryState title={data.QueryState.Error.title} text={error} />;
    }

    if (loading || !productSSR) {
        return (
            <QueryState
                title={data.QueryState.LoadSearch.title}
                text={data.QueryState.LoadSearch.text}
            />
        );
    }

    // Esto es una mala práctica porque no está sanitizado 'productSSR'
    return <div dangerouslySetInnerHTML={{ __html: productSSR }}></div>;
}