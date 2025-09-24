import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MapPage from './pages/MapPage';
import MapSelector from './pages/MapSelector';
function App() {
  return (
  <div className="flex flex-col h-screen w-screen">
    <BrowserRouter>
     <header className="bg-amber-300 text-black h-[5%] w-full flex justify-between items-center">
          <nav className="space-x-4">
            <Link to="/maps" className="hover:text-gray-300">Sélectionner une carte</Link>
            <Link to="/map" className="hover:text-gray-300">Map</Link>
          </nav>
      </header>
      <main className="flex-1 h-[90%] w-full">
        <Routes>
          <Route path="/map" element={<MapPage/>} />
          <Route path="/maps" element={<MapSelector/>} />
        </Routes>
      </main>
    </BrowserRouter>
  </div>
  )
}
export default App;
