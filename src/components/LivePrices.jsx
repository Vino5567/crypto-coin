import { useEffect, useMemo, useState } from "react";

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false";

function formatCurrency(value) {
  if (value === null || value === undefined) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value) {
  if (value === null || value === undefined) return "-";
  return new Intl.NumberFormat("en-US").format(value);
}

export default function LivePrices() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function fetchCoins() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        if (mounted) setCoins(data);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to fetch");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchCoins();

    // Refresh every 60s
    const interval = setInterval(fetchCoins, 60000);
    return () => {
      mounted = false;
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  // Reset page to 1 when query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return coins;
    return coins.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  }, [coins, query]);

  const totalPages = Math.ceil(filtered.length / coinsPerPage);

  const paginatedCoins = useMemo(() => {
    const start = (currentPage - 1) * coinsPerPage;
    const end = start + coinsPerPage;
    return filtered.slice(start, end);
  }, [filtered, currentPage]);

  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  function goPrev() {
    goToPage(currentPage - 1);
  }

  function goNext() {
    goToPage(currentPage + 1);
  }

  return (
    <section id="prices" className="max-w-6xl mx-auto px-4 py-16">
      {/* Centered heading and search */}
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl text-white font-bold mb-4 text-center">
          Live Cryptocurrency Prices
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or symbol (e.g. bitcoin or BTC)"
            className="w-full sm:w-72 px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white placeholder-gray-400"
          />
          <div className="text-sm text-gray-300 self-center text-center">
            {coins.length} coins
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-700">
        {loading ? (
          <div className="p-6 text-center text-gray-300">Loading prices...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-400">Error: {error}</div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-gray-400">#</th>
                  <th className="px-4 py-3 text-left text-sm text-gray-400">Coin</th>
                  <th className="px-4 py-3 text-left text-sm text-gray-400">Symbol</th>
                  <th className="px-4 py-3 text-right text-sm text-gray-400">Price</th>
                  <th className="px-4 py-3 text-right text-sm text-gray-400">24h</th>
                  <th className="px-4 py-3 text-right text-sm text-gray-400">Market Cap</th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {paginatedCoins.map((coin, idx) => {
                  const change = coin.price_change_percentage_24h;
                  return (
                    <tr key={coin.id} className="hover:bg-slate-700/40">
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {coin.market_cap_rank ??
                          idx + 1 + (currentPage - 1) * coinsPerPage}
                      </td>
                      <td className="px-4 py-3 text-sm flex items-center gap-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-white">{coin.name}</div>
                          <div className="text-xs text-gray-400 hidden sm:block">
                            {coin.symbol.toUpperCase()}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {coin.symbol.toUpperCase()}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-white">
                        {formatCurrency(coin.current_price)}
                      </td>
                      <td
                        className={`px-4 py-3 text-right text-sm ${
                          change >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {change === null || change === undefined
                          ? "-"
                          : `${change.toFixed(2)}%`}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-gray-300">
                        {formatNumber(coin.market_cap)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination controls inside table box with top border */}
            <div className="border-t border-slate-700 flex justify-center items-center p-4 space-x-1 text-white">
              <button
                onClick={goPrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-slate-600 rounded disabled:opacity-50"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-1 border border-slate-600 ${
                    currentPage === i + 1
                      ? "bg-purple-600 text-white font-bold"
                      : "bg-slate-900 text-gray-300 hover:bg-slate-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={goNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-slate-600 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
