import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PlaylistItem from "./PlaylistItem";
const StyledPlaylist = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  .card__item-img {
    &:hover .card-img {
      transform: scale(1.1);
    }
    &:hover .card-action {
      visibility: visible;
    }
  }
  .artist-name {
    color: ${(props) => props.theme.textSecondary};
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.linkTextHover};
      text-decoration: underline;
    }
  }
  .card-action.active {
    visibility: visible;
  }
`;
const Playlist = ({ data = {} }) => {
  const { items, title } = data;
  return (
    <StyledPlaylist className="container-layout">
      <h3>{title}</h3>
      <div className="grid w-full grid-cols-5 gap-x-7">
        {items?.length > 0 &&
          items
            ?.slice(0, 5)
            .map((item, index) => (
              <PlaylistItem key={index} item={item}></PlaylistItem>
            ))}
      </div>
    </StyledPlaylist>
  );
};

export default Playlist;
