import Navbar from "./Navbar";

export default function Wrapper({ children }) {
  return (
    <div className=" w-full items-center h-screen flex flex-col  bg-white">
      <Navbar />
      <div className="w-full bg-white flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
}
