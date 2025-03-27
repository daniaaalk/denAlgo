import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, Percent, AlertTriangle, CheckCircle2 } from 'lucide-react';

// Generate dummy chart data
const generateData = (points: number) => {
  const data = [];
  let value = 100;
  
  for (let i = 0; i < points; i++) {
    value = value + (Math.random() - 0.5) * 5;
    data.push({
      time: new Date(Date.now() - (points - i) * 60000).toLocaleTimeString(),
      price: value
    });
  }
  return data;
};

function App() {
  const [data, setData] = useState(generateData(100));
  const [signals, setSignals] = useState<string[]>([]);

  // Update chart data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const lastValue = newData[newData.length - 1].price;
        newData.push({
          time: new Date().toLocaleTimeString(),
          price: lastValue + (Math.random() - 0.5) * 5
        });
        return newData;
      });

      // Generate random AI signals
      if (Math.random() > 0.8) {
        setSignals(prev => [
          `${new Date().toLocaleTimeString()} - ${
            Math.random() > 0.5 ? 'Buy' : 'Sell'
          } signal detected`,
          ...prev.slice(0, 4)
        ]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold">AI Trading Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-800 p-2 rounded-lg">
              <span className="text-green-400">Live</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-4">
          {/* Main Chart */}
          <div className="col-span-3 bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl mb-4">BTC/USD Price Chart</h2>
            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="time" />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#4CAF50" 
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Panels */}
          <div className="space-y-4">
            {/* AI Model Status */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="text-purple-400" />
                <h2 className="text-lg font-semibold">AI Model Status</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Model Version:</span>
                  <span className="text-blue-400">v2.1.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <span className="text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Update:</span>
                  <span className="text-gray-400">5 min ago</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Percent className="text-yellow-400" />
                <h2 className="text-lg font-semibold">Performance</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Win Rate:</span>
                  <span className="text-green-400">76.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Profit Factor:</span>
                  <span className="text-green-400">2.31</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Monthly Return:</span>
                  <span className="text-green-400">+12.8%</span>
                </div>
              </div>
            </div>

            {/* Live Signals */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-orange-400" />
                <h2 className="text-lg font-semibold">Live Signals</h2>
              </div>
              <div className="space-y-2">
                {signals.map((signal, index) => (
                  <div key={index} className="text-sm bg-gray-700 p-2 rounded">
                    {signal}
                  </div>
                ))}
                {signals.length === 0 && (
                  <div className="text-gray-400 text-sm">
                    Waiting for signals...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;