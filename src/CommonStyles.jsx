import styled, { css } from "styled-components";

export const CarListItemStyle = styled.div`
    padding: 1rem 0.5rem;
    border-radius: 24px;
    border: 1px solid #EFEFEF;
    box-sizing: border-box;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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
        width: auto;
        cursor: pointer;

        &:hover {
            background: #f53a79ff;
        }

        @media only screen and (min-width: 992px) {
            width: fit-content;
            margin: auto;
        }
    }
    #price-wrapper-custom {
        padding: 0;
        margin-bottom: 0;
        margin-top: 0.5rem;
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

export const PriceWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    padding: 0 1rem;
    margin-bottom: 2rem;

    .currency-symbol {
        font-size: 12px;
        padding-top: 2px;
    }
    .price {
        font-size: 18px;
        font-weight: 600;
    }
`;