import React from "react";
import styled from "styled-components";

// Styled-component for CombinedImage
const CombinedImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${(props) => props.backgroundImages};
  background-size: contain, contain, contain;
  background-position: center, center, center;
  background-repeat: no-repeat, no-repeat, no-repeat;
  transform: ${(props) => (props.isFlipped ? "scaleX(-1)" : "scaleX(1)")};
  transform-origin: center;
`;

const CombinedImage = ({
  backgroundIndex,
  borderIndex,
  faceIndex,
  isFlipped,
}) => {
  // 이미지 데이터
  const imageData = {
    backgrounds: [
      "/assets/rockImages/background1.svg",
      "/assets/rockImages/background2.svg",
      "/assets/rockImages/background3.svg",
      "/assets/rockImages/background4.svg",
    ],
    borders: [
      "/assets/rockImages/border1.svg",
      "/assets/rockImages/border2.svg",
      "/assets/rockImages/border3.svg",
      "/assets/rockImages/border4.svg",
    ],
    faces: [
      "/assets/rockImages/state1.svg",
      "/assets/rockImages/state1.svg",
      "/assets/rockImages/state1.svg",
    ],
  };

  // URL 조합
  const backgroundImageUrls = `
  url(${imageData.faces[faceIndex]}),
    url(${imageData.borders[borderIndex]}),
    url(${imageData.backgrounds[backgroundIndex]})
  `;

  return (
    <CombinedImageContainer
      backgroundImages={backgroundImageUrls}
      isFlipped={isFlipped}
    />
  );
};

export default CombinedImage;
