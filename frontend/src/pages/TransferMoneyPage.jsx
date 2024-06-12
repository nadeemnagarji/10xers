import { useLocation, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Wrapper from "../components/Wrapper";
import { useState } from "react";
import axios from "axios";

export default function TransferMoneyPage() {
  const [search, setSearch] = useState(null);
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const name = queryParams.get("name");
  //   console.log(name, id);

  //   console.log(typeof search);

  const handleTransfer = async () => {
    const res = await axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      { sendTo: id, amount: search },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    console.log(res.data.message);

    if (res.data.message) {
      setSuccess(true);
    }
  };

  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="w-[40%] h-1/2 bg-green-500 flex flex-col gap-2">
        <h1 className=" text-center mt-2 capitalize text-3xl mb-3 font-medium">
          {name}
        </h1>
        <Input
          placeholder="Enter the amount"
          classes="px-4 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search &&
          (isNaN(search) ? (
            <p className=" text-center mt-3 font-medium capitalize text-black ">
              please enter a number
            </p>
          ) : (
            <p className=" text-center mt-3 font-medium capitalize text-black ">
              {" "}
              send {search} rupees to nihal
            </p>
          ))}
        {success ? (
          <button
            className="mt-auto bg-yellow-500 mb-2 py-2 px-2 w-fit self-center rounded-md text-gray-800 text-lg font-medium"
            onClick={() => navigate("/dashboard")}
          >
            Money Transfered Successfully
          </button>
        ) : (
          <button
            onClick={handleTransfer}
            className="mt-auto bg-purple-800 mb-2 py-2 w-[200px] self-center rounded-full text-red-100 text-lg font-medium"
          >
            Send
          </button>
        )}
      </div>
    </Wrapper>
  );
}
