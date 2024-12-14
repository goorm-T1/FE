import { useRecoilState } from "recoil";
import styled from "styled-components";
import { numState } from "../recoil/atom";
import { useNavigate } from "react-router-dom";
import Icons from "../assets/icons/icons";

const InputPageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 80px 24px 0 24px;
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

  > p {
    font-family: ${(props) => props.theme.fonts.secondary};
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.75rem;
    padding: 10px 0;
  }
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  > p {
    font-weight: ${(props) => props.theme.weight.semibold};
    font-size: 1.25rem;
  }

  > h1 {
    font-weight: ${(props) => props.theme.weight.bold};
    font-size: 2.25rem;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 327px;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: ${(props) => props.theme.weight.bold};
`;

const InputForm = styled.div`
  margin: 10px 0;
  height: 3rem;
  display: flex;
  gap: 12px;
`;

const StyledInput = styled.input`
  height: 100%;
  padding: 0.75rem 1.5rem;
  border: 1px solid
    ${(props) =>
      props.hasValue ? props.theme.colors.gray1 : props.theme.colors.gray4};
  border-radius: 10px;
  min-width: 234px;
  flex: 1;
  color: ${(props) => props.theme.colors.gray1};
  font-weight: ${(props) => props.theme.weight.semibold};

  &::placeholder {
    color: ${(props) => props.theme.colors.gray4};
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.weight.semibold};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;

const StyledButton = styled.button`
  box-sizing: border-box;
  width: 4.5rem;
  height: 100%;

  border-radius: 10px;
  background-color: ${(props) =>
    props.hasValue ? props.theme.colors.gray1 : props.theme.colors.gray4};
  color: white;
  font-weight: ${(props) => props.theme.weight.semibold};
`;

const InputPage = () => {
  const [buildingNum, setBuildingNum] = useRecoilState(numState);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setBuildingNum(event.target.value);
  };
  const handleButtonClick = () => {
    if (buildingNum && buildingNum.trim()) {
      navigate(`/input/${buildingNum}`);
    } else {
      alert("값을 입력해주세요!");
    }
  };
  return (
    <InputPageContainer>
      <LogoContainer>
        <p>도시락</p>
        <Information>
          <p>소리를 넘어, 마음을 잇다</p>
          <h1>구름캐슬 101동</h1>
        </Information>
      </LogoContainer>
      <ImgContainer>
        <Icons.MainLogo />
      </ImgContainer>
      <InputContainer>
        <p>거주 호수</p>
        <InputForm>
          <StyledInput
            type="number"
            placeholder="거주 호수를 입력해주세요"
            value={buildingNum}
            onChange={handleInputChange}
            onInput={(event) => {
              if (event.target.value.length > 4) {
                event.target.value = event.target.value.slice(0, 4); // 4자 이상 입력 시 자름
              }
            }}
            hasValue={!!buildingNum}
          />
          <StyledButton
            onClick={handleButtonClick}
            disabled={!buildingNum}
            hasValue={!!buildingNum}
          >
            확인
          </StyledButton>
        </InputForm>
      </InputContainer>
    </InputPageContainer>
  );
};

export default InputPage;
