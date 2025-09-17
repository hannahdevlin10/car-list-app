import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CarListContext } from "./context/CarListContext";
import CarListComponent from "./components/CarListComponent";
import Modal from "./components/Modal";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;

  body {
    padding: 40px;
}

/* Animation */

@keyframes fadeInUp {
    from {
        transform: translate3d(0,40px,0)
    }

    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
}

@-webkit-keyframes fadeInUp {
    from {
        transform: translate3d(0,40px,0)
    }

    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
}

.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
    -webkit-animation-duration: 1s;
    -webkit-animation-fill-mode: both
}

.animatedFadeInUp {
    opacity: 0
}

.fadeInUp {
    opacity: 0;
    animation-name: fadeInUp;
    -webkit-animation-name: fadeInUp;
}
`;

const WhiteBackground = styled.div`
  background: #FFFFFF;
  width: 100%;
  height: 100%;
`;

const OffWhiteBackground = styled.div`
  background: #f1f1f1;
  width: 100%;
  height: 100%;
`;

const PageHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: auto;
  text-align: center;
  padding: 40px;
  max-width: 1280px;
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
  const { setCarList, setVendorList, selectedItem } = useContext(CarListContext);
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
      <WhiteBackground>
        <PageHead className="animated animatedFadeInUp fadeInUp">
          <div className="page-title">Car List Directory</div>
          <div className="page-subtitle">Please select a vehicle from the list below to view more details.</div>
        </PageHead>
      </WhiteBackground>

    <OffWhiteBackground>
      <CarListComponent />
    </OffWhiteBackground>

      <Modal displayItem={selectedItem} />
    </PageContainer>
  )
}

export default App
