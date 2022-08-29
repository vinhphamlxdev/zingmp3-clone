import React, { useEffect, useRef, useState } from "react";
import { GiMicrophone } from "react-icons/gi";
import styled from "styled-components";
import { VscChromeRestore } from "react-icons/vsc";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Icon from "~/components/Icon";
import Control from "./Control";
import { useDispatch, useSelector } from "react-redux";
import request from "~/services/request";
import {
  changeIconPlaying,
  setAudioSrc,
} from "~/redux-toolkit/audio/audioSlice";
import { toast } from "react-toastify";
const StyledPlayer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 400;
  background-position: 50%;
  background-repeat: repeat-x;
  background-size: 1920px auto;
  background-color: ${(props) => props.theme.layoutBg};
  background-image: url(${(props) => props.theme.bgPlayer});
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 999;
  .player-container {
    display: flex;
    padding: 0 20px;
    cursor: pointer;
    align-items: center;
    height: 90px;
    justify-content: space-between;
    background-color: ${(props) => props.theme.playerBg};
  }
  .player__name {
    font-size: 14px;
    line-height: 15px;
    color: ${(props) => props.theme.textPrimary};
    text-transform: capitalize;
    -moz-animation: marquee 6s linear infinite;
    -webkit-animation: marquee 6s linear infinite;
    animation: marquee 6s linear infinite;
  }
  @-moz-keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  @-webkit-keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  @keyframes marquee {
    0% {
      -moz-transform: translateX(100%);
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    100% {
      -moz-transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }
  .player__author {
    font-size: 12px;
    margin-top: 3px;
    color: ${(props) => props.theme.textSecondary};
    word-break: break-all;
    display: flex;
    flex-wrap: nowrap;
    display: -webkit-box;
    word-break: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-weight: 400;
    display: inline-block;
  }

  .current-time {
    font-size: 12px;
    min-width: 45px;
    margin-right: 10px;
    text-align: left;
    color: ${(props) => props.theme.textPrimary};
    opacity: 0.6;
  }
  .duration-time {
    color: ${(props) => props.theme.textPrimary};
  }
  .progress-area {
    width: 100%;
    height: 3px;
    outline: none;
    background-color: ${(props) => props.theme.alphaBg};
    cursor: pointer;
    transition: 0.3s;
    border-radius: 20px;
    &:hover {
      height: 6px;
    }
    .progress-bar {
      background-color: ${(props) => props.theme.purplePrimary};
      height: inherit;
      position: relative;
      width: 50%;
      border-radius: 4px;
      &::after {
        position: absolute;
        opacity: 0;
        right: -6px;
      }
    }
    &:hover .progress-bar::after {
      opacity: 1;
      border-radius: 100rem;
    }
  }
  .note-list-icon {
    position: relative;
    background-color: hsla(0, 0%, 100%, 0.1);
    border: 1px solid transparent;
    color: ${(props) => props.theme.textPrimary};
  }
  .toggle-play {
    margin: 0 7px;
    font-size: 24px;
    border-radius: 999px;
    line-height: normal;
    border: 0;
    display: inline-block;
    font-weight: 400;
    text-transform: none;
    text-align: center;
    cursor: pointer;
    position: relative;
    color: ${(props) => props.theme.textPrimary};
    border: 1px solid ${(props) => props.theme.textPrimary};
  }
  .is-random,
  .is-repeat {
    color: ${(props) => props.theme.purplePrimary};
  }
`;
const PlayerControl = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const { isRepeat, currentSongId, srcAudio, isPlay, infoSongPlayer } =
    useSelector((state) => state.audio);
  useEffect(() => {
    if (currentSongId !== null && currentSongId !== "") {
      request.get(`song/${currentSongId}`).then((res) => {
        if (res.data && res.data.data) {
          dispatch(setAudioSrc(res.data.data[128]));
          console.log(srcAudio);
        }
      });
    }
  }, [currentSongId]);
  return (
    <StyledPlayer>
      <div className="player-container">
        <div className="flex w-[30%]">
          <div className="flex items-center ">
            <div className="w-[64px] h-[64px] mr-[10px] rounded-[4px]">
              <img
                className="w-full object-cover rounded-[4px]"
                src={infoSongPlayer.thumbnail}
                alt=""
              />
            </div>
            <div className="flex flex-col overflow-hidden justify-center max-w-[130px] flex-grow ">
              <div className="player__name whitespace-nowrap">
                {infoSongPlayer.title}
              </div>
              <span className="player__author whitespace-nowrap">
                {infoSongPlayer.artistsNames}
              </span>
            </div>
            <div className="flex items-center justify-end">
              <div className="flex player-icon ">
                <Tippy content="Thêm vào thư viện">
                  <Icon>
                    <i className="bi icon-heart bi-heart"></i>
                  </Icon>
                </Tippy>
                <Tippy content="Xem thêm">
                  <Icon>
                    <i className="bi bi-three-dots"></i>
                  </Icon>
                </Tippy>
              </div>
            </div>
          </div>
        </div>
        <Control audioRef={audioRef} />
        <div className="w-[30%] flex justify-end">
          <div className="flex items-center justify-center">
            <Tippy content="Xem lời bài hát">
              <Icon>
                <GiMicrophone className="text-lg"></GiMicrophone>
              </Icon>
            </Tippy>
            <Tippy content="Chế độ cửa sổ">
              <Icon>
                <VscChromeRestore className="text-lg"></VscChromeRestore>
              </Icon>
            </Tippy>
            <Icon>
              <i className="text-lg bi bi-volume-up leading-[0px]"></i>
            </Icon>

            <div className="progress-volume relative w-[100px] h-[3px] mr-2 ml-1"></div>
            <Tippy content="Danh sách phát">
              <button className="note-list-icon rounded-[4px] h-[30px] px-[5px] leading-[30px] text-xs font-medium">
                <i className="text-lg   bi bi-music-note-list leading-[0px]"></i>
              </button>
            </Tippy>
          </div>
        </div>
      </div>
      <audio
        className="hidden"
        loop={isRepeat}
        autoPlay={isPlay}
        hidden
        ref={audioRef}
        src={srcAudio}
      ></audio>
    </StyledPlayer>
  );
};

export default PlayerControl;
