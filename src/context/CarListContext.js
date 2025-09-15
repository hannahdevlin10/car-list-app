import React, { useState } from 'react';

export const CarListContext = React.createContext(null);

export const CarListProvider = ({ children }) => {
    const [carList, setCarList] = useState(false);

    return (
        <CarListContext.Provider value={{ carList, setCarList }}>
            { children }
        </CarListContext.Provider>
    )
}