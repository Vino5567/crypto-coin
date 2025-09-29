import { FaChartLine, FaShieldAlt, FaBolt } from "react-icons/fa";
import FeatureCard from './FeatureCard';

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-4 py-20">
      {/* Section Title */}
      <h2 className="text-center text-white text-3xl sm:text-4xl font-semibold mb-4">
        Built for <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Professional Trading</span>
      </h2>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
        Enterprise-grade cryptocurrency analytics platform designed for institutional investors, professional traders, and serious crypto enthusiasts worldwide.
      </p>

      {/* Feature Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={<FaChartLine />}
          title="Real-Time Market Data"
          desc="Professional-grade market data with millisecond precision for serious trading decisions."
          features={["Live price feeds", "Order book depth", "Volume analysis"]}
        />
        <FeatureCard
          icon={<FaShieldAlt />}
          title="Enterprise Security"
          desc="Bank-level security protocols with institutional-grade data protection and compliance."
          features={["256-bit encryption", "SOC 2 compliance", "99.9% uptime"]}
        />
        <FeatureCard
          icon={<FaBolt />}
          title="Lightning Performance"
          desc="Optimized infrastructure delivering sub-second response times across all features."
          features={["Sub-second search", "Smart caching", "Mobile optimized"]}
        />
      </div>
    </section>
  );
}
