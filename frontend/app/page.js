import Navbar from "./components/Navbar";
import Register from "./components/Register";
import SwitchButton from "./components/Switch";

export default function Home() {
  const api  = `${process.env.NEXT_PUBLIC_API_PROD}/public/home`;
  console.log(api);
  return (
    <div className="bg-black bg-main min-h-screen w-screen min-w-full text-white">
      {/* Navbar */}
      <div>
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between px-6 md:px-20 py-10 text-center">
        {/* Welcome Section */}
        <div className="w-full md:w-1/2 mx-2 h-auto md:h-96 xl:text-3xl md:text-3xl pt-8 md:pt-16">
          <div className="w-11/12 md:w-3/4 mx-auto">
            <h1 className="">Welcome to the community of</h1>
            <h1 className="font-bold uppercase relative inline-block px-4 after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-700 after:opacity-0 after:transition-all after:duration-300 hover:after:w-[80%] hover:after:opacity-100">
              world-class bloggers
            </h1>
            <h1 className="mt-6 md:mt-10 text-base md:text-lg">
              Make blogs, share knowledge, help people, and share your thoughts.
            </h1>
          </div>
        </div>

        {/* Switch Button Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
          <SwitchButton />
        </div>
      </div>
    </div>
  );
}
