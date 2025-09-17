import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CarListContext } from "../context/CarListContext";
import CarListItem from "./CarListItem";
import mediaQueries from "../mediaQueries.ts";

const CarListComponentContainer = styled.div`
    padding: 4rem 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: auto;
    padding: 1rem;
    max-width: 1280px;
    position: relative;
    z-index: 1;

    @media only screen and ${mediaQueries.sm} {
        padding: 40px;
    }
`;

const CarListHead = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;

    @media only screen and ${mediaQueries.lg} {
        flex-direction: row;
    }
`;

const VendorListMenu = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 8px;
    row-gap: 8px;
    text-align: center;

    @media only screen and ${mediaQueries.sm} {
        display: flex;
        flex-direction: row;
        gap: 0.75rem
    }
`;

const VendorListItem = styled.div`
    font-size: 14px;
    font-weight: 700;
    padding: 12px 32px;
    border-radius: 24px;
    border: 1px solid rgba(17, 17, 17, 0.05);
    color: white;
    background: #333333;
    cursor: pointer;

    ${props =>
        props.isActive == true &&
        css`
        background: #E6356F;
    `}
`;

const DropdownWrapper = styled.select`
    border: 1px solid black;
    border-radius: 20px;
    padding: 12px;
    font-size: 16px;
`;

const CarListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    column-gap: 24px;
    row-gap: 24px;

    @media only screen and ${mediaQueries.sm} {
        grid-template-columns: repeat(2, 1fr);
    }

    @media only screen and ${mediaQueries.lg} {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const CarListComponent = () => {
    const { vendorList, carList, setSelectedItem, listDataRefined, setListDataRefined } = useContext(CarListContext);
    let uniqueVendorList = [...new Set(vendorList)];

    const allTabValue = 'ALL';
    const [selectedTab, setSelectedTab] = useState(allTabValue);

    useEffect(() => {
         setListDataRefined(carList);
    }, []);

    const handleMenuTabChange = (selectedTab) => {
        setSelectedTab(selectedTab)
    }

    const handleSortChange = (sortVal) => {
        console.log('sortVal: ', sortVal)
    }

    useEffect(() => {
        if (selectedTab == allTabValue) {
            setListDataRefined(carList);
        } else {
            let result = carList?.filter((car) => car.Vendor == selectedTab);
            setListDataRefined(result);
        }
    }, [selectedTab, carList]);

    return (
        <CarListComponentContainer className="animated animatedFadeInUp fadeInUp">
            <CarListHead>
                {uniqueVendorList && (
                    <VendorListMenu>
                        <VendorListItem isActive={selectedTab == allTabValue} key={`vendor-list-item-0`} className="vendor-list-item" onClick={() => handleMenuTabChange(allTabValue)}>{allTabValue}</VendorListItem>
                        {uniqueVendorList?.map((vendor, index) => (
                            <VendorListItem isActive={selectedTab == vendor} key={`vendor-list-item-${index + 1}`} className="vendor-list-item" onClick={() => handleMenuTabChange(vendor)}>{vendor}</VendorListItem>
                        ))}
                    </VendorListMenu>
                )}

                <DropdownWrapper name="sort-by-price">
                    <option value="" onClick={() => handleSortChange('default')}>Sort by Price</option>
                    <option value="lowest" onClick={() => handleSortChange('lowest')}>Lowest to Highest</option>
                    <option value="highest" onClick={() => handleSortChange('highest')}>Highest to Lowest</option>
                </DropdownWrapper>
            </CarListHead>

           {listDataRefined && <CarListWrapper>
                {listDataRefined?.map((listItem, index) => (
                    <CarListItem listItem={listItem} index={index} />
                ))}
            </CarListWrapper>}
        </CarListComponentContainer>
    )
}

export default CarListComponent
