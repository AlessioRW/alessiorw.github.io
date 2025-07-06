import "./index.css"
import Header from "./compontents/Header";
import { useEffect } from "react";
import Template from "./pages/Template";

function App() {
  return (
    <div className="flex flex-row justify-center w-full">
      <div className="w-8/12 h-full mt-5 flex flex-col justify-center text-white gap-10">
        <Header />
        <Template />
      </div>
    </div >
  );
}

export default App;
