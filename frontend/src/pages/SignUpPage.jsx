import { useState } from "react";
import Input from "../components/Input";
import Wrapper from "../components/Wrapper";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { login } from "../redux/authSlice";

export default function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(null);
  const [user, setUser] = useState({
    email: "",
    role: "ADMIN",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleSubmit = async (e) => {
    if (user.email.trim() === "") {
      toast.error("please enter email");
      return;
    }
    if (user.password.trim() === "") {
      toast.error("please enter password");
      return;
    }
    try {
      e.preventDefault();
      setLoader(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        {
          role: user.role,
          password: user.password,
          email: user.email,
        }
      );

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
      <div className=" max-sm:w-2/3 w-1/2  lg:w-1/4  py-10 px-5 rounded-md gap-10  bg-slate-300 flex  flex-col justify-center items-center">
        <h1 className=" text-3xl font-semibold ">Phone Shop</h1>
        <form
          onSubmit={handleSubmit}
          className=" max-w-1/2 w-full   flex flex-col gap-2 justify-center items-center "
        >
          <Input
            label="Email"
            placeholder="Email "
            name="email"
            type="text"
            onChange={handleChange}
          />
          <Input
            label="Password"
            placeholder="password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <div className=" flex justify-between w-full px-2 py-2 bg-purple-200 rounded-md">
            <label htmlFor="role" className=" font-semibold">
              Select Role
            </label>
            <select
              className="bg-green-300 text-sm"
              onChange={handleChange}
              name="role"
              label="select role"
            >
              <option>ADMIN</option>
              <option>CUSTOMER</option>
            </select>
          </div>
          <button className="bg-green-500 w-full rounded py-1 " type="submit">
            Sign Up
          </button>
          <p>{loader && <p>registering User in ....</p>}</p>
          <NavLink to={"/login"}>click here to login</NavLink>
        </form>
      </div>
    </Wrapper>
  );
}
