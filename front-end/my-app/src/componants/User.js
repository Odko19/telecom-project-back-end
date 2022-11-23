import { useEffect, useState } from "react";

function User() {
  const [user, setUser] = useState();
  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user")).data);
    }
  }, []);
  return (
    <div className="h-full flex justify-between">
      <div className="flex justify-center items-center ">
        <h3 className="text-xl font-medium">TELECOM MONGOLIA</h3>
      </div>
      <div className="flex justify-center items-center bg-[#ffffff] w-[400px] rounded-lg text-[#000000] p-2 shadow">
        {user?.office_name}
      </div>
    </div>
  );
}

export default User;
