import React from "react";
import styled from "styled-components";

const StyledLoading = styled.div`
  /* .loading-spinner {
    display: flex;
    & .loading-dots {
      background-color: #fff;
      animation: animate 1.6s ease-in-out infinite;
      &:nth-child(1) {
        animation-delay: -1.4s;
        background-color: #ffff00;
        box-shadow: 0 0 50px #ffff00;
      }
      &:nth-child(2) {
        animation-delay: -1.2s;
        background-color: #76ff03;
        box-shadow: 0 0 50px #76ff03;
      }
      &:nth-child(3) {
        animation-delay: -1s;
        background-color: #f06292;
        box-shadow: 0 0 50px #f06292;
      }
      &:nth-child(4) {
        animation-delay: -0.8s;
        background-color: #4fc3f7;
        box-shadow: 0 0 50px #4fc3f7;
      }
      &:nth-child(5) {
        animation-delay: -0.6s;
        background-color: #ba68c8;
        box-shadow: 0 0 50px #ba68c8;
      }
      &:nth-child(6) {
        animation-delay: -0.4s;
        background-color: #f57c00;
        box-shadow: 0 0 50px #f57c00;
      }
      &:nth-child(7) {
        animation-delay: -0.2s;
        background-color: #673ab7;
        box-shadow: 0 0 50px #673ab7;
      }
    }
    @keyframes animate {
      0%,
      40%,
      100% {
        transform: scale(0.2);
      }
      20% {
        transform: scale(1);
      }
    }
  } */
  //
  .loading {
    --speed-of-animation: 0.9s;
    --gap: 6px;
    --first-color: #ff006e;
    --second-color: #00f5d4;
    --third-color: #f77f00;
    --fourth-color: #70e000;
    --fifth-color: #2196f3;
    --six-color: #e71d36;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    gap: 6px;
    height: 100px;
  }

  .loading span {
    width: 6px;
    height: 80px;
    background: var(--first-color);
    animation: scale var(--speed-of-animation) ease-in-out infinite;
  }

  .loading span:nth-child(2) {
    background: var(--second-color);
    animation-delay: -0.8s;
  }

  .loading span:nth-child(3) {
    background: var(--third-color);
    animation-delay: -0.7s;
  }

  .loading span:nth-child(4) {
    background: var(--fourth-color);
    animation-delay: -0.6s;
  }

  .loading span:nth-child(5) {
    background: var(--fifth-color);
    animation-delay: -0.5s;
  }
  .loading span:nth-child(6) {
    background: var(--six-color);
    animation-delay: -0.5s;
  }

  @keyframes scale {
    0%,
    40%,
    100% {
      transform: scaleY(0.05);
    }

    20% {
      transform: scaleY(1);
    }
  }
`;
const Loading = ({ className }, ref) => {
  return (
    <StyledLoading
      ref={ref}
      className="relative flex items-center justify-center w-full h-full "
    >
      <div className="absolute flex items-center justify-center top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        {/* <ul className="flex justify-center loading-spinner">
          <li className="w-10 h-10 rounded-full loading-dots"></li>
          <li className="w-10 h-10 rounded-full loading-dots"></li>
          <li className="w-10 h-10 rounded-full loading-dots"></li>
          <li className="w-10 h-10 rounded-full loading-dots"></li>
        </ul> */}
        <div className="loading flex justify-center w-[100px] gap-2 h-[100px]">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </StyledLoading>
  );
};

export default React.forwardRef(Loading);
