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

const WhiteBackground = styled.div`
  background: #FFFFFF;
`;

const OffWhiteBackground = styled.div`
  background: #efefefe;
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
  }
  .page-subtitle {
    font-size: 20px;
    line-height: normal;
    opacity: 0.7;
  }
`;

const App = () => {
  const dataUrl = `https://ajaxgeo.cartrawler.com/ctabe/cars.json`;
  const { setCarList, setVendorList } = useContext(CarListContext);
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
    simplifiedCarList && setVendorList(simplifiedCarList?.map((item) => item?.Vendor))
  }, [localCarList, setCarList, setVendorList]);

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
