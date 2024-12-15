import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Message } from "../assets/images/Union.svg";
import Icons from "../assets/icons/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import CombinedImage from "../components/CombinedRock";

const UserPageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 60px 24px 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: top;
  font-family: ${(props) => props.theme.fonts.primary};
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 0.75rem;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > p {
    font-weight: ${(props) => props.theme.weight.semibold};
    font-size: 1.25rem;
  }

  > h1 {
    font-weight: ${(props) => props.theme.weight.bold};
    font-size: 2.25rem;
  }
`;

const MessageContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 18px;
  z-index: 5;

  > svg {
    width: 100%;
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 100%;
    max-width: 330px;
    padding: 0 24px;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const MessageDetail = styled.p`
  color: ${(props) =>
    props.hasMsg ? props.theme.colors.gray1 : props.theme.colors.gray4};
`;

const ModalOverlay = styled.div`
  padding: 42px 24px 0 24px;
  background-color: ${(props) => props.theme.colors.gray1};
  opacity: 0.95;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
`;

const ModalNav = styled.div`
  margin-bottom: 150px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-weight: ${(props) => props.theme.weight.semibold};

  > h2 {
    font-size: 1.25rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  > input {
    padding: 10px 0;
    color: white;
    font-weight: ${(props) => props.theme.weight.semibold};
    background-color: ${(props) => props.theme.colors.gray1};
    opacity: 0.95;
    border-bottom: 1px solid white;
    &::placeholder {
      color: ${(props) => props.theme.colors.gray3};
      font-weight: ${(props) => props.theme.weight.semibold};
    }
  }

  > p {
    color: ${(props) => props.theme.colors.gray4};
    font-size: 0.75rem;
  }

  > p:last-child {
    align-self: flex-end;
  }
`;

const RockContainer = styled.div`
  margin-top: -20px;
  width: 100%;
  height: 200px;
  padding: 0 50px;
  margin-bottom: 30px;
`;

const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;

  > p {
    font-size: 0.75rem;
  }
`;

const StateRadio = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const RadioButton = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 0.5rem;
  opacity: ${(props) => (props.isSelected ? 1 : 0.2)};
  border: 1px solid ${(props) => props.theme.colors.gray1};
  border-radius: 8px;
  height: 84px;
`;

const IconLabel = styled.p`
  font-weight: ${(props) => props.theme.weight.bold};
`;

const UserPage = () => {
  const { id } = useParams();
  const [msg, setMsg] = useState("");
  const [stoneState, setStoneState] = useState(0);
  const [stoneColor, setStoneColor] = useState(0);
  const [stoneFace, setStoneFace] = useState(0);
  const [stoneOutline, setStoneOutline] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMsg, setNewMsg] = useState("");

  const handlePostRequest = async () => {
    const requestBody = {
      buildingNum: 101,
      unitNum: id,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/mobile/connected`,
        requestBody
      );

      // 개별 상태 업데이트
      const data = response.data;
      setMsg(data.stateMsg);
      setStoneState(data.stoneFace);
      setStoneColor(data.stoneColor);
      setStoneFace(data.stoneState);
      setStoneOutline(data.stoneOutline);
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  const handleMsgRequest = async () => {
    console.log(newMsg);
    const requestBody = {
      unitNum: id,
      buildingNum: 101,
      stateMsg: newMsg,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/mobile/setStateMsg`,
        requestBody
      );
      console.log("POST 요청 성공:", response.data);
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  const handleMsgEdit = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (event) => {
    setNewMsg(event.target.value);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = async () => {
    setMsg(newMsg);
    handleMsgRequest();
    setIsModalOpen(false);
  };

  const handleFaceChange = async (newFace) => {
    setStoneFace(newFace);

    const requestBody = {
      buildingNum: 101,
      unitNum: id,
      stoneStatus: newFace,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/mobile/setStoneState`,
        requestBody
      );
      console.log("POST 요청 성공:", response.data);
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  useEffect(() => {
    handlePostRequest();
  }, []);

  return (
    <UserPageContainer>
      <LogoContainer>
        <Icons.MiniLogo />
        <Information>
          <p>구름캐슬 101동</p>
          <h1>{id} 호</h1>
        </Information>
      </LogoContainer>
      <MessageContainer onClick={handleMsgEdit}>
        <Message />
        <div>
          <MessageDetail hasMsg={!!msg}>
            {msg ? msg : "2시부터 3시까지 조용히해주세요"}
          </MessageDetail>
          <Icons.Edit />
        </div>
      </MessageContainer>
      <RockContainer>
        <CombinedImage
          backgroundIndex={stoneColor}
          borderIndex={stoneOutline}
          faceIndex={stoneFace}
          isFlipped={stoneState}
        />
      </RockContainer>
      <StateContainer>
        <p>오늘의 체감 층간소음은 어떤가요?</p>
        <StateRadio>
          <RadioButton
            onClick={() => handleFaceChange(1)} // face 값 변경
            isSelected={stoneFace === 1} // 현재 선택된 상태 확인
          >
            <Icons.Good />
            <IconLabel>만족</IconLabel>
          </RadioButton>
          <RadioButton
            onClick={() => handleFaceChange(0)} // face 값 변경
            isSelected={stoneFace === 0} // 현재 선택된 상태 확인
          >
            <Icons.Normal />
            <IconLabel>보통</IconLabel>
          </RadioButton>
          <RadioButton
            onClick={() => handleFaceChange(2)} // face 값 변경
            isSelected={stoneFace === 2} // 현재 선택된 상태 확인
          >
            <Icons.Bad />
            <IconLabel>불만족</IconLabel>
          </RadioButton>
        </StateRadio>
      </StateContainer>

      {isModalOpen && (
        <ModalOverlay>
          <ModalNav>
            <p onClick={handleModalClose}>취소</p>
            <h2>상태메시지</h2>
            <p onClick={handleModalSave}>확인</p>
          </ModalNav>
          <InputContainer>
            <p>방해되는 시간을 설정해봐요</p>
            <input
              type="text"
              placeholder={msg || "2시부터 3시까지 조용히해주세요"}
              value={newMsg}
              onChange={handleInputChange}
              maxLength={20}
            />
            <p>{newMsg.length}/20</p>
          </InputContainer>
        </ModalOverlay>
      )}
    </UserPageContainer>
  );
};

export default UserPage;
