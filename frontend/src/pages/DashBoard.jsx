import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import User from "../components/User";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const [products, setProducts] = useState([]);
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getProducts = async () => {
    const res = await axios.get(`http://localhost:3000/api/v1/products/all`);
    console.log(res.data);
    setProducts(res.data.data);
  };
  console.log(userData);
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Wrapper>
      <div className="w-[98%] flex flex-col items-center justify-center gap-5 ">
        <div className="w-full flex justify-between bg-white mt-5 px-4">
          <p className=" text-lg font-medium">
            Name :{userData && userData.email.split("@")[0]}
          </p>
          {userData && (
            <p className=" text-lg font-medium">
              Role:{" "}
              <span className="bg-purple-500 text-white px-2 py-1 rounded-lg">
                {" "}
                {userData && userData?.role === "ADMIN" && userData.role}
              </span>
            </p>
          )}
          {userData && (
            <div className=" flex gap-2">
              <button
                onClick={() => {
                  navigate(`create/${userData.id}`);
                }}
                className="px-4 py-2 bg-green-400 rounded-sm text-sm font-medium"
              >
                Create a product
              </button>
              <button
                onClick={() => navigate(`Allproducts/${userData.id}`)}
                className="px-4 py-2 bg-green-400 rounded-sm text-sm font-medium"
              >
                All Products
              </button>
            </div>
          )}
        </div>
        <div className="w-[98%]  flex items-center justify-center flex-wrap bg-gray-300 rounded-md gap-5 px-5 py-8  ">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <User
                key={product.id}
                name={product.name}
                price={product.price}
                id={product.id}
                description={product.description}
              />
            ))}
        </div>
      </div>
    </Wrapper>
  );
}
