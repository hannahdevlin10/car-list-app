import React, { useState } from 'react';

export const CarListContext = React.createContext(null);

export const CarListProvider = ({ children }) => {
    const [carList, setCarList] = useState(false);
    const [vendorList, setVendorList] = useState();

    return (
        <CarListContext.Provider value={{ carList, setCarList, vendorList, setVendorList }}>
            { children }
        </CarListContext.Provider>
    )
}