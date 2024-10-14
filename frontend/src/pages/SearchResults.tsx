import { useSearchParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import QueryState from '../components/QueryState';
import { useFetch } from '../hooks/useFetch';
import Products from '../components/Products';
import { queryStates } from '../constants/constants';
import { useEffect } from 'react';
import '../styles/searchResults.sass';

// Definición de la interfaz Product
interface Product {
    id: string;
    title: string;
    price: { amount: number };
    picture: string;
}

// Definición del tipo de respuesta de la API
interface SearchResultsResponse {
    items: Product[];
    categories: string[];
}

export default function SearchResults() {
    const url = import.meta.env.VITE_URL;
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search');
    const navigate = useNavigate();
    const data = queryStates;
    const { data: responseData, error, loading, fetchData } = useFetch<SearchResultsResponse>();
    
    function handleNavigate(path: string) {
        navigate(path);
    }

    // Solo hacer fetch si existe query
    useEffect(() => {
        if (query?.trim()) {
            fetchData(`${url}/api/items?q=${query}`);
        }
    }, [query, fetchData]);

    if (error) {
        return <QueryState title={data.QueryState.Error.title} text={error} />;
    }

    if (loading) {
        return (
            <QueryState
                title={data.QueryState.LoadSearch.title}
                text={data.QueryState.LoadSearch.text}
            />
        );
    }

    return (
        <div className="search-main-container">
            <Breadcrumb categories={responseData?.categories || []} />
            <div className="search-container">
                <Products products={responseData?.items || []} handleNavigate={handleNavigate} />
            </div>
        </div>
    );
}