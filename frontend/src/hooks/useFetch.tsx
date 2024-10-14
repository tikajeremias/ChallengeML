import { useState , useCallback } from 'react';
import axios from 'axios';

export function useFetch<T>() {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Función para hacer fetch bajo demanda
    const fetchData = useCallback((url: string) => {
        setLoading(true);
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((err: any) => {
                console.error(err);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { data, error, loading, fetchData };
}