import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CarListContext } from "../context/CarListContext";

const CarListComponentContainer = styled.div`
    padding: 4rem 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const CarListHead = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const VendorListMenu = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.75rem
`;

const VendorListItem = styled.div`
    font-size: 14px;
    font-weight: 700;
    padding: 12px 32px;
    border-radius: 20px;
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
    grid-template-columns: repeat(3, 1fr);
    column-gap: 24px;
    row-gap: 24px;
`;

const CarListItem = styled.div`
    padding: 1.5rem 1rem;
    border-radius: 28px;
    border: 1px solid grey;

    .title {
        font-size: 40px;

    }
`;


const CarListComponent = () => {
    const { vendorList, carList } = useContext(CarListContext);
    let uniqueVendorList = [...new Set(vendorList)];

    const allTabValue = 'ALL';
    const [selectedTab, setSelectedTab] = useState(allTabValue);
    const [listData, setListData] = useState();

    useEffect(() => {
         setListData(carList);
    }, []);

    const handleMenuTabChange = (selectedTab) => {
        setSelectedTab(selectedTab)
    }

    const handleSortChange = (sortVal) => {
        console.log('sortVal: ', sortVal)
    }

    useEffect(() => {
        if (selectedTab == allTabValue) {
            setListData(carList);
        } else {
            let result = carList?.filter((car) => car.Vendor == selectedTab);
            setListData(result);
        }
    }, [selectedTab, carList]);

    console.log('listDataP ', listData)

    return (
        <CarListComponentContainer>
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
                    <option value="" onClick={() => handleSortChange('default')}>Sort by</option>
                    <option value="lowest" onClick={() => handleSortChange('lowest')}>Lowest to Highest</option>
                    <option value="highest" onClick={() => handleSortChange('highest')}>Highest to Lowest</option>
                </DropdownWrapper>
            </CarListHead>

           {listData && <CarListWrapper>
                {listData?.map((listItem) => (
                    <CarListItem>
                        <div className="upper-section">
                            {listItem?.TotalCharge?.['@RateTotalAmount']}
                        </div>
                    </CarListItem>
                ))}
            </CarListWrapper>}
        </CarListComponentContainer>
    )
}

export default CarListComponent