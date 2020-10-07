import React from 'react';
import {createContext} from 'react';
import {useState} from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({children}) => {

    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{
            loading,
            setLoading
        }}>
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingContext;