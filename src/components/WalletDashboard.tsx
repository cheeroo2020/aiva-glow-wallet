import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowRightIcon, DollarSignIcon, EuroIcon, CurrencyIcon, RefreshCwIcon, SparklesIcon, TrendingUpIcon, ChevronDownIcon, ShieldCheckIcon, LeafIcon } from "lucide-react";
import { useState } from "react";

const WalletDashboard = () => {
  const [convertAmount, setConvertAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  // Carbon footprint estimation
  const estimateCarbonFootprint = (transaction: any) => {
    const baseAmount = parseFloat(transaction.fromAmount);
    const methodFactor = 0.05; // Default factor for fx transactions
    const fxBonus = (baseAmount / 100.0) * 0.02; // Small bonus based on amount
    const totalKg = methodFactor + fxBonus;
    return Math.round(totalKg * 1000) / 1000; // Round to 3 decimal places
  };

  const getCarbonBand = (kg: number) => {
    if (kg < 0.05) return "Low";
    if (kg < 0.15) return "Medium";
    return "High";
  };

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
    { id: 1, from: "USD", to: "EUR", fromAmount: "100.00", toAmount: "91.42", date: "2024-07-31", status: "completed", compliance: "Clear" },
    { id: 2, from: "AUD", to: "USD", fromAmount: "101.15", toAmount: "68.21", date: "2024-07-30", status: "completed", compliance: "Review" },
    { id: 3, from: "EUR", to: "AUD", fromAmount: "100.00", toAmount: "162.01", date: "2024-07-29", status: "pending", compliance: "Clear" },
    { id: 4, from: "USD", to: "AUD", fromAmount: "200.00", toAmount: "296.42", date: "2024-07-28", status: "completed", compliance: "Blocked" },
    { id: 5, from: "EUR", to: "USD", fromAmount: "150.00", toAmount: "164.07", date: "2024-07-27", status: "failed", compliance: "Review" },
  ];

  const getConvertedAmount = () => {
    const rate = exchangeRates[`${fromCurrency}-${toCurrency}`] || 1;
    return (parseFloat(convertAmount) * rate).toFixed(2);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success text-success-foreground hover:bg-success/90">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground hover:bg-warning/90">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getComplianceBadge = (compliance: string) => {
    switch (compliance) {
      case 'Clear':
        return <Badge className="bg-success text-success-foreground hover:bg-success/90">Clear</Badge>;
      case 'Review':
        return <Badge className="bg-warning text-warning-foreground hover:bg-warning/90">Review</Badge>;
      case 'Blocked':
        return <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Blocked</Badge>;
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
        <Card className="bg-white border border-gray-200 shadow-lg rounded-xl">
          <CardHeader className="pb-6 border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-muted/30 border-b border-border">
              <div className="col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</div>
              <div className="col-span-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Currency Pair</div>
              <div className="col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</div>
              <div className="col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Compliance</div>
              <div className="col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</div>
              <div className="col-span-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider"></div>
            </div>
            
            {/* Table Rows */}
            <div className="divide-y divide-border">
              {transactionHistory.map((tx, index) => {
                const carbonKg = estimateCarbonFootprint(tx);
                const carbonBand = getCarbonBand(carbonKg);
                const [isOpen, setIsOpen] = useState(false);
                
                return (
                  <div key={tx.id}>
                    {/* Main Transaction Row */}
                    <div 
                      className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-primary/5 transition-all duration-200 ${
                        index % 2 === 0 ? 'bg-card' : 'bg-muted/30'
                      }`}
                    >
                      {/* Date Column */}
                      <div className="col-span-2 flex flex-col">
                        <span className="text-sm font-medium text-foreground">{formatDate(tx.date)}</span>
                        <span className="text-xs text-muted-foreground">2024</span>
                      </div>
                      
                      {/* Currency Pair Column */}
                      <div className="col-span-3 flex items-center space-x-2">
                        <div className="flex items-center space-x-1.5">
                          <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-xs font-semibold border border-primary/20">
                            {tx.from}
                          </span>
                          <ArrowRightIcon className="h-3 w-3 text-muted-foreground" />
                          <span className="px-2.5 py-1 bg-teal/10 text-teal rounded-md text-xs font-semibold border border-teal/20">
                            {tx.to}
                          </span>
                        </div>
                      </div>
                      
                      {/* Amount Column */}
                      <div className="col-span-2 flex flex-col">
                        <span className="text-sm font-semibold text-foreground">
                          {getCurrencySymbol(tx.to)}{tx.toAmount}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          from {getCurrencySymbol(tx.from)}{tx.fromAmount}
                        </span>
                      </div>
                      
                      {/* Compliance Column */}
                      <div className="col-span-2 flex items-center">
                        {getComplianceBadge(tx.compliance)}
                      </div>

                      {/* Status Column */}
                      <div className="col-span-2 flex items-center">
                        {getStatusBadge(tx.status)}
                      </div>
                      
                      {/* Expand Button */}
                      <div className="col-span-1 flex items-center justify-end">
                        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                            </Button>
                          </CollapsibleTrigger>
                        </Collapsible>
                      </div>
                    </div>
                    
                    {/* Collapsible Content */}
                    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                      <CollapsibleContent className={`${
                        index % 2 === 0 ? 'bg-card' : 'bg-muted/30'
                      } border-t border-border/50`}>
                        <div className="px-6 py-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Compliance Card */}
                            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                              <div className="flex items-center space-x-2">
                                <ShieldCheckIcon className="h-4 w-4 text-primary" />
                                <h4 className="font-semibold text-foreground">Compliance Details</h4>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Status:</span>
                                  <span className="font-medium">{getComplianceBadge(tx.compliance)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">KYC/AML:</span>
                                  <span className="text-success font-medium">Verified</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Risk Level:</span>
                                  <span className="text-foreground font-medium">
                                    {tx.compliance === 'Clear' ? 'Low' : tx.compliance === 'Review' ? 'Medium' : 'High'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Sanctions:</span>
                                  <span className="text-success font-medium">Clear</span>
                                </div>
                              </div>
                            </div>

                            {/* Carbon Footprint Card */}
                            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                              <div className="flex items-center space-x-2">
                                <LeafIcon className="h-4 w-4 text-teal" />
                                <h4 className="font-semibold text-foreground">Carbon Impact</h4>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Emissions:</span>
                                  <Badge className="bg-teal/10 text-teal border-teal/20">
                                    {carbonKg} kg CO₂
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Impact Level:</span>
                                  <span className={`font-medium ${
                                    carbonBand === 'Low' ? 'text-success' : 
                                    carbonBand === 'Medium' ? 'text-warning' : 'text-destructive'
                                  }`}>
                                    {carbonBand}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Method:</span>
                                  <span className="text-foreground font-medium">Digital Transfer</span>
                                </div>
                                <div className="pt-2 border-t border-border/50">
                                  <Button variant="outline" size="sm" className="w-full text-teal border-teal/20 hover:bg-teal/10">
                                    Offset Carbon Impact
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletDashboard;