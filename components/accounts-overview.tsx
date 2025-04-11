"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, DollarSign, PlusCircle } from "lucide-react"

// Sample accounts data
const accounts = [
  {
    id: "acc-1",
    name: "Main Checking",
    number: "****4567",
    balance: 12345.67,
    type: "checking",
    color: "bg-blue-500",
  },
  {
    id: "acc-2",
    name: "Savings Account",
    number: "****7890",
    balance: 24680.13,
    type: "savings",
    color: "bg-green-500",
  },
  {
    id: "acc-3",
    name: "Investment Portfolio",
    number: "****2345",
    balance: 8206.09,
    type: "investment",
    color: "bg-purple-500",
  },
]

// Sample cards data
const cards = [
  {
    id: "card-1",
    name: "Platinum Credit Card",
    number: "****9876",
    expiryDate: "05/28",
    limit: 10000,
    balance: 2340.5,
    type: "credit",
    color: "bg-slate-800",
  },
  {
    id: "card-2",
    name: "Gold Debit Card",
    number: "****5432",
    expiryDate: "09/27",
    type: "debit",
    color: "bg-amber-500",
  },
]

interface AccountsOverviewProps {
  detailed?: boolean
}

export function AccountsOverview({ detailed = false }: AccountsOverviewProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Bank Accounts</h3>
        <div className="space-y-3">
          {accounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-10 rounded-sm ${account.color}`} />
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-muted-foreground">{account.number}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground">{account.type}</p>
              </div>
            </div>
          ))}
        </div>

        {detailed && (
          <Button variant="outline" size="sm" className="mt-3 w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Account
          </Button>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Cards</h3>
        <div className="space-y-3">
          {cards.map((card) => (
            <div key={card.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-10 rounded-sm ${card.color}`} />
                <div>
                  <p className="font-medium">{card.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {card.number} • Exp: {card.expiryDate}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {card.type === "credit" && (
                  <>
                    <p className="font-medium">
                      ${card.balance?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <div className="w-32">
                      <Progress value={(card.balance! / card.limit!) * 100} className="h-1.5 mt-1" />
                      <p className="text-xs text-muted-foreground mt-0.5">
                        ${card.balance?.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}{" "}
                        of $
                        {card.limit?.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </>
                )}
                {card.type === "debit" && <p className="text-sm text-muted-foreground">{card.type}</p>}
              </div>
            </div>
          ))}
        </div>

        {detailed && (
          <Button variant="outline" size="sm" className="mt-3 w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            Manage Cards
          </Button>
        )}
      </div>

      {detailed && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Transfer</CardTitle>
            <CardDescription>Transfer money between your accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">From</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>Main Checking (****4567)</option>
                    <option>Savings Account (****7890)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">To</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>Savings Account (****7890)</option>
                    <option>Main Checking (****4567)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="0.00"
                    className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Transfer Funds</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
