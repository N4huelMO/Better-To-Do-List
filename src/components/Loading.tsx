import styled, { keyframes } from "styled-components";

const loadingAnimation1 = keyframes`  
 0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }`;

const loadingAnimation2 = keyframes`  
0% {
   transform: translate(0, 0);
 }
 100% {
   transform: translate(24px, 0);
 }`;

const loadingAnimation3 = keyframes`  
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }`;

const Loader = styled.div`
  display: block;
  margin: 0 auto;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #075985;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  div:nth-child(1) {
    left: 8px;
    animation: ${loadingAnimation1} 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: ${loadingAnimation2} 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: ${loadingAnimation2} 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: ${loadingAnimation3} 0.6s infinite;
  }
`;

const Loading = () => {
  return (
    <Loader>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Loader>
  );
};

export default Loading;