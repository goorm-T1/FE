import styled from "styled-components";
import Icons from "../assets/icons/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import CombinedImage from "../components/CombinedRock";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(/assets/images/background.jpg);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 50px 60px 40px 60px;
  overflow: hidden;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;

  > svg {
    height: 100%;
  }

  > p {
    font-size: 1.6rem;
    font-family: ${(props) => props.theme.fonts.secondary};
  }
`;

const NavContainer = styled.div`
  margin: 12px 0;
  height: 160px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h1 {
    font-size: 48px;
    font-weight: ${(props) => props.theme.weight.bold};
  }

  > p {
    font-size: 32px;
    color: ${(props) => props.theme.colors.gray2};
  }
`;

const QRImage = styled.div`
  width: 120px;
  height: 130px;

  > svg {
    width: 100%;
    height: 100%;
  }
`;

const ApartContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 40px 160px;
  height: 84%;
  flex: 1;
  background-color: white;
  border: 4px solid ${(props) => props.theme.colors.gray4};
  border-bottom: none;
  border-top-right-radius: 24px;
  border-top-left-radius: 24px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const StateItem = styled.div`
  height: 120px;
  position: relative;
`;

const MessageContainer = styled.div`
  position: absolute;
  top: 10px;
  display: flex;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  pointer-events: ${(props) => (props.isVisible ? "auto" : "none")};
  height: 60px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  left: ${(props) => props.index % 2 === 0 || "160px"};
  right: ${(props) => props.index % 2 === 1 || "160px"};
  overflow: visible;
  font-size: 20px;
`;

const StateMessage = styled.div`
  white-space: nowrap;
`;

const Main = () => {
  const [stateList, setStateList] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currentIndexes, setCurrentIndexes] = useState([]);

  const fetchStateList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tab/getStateList`
      );
      const limitedList = response.data.slice(0, 20); // 최대 20개로 제한
      setStateList(limitedList.reverse());
      setLastUpdated(new Date()); // 현재 시간을 저장
    } catch (error) {
      console.error("Error fetching state list:", error);
    }
  };

  const getRandomIndexes = (max, count) => {
    const indexes = new Set();
    while (indexes.size < count) {
      indexes.add(Math.floor(Math.random() * max)); // 0~max 범위에서 랜덤 선택
    }
    return Array.from(indexes);
  };

  useEffect(() => {
    fetchStateList(); // 페이지 로드 시 데이터 가져오기

    const interval = setInterval(() => {
      setCurrentIndexes(getRandomIndexes(20, 5)); // 3초마다 랜덤 5개 인덱스 선택
    }, 3000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []);

  useEffect(() => {
    const currentTime = new Date();
    const isExpired =
      lastUpdated &&
      (currentTime - new Date(lastUpdated)) / (1000 * 60 * 60 * 24) >= 1; // 하루가 지났는지 확인

    if (!lastUpdated || isExpired) {
      fetchStateList(); // 데이터 갱신
    }
  }, [lastUpdated]);

  return (
    <MainContainer>
      <LogoContainer>
        <Icons.Logo />
        <p>도시락</p>
      </LogoContainer>
      <NavContainer>
        <TitleContainer>
          <h1>구름캐슬 101동</h1>
          <p>어제의 우리 동 층간소음을 확인해요</p>
        </TitleContainer>
        <QRImage>
          <Icons.QRCode />
        </QRImage>
      </NavContainer>
      <ApartContainer>
        {stateList.map((item, index) => (
          <StateItem key={item.unitNum}>
            <CombinedImage
              backgroundIndex={item.stoneColor}
              borderIndex={item.stoneOutline}
              faceIndex={item.stoneState}
              isFlipped={item.stoneDirection === 1}
            />

            <MessageContainer
              index={index}
              isVisible={currentIndexes.includes(index)} // 현재 표시할 인덱스인지 확인
            >
              <StateMessage hasMsg={!!item.stateMsg}>
                {item.stateMsg}
              </StateMessage>
            </MessageContainer>
          </StateItem>
        ))}
      </ApartContainer>
    </MainContainer>
  );
};

export default Main;
