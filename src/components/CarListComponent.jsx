import React, { useContext } from "react";
import styled from "styled-components";
import { CarListContext } from "../context/CarListContext";

const CarListComponentContainer = styled.div`
    padding: 4rem 0;
`;

const CarListItem = styled.div``;


const CarListComponent = () => {
    const { carList } = useContext(CarListContext);
    console.log('carList: ', carList);
    return (
        <CarListComponentContainer>
            <h1>Car List Component</h1>
        </CarListComponentContainer>
    )
}

export default CarListComponent