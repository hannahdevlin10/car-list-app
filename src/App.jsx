import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CarListContext } from "./context/CarListContext";
import CarListComponent from "./components/CarListComponent";

const PageContainer = styled.div`
  max-width: 1280px;
  margin: auto;
  display: flex;
  background: #FFFFFF;
  padding: 4rem 2.5rem;
  flex-direction: column;
`;

const PageHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: auto;
  text-align: center;
  .page-title {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: normal;
    background: linear-gradient(90deg,rgba(230, 53, 111, 1) 0%, rgba(184, 87, 199, 1) 50%, rgba(237, 83, 101, 1) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .page-subtitle {
    font-size: 20px;
    line-height: normal;
  }
`;

const App = () => {
  const dataUrl = `https://ajaxgeo.cartrawler.com/ctabe/cars.json`;
  const { setCarList } = useContext(CarListContext);
  const [localCarList, setLocalCarList] = useState();

  useEffect(() => {
    fetch(dataUrl)
    .then(response => response.json())
    .then(data => setLocalCarList(data))
    .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    let simplifiedCarList = [];

    if (localCarList) {
      let options = localCarList[0]?.VehAvailRSCore?.VehVendorAvails;
      options?.forEach((option) => {
        option.VehAvails.forEach((nestedItem) => {
          nestedItem['Vendor'] = option.Vendor['@Name'];
          simplifiedCarList.push(nestedItem);
        });
      })
    }
    simplifiedCarList && setCarList(simplifiedCarList);
  }, [localCarList]);

  return (
    <PageContainer>
      <PageHead>
        <div className="page-title">Car List Directory</div>
        <div className="page-subtitle">Please select a car from the list below to view more details.</div>
      </PageHead>
      <CarListComponent />
    </PageContainer>
  )
}

export default App
