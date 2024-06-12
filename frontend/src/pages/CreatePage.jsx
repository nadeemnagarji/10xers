import { useState } from "react";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(null);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const { token } = useSelector((state) => state.auth);
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    console.log(product);
  };
  // console.log(token);
  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:3000/api/v1/products/create",
      {
        ...product,
      },
      {
        headers: {
          " Authorization": `Bearer ${token}`,
        },
      }
    );

    console.log(res.data.data);
    if (res.data.data) {
      navigate("/dashboard");
    }

    if (res.data.error) {
      setError(res.data.error);
    }

    setLoader(false);
  };

  return (
    <div>
      <Wrapper>
        <div className=" mt-10 max-sm:w-2/3 w-1/2  lg:w-1/4  py-10 px-5 rounded-md gap-10  bg-gray-300 flex  flex-col justify-center items-center">
          <h1 className=" text-3xl font-semibold ">Create Product</h1>
          <form
            className=" max-w-1/2 w-full   flex flex-col gap-2 justify-center items-center "
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col text-md font-medium">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="name"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col text-md font-medium">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                placeholder="price"
                name="price"
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col text-md font-medium">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                placeholder="description"
                name="description"
                onChange={handleChange}
              />
            </div>
            <button className="bg-green-500 w-full rounded py-1 " type="submit">
              Create
            </button>
            <p>{loader && <p>product is getting created...</p>}</p>
            <p>{error && <p>{error}</p>}</p>
          </form>
        </div>
      </Wrapper>
    </div>
  );
}
