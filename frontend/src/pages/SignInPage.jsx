import { useState } from "react";
import Input from "../components/Input";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";

export default function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(null);
  const { error, loading, userData } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };
  console.log(loading);
  console.log(userData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    console.log(user);
    dispatch(login(user));
    setLoader(false);

    navigate("/dashboard");
  };

  return (
    <Wrapper>
      <div className=" max-sm:w-2/3 w-1/2  lg:w-1/4  py-10 px-5 rounded-md gap-10  bg-white flex  flex-col justify-center items-center">
        <h1 className=" text-3xl font-semibold ">Phone Shop</h1>
        <form
          onSubmit={handleSubmit}
          className=" max-w-1/2 w-full   flex flex-col gap-2 justify-center items-center "
        >
          <Input
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <Input
            label="Password"
            placeholder="password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <button className="bg-green-500 w-full rounded py-1 " type="submit">
            login
          </button>
          <p>{loader && <p>Loging in ....</p>}</p>
        </form>
      </div>
    </Wrapper>
  );
}
