import Navbar from "./components/Navbar";
import Register from "./components/Register";


export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <div><Navbar/></div>
      <div className="flex justify-between px-20 py-10 text-center ">
        <div className=" w-1/2 mx-2 h-96 text-3xl pt-16">
        <div className="w-3/4 m-auto">

        <h1 className="">Welcome to the community of</h1>
        <h1 className="font-bold uppercase pb-10"> world class bloggers</h1>
        <h1>Make blogs , share knowledge , help people and share your thoughts</h1>
        </div>
        </div>
        <div className="w-1/2">
        <Register/>
        
         </div>
      </div>
    </div>
  );
}
