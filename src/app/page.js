import Nav from "@/components/Nav";
import Stories from "@/components/Stories";
import UsersAvatarList from "@/components/usersAvatarList";
import WelcomeModal from "@/components/WelcomeModal";



export default function Home() {
  return (
    <div className="flex justify-center min-h-screen w-full font-raleway">
      <div className="flex flex-col w-[90%] text-gray-800">
        {/* <Navbar /> */}
        <Nav />
        <WelcomeModal />
        <UsersAvatarList />
        <Stories />
      </div>
    </div>
  );
}
