import { useEffect, useState } from 'react';

const useGetData = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async() => {
            try {
                const resp = await fetch(url);

                if (!resp.ok) {
                    setIsError(true);
                    setIsLoading(false);
                    return;
                }

                const response = resp.json();
                console.log(response);
                setData(response);
            } catch (error) {
                setIsError(true);
            }
        };
        getData();
    }, []);

    return {isLoading, isError, data};
}

export default useGetData;