import { Routes, Route } from "react-router";
import { useState, useEffect } from "react"
import GamePage from "./pages/game";
import Header from "./components/Header/Header";
import AboutPage from "./pages/about";
import DarkMode from "./components/Toggle/Toggle";

const App = () => {
  const [dataPlayer, setDataPlayer] = useState([]);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true; });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDark));
  }, [isDark]);

  const toggleDarkMode = () => {
  setIsDark((prev) => !prev);
  };

  return (
    <>
      <Header />
         <DarkMode toggleDarkMode={toggleDarkMode} isDark={isDark} dataPlayer={dataPlayer} />
        <Routes>
        <Route path="/" element={<GamePage dataPlayer={dataPlayer} toggleDarkMode={toggleDarkMode} isDark={isDark} setIsDark={setIsDark} setDataPlayer={setDataPlayer}/>} />
        <Route path="/about" element={<AboutPage isDark={isDark} />} />
      </Routes>
    </>


  );
};

export default App;
