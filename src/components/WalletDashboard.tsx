import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpIcon, ArrowDownIcon, SendIcon, CreditCardIcon, TrendingUpIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const WalletDashboard = () => {
  const [showBalance, setShowBalance] = useState(true);

  const portfolioData = {
    totalBalance: 12847.35,
    totalChange: 247.82,
    changePercentage: 1.97,
    assets: [
      { symbol: "BTC", name: "Bitcoin", balance: 0.5234, value: 8234.67, change: 2.34 },
      { symbol: "ETH", name: "Ethereum", balance: 12.8934, value: 3456.23, change: -1.23 },
      { symbol: "USDC", name: "USD Coin", balance: 1156.45, value: 1156.45, change: 0.01 },
    ]
  };

  const recentTransactions = [
    { id: 1, type: "receive", asset: "BTC", amount: 0.0234, value: 567.89, status: "completed", time: "2h ago" },
    { id: 2, type: "send", asset: "ETH", amount: 2.1, value: 456.78, status: "completed", time: "5h ago" },
    { id: 3, type: "receive", asset: "USDC", amount: 250, value: 250, status: "pending", time: "1d ago" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Aiva Wallet
          </h1>
          <p className="text-muted-foreground">Manage your digital assets</p>
        </div>
        <Button variant="outline" size="icon" onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Portfolio Overview */}
      <Card className="bg-gradient-card shadow-card animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Portfolio Balance</span>
            <Badge variant={portfolioData.changePercentage > 0 ? "default" : "destructive"} className="bg-success text-success-foreground">
              <TrendingUpIcon className="h-3 w-3 mr-1" />
              +{portfolioData.changePercentage}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-4xl font-bold">
              {showBalance ? `$${portfolioData.totalBalance.toLocaleString()}` : "****"}
            </div>
            <div className="text-success flex items-center">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              +${portfolioData.totalChange.toFixed(2)} today
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="gradient" className="flex-1">
              <SendIcon className="h-4 w-4 mr-2" />
              Send
            </Button>
            <Button variant="wallet" className="flex-1">
              <ArrowDownIcon className="h-4 w-4 mr-2" />
              Receive
            </Button>
            <Button variant="wallet" className="flex-1">
              <CreditCardIcon className="h-4 w-4 mr-2" />
              Buy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assets */}
      <Card className="shadow-card animate-slide-up">
        <CardHeader>
          <CardTitle>Your Assets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {portfolioData.assets.map((asset, index) => (
            <div key={asset.symbol} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">{asset.symbol}</span>
                </div>
                <div>
                  <div className="font-medium">{asset.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {showBalance ? asset.balance.toFixed(4) : "****"} {asset.symbol}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {showBalance ? `$${asset.value.toLocaleString()}` : "****"}
                </div>
                <div className={`text-sm ${asset.change > 0 ? 'text-success' : 'text-destructive'}`}>
                  {asset.change > 0 ? '+' : ''}{asset.change}%
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="shadow-card animate-slide-up">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  tx.type === 'receive' ? 'bg-success/20' : 'bg-primary/20'
                }`}>
                  {tx.type === 'receive' ? 
                    <ArrowDownIcon className="h-4 w-4 text-success" /> :
                    <ArrowUpIcon className="h-4 w-4 text-primary" />
                  }
                </div>
                <div>
                  <div className="font-medium capitalize">{tx.type} {tx.asset}</div>
                  <div className="text-sm text-muted-foreground">{tx.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {tx.type === 'receive' ? '+' : '-'}{tx.amount} {tx.asset}
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  ${tx.value.toFixed(2)}
                  <Badge 
                    variant={tx.status === 'completed' ? 'default' : 'secondary'} 
                    className="ml-2 text-xs"
                  >
                    {tx.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletDashboard;