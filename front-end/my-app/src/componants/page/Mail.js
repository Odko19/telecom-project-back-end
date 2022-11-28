import { RiCloseFill } from "react-icons/ri";

function Mail({ data, state }) {
  function handlerBack() {
    state(0);
  }
  function handlerZoomImg() {
    console.log("ss");
  }
  return (
    <div className="h-full w-full">
      <div className="flex justify-end">
        <button
          onClick={handlerBack}
          className="fixed shadow p-3 m-4 text-[black] rounded-md"
        >
          <RiCloseFill size="21px" />
        </button>
      </div>
      <div className="p-5">
        <p>
          <span className="text-[12px] text-[rgba(0,0,0,0.5)] mr-3"> To: </span>
          <span className="ml-[22px] text-[14px]">{data.office_to}</span>
        </p>
        <p>
          <span className="text-[12px] text-[rgba(0,0,0,0.5)]">From:</span>
          <span className="ml-[22px] text-[14px]">{data.office_from}</span>
        </p>
        <div className="h-[75vh] mt-3 overflow-y-scroll">
          <p>
            <span className="text-[12px] text-[rgba(0,0,0,0.5)] ">
              Subject:
            </span>
            <span className="ml-[10px] text-[14px]  mr-3">
              {data.subject_txt}
            </span>
          </p>
          <div className="grid grid-cols-4 mt-4">
            {data.imgUrl.map((image, index) => {
              return (
                <button key={index} onClick={handlerZoomImg}>
                  <img src={image} className="p-1" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mail;
