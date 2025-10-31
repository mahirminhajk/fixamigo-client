"use client";

import Footer from "@/components/core/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getWalletTransactions } from "@/lib/walletApi";
import { useWalletStore } from "@/stores/walletStore";
import { IWalletTransaction } from "@/types/wallet";
import { Coins, Filter, Loader2, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

export default function WalletPage() {
  const { balance, isLoading: balanceLoading, fetchBalance } = useWalletStore();
  const [transactions, setTransactions] = useState<IWalletTransaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  useEffect(() => {
    loadTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, page]);

  const loadTransactions = async () => {
    setIsLoadingTransactions(true);
    try {
      const result = await getWalletTransactions({
        offset: (page - 1) * limit,
        limit,
        type: filter === "all" ? undefined : filter.toUpperCase(),
      });
      
      if (page === 1) {
        setTransactions(result.transactions);
      } else {
        setTransactions((prev) => [...prev, ...result.transactions]);
      }
      
      setHasMore(result.transactions.length === limit);
    } catch (error) {
      console.error("Failed to load transactions:", error);
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  const handleFilterChange = (newFilter: "all" | "credit" | "debit") => {
    setFilter(newFilter);
    setPage(1);
    setTransactions([]);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionIcon = (type: string) => {
    if (type === "CREDIT" || type === "RELEASE") {
      return <TrendingUp className="h-5 w-5 text-green-600" />;
    }
    return <TrendingDown className="h-5 w-5 text-red-600" />;
  };

  const getTransactionColor = (type: string) => {
    return type === "CREDIT" || type === "RELEASE" ? "text-green-600" : "text-red-600";
  };

  if (balanceLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Wallet className="h-8 w-8 text-blue-600" />
              My Wallet
            </h1>
            <p className="text-gray-600">Manage your coins and view transaction history</p>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Available Balance */}
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-100 text-sm">Available Balance</span>
                <Coins className="h-5 w-5 text-blue-100" />
              </div>
              <p className="text-3xl font-bold">{balance?.available.toLocaleString() || 0}</p>
              <p className="text-blue-100 text-xs mt-1">coins</p>
            </Card>

            {/* Held Balance */}
            <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-100 text-sm">Held Balance</span>
                <Coins className="h-5 w-5 text-amber-100" />
              </div>
              <p className="text-3xl font-bold">{balance?.held.toLocaleString() || 0}</p>
              <p className="text-amber-100 text-xs mt-1">coins (in pending orders)</p>
            </Card>

            {/* Lifetime Earned */}
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-100 text-sm">Lifetime Earned</span>
                <TrendingUp className="h-5 w-5 text-green-100" />
              </div>
              <p className="text-3xl font-bold">{balance?.lifetime.toLocaleString() || 0}</p>
              <p className="text-green-100 text-xs mt-1">total coins earned</p>
            </Card>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-blue-900 font-semibold mb-1">How to earn coins?</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Complete service orders to earn loyalty coins</li>
                  <li>• Refer friends and get bonus coins</li>
                  <li>• Participate in campaigns and promotions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => handleFilterChange(e.target.value as any)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Transactions</option>
                  <option value="credit">Credits Only</option>
                  <option value="debit">Debits Only</option>
                </select>
              </div>
            </div>

            {/* Transactions List */}
            {isLoadingTransactions && page === 1 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-12">
                <Coins className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No transactions yet</p>
                <p className="text-sm text-gray-400 mt-1">Start using your wallet to see transactions here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {getTransactionIcon(transaction.type)}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{transaction.reason}</p>
                        <p className="text-xs text-gray-500">{formatDate(transaction.createdAt)}</p>
                        {transaction.metadata?.orderId && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            Order: {transaction.metadata.orderId}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${getTransactionColor(transaction.type)}`}>
                        {transaction.type === "CREDIT" || transaction.type === "RELEASE" ? "+" : "-"}
                        {transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">coins</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && transactions.length > 0 && (
              <div className="mt-6 text-center">
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoadingTransactions}
                  variant="outline"
                  className="w-full md:w-auto"
                >
                  {isLoadingTransactions ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
