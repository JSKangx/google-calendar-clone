import Header from "@/components/layouts/Header";
import "./App.css";
import Sidebar from "@/components/layouts/Sidebar";

function App() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <div className="flex flex-1 h-full">
        <Sidebar />
        <main>main</main>
      </div>
    </div>
  );
}

export default App;
