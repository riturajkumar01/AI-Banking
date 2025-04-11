"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowDownUp, Filter, MoreHorizontal, Search } from "lucide-react"

// Sample transaction data
const transactions = [
  {
    id: "T-1234",
    date: "2025-04-08",
    description: "Amazon.com",
    amount: -89.99,
    status: "completed",
    category: "Shopping",
  },
  {
    id: "T-1235",
    date: "2025-04-07",
    description: "Salary Deposit",
    amount: 3500.0,
    status: "completed",
    category: "Income",
  },
  {
    id: "T-1236",
    date: "2025-04-06",
    description: "Starbucks",
    amount: -5.75,
    status: "completed",
    category: "Food & Drink",
  },
  {
    id: "T-1237",
    date: "2025-04-05",
    description: "Netflix Subscription",
    amount: -14.99,
    status: "completed",
    category: "Entertainment",
  },
  {
    id: "T-1238",
    date: "2025-04-04",
    description: "Transfer to Savings",
    amount: -500.0,
    status: "completed",
    category: "Transfer",
  },
  {
    id: "T-1239",
    date: "2025-04-03",
    description: "Uber Ride",
    amount: -24.5,
    status: "completed",
    category: "Transportation",
  },
  {
    id: "T-1240",
    date: "2025-04-02",
    description: "Grocery Store",
    amount: -78.35,
    status: "completed",
    category: "Groceries",
  },
  {
    id: "T-1241",
    date: "2025-04-01",
    description: "Gym Membership",
    amount: -49.99,
    status: "pending",
    category: "Health & Fitness",
  },
  {
    id: "T-1242",
    date: "2025-03-31",
    description: "Electric Bill",
    amount: -85.0,
    status: "completed",
    category: "Utilities",
  },
  {
    id: "T-1243",
    date: "2025-03-30",
    description: "Dividend Payment",
    amount: 32.5,
    status: "completed",
    category: "Income",
  },
]

interface TransactionsTableProps {
  limit?: number
  detailed?: boolean
}

export function TransactionsTable({ limit, detailed = false }: TransactionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const displayTransactions = limit
    ? transactions.slice(0, limit)
    : transactions.filter(
        (t) =>
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )

  return (
    <div className="space-y-4">
      {detailed && (
        <div className="flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <ArrowDownUp className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              {detailed && <TableHead className="w-[80px]">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={detailed ? 6 : 5} className="text-center">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              displayTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell className={transaction.amount > 0 ? "text-green-600" : ""}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={transaction.status === "completed" ? "outline" : "secondary"}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  {detailed && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                          <DropdownMenuItem>Report Issue</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
