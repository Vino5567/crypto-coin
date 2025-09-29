import logo from "../assets/logo.png"; // make sure the path is correct

export default function Footer() {
  return (
    <footer id="contact" className="bg-black text-gray-400 border-t border-gray-700 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left: Logo + Name */}
        <div className="flex items-center mb-4 md:mb-0">
          <img src={logo} alt="logo" className="w-7 h-7 mr-2" />
          <span className="text-white font-bold text-lg">CryptoLab</span>
        </div>

        {/* Center: Contact Us */}
        <div className="mb-4 md:mb-0">
          <a
            href="mailto:sportsTechMadurai@gmail.com"
            className="text-purple-400 hover:text-purple-300 transition font-medium"
          >
            Contact Us
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} CryptoLab. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
