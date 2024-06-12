import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import User from "../components/User";
import toast from "react-hot-toast";
export default function AllProducts() {
  const [products, setProducts] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const getAdminProduct = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/v1/products/admin/${params.id}`,
      {
        headers: {
          " Authorization": `Bearer ${token}`,
        },
      }
    );
    setProducts(res.data.data);
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/products/delete/${id}`,
        {
          headers: {
            " Authorization": `Bearer ${token}`,
          },
        }
      );

      if (res.data.statusCode === 201) {
        toast.success("product deleted successfully");
        navigate(`/dashboard`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getAdminProduct();
  }, []);

  return (
    <Wrapper>
      <div className="w-[98%]  flex flex-col items-center justify-center flex-wrap bg-gray-300 rounded-md gap-5 px-5 py-8  ">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <div key={product.id} className="flex flex-col w-1/2 ">
              <User
                key={product.id}
                name={product.name}
                price={product.price}
                id={product.id}
                description={product.description}
              />
              <div className="w-full  flex justify-between mt-2 items-center">
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-400 px-6 py-2 rounded-md text-sm font-medium"
                >
                  Delete
                </button>
                <button className="bg-green-400 px-6 py-2 rounded-md text-md font-medium">
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>
    </Wrapper>
  );
}
