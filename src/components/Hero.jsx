import heroBg from '../assets/gradient image.jpg';


export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-12 bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${heroBg})` }} // image
    >
      {/* overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-28 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Track the <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Crypto Market</span> in Real-Time
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Live prices, market caps, and 24h changes — all in one place. Stay informed and trade smarter.
        </p>
        <div className="flex justify-center gap-4">
          
        <a
          id="get-started"
          href="#prices"
          className="px-6 py-3 rounded-md font-medium shadow text-white bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 transition"
        >
          Get Started
        </a>

        <a
          href="#features"
          className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-900 transition"
        >
          Learn More
        </a>

        </div>
      </div>
    </section>
  );
}
