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
    <div className="min-h-screen bg-background p-4 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl lg:text-4xl font-light text-foreground mb-2">
            Wallet Dashboard
          </h1>
          <p className="text-muted-foreground">Multi-currency exchange platform</p>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-accent">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(walletBalances).map(([currency, amount], index) => (
          <Card key={currency} className="bg-card shadow-card hover:shadow-glow transition-all duration-300 border border-border animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {getCurrencyIcon(currency)}
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{currency}</div>
                    <div className="text-2xl font-semibold text-foreground mt-1">
                      {getCurrencySymbol(currency)}{amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Available
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Currency Converter */}
      <Card className="bg-card shadow-card border border-border animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg font-medium">
            <RefreshCwIcon className="h-5 w-5 text-primary" />
            <span>Currency Exchange</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Amount</label>
              <Input
                type="number"
                value={convertAmount}
                onChange={(e) => setConvertAmount(e.target.value)}
                placeholder="0.00"
                className="text-lg font-medium h-12 bg-input border-border"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">From</label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="h-12 bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="AUD">AUD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRightIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">To</label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="h-12 bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="AUD">AUD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {convertAmount && (
            <div className="p-6 rounded-lg bg-accent/50 border border-primary/20 animate-scale-in">
              <div className="text-center space-y-2">
                <div className="text-2xl font-semibold text-foreground">
                  {getCurrencySymbol(toCurrency)}{getConvertedAmount()}
                </div>
                <div className="text-sm text-muted-foreground">
                  {convertAmount} {fromCurrency} = {getConvertedAmount()} {toCurrency}
                </div>
                <div className="text-xs text-muted-foreground">
                  Rate: 1 {fromCurrency} = {(exchangeRates[`${fromCurrency}-${toCurrency}`] || 1).toFixed(4)} {toCurrency}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button className="flex-1 h-12 bg-primary hover:bg-primary/90">
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Convert Now
            </Button>
            <Button variant="outline" className="flex-1 h-12">
              <SparklesIcon className="h-4 w-4 mr-2" />
              Get Quote
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="bg-card shadow-card border border-border animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {transactionHistory.map((tx, index) => (
            <div 
              key={tx.id} 
              className="flex items-center justify-between p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-all duration-200 border border-transparent hover:border-border animate-fade-in"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs font-medium bg-muted text-muted-foreground">
                    {tx.from}
                  </Badge>
                  <ArrowRightIcon className="h-3 w-3 text-muted-foreground" />
                  <Badge variant="secondary" className="text-xs font-medium bg-muted text-muted-foreground">
                    {tx.to}
                  </Badge>
                </div>
                <div className="text-sm text-foreground font-medium">
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