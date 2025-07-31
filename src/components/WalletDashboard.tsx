import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, SettingsIcon, SparklesIcon, DollarSignIcon, EuroIcon, CurrencyIcon } from "lucide-react";
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

  const recentTransactions = [
    { id: 1, from: "USD", to: "EUR", amount: "€91.42", date: "Jul 31" },
    { id: 2, from: "AUD", to: "USD", amount: "$68.21", date: "Jul 30" },
    { id: 3, from: "EUR", to: "AUD", amount: "A$162.01", date: "Jul 29" },
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

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">A</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">AIVA</h1>
        </div>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </div>

      {/* Wallet Balance */}
      <Card className="shadow-card animate-slide-up">
        <CardHeader>
          <CardTitle>Your Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(walletBalances).map(([currency, amount]) => (
              <div key={currency} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    {getCurrencyIcon(currency)}
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">[{currency}]</div>
                    <div className="text-lg font-semibold">
                      {currency === 'USD' && '$'}
                      {currency === 'EUR' && '€'}
                      {currency === 'AUD' && '$'}
                      {amount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Convert Currency */}
      <Card className="shadow-card animate-slide-up">
        <CardHeader>
          <CardTitle>Convert Currency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                type="number"
                value={convertAmount}
                onChange={(e) => setConvertAmount(e.target.value)}
                placeholder="Amount"
                className="text-lg"
              />
            </div>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="AUD">AUD</SelectItem>
              </SelectContent>
            </Select>
            <ArrowRightIcon className="h-5 w-5 text-muted-foreground" />
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="AUD">AUD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {convertAmount && (
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <div className="text-lg font-semibold">
                {convertAmount} {fromCurrency} = {getConvertedAmount()} {toCurrency}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="gradient" className="flex-1">
              Convert
            </Button>
            <Button variant="wallet" className="flex-1">
              <SparklesIcon className="h-4 w-4 mr-2" />
              Get AI Suggestion
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="shadow-card animate-slide-up">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {tx.from}
                  </Badge>
                  <ArrowRightIcon className="h-3 w-3 text-muted-foreground" />
                  <Badge variant="secondary" className="text-xs">
                    {tx.to}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="font-medium">{tx.amount}</div>
                <div className="text-sm text-muted-foreground">{tx.date}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletDashboard;