import { useState } from "react";
import Input from "../components/Input";
import Wrapper from "../components/Wrapper";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import toast from "react-hot-toast";
import axios from "axios";
export default function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);

      const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
        password: user.password,
        email: user.email,
      });

      dispatch(login(res.data.data));
      if (res.data.data.accessToken) {
        navigate("/dashboard");
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Wrapper>
      <div className=" max-sm:w-2/3 w-1/2  lg:w-1/4  py-10 px-5 rounded-md gap-10  bg-purple-300 flex  flex-col justify-center items-center">
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
          <NavLink to={"/"}>click here to sign-up</NavLink>
        </form>
      </div>
    </Wrapper>
  );
}
