import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CarListContext } from "./context/CarListContext";
import CarListComponent from "./components/CarListComponent";
import Modal from "./components/Modal";
import mediaQueries from "./mediaQueries.ts";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;

  body {
    padding: 2.5rem;
}

/* Animation */

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
  gap: 1rem;
  margin: auto;
  text-align: center;
  padding: 2.5rem;
  max-width: 80rem;
  .page-title {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: normal;
  }
  .page-subtitle {
    font-size: 1.25rem;
    line-height: normal;
    opacity: 0.7;
  }
`;

const Legend = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.75rem;
  padding: 1rem;
  margin: auto;

    @media only screen and ${mediaQueries.sm} {
      padding: 1.25rem 1.25rem 0 2.5rem;
    }

  .legend-item {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    width: fit-content;

    @media only screen and ${mediaQueries.xl} {
        flex-direction: row;
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
      <Legend>
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
      </Legend>
      <CarListComponent />
    </OffWhiteBackground>

      <Modal displayItem={selectedItem} />
    </PageContainer>
  )
}

export default App
