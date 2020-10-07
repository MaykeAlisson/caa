import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import LoadingContext from 'Contexts/loading';

export default ({children}) => (
    <LoadingContext.Consumer>{(context) => {
        const {loading} = context;
        const style = loading ? { opacity: '0.2', 'pointerEvents': 'none' } : {};
        return (
            <>
                <div style={style}>
                    {children}
                </div>
                {
                    loading && (
                        <CircularProgress
                            size={50}
                            variant='indeterminate'
                            style={{
                                position: 'absolute',
                                zIndex: '9999',
                                top: '46%',
                                left: '48%',
                            }}
                        />
                    )
                }
            </>
        );
    }}</LoadingContext.Consumer>
);