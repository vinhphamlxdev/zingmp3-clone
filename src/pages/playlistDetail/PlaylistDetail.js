import React, { useEffect, useState, memo } from "react";
import { BsFillPauseFill, BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import styled from "styled-components";
import Button from "~/components/button";
import Icon from "~/components/Icon";
import { BsFillHeartFill } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import ConvertNumber from "~/utils/ConvertNumber";
import ConvertDates from "~/utils/ConvertDates";
import WrapperLayout from "~/components/wrapperLayout";
import request from "~/services/request";
import { Link, useLocation } from "react-router-dom";
import iconPlaying from "~/assets/image/iconPlaying.gif";
import { BiSortAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import { setLoading } from "~/redux-toolkit/global/globalSlice";
import Loading from "~/components/loading/Loading";
import SongItem from "~/components/songItem";
import Swal from "sweetalert2";
import handlePlaySong from "~/functions/HandlePlaySongPlaylist";
import handlePlaySongPlaylist from "~/functions/HandlePlaySongPlaylist";

const PlaylistDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isPlay, playlistId, isRandom } = useSelector((state) => state.audio);
  const { loading } = useSelector((state) => state.global);
  const [dataAlbum, setDataAlbum] = useState([]);
  const { id } = location.state;
  useEffect(() => {
    dispatch(setLoading(true));
    request
      .get(`/playlist/${id}`)
      .then((res) => {
        if (res.data) {
          const { data } = res.data;
          setDataAlbum(data);
          document.title = data.title;
          isPlay === false &&
            handlePlaySongPlaylist(
              data?.song?.items[0],
              data?.song?.items,
              id,
              isRandom,
              dispatch
            );

          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log(err);
      });
  }, [id]);

  const {
    title,
    thumbnailM,
    like,
    sortDescription,
    artists,
    song,
    contentLastUpdate,
  } = dataAlbum;
  return (
    <WrapperLayout>
      {loading && <Loading />}
      {!loading && (
        <StyledAlbum className="wrapper mt-[90px]">
          <div className="pt-5 album-container">
            <div className="album-content">
              <div className="w-[30%] album-left">
                <div className=" w-[300px]">
                  <div
                    className={`relative overflow-hidden rounded-lg  album-card-image ${
                      isPlay && dataAlbum.encodeId === playlistId
                        ? "playing"
                        : ""
                    }`}
                  >
                    <div className="z-thumb w-full h-[300px] cursor-pointer relative overlay">
                      <div className="thumb-rotate">
                        <img
                          className="object-cover w-full transition-all duration-700 rounded-lg "
                          src={thumbnailM}
                          alt=""
                        />
                      </div>
                      {isPlay && dataAlbum.encodeId === playlistId && (
                        <div className="cursor-pointer flex justify-center items-center  text-center border  border-white w-[45px] h-[45px] rounded-full center ">
                          <img
                            className="w-[18px] h-[18px]"
                            src={iconPlaying}
                            alt=""
                          />
                        </div>
                      )}

                      {!isPlay || dataAlbum.encodeId !== playlistId ? (
                        <div className="cursor-pointer flex justify-center items-center invisible  text-center border  border-white w-[45px] h-[45px] rounded-full center album-action">
                          <i className=" text-[30px] leading-[45px]   bi bi-play-fill text-white"></i>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center mt-3">
                    <div className="text-center">
                      <h5 className="album__content-title flex-wrap text-xl font-bold leading-[1.5] overflow-hidden text-ellipsis">
                        {title}
                      </h5>
                      <div className="release">
                        Cập nhật: {ConvertDates(contentLastUpdate)}
                      </div>
                      <div className="artists">
                        {artists
                          ?.map((item) => {
                            const { name, id, link, alias } = item;
                            return (
                              <Link
                                className="artist-name text-inherit"
                                to={link}
                                state={{ artistName: alias }}
                                key={id}
                              >
                                {name}
                              </Link>
                            );
                          })
                          .reduce((prev, curr) => [prev, ", ", curr])}
                      </div>
                      <div className="like">
                        {ConvertNumber(like)} người yêu thích
                      </div>
                    </div>
                    <div className="flex flex-col justify-center mt-4 actions">
                      <div className="flex justify-center">
                        {isPlay && dataAlbum.encodeId === playlistId ? (
                          <Button
                            onClick={() =>
                              Swal.fire({
                                icon: "error",
                                text: "Bài hát dành cho tài khoản Vip!",
                              })
                            }
                            large
                            leftIcon={<BsFillPauseFill />}
                          >
                            TẠM DỪNG
                          </Button>
                        ) : (
                          <Button
                            onClick={() =>
                              Swal.fire({
                                icon: "error",
                                text: "Bài hát dành cho tài khoản Vip!",
                              })
                            }
                            large
                            leftIcon={<BsFillPlayFill />}
                          >
                            TIẾP TỤC PHÁT
                          </Button>
                        )}
                      </div>
                      <div className="mt-4 ">
                        <div className="flex justify-center">
                          <Tippy content="Xóa khỏi thư viện">
                            <Icon className="add-library ">
                              {<BsFillHeartFill className="text-inherit " />}
                            </Icon>
                          </Tippy>
                          <Tippy content="Khác">
                            <Icon className="add-library dot-btn ">
                              {<BsThreeDots className="text-inherit " />}
                            </Icon>
                          </Tippy>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="album-right">
                <div className="description text-sm pb-[10px]">
                  {sortDescription !== "" && (
                    <span className="mr-2">Lời tựa</span>
                  )}
                  {sortDescription}
                </div>
                <div className="flex flex-col">
                  <div className="song-list-select mb-[10px]">
                    <div className="flex select-header">
                      <div className="w-2/4 mr-[10px] ">
                        <div className="flex items-center ">
                          <div className="mr-[10px] sort-btn">
                            <BiSortAlt2 className="text-xs leading-[0] text-inherit " />
                          </div>
                          <div className="text-xs font-medium uppercase column-text">
                            Bài hát
                          </div>
                        </div>
                      </div>
                      <div className="ml-[10px] album-media-content">
                        <div className="column-text ml-[10px] text-xs">
                          Album
                        </div>
                      </div>
                      <div className="album-media-right ml-[10px] ">
                        <div className="column-text ml-[10px] text-xs uppercase">
                          THỜI GIAN
                        </div>
                      </div>
                    </div>
                    <div className="song-album-list has-scroll-bar">
                      {song?.items?.length > 0 &&
                        song?.items?.map((item, index) => {
                          return (
                            <SongItem
                              section="playlist"
                              onClick={() =>
                                handlePlaySong(
                                  item,
                                  song?.items,
                                  dataAlbum?.encodeId,
                                  isRandom,
                                  dispatch
                                )
                              }
                              key={item?.encodeId}
                              item={item}
                            />
                          );
                        })}
                    </div>
                    <div className="bottom-info subtitle">
                      <span className="mr-2 text-xs text-inherit">
                        {/* so luong {total} bài hát */}
                      </span>
                      {/* • */}
                      <span className="ml-2 text-xs text-inherit">
                        {/* {ConvertTotalDuration(totalDuration)} giờ */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StyledAlbum>
      )}
    </WrapperLayout>
  );
};

export default PlaylistDetail;
const StyledAlbum = styled.div`
  .album-content {
    display: flex;
    column-gap: 28px;
    position: relative;
  }
  .album-right {
    /* width: calc(100% - 300px); */
    width: 70%;
  }
  @keyframes animateThumb {
    100% {
      transform: rotate(360deg);
    }
  }
  .album-card-image {
    & .thumb-rotate {
      transition: 2s all;
    }
    &.playing .z-thumb .thumb-rotate {
      border-radius: 100rem;
      animation: animateThumb 10s linear infinite;
      transition: border-radius 2s linear;
    }
    &.playing .overlay {
      border-radius: 100rem;
    }
    & .z-thumb {
      box-shadow: 0 5px 8px 0 rgb(0 0 0 / 20%);
      overflow: hidden;
      border-radius: 8px;
      overflow: hidden;
    }
    &:hover .z-thumb .thumb-rotate img {
      transform: scale(1.1) translateZ(0);
    }
    &:hover .album-action {
      visibility: visible;
    }
  }
  .album__content-title {
    color: ${(props) => props.theme.textPrimary};
  }
  .like,
  .artists,
  .release {
    color: ${(props) => props.theme.textSecondary};
    font-size: 12px;
    line-height: 1.75;
  }
  .artists {
    cursor: pointer;
    & span:hover {
      color: ${(props) => props.theme.linkTextHover};
      text-decoration: underline;
    }
  }
  .add-library {
    color: ${(props) => props.theme.purplePrimary};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    background-color: ${(props) => props.theme.alphaBg};
    margin-right: 10px;
  }
  .dot-btn {
    color: ${(props) => props.theme.textPrimary};
  }
  & .description {
    color: ${(props) => props.theme.textPrimary};
    span {
      color: ${(props) => props.theme.textSecondary};
    }
  }
  .select-header {
    border-bottom: 1px solid ${(props) => props.theme.borderSecondary};
    padding: 10px;
    border-radius: 5px;
    user-select: none;
    height: 46px;
  }
  .sort-btn {
    color: ${(props) => props.theme.textSecondary};
    border: 1px solid ${(props) => props.theme.textSecondary};
    border-radius: 2px;
    padding: 1px;
  }
  .column-text {
    color: ${(props) => props.theme.textSecondary};
  }
  & .album-media-right,
  & .album-media-content {
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: left;
    align-self: center;
    width: 0;
  }
  .song-album-list {
    height: 600px;
    max-height: 100%;
  }
  .album-info {
    &:hover {
      color: ${(props) => props.theme.linkTextHover};
      text-decoration: underline;
    }
  }
  .bottom-info {
    color: ${(props) => props.theme.textSecondary};
  }
  .artist-name {
    &:hover {
      text-decoration: underline;
      color: ${(props) => props.theme.linkTextHover};
    }
  }
`;
