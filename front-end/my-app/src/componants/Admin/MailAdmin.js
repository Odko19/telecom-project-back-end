import { HiArrowSmLeft } from "react-icons/hi";
function MailAdmin({ data, state }) {
  console.log(data);
  console.log(state);

  function handlerBack() {
    state(0);
  }

  return (
    <div>
      <button onClick={handlerBack}>
        <HiArrowSmLeft size="21px" />
      </button>
    </div>
  );
}

export default MailAdmin;
