import { createSlice } from "@reduxjs/toolkit";
import logozingmp3 from "~/assets/image/logo.jpeg";
export const audioSlice = createSlice({
  name: "audio",
  initialState: {
    infoSongPlayer: localStorage.getItem("infoSongPlayer") || {
      title: "Tên bài hát",
      thumbnail: logozingmp3,
      artistsNames: "Tên ca sĩ",
    },
    isPlay: false,
    isRepeat: false,
    isRandom: false,
    isMute: false,
    currentSongId: localStorage.getItem("songId") || "",
    srcAudio: "",
    currenTime: 0,
    duraTion: 0,
    playlistId: "",
    playlistSong: [],
    playlistRandom: [],
    currentIdexSong: 0,
    currentIndexSongRandom: 0,
  },
  reducers: {
    changeIconPlaying: (state, action) => {
      state.isPlay = action.payload;
    },
    setRepeatSong: (state, action) => {
      state.isRepeat = action.payload;
    },
    setRandomSong: (state, action) => {
      state.isRandom = action.payload;
    },
    setCurrentIndexSongRandom: (state, action) => {
      state.currentIndexSongRandom = action.payload;
    },
    setMuteVolume: (state, action) => {
      state.isMute = action.payload;
    },
    setSongId: (state, action) => {
      state.currentSongId = action.payload;
      localStorage.setItem("songId", JSON.stringify(action.payload));
    },
    setInfoSongPlayer: (state, action) => {
      state.infoSongPlayer = { ...action.payload };
      localStorage.setItem(
        "infoSongPlayer",
        JSON.stringify({ ...action.payload })
      );
    },
    setAudioSrc: (state, action) => {
      state.srcAudio = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currenTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duraTion = action.payload;
    },
    setPlaylistId: (state, action) => {
      state.playlistId = action.payload;
    },
    setPlaylistSong: (state, action) => {
      state.playlistSong = [...action.payload];
    },
    setPlaylistRandom: (state, action) => {
      state.playlistRandom = [...action.payload];
    },
    setCurrentIndexSong: (state, action) => {
      state.currentIdexSong = action.payload;
    },
  },
});
export const {
  changeIconPlaying,
  setRepeatSong,
  setRandomSong,
  setMuteVolume,
  setSongId,
  setInfoSongPlayer,
  setAudioSrc,
  setCurrentTime,
  setDuration,
  setPlaylistId,
  setPlaylistSong,
  setPlaylistRandom,
  setCurrentIndexSong,
  setCurrentIndexSongRandom,
} = audioSlice.actions;
export default audioSlice.reducer;
