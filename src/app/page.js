import Navbar from "@/components/Navbar";
import WelcomeModal from "@/components/WelcomeModal";



export default function Home() {
  return (
    <div className="flex justify-center min-h-screen w-full font-raleway">
      <div className="flex flex-col w-[90%] text-gray-800">
        <Navbar />
        <WelcomeModal />
      </div>
    </div>
  );
}
