import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { CarListContext } from "../context/CarListContext";
import door from '../assets/door.svg';
import transmission from '../assets/transmission.svg';
import fuel from '../assets/fuel.svg';
import person from '../assets/person.svg';
import bag from '../assets/bag.svg';
import snow from '../assets/snowflake.svg';
import mediaQueries from '../mediaQueries.ts';
import { PriceWrapper, CarListItemStyle, VendorLogo } from "../CommonStyles";
import { getVendorLogo } from "./CarListItem.jsx";

const FadeBackground = styled.div`
    width: 100%;
    height: 100;
    display: none;

    ${props =>
        props.itemIsSelected &&
        css`
            display: block;
    `}
`;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const ModalInner = styled.div`
    @keyframes fadeIn {
        from {
            opacity: 0
        }
    to {
        opacity: 1
        }
    }

    margin: 5% auto;
    border: 1px solid #888;
    max-width: 59.375rem;
    box-sizing: border-box;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background: linear-gradient(to right, white, white), linear-gradient(to right, rgba(230, 53, 111, 1), rgba(184, 87, 199, 1), rgba(237, 83, 101, 1));
    border: 4px solid transparent;
    border-radius: 2rem;
    -webkit-background-clip: padding-box, border-box;
    z-index: 5;
    animation-name: fadeIn;
    animation-duration: 0.4s;

    @media only screen and ${mediaQueries.lg} {
        margin: 15% auto;
    }
`;

const ModalContent = styled.div`
    .outer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0;
        background: #f1f1f1;
        padding: 1.5rem;
        border-radius: 1.75rem;
        position: relative;

        @media only screen and ${mediaQueries.lg} {
            flex-direction: row;
        }
    }

    .inner {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        order: 2;

        @media only screen and ${mediaQueries.lg} {
             width: 50%;
            order: 1;
        }
    }
`;

const ModalCTAWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media only screen and ${mediaQueries.sm} {
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }

    .modal-cta {
        padding: 0.5rem 1.75rem;
        text-decoration: none;
        border-radius: 1.5rem;
        font-size: 0.875rem;
        cursor: pointer;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
    }

    #back {
        border: 3px solid black;
            &:hover {
                background: white;
            }
        }
    #enquire {
        color: white;
        background: #E6356F;
        &:hover {
            background: #f53a79ff;
        }
    }
`;

const ModalDisplayItemInfo = styled.div`
    .title {
        font-size: 28px;
        font-weight: 600;
    }
`;

const ModalImageWrapper = styled.div`
    border-radius: 1.5rem;
    max-height: 28.125rem;
    width: auto;
    background: white;
    order: 1;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    @media only screen and ${mediaQueries.lg} {
        width: 60%;
        order: 2;
    }
`;

const CarListItemStyleCustom = styled(CarListItemStyle)`
    background: transparent;

    .car-details {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        @media only screen and ${mediaQueries.sm} {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 1.5rem;
            row-gap: 0.75rem;
        }

        @media only screen and ${mediaQueries.lg} {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
    }

    .car-detail-icon {
        margin-right: 0.3125rem !important;
    }
`;

const VendorLogoCustom = styled(VendorLogo)`
    position: absolute;
    right: 2.125rem;
`;

const Modal = (displayItem) => {
    const { setSelectedItem } = useContext(CarListContext);
    let item = displayItem?.displayItem;

    const toggleModel = () => {
        setSelectedItem(undefined);
    }

    return (
        <FadeBackground itemIsSelected={item !== undefined}>
            <ModalContainer>
                <ModalInner>
                    <ModalContent>
                        <div className="outer">
                            <div className="inner">
                                <ModalDisplayItemInfo>
                                    <CarListItemStyleCustom>
                                        <div className="head">
                                            <div className="car-brand-head">
                                               {item?.Vehicle?.VehMakeModel?.['@Name'] && <span className="car-brand">{(item?.Vehicle?.VehMakeModel?.['@Name']).split('or similar')[0]}</span>}
                                                <span className="similar-text" >or similar</span>
                                            </div>
                                        </div>
                                        <div className="car-details">
                                            <div className="car-detail-item">
                                                <span className="car-detail-label">
                                                    <img alt='car-detail-icon' className="car-detail-icon" src={transmission} />Transmission
                                                </span>
                                                <span className="car-detail-item-text">{item?.Vehicle['@TransmissionType']}</span>
                                            </div>

                                            <div className="car-detail-item">
                                                <span className="car-detail-label">
                                                    <img alt='car-detail-icon' className="car-detail-icon" src={fuel} />Fuel
                                                </span>
                                                <span className="car-detail-item-text">{item?.Vehicle['@FuelType']}</span>
                                            </div>

                                            <div className="car-detail-item">
                                                <span className="car-detail-label">
                                                    <img alt='car-detail-icon' className="car-detail-icon" src={person} />Passenger Quantity
                                                </span>
                                                <span className="car-detail-item-text">{item?.Vehicle['@PassengerQuantity']}</span>
                                            </div>

                                            <div className="car-detail-item">
                                                <span className="car-detail-label">
                                                    <img alt='car-detail-icon' className="car-detail-icon" src={door} />Door Count
                                                </span>
                                                <span className="car-detail-item-text">{item?.Vehicle['@DoorCount']}</span>
                                            </div>

                                            <div className="car-detail-item">
                                                <span className="car-detail-label">
                                                    <img alt='car-detail-icon' className="car-detail-icon" src={bag} />Baggage Quantity Count
                                                </span>
                                                <span className="car-detail-item-text">{item?.Vehicle['@BaggageQuantity']}</span>
                                            </div>

                                            {item?.Vehicle['@AirConditionInd'] && <div className="car-detail-item">
                                                <span className="car-detail-label">
                                                    <img alt='car-detail-icon' className="car-detail-icon" src={snow} />Air Conditioned
                                                </span>
                                            </div>}
                                        </div>
                                    </CarListItemStyleCustom>
                                </ModalDisplayItemInfo>
                                <PriceWrapper>
                                    <span className="currency-symbol">{item?.TotalCharge['@CurrencyCode']}</span>
                                    <span className="price">{item?.TotalCharge['@RateTotalAmount']}</span>
                                </PriceWrapper>
                                <ModalCTAWrapper>
                                    <a href='' className="modal-cta" id="back" onClick={() => toggleModel()}>Go Back</a>
                                    <a href='' className="modal-cta" id="enquire" onClick={() => toggleModel()}>Enquire</a>
                                </ModalCTAWrapper>
                            </div>
                            <VendorLogoCustom bgImage={getVendorLogo(item?.Vendor)} />
                            <ModalImageWrapper>
                                <img alt='car-detail-picture' src={item?.Vehicle?.PictureURL} />
                            </ModalImageWrapper>
                        </div>
                    </ModalContent>
                </ModalInner>
            </ModalContainer>
        </FadeBackground>
    )
}

export default Modal;