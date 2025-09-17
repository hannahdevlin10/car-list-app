import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CarListContext } from "./context/CarListContext";
import CarListComponent from "./components/CarListComponent";
import Modal from "./components/Modal";
import mediaQueries from "./mediaQueries.ts";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

@keyframes fadeInUp {
    from {
        transform: translate3d(0,2.5rem,0)
    }

    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
}

@-webkit-keyframes fadeInUp {
    from {
        transform: translate3d(0,2.5rem,0)
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
  gap: 0.5rem;
  margin: auto;
  text-align: center;
  padding: 2.5rem;
  max-width: 80rem;

  @media only screen and ${mediaQueries.sm} {
    gap: 1rem;
  }

  .page-title {
    font-size: 2rem;
    font-weight: 700;
    line-height: normal;

    @media only screen and ${mediaQueries.sm} {
        font-size: 3.5rem;
    }
  }
  .page-subtitle {
    font-size: 1rem;
    line-height: normal;
    opacity: 0.7;

    @media only screen and ${mediaQueries.sm} {
      font-size: 1.25rem;
    }
  }
`;

const Legend = styled.div`
  padding: 0 1rem;
  margin: 1rem auto auto auto;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and ${mediaQueries.sm} {
    margin: 2.5rem auto auto auto;
    padding: 0 2.5rem;
  }

  .inner {
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1.125rem;
    row-gap: 1.125rem;
    justify-content: center;
    background: white;
    border-radius: 24px;

    @media only screen and ${mediaQueries.sm} {
      display: flex;
      flex-direction: row;
      width: fit-content;
      gap: 1.75rem;
    }

    @media only screen and ${mediaQueries.xl} {
      width: 1280px;
    }
  }

  .legend-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: fit-content;

    @media only screen and ${mediaQueries.xl} {
      flex-direction: row;
      gap: 0.375rem;
    }
  }

  .tag {
    font-size: 0.875rem;
    font-weight: 600;
    width: fit-content;
  }
  .value {
    font-size: 0.875rem;
    opacity: 0.7;
    width: fit-content;
  }
`;

const ScrollToTop = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background: white;
  font-size: 26px;
  width: 40px;
  height: 40px;
  z-index: 100;
  border-radius: 60px;
  text-align: center;
  justify-content: center;
  background: #333333;
  align-items: center;
  color: white;
  cursor: pointer;

  div {
    margin-top: 6px;
  }

  @media only screen and ${mediaQueries.sm} {
    display: none;
  }
`;

const App = () => {
  const dataUrl = `https://ajaxgeo.cartrawler.com/ctabe/cars.json`;
  const { setCarList, setVendorList, selectedItem } = useContext(CarListContext);
  const [localCarList, setLocalCarList] = useState();
  const [legend, setLegend] = useState();

  useEffect(() => {
    fetch(dataUrl)
    .then(response => response.json())
    .then(data => setLocalCarList(data))
    .catch(error => console.error('Error:', error));
  }, [dataUrl]);

  useEffect(() => {
    let simplifiedCarList = [];
    let legendVal;

    if (localCarList) {
      let options = localCarList[0]?.VehAvailRSCore?.VehVendorAvails;
      legendVal = localCarList[0]?.VehAvailRSCore?.VehRentalCore;
      options?.forEach((option) => {
        option.VehAvails.forEach((nestedItem) => {
          nestedItem['Vendor'] = option.Vendor['@Name'];
          simplifiedCarList.push(nestedItem);
        });
      })
    }
    simplifiedCarList && setCarList(simplifiedCarList);
    simplifiedCarList && setVendorList(simplifiedCarList?.map((item) => item?.Vendor))
    legendVal && setLegend(legendVal);
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
      <Legend className="animated animatedFadeInUp fadeInUp">
        <div className="inner">
          {legend && <div className="legend-item">
            <span className="tag">Pick Up</span>
            <span className="value">{new Date(legend['@PickUpDateTime']).toUTCString()}</span>
          </div>}
          {legend && <div className="legend-item">
            <span className="tag">Drop Off</span>
            <span className="value">{new Date(legend['@ReturnDateTime']).toUTCString()}</span>
          </div>}
          {legend?.PickUpLocation['@Name'] && <div className="legend-item">
            <span className="tag">Pick Up Location</span>
            <span className="value">{legend?.PickUpLocation['@Name']}</span>
          </div>}
          {legend?.ReturnLocation['@Name'] && <div className="legend-item" style={{ borderRight: '0' }}>
            <span className="tag">Return Location</span>
            <span className="value">{legend?.ReturnLocation['@Name']}</span>
          </div>}
        </div>
      </Legend>
      <CarListComponent />
    </OffWhiteBackground>

      <Modal displayItem={selectedItem} />

     <ScrollToTop onClick={() => window && window.scrollTo(0,0)}>
        <div>^</div>
      </ScrollToTop>
    </PageContainer>
  )
}

export default App
