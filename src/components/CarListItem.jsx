import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { CarListContext } from '../context/CarListContext';
import avis from '../assets/avis.png';
import alamo from '../assets/alamo.png';
import hertz from '../assets/hertz.png';
import transmission from '../assets/transmission.svg';
import fuel from '../assets/fuel.svg';
import person from '../assets/person.svg'

export const CarListItemStyle = styled.div`
    padding: 1rem 0.5rem;
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
        margin-bottom: 1rem;

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
    .car-item-cta {
        padding: 0.5rem;
        background: #E6356F;
        color: white;
        font-weight: 600;
        text-decoration: none;
        border-radius: 24px;
        text-align: center;
        width: fit-content;
        margin: auto;
        cursor: pointer;

        &:hover {
            background: #f53a79ff;
        }
    }
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

export const VendorLogo = styled.div`
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 70px;
    height: 60px;

    ${props =>
        props.bgImage &&
        css`
        background-image: url("${props.bgImage}");
    `}
`;

export const getVendorLogo = (vendor) => {
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

const CarListItem = (listItem, index) => {
    const { setSelectedItem, listDataRefined } = useContext(CarListContext);
    const item = listItem?.listItem;
    const idx = listItem?.index;

    const handleSeeMoreClick = (carItemIndex) => {
        let selectedItem = listDataRefined[carItemIndex];
        selectedItem && setSelectedItem(selectedItem);
    }

    return (
        <>
            <CarListItemStyle>
                <div className="content">
                    <div className="img-wrapper">
                        <img src={item?.Vehicle?.PictureURL} />
                    </div>
                    <StatusIcon iconColor={item['@Status'] === 'Available' ? 'lime' : 'red'}>
                        <span className="status-icon" />
                        <span className="status-text">{item['@Status']}</span>
                    </StatusIcon>
                </div>
                <div className="head">
                    <div className="car-brand-head">
                        <span className="car-brand">{(item?.Vehicle?.VehMakeModel?.['@Name']).split('or similar')[0]}</span>
                        <span className="similar-text" >or similar</span>
                    </div>
                    <VendorLogo bgImage={getVendorLogo(item?.Vendor)} />
                </div>
                <div className="car-details">
                    <div className="car-detail-item">
                        <span className="car-detail-label">
                            <img className="car-detail-icon" src={transmission} />Transmission
                        </span>
                        <span className="car-detail-item-text">{item?.Vehicle['@TransmissionType']}</span>
                    </div>

                    <div className="car-detail-item">
                        <span className="car-detail-label">
                            <img className="car-detail-icon" src={fuel} />Fuel
                        </span>
                        <span className="car-detail-item-text">{item?.Vehicle['@FuelType']}</span>
                    </div>

                    <div className="car-detail-item">
                        <span className="car-detail-label">
                            <img className="car-detail-icon" src={person} />Passenger Quantity
                        </span>
                        <span className="car-detail-item-text">{item?.Vehicle['@PassengerQuantity']}</span>
                    </div>
                </div>
                <div className="car-item-cta">
                    <a onClick={() => handleSeeMoreClick(idx)}>View More Details</a>
                </div>
            </CarListItemStyle>
        </>
    )
}

export default CarListItem;