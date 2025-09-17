import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { CarListContext } from '../context/CarListContext';
import avis from '../assets/avis.png';
import alamo from '../assets/alamo.png';
import hertz from '../assets/hertz.png';
import transmission from '../assets/transmission.svg';
import fuel from '../assets/fuel.svg';
import person from '../assets/person.svg'
import { CarListItemStyle, PriceWrapper, VendorLogo } from '../CommonStyles';

const StatusIcon = styled.div`
    padding: 0.5rem;
    border: 1px solid #c1bfbfff;
    display: flex;
    border-radius: 1.5rem;
    background: rgba(0, 0, 0, 0.8);
    width: fit-content;
    gap: 0.25rem;
    justify-content: space-between;
    position: absolute;
    right: 0;
    top: 0;

    .status-icon {
        border-radius: 2.5rem;
        width: 0.5rem;
        height: 0.5rem;
        margin: auto 0;

        ${props =>
            props.iconColor &&
            css`
            background-color: ${props.iconColor};
        `}
    }
    .status-text {
        font-size: 0.75rem;
        color: white;

    }
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
                        <img alt="vehicle-picture" src={item?.Vehicle?.PictureURL} />
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
                            <img alt="vehicle-icon" className="car-detail-icon" src={transmission} />Transmission
                        </span>
                        <span className="car-detail-item-text">{item?.Vehicle['@TransmissionType']}</span>
                    </div>

                    <div className="car-detail-item">
                        <span className="car-detail-label">
                            <img alt="car-detail-icon" className="car-detail-icon" src={fuel} />Fuel
                        </span>
                        <span className="car-detail-item-text">{item?.Vehicle['@FuelType']}</span>
                    </div>

                    <div className="car-detail-item">
                        <span className="car-detail-label">
                            <img alt="car-detail-icon" className="car-detail-icon" src={person} />Passenger Quantity
                        </span>
                        <span className="car-detail-item-text">{item?.Vehicle['@PassengerQuantity']}</span>
                    </div>

                    <PriceWrapper id="price-wrapper-custom">
                        <span className="currency-symbol">{item?.TotalCharge['@CurrencyCode']}</span>
                        <span className="price">{item?.TotalCharge['@RateTotalAmount']}</span>
                    </PriceWrapper>
                </div>
                <div className="car-item-cta">
                    <a href='#' onClick={() => handleSeeMoreClick(idx)}>View More Details</a>
                </div>
            </CarListItemStyle>
        </>
    )
}

export default CarListItem;