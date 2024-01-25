import HomeInfo from "./HomeInfo";
import GlobalFooter from "../GlobalFooter";
import NavBar from "../NavBar";

const Home = () => {
  return <div className="flex flex-col min-h-screen">
    <NavBar selectedTab='home' />
    <HomeInfo />
    <GlobalFooter />
  </div>
}

export default Home;