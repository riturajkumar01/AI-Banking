"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { BanknoteIcon as Bank, Building, DollarSign, MoreVertical, Plus, Search, Send, Star, Users } from "lucide-react"

// Sample beneficiaries data
const beneficiaries = [
  {
    id: "ben-1",
    name: "Sarah Johnson",
    accountNumber: "****5678",
    bankName: "Chase Bank",
    email: "sarah.j@example.com",
    type: "external",
    favorite: true,
    recentTransaction: {
      amount: 250,
      date: "2025-04-02",
    },
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ben-2",
    name: "Michael Chen",
    accountNumber: "****9012",
    bankName: "Bank of America",
    email: "michael.c@example.com",
    type: "external",
    favorite: false,
    recentTransaction: {
      amount: 1200,
      date: "2025-03-28",
    },
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ben-3",
    name: "Emma Wilson",
    accountNumber: "****3456",
    bankName: "Wells Fargo",
    email: "emma.w@example.com",
    type: "external",
    favorite: true,
    recentTransaction: {
      amount: 75.5,
      date: "2025-04-05",
    },
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ben-4",
    name: "James Rodriguez",
    accountNumber: "****7890",
    bankName: "Citibank",
    email: "james.r@example.com",
    type: "external",
    favorite: false,
    recentTransaction: null,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ben-5",
    name: "Olivia Smith",
    accountNumber: "****2345",
    bankName: "TD Bank",
    email: "olivia.s@example.com",
    type: "internal",
    favorite: true,
    recentTransaction: {
      amount: 500,
      date: "2025-04-01",
    },
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function BeneficiariesSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showTransferDialog, setShowTransferDialog] = useState(false)
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<(typeof beneficiaries)[0] | null>(null)

  const filteredBeneficiaries = beneficiaries.filter((ben) => {
    const matchesSearch =
      ben.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ben.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ben.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "favorites") return matchesSearch && ben.favorite
    if (activeTab === "internal") return matchesSearch && ben.type === "internal"
    if (activeTab === "external") return matchesSearch && ben.type === "external"

    return matchesSearch
  })

  const handleTransfer = (beneficiary: (typeof beneficiaries)[0]) => {
    setSelectedBeneficiary(beneficiary)
    setShowTransferDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Beneficiaries</h2>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Beneficiary
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Beneficiary</DialogTitle>
              <DialogDescription>
                Enter the details of the person or organization you want to add as a beneficiary.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" placeholder="John Doe" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="account" className="text-right">
                  Account No.
                </Label>
                <Input id="account" placeholder="XXXX-XXXX-XXXX-XXXX" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bank" className="text-right">
                  Bank
                </Label>
                <Input id="bank" placeholder="Bank Name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="email@example.com" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Beneficiary</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search beneficiaries..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="internal">Internal</TabsTrigger>
          <TabsTrigger value="external">External</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredBeneficiaries.length === 0 ? (
                  <div className="py-12 text-center">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No beneficiaries found</h3>
                    <p className="text-sm text-muted-foreground">
                      {searchTerm ? "Try a different search term" : "Add your first beneficiary to get started"}
                    </p>
                  </div>
                ) : (
                  filteredBeneficiaries.map((beneficiary) => (
                    <BeneficiaryItem key={beneficiary.id} beneficiary={beneficiary} onTransfer={handleTransfer} />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="favorites" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredBeneficiaries.length === 0 ? (
                  <div className="py-12 text-center">
                    <Star className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No favorite beneficiaries</h3>
                    <p className="text-sm text-muted-foreground">Mark beneficiaries as favorites for quick access</p>
                  </div>
                ) : (
                  filteredBeneficiaries.map((beneficiary) => (
                    <BeneficiaryItem key={beneficiary.id} beneficiary={beneficiary} onTransfer={handleTransfer} />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="internal" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredBeneficiaries.length === 0 ? (
                  <div className="py-12 text-center">
                    <Building className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No internal beneficiaries</h3>
                    <p className="text-sm text-muted-foreground">
                      Internal beneficiaries are accounts within the same bank
                    </p>
                  </div>
                ) : (
                  filteredBeneficiaries.map((beneficiary) => (
                    <BeneficiaryItem key={beneficiary.id} beneficiary={beneficiary} onTransfer={handleTransfer} />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="external" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredBeneficiaries.length === 0 ? (
                  <div className="py-12 text-center">
                    <Bank className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No external beneficiaries</h3>
                    <p className="text-sm text-muted-foreground">External beneficiaries are accounts at other banks</p>
                  </div>
                ) : (
                  filteredBeneficiaries.map((beneficiary) => (
                    <BeneficiaryItem key={beneficiary.id} beneficiary={beneficiary} onTransfer={handleTransfer} />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transfer Dialog */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transfer Money</DialogTitle>
            <DialogDescription>Send money to {selectedBeneficiary?.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4 p-2 rounded-lg bg-muted">
              <Avatar>
                <AvatarImage src={selectedBeneficiary?.avatar} alt={selectedBeneficiary?.name} />
                <AvatarFallback>{selectedBeneficiary?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedBeneficiary?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedBeneficiary?.accountNumber} • {selectedBeneficiary?.bankName}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="from-account" className="text-right">
                From
              </Label>
              <select
                id="from-account"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option>Main Checking (****4567)</option>
                <option>Savings Account (****7890)</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div className="relative col-span-3">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="amount" placeholder="0.00" className="pl-9" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input id="description" placeholder="Payment for..." className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Send Money
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function BeneficiaryItem({
  beneficiary,
  onTransfer,
}: {
  beneficiary: (typeof beneficiaries)[0]
  onTransfer: (beneficiary: (typeof beneficiaries)[0]) => void
}) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={beneficiary.avatar} alt={beneficiary.name} />
          <AvatarFallback>{beneficiary.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{beneficiary.name}</p>
            {beneficiary.favorite && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
          </div>
          <p className="text-sm text-muted-foreground">
            {beneficiary.accountNumber} • {beneficiary.bankName}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {beneficiary.recentTransaction && (
          <Badge variant="outline" className="mr-2">
            Last: ${beneficiary.recentTransaction.amount}
          </Badge>
        )}
        <Button variant="outline" size="sm" onClick={() => onTransfer(beneficiary)}>
          Transfer
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Transaction History</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
