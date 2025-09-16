import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CarListContext } from "../context/CarListContext";
import avis from '../assets/avis.png';
import alamo from '../assets/alamo.png';
import hertz from '../assets/hertz.png';
import transmission from '../assets/transmission.svg';
import fuel from '../assets/fuel.svg';
import person from '../assets/person.svg'

const CarListComponentContainer = styled.div`
    padding: 4rem 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 1280px;
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
    padding: 0.5rem;
    border-radius: 24px;
    border: 1px solid #EFEFEF;
    box-sizing: border-box;
    background: #FFFFFF;

    .content {
        position: relative;
    }

    .img-wrapper {
        height: 200px;
        border-radius: 28px;
        padding-top: 18px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .head {
        padding: 0.5rem;
        display: flex;
        justify-content: space-between;
    }

    .car-brand-head {
        display: flex;
        flex-direction: column;
        margin: auto 0;

        .car-brand {
            font-size: 28px;
            font-weight: 600;
        }
        .similar-text {
            color: grey;
            font-size: 1rem;
        }
    }
    .car-details {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem 0.5rem;
        margin-top: 1rem;

        .car-detail-item {
            display: flex;
            flex-direction: row;
            gap: 8px;
        }

        .car-detail-label {
            font-size: 16px;
            font-weight: 600;
            .car-detail-icon {
                width: 15px;
                height: 15px;
                margin-right: 3px;
            }
        }

    }

`;

const VendorLogo = styled.div`
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 50px;
    height: 50px;

    ${props =>
        props.bgImage &&
        css`
        background-image: url("${props.bgImage}");
    `}
`;

const StatusIcon = styled.div`
    padding: 0.5rem;
    border: 1px solid #c1bfbfff;
    display: flex;
    border-radius: 24px;
    background: rgba(0, 0, 0, 0.8);
    width: fit-content;
    gap: 0.25rem;
    justify-content: space-between;
    position: absolute;
    right: 0;
    top: 0;

    .status-icon {
        border-radius: 40px;
        width: 8px;
        height: 8px;
        margin: auto 0;

        ${props =>
            props.iconColor &&
            css`
            background-color: ${props.iconColor};
        `}
    }
    .status-text {
        font-size: 12px;
        color: white;

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

    console.log('listData: ', listData)

    const getVendorLogo = (vendor) => {
        if (vendor === 'AVIS') {
            return avis;
        }
        if (vendor === 'HERTZ') {
            return hertz;
        }
        if (vendor === 'ALAMO') {
            return alamo;
        }
    }

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
                        <div className="content">
                            <div className="img-wrapper">
                                <img src={listItem?.Vehicle?.PictureURL} />
                            </div>
                            <StatusIcon iconColor={listItem['@Status'] === 'Available' ? 'lime' : 'red'}>
                                <span className="status-icon" />
                                <span className="status-text">{listItem['@Status']}</span>
                            </StatusIcon>
                        </div>
                         <div className="head">
                            <div className="car-brand-head">
                                <span className="car-brand">{(listItem?.Vehicle?.VehMakeModel?.['@Name']).split('or similar')[0]}</span>
                                <span className="similar-text" >or similar</span>
                            </div>
                            <VendorLogo bgImage={getVendorLogo(listItem?.Vendor)} />
                        </div>
                        <div className="car-details">
                            <div className="car-detail-item">
                                <span className="car-detail-label">
                                    <img className="car-detail-icon" src={transmission} />Transmission
                                </span>
                                <span className="car-detail-item-text">{listItem?.Vehicle['@TransmissionType']}</span>
                            </div>

                            <div className="car-detail-item">
                                <span className="car-detail-label">
                                    <img className="car-detail-icon" src={fuel} />Fuel
                                </span>
                                <span className="car-detail-item-text">{listItem?.Vehicle['@FuelType']}</span>
                            </div>

                            <div className="car-detail-item">
                                <span className="car-detail-label">
                                    <img className="car-detail-icon" src={person} />Passenger Quantity
                                </span>
                                <span className="car-detail-item-text">{listItem?.Vehicle['@PassengerQuantity']}</span>
                            </div>
                        </div>
                    </CarListItem>
                ))}
            </CarListWrapper>}
        </CarListComponentContainer>
    )
}

export default CarListComponent
