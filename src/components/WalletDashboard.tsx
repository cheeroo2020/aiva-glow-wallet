import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, SettingsIcon, SparklesIcon, DollarSignIcon, EuroIcon, CurrencyIcon, RefreshCwIcon } from "lucide-react";
import { useState } from "react";

const WalletDashboard = () => {
  const [convertAmount, setConvertAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const walletBalances = {
    USD: 1000.00,
    EUR: 700.00,
    AUD: 550.00
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
    { id: 1, from: "USD", to: "EUR", fromAmount: "100.00", toAmount: "91.42", date: "Jul 31", time: "14:30" },
    { id: 2, from: "AUD", to: "USD", fromAmount: "101.15", toAmount: "68.21", date: "Jul 30", time: "09:15" },
    { id: 3, from: "EUR", to: "AUD", fromAmount: "100.00", toAmount: "162.01", date: "Jul 29", time: "16:45" },
    { id: 4, from: "USD", to: "AUD", fromAmount: "200.00", toAmount: "296.42", date: "Jul 28", time: "11:20" },
  ];

  const getConvertedAmount = () => {
    const rate = exchangeRates[`${fromCurrency}-${toCurrency}`] || 1;
    return (parseFloat(convertAmount) * rate).toFixed(2);
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'USD': return <DollarSignIcon className="h-5 w-5" />;
      case 'EUR': return <EuroIcon className="h-5 w-5" />;
      case 'AUD': return <CurrencyIcon className="h-5 w-5" />;
      default: return <DollarSignIcon className="h-5 w-5" />;
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
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* ✅ Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome to Aiva
          </h1>
          <p className="text-muted-foreground mt-1">Your intelligent currency exchange wallet</p>
        </div>
        <Button variant="ghost" size="icon" className="hover-scale">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </div>

      {/* 💰 Balance blocks - 3 cards for USD, EUR, AUD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(walletBalances).map(([currency, amount], index) => (
          <Card key={currency} className="bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-glow-pulse">
                    {getCurrencyIcon(currency)}
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground font-medium">{currency}</div>
                    <div className="text-2xl font-bold text-foreground">
                      {getCurrencySymbol(currency)}{amount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 🔁 FX Converter block */}
      <Card className="shadow-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RefreshCwIcon className="h-5 w-5 text-primary" />
            <span>Currency Converter</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                type="number"
                value={convertAmount}
                onChange={(e) => setConvertAmount(e.target.value)}
                placeholder="Enter amount"
                className="text-lg font-medium h-12"
              />
            </div>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-24 h-12 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="AUD">AUD</SelectItem>
              </SelectContent>
            </Select>
            <ArrowRightIcon className="h-5 w-5 text-primary animate-pulse" />
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="w-24 h-12 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="AUD">AUD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {convertAmount && (
            <div className="p-4 rounded-lg bg-gradient-primary/10 border border-primary/20 animate-scale-in">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {convertAmount} {fromCurrency} = {getConvertedAmount()} {toCurrency}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Exchange rate: 1 {fromCurrency} = {(exchangeRates[`${fromCurrency}-${toCurrency}`] || 1).toFixed(4)} {toCurrency}
                </div>
              </div>
            </div>
          )}

          {/* 🎨 Buttons */}
          <div className="flex gap-3">
            <Button variant="gradient" className="flex-1 h-12 hover-scale">
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Convert
            </Button>
            <Button variant="wallet" className="flex-1 h-12 hover-scale">
              <SparklesIcon className="h-4 w-4 mr-2" />
              Get FX Suggestion
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 🧾 Transaction log */}
      <Card className="shadow-card animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {transactionHistory.map((tx, index) => (
            <div 
              key={tx.id} 
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 hover-scale animate-fade-in"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {tx.from}
                  </Badge>
                  <ArrowRightIcon className="h-3 w-3 text-muted-foreground" />
                  <Badge variant="secondary" className="text-xs font-medium">
                    {tx.to}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {getCurrencySymbol(tx.from)}{tx.fromAmount} → {getCurrencySymbol(tx.to)}{tx.toAmount}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{tx.date}</div>
                <div className="text-xs text-muted-foreground">{tx.time}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletDashboard;