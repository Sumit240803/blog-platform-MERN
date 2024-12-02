import Navbar from "./components/Navbar";
import Register from "./components/Register";
import SwitchButton from "./components/Switch";


export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <div><Navbar/></div>
      <div className="flex justify-between px-20 py-10 text-center ">
        <div className=" w-1/2 mx-2 h-96 text-3xl pt-16">
        <div className="w-3/4 m-auto">

        <h1 className="">Welcome to the community of</h1>
        <h1 className="font-bold uppercase  relative inline-block px-4 after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-700 after:opacity-0 after:transition-all after:duration-300 hover:after:w-[80%] hover:after:opacity-100 "> world class bloggers</h1>
        <h1 className="mt-10">Make blogs , share knowledge , help people and share your thoughts</h1>
        </div>
        </div>
        <div className="w-1/2">
        
        <SwitchButton/>
         </div>
      </div>
    </div>
  );
}
