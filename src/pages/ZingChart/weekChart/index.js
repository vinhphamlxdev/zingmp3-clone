import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Button from "~/components/button";
const StyledWeekChart = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  .chart-box {
    background-color: ${(props) => props.theme.alphaBg};
  }
  .box-header {
    color: ${(props) => props.theme.textPrimary};
  }
  .weekchart-btn {
    background-color: ${(props) => props.theme.purplePrimary};
  }
  .view-all-song {
    border-radius: 999px;
    border: 1px solid ${(props) => props.theme.purplePrimary};
    font-size: 14px;
    font-weight: 500;
    line-height: 1.43;
    text-align: center;
    color: ${(props) => props.theme.purplePrimary};
    padding: 8px 25px;
  }
`;
const WeekChart = ({ data = [] }) => {
  const [songWeekChart, setSongWeekChart] = useState([]);
  useEffect(() => {
    if (data && data.RTChart) {
      const { korea, us, vn } = data.weekChart;
    }
    console.log(songWeekChart);
  }, [data]);
  return (
    <StyledWeekChart>
      <h3 className="title">Bảng Xếp Hạng Tuần</h3>
      <div className="grid mt-10 grid-cols-3 gap-x-7">
        <div className="chart-box py-5 px-3 rounded-xl">
          <div className="box-header flex gap-x-3 pl-10 font-semibold pb-3">
            <span className="text-2xl font-semibold text-inherit">
              Việt Nam
            </span>
            <button className="weekchart-btn flex justify-center items-center rounded-full w-7 h-7">
              <i className="p-1 text-white bi bi-play-fill play-btn"></i>
            </button>
          </div>
          <div className="chart-list-song flex flex-col mb-4"></div>
          <div className="flex justify-center items-center">
            <button className="view-all-song">Xem Tất Cả</button>
          </div>
        </div>
      </div>
    </StyledWeekChart>
  );
};

export default WeekChart;
