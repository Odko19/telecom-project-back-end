import { useEffect, useState } from "react";
import { HiArrowSmLeft } from "react-icons/hi";

function Mail({ data, state }) {
  function handlerBack() {
    state(0);
  }
  return (
    <div className="h-[78vh] w-full overflow-auto scrollbar-hide">
      <div className="border-b-[1px] bg-[#ffffff] ">
        <button onClick={handlerBack}>
          <HiArrowSmLeft size="21px" />
        </button>
      </div>
      <div className="mt-10">
        <p>
          <span className="text-[12px] text-[rgba(0,0,0,0.5)]"> To: </span>
          <span className="ml-[22px]">{data.office_to}</span>
        </p>
        <p>
          <span className="text-[12px] text-[rgba(0,0,0,0.5)]">Subject: </span>
          <span className="ml-[10px]">{data.subject_txt}</span>
        </p>
        {data.imgUrl.map((image, index) => {
          return (
            <div key={index} className="mt-5">
              <img src={image} className="h-[50vh]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Mail;
