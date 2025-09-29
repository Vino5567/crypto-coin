import { FaCheckCircle } from "react-icons/fa";

const FeatureCard = ({ icon, title, desc, features }) => (
  <div className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2a2a2a] shadow-sm hover:shadow-md transition">
    {/* Icon section */}
    <div className="bg-[#2c0f42] w-10 h-10 flex items-center justify-center rounded-md mb-4 text-purple-400 text-xl">
      {icon}
    </div>

    {/* Title and Description */}
    <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm mb-4">{desc}</p>

    {/* Feature list */}
    <ul className="text-sm text-purple-400 space-y-2 mb-4">
      {features.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <FaCheckCircle className="text-purple-500 text-base" />
          {item}
        </li>
      ))}
    </ul>

    
  </div>
);

export default FeatureCard;
