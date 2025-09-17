import React, { useState } from 'react';

export const CarListContext = React.createContext(null);

export const CarListProvider = ({ children }) => {
    const [carList, setCarList] = useState(false);
    const [vendorList, setVendorList] = useState();
    const [selectedItem, setSelectedItem] = useState();
    const [listDataRefined, setListDataRefined] = useState();

    return (
        <CarListContext.Provider value={{ carList, setCarList, vendorList, setVendorList, selectedItem, setSelectedItem, listDataRefined, setListDataRefined }}>
            { children }
        </CarListContext.Provider>
    )
}