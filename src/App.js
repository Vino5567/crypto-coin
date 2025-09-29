import Navbar from "./components/Navbar";
import Features from './components/Features/Features';
import LivePrices from "./components/LivePrices";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Features />
        <LivePrices />
      </main>
      <Footer />
    </div>
  );
}

export default App;
