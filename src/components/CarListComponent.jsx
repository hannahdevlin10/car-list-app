import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CarListContext } from "../context/CarListContext";
import CarListItem from "./CarListItem";
import mediaQueries from "../mediaQueries.ts";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

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

    // CSS Overrides
    [class*="MuiOutlinedInput"] {
        border-radius: 24px;
        width: 99%;
        padding: 0.25rem 0 0.25rem 0.5rem;
        margin-right: 0;

        @media only screen and ${mediaQueries.sm} {
            width: 200px;
            margin-right: 0.75rem;
        }
    }
    .css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline { 
        border-color: #E6356F !important;
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
    align-items: center;

    @media only screen and ${mediaQueries.sm} {
        display: flex;
        flex-direction: row;
        gap: 0.75rem;
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
    height: fit-content;

    ${props =>
        props.isActive == true &&
        css`
        background: #E6356F;
    `}
`;

const CarListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    column-gap: 1rem;
    row-gap: 1rem;

    @media only screen and ${mediaQueries.sm} {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 24px;
        row-gap: 24px;
    }

    @media only screen and ${mediaQueries.lg} {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const CarListComponent = () => {
    const selectValues = {
        sortBy: 'Sort by',
        lowest: 'Lowest to Highest',
        highest: 'Highest to Lowest'
    }

    const { vendorList, carList, listDataRefined, setListDataRefined } = useContext(CarListContext);
    let uniqueVendorList = [...new Set(vendorList)];

    const allTabValue = 'ALL';
    const [selectedTab, setSelectedTab] = useState(allTabValue);
    const [selectedPriceSort, setSelectedPriceSort] = useState(selectValues.sortBy);

    useEffect(() => {
         setListDataRefined(carList);
    }, []);

    const handleMenuTabChange = (selectedTab) => {
        setSelectedTab(selectedTab)
    }

    const handleSortChange = (e) => {
        setSelectedPriceSort(e.target.value);
    }

    useEffect(() => {
        const parsePrice = x => parseFloat(x.replace(/^\$/, '')) || 0;
        const sortedItemsLowest = listDataRefined && listDataRefined
            .slice()
            .sort((a, b) => parsePrice(a.TotalCharge['@RateTotalAmount']) - parsePrice(b.TotalCharge['@RateTotalAmount']));

        if (selectedPriceSort == selectValues.lowest) {
            setListDataRefined(sortedItemsLowest);
        }
        if (selectedPriceSort == selectValues.highest) {
            setListDataRefined(sortedItemsLowest.reverse());
        }
        if (selectedPriceSort == selectValues.sortBy) {
            setListDataRefined(carList);
        }
    }, [selectedPriceSort]);

    useEffect(() => {
        setSelectedPriceSort(selectValues.sortBy);
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
                <FormControl>
                    <Select
                        id="select-small"
                        value={selectedPriceSort}
                        onChange={handleSortChange}
                    >
                        <MenuItem value={selectValues.sortBy}>{selectValues.sortBy}</MenuItem>
                        <MenuItem value={selectValues.lowest}>{selectValues.lowest}</MenuItem>
                        <MenuItem value={selectValues.highest}>{selectValues.highest}</MenuItem>
                    </Select>
                </FormControl>
            </CarListHead>

           {listDataRefined && <CarListWrapper>
                {listDataRefined?.map((listItem, index) => (
                    <CarListItem listItem={listItem} index={index} isGridVariant={true} />
                ))}
            </CarListWrapper>}
        </CarListComponentContainer>
    )
}

export default CarListComponent
