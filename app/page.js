import Footer from "./parts/footer";
import Main from "./parts/main-part";
import NavBar from "./parts/nav";

export default function Home() {
  return (
    <div className="page">
      <NavBar />
      <Main />
      <Footer />
    </div>
  );
}
