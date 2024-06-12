import image from "../../public/headphones.avif";

// eslint-disable-next-line react/prop-types
export default function ProductCard({ name, price, description }) {
  return (
    <div className=" h-[400px] py-2 bg-white border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border shadow-md ">
      <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href="#"
      >
        <img
          className="peer absolute top-0 right-0 h-full w-full object-cover"
          src={image}
          alt="product image"
        />
        <div className="peer peer-hover:right-0 absolute top-0  -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 bg-white flex justify-bottom items-center">
          <a href="#">
            <h5 className=" ps-4 text-xl tracking-tight font-bold  text-gray-700">
              {description}
            </h5>
          </a>
        </div>

        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          50% OFF
        </span>
      </a>
      <div className="mt-4 px-5 pb-5">
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p className="text-3xl font-bold text-gray-700">{name}</p>
          <p>
            <span className="text-3xl font-bold text-gray-700">${price}</span>
            <span className="text-sm text-gray-700 line-through">
              {price * 2}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
