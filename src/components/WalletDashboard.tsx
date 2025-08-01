import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, SettingsIcon, SparklesIcon, DollarSignIcon, EuroIcon, CurrencyIcon, RefreshCwIcon, TrendingUpIcon, BrainCircuitIcon } from "lucide-react";
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
    { id: 1, from: "USD", to: "EUR", fromAmount: "100.00", toAmount: "91.42", date: "2024-07-31", time: "14:30", status: "completed" },
    { id: 2, from: "AUD", to: "USD", fromAmount: "101.15", toAmount: "68.21", date: "2024-07-30", time: "09:15", status: "completed" },
    { id: 3, from: "EUR", to: "AUD", fromAmount: "100.00", toAmount: "162.01", date: "2024-07-29", time: "16:45", status: "pending" },
    { id: 4, from: "USD", to: "AUD", fromAmount: "200.00", toAmount: "296.42", date: "2024-07-28", time: "11:20", status: "completed" },
    { id: 5, from: "EUR", to: "USD", fromAmount: "150.00", toAmount: "164.07", date: "2024-07-27", time: "13:55", status: "failed" },
  ];

  const smartRecommendation = {
    fromCurrency: "EUR",
    toCurrency: "USD", 
    suggestedAmount: "500.00",
    rationale: "EUR is currently at a 3-month high against USD. Market analysis suggests favorable rates for the next 2-3 days before potential reversal. Consider converting now to maximize returns.",
    confidence: "High",
    potentialGain: "2.8%"
  };

  const getConvertedAmount = () => {
    const rate = exchangeRates[`${fromCurrency}-${toCurrency}`] || 1;
    return (parseFloat(convertAmount) * rate).toFixed(2);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-500/10">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
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

      {/* Smart FX Recommendations */}
      <Card className="bg-card shadow-card border border-border animate-fade-in" style={{ animationDelay: "0.35s" }}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg font-medium">
            <BrainCircuitIcon className="h-5 w-5 text-primary" />
            <span>Smart FX Recommendation</span>
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 text-xs">
              AI Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Recommendation Header */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  {getCurrencyIcon(smartRecommendation.fromCurrency)}
                </div>
                <TrendingUpIcon className="h-4 w-4 text-primary" />
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  {getCurrencyIcon(smartRecommendation.toCurrency)}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {smartRecommendation.fromCurrency} → {smartRecommendation.toCurrency}
                </div>
                <div className="text-xs text-muted-foreground">
                  Suggested: {getCurrencySymbol(smartRecommendation.fromCurrency)}{smartRecommendation.suggestedAmount}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-success">
                +{smartRecommendation.potentialGain}
              </div>
              <div className="text-xs text-muted-foreground">
                Potential gain
              </div>
            </div>
          </div>

          {/* AI Rationale */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">AI Analysis</span>
              <Badge variant="outline" className="text-xs">
                {smartRecommendation.confidence} Confidence
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-6">
              {smartRecommendation.rationale}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 font-medium">
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Convert {smartRecommendation.fromCurrency} to {smartRecommendation.toCurrency} Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="bg-card shadow-card border border-border animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium">Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted/30 border-b border-border text-sm font-medium text-muted-foreground">
            <div className="col-span-3">Date</div>
            <div className="col-span-3">Currency Pair</div>
            <div className="col-span-3">Amount</div>
            <div className="col-span-3">Status</div>
          </div>
          
          {/* Table Rows */}
          <div className="divide-y divide-border">
            {transactionHistory.map((tx, index) => (
              <div 
                key={tx.id} 
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-accent/30 transition-colors duration-200 animate-fade-in"
                style={{ animationDelay: `${0.5 + index * 0.05}s` }}
              >
                {/* Date Column */}
                <div className="col-span-3 flex flex-col">
                  <span className="text-sm font-medium text-foreground">{formatDate(tx.date)}</span>
                  <span className="text-xs text-muted-foreground">{tx.time}</span>
                </div>
                
                {/* Currency Pair Column */}
                <div className="col-span-3 flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs font-mono bg-background">
                    {tx.from}
                  </Badge>
                  <ArrowRightIcon className="h-3 w-3 text-muted-foreground" />
                  <Badge variant="outline" className="text-xs font-mono bg-background">
                    {tx.to}
                  </Badge>
                </div>
                
                {/* Amount Column */}
                <div className="col-span-3 flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {getCurrencySymbol(tx.to)}{tx.toAmount}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    from {getCurrencySymbol(tx.from)}{tx.fromAmount}
                  </span>
                </div>
                
                {/* Status Column */}
                <div className="col-span-3 flex items-center">
                  {getStatusBadge(tx.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletDashboard;