import HomeInfo from "./HomeInfo";
import GlobalFooter from "../GlobalFooter";
import NavBar from "../NavBar";

const Home = () => {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] h-screen">
      <NavBar selectedTab='home' />
      <div className="overflow-auto">
        <HomeInfo />
      </div>
      <GlobalFooter />
    </div>
  );
}

export default Home;