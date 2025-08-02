import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, DollarSignIcon, EuroIcon, CurrencyIcon, RefreshCwIcon, SparklesIcon, TrendingUpIcon } from "lucide-react";
import { useState } from "react";

const WalletDashboard = () => {
  const [convertAmount, setConvertAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const walletBalances = {
    AUD: 550.00,
    USD: 1000.00,
    EUR: 700.00
  };

  const exchangeRates = {
    "USD-EUR": 0.9142,
    "USD-AUD": 1.4821,
    "EUR-USD": 1.0938,
    "EUR-AUD": 1.6201,
    "AUD-USD": 0.6747,
    "AUD-EUR": 0.6172
  };

  const transactionHistory = [
    { id: 1, from: "USD", to: "EUR", fromAmount: "100.00", toAmount: "91.42", date: "2024-07-31", status: "completed" },
    { id: 2, from: "AUD", to: "USD", fromAmount: "101.15", toAmount: "68.21", date: "2024-07-30", status: "completed" },
    { id: 3, from: "EUR", to: "AUD", fromAmount: "100.00", toAmount: "162.01", date: "2024-07-29", status: "pending" },
    { id: 4, from: "USD", to: "AUD", fromAmount: "200.00", toAmount: "296.42", date: "2024-07-28", status: "completed" },
    { id: 5, from: "EUR", to: "USD", fromAmount: "150.00", toAmount: "164.07", date: "2024-07-27", status: "failed" },
  ];

  const getConvertedAmount = () => {
    const rate = exchangeRates[`${fromCurrency}-${toCurrency}`] || 1;
    return (parseFloat(convertAmount) * rate).toFixed(2);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">Pending</Badge>;
      case 'failed':
        return <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'USD': return <DollarSignIcon className="h-4 w-4" />;
      case 'EUR': return <EuroIcon className="h-4 w-4" />;
      case 'AUD': return <CurrencyIcon className="h-4 w-4" />;
      default: return <DollarSignIcon className="h-4 w-4" />;
    }
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'AUD': return 'A$';
      default: return '$';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">
            Welcome to Aiva
          </h1>
          <p className="text-gray-600">Manage your multi-currency wallet</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(walletBalances).map(([currency, amount]) => (
            <Card key={currency} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      {getCurrencyIcon(currency)}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">{currency}</div>
                      <div className="text-xl font-semibold text-gray-900">
                        {getCurrencySymbol(currency)}{amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Smart FX Recommendations */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <SparklesIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Smart FX Recommendation</h3>
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">Today</Badge>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUpIcon className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Convert AUD to USD</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    AUD is currently strong against USD with favorable rates. Market analysis suggests this is an optimal time to convert with potential 2.1% gain over typical rates.
                  </p>
                </div>
                
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">
                  Convert Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FX Converter */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium text-gray-900">Currency Exchange</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Amount</label>
                <Input
                  type="number"
                  value={convertAmount}
                  onChange={(e) => setConvertAmount(e.target.value)}
                  placeholder="0.00"
                  className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">From</label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="AUD">AUD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">To</label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="AUD">AUD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                <RefreshCwIcon className="h-4 w-4 mr-2" />
                Convert
              </Button>
            </div>

            {convertAmount && (
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="text-center space-y-1">
                  <div className="text-2xl font-semibold text-gray-900">
                    {getCurrencySymbol(toCurrency)}{getConvertedAmount()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {convertAmount} {fromCurrency} = {getConvertedAmount()} {toCurrency}
                  </div>
                  <div className="text-xs text-gray-500">
                    Rate: 1 {fromCurrency} = {(exchangeRates[`${fromCurrency}-${toCurrency}`] || 1).toFixed(4)} {toCurrency}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium text-gray-900">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {transactionHistory.map((tx) => (
                <div key={tx.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-mono text-xs">
                          {tx.from}
                        </span>
                        <ArrowRightIcon className="h-3 w-3 text-gray-400" />
                        <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-mono text-xs">
                          {tx.to}
                        </span>
                      </div>
                      <div className="text-sm text-gray-900">
                        {getCurrencySymbol(tx.to)}{tx.toAmount}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">{formatDate(tx.date)}</span>
                      {getStatusBadge(tx.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletDashboard;