import styled, { css } from "styled-components";
import mediaQueries from "./mediaQueries.ts";

export const CarListItemStyle = styled.div`
    padding: 1rem;
    border-radius: 1.5rem;
    border: 1px solid #EFEFEF;
    box-sizing: border-box;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media only screen and ${mediaQueries.sm} {
        padding: 1rem 0.5rem;
    }

    .content {
        position: relative;
    }

    .img-wrapper {
        height: 12.5rem;
        border-radius: 1.75rem;
        padding-top: 1.125rem;

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
            font-size: 1.75rem;
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
        gap: 0.875rem;
        padding: 1rem 0.5rem;
        margin-bottom: 0.5rem;


        @media only screen and ${mediaQueries.sm} {
            margin-top: 1rem;
            margin-bottom: 1rem;
        }

        .car-detail-item {
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
        }

        .car-detail-label {
            font-size: 1rem;
            font-weight: 600;
            .car-detail-icon {
                width: 0.9375rem;
                height: 0.9375rem;
                margin-right: 0.1875rem;
            }
        }
    }
    .car-item-cta {
        button {
            color: #FFFFFF;
            text-decoration: none;
            padding: 0.5rem 1rem;
            background: #E6356F;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            border-radius: 1.5rem;
            text-align: center;
            width: 100%;
            cursor: pointer;
            border: 0;

            &:hover {
                background: #f53a79ff;
            }

            @media only screen and (min-width: 62rem) {
                display: flex;
                width: fit-content;
                margin: auto;
            }
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
    width: 4.375rem;
    height: 3.75rem;

    ${props =>
        props.bgImage &&
        css`
        background-image: url("${props.bgImage}");
    `}
`;

export const PriceWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    padding: 0 1rem;
    margin-bottom: 2rem;
    margin-top: -1.25rem;

    @media only screen and ${mediaQueries.sm} {
        margin-top: 0;
    }

    .currency-symbol {
        font-size: 0.75rem;
        padding-top: 0.125rem;
    }
    .price {
        font-size: 1.125rem;
        font-weight: 600;
    }
`;