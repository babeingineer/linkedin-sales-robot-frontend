import React, { useState } from 'react';

import CustomPortal from '../../components/CustomPortal';
import LoadingIcon from '../../base-components/LoadingIcon';

interface ISpinnerContext {
    loading: boolean;
    setLoading: (_: boolean) => void;
}

export const SpinnerContext = React.createContext<ISpinnerContext>({
    loading: false,
    setLoading: () => { }
})

interface ISpinnerProviderProps {
    children: React.ReactNode
}

function Main({
    children
}: ISpinnerProviderProps) {
    const [loading, setLoading] = useState(false);
    return <SpinnerContext.Provider value={{ loading, setLoading }}>
        {children}
        {loading && <CustomPortal>
            <div className="fixed w-screen h-screen top-0 flex items-center justify-center bg-slate-700/30 z-[100] backdrop-blur-sm">
                <LoadingIcon icon="puff" className="w-8 h-8" color='white' />
            </div>
        </CustomPortal>}
    </SpinnerContext.Provider>
}

export default Main;