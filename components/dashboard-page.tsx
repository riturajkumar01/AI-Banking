"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" // Import useRouter
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Bell, CreditCard, DollarSign, Home, LogOut, Mic, Settings, Shield, User, Users } from "lucide-react"
import { TransactionsTable } from "@/components/transactions-table"
import { AccountsOverview } from "@/components/accounts-overview"
import { ProfileSection } from "@/components/profile-section"
import { FaceIdVerification } from "@/components/face-id-verification"
import { VoiceRecognition } from "@/components/voice-recognition"
import { BeneficiariesSection } from "@/components/beneficiaries-section"
import { SettingsSection } from "@/components/settings-section"
import { ChatBot } from "@/components/chat-bot"

export function DashboardPage() {
  const router = useRouter() // Initialize the router
  const [activeTab, setActiveTab] = useState("overview")
  const [showFaceId, setShowFaceId] = useState(false)
  const [showVoice, setShowVoice] = useState(false)

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SecureBank</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
                  <button>
                    <Home />
                    <span>Dashboard</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={activeTab === "transactions"}
                  onClick={() => setActiveTab("transactions")}
                >
                  <button>
                    <BarChart3 />
                    <span>Transactions</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeTab === "accounts"} onClick={() => setActiveTab("accounts")}>
                  <button>
                    <CreditCard />
                    <span>Accounts</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeTab === "profile"} onClick={() => setActiveTab("profile")}>
                  <button>
                    <User />
                    <span>My Profile</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={activeTab === "beneficiaries"}
                  onClick={() => setActiveTab("beneficiaries")}
                >
                  <button>
                    <Users />
                    <span>Beneficiaries</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeTab === "settings"} onClick={() => setActiveTab("settings")}>
                  <button>
                    <Settings />
                    <span>Settings</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-3 py-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push("/login")} // Redirect to /login
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div className="flex flex-col h-full">
            <header className="border-b bg-background/80 backdrop-blur-sm">
              <div className="flex h-16 items-center px-4 justify-between">
                <h1 className="text-xl font-semibold">Welcome back, John</h1>
                <div className="flex items-center gap-4">
                  {/* <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowVoice(true)}
                    title="Voice Recognition"
                    className="rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowFaceId(true)}
                    title="Face ID Verification"
                    className="rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <User className="h-4 w-4" />
                  </Button> */}
                  <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 transition-colors">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </header>

            <main className="flex-1 overflow-auto p-4 md:p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4 bg-background/80 backdrop-blur-sm">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="accounts">Accounts</TabsTrigger>
                  <TabsTrigger value="profile">My Profile</TabsTrigger>
                  <TabsTrigger value="beneficiaries">Beneficiaries</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transition-transform hover:scale-[1.02]">
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-blue-100">Total Balance</p>
                          <DollarSign className="h-5 w-5 text-blue-100" />
                        </div>
                        <div className="mt-4">
                          <p className="text-3xl font-bold">$45,231.89</p>
                          <p className="mt-1 flex items-center text-sm text-blue-100">
                            <span className="flex items-center text-green-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="mr-1 h-4 w-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              20.1%
                            </span>
                            &nbsp;from last month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg transition-transform hover:scale-[1.02]">
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-green-100">Savings</p>
                          <CreditCard className="h-5 w-5 text-green-100" />
                        </div>
                        <div className="mt-4">
                          <p className="text-3xl font-bold">$12,234.00</p>
                          <p className="mt-1 flex items-center text-sm text-green-100">
                            <span className="flex items-center text-green-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="mr-1 h-4 w-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              4.3%
                            </span>
                            &nbsp;from last month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg transition-transform hover:scale-[1.02]">
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-purple-100">Investments</p>
                          <BarChart3 className="h-5 w-5 text-purple-100" />
                        </div>
                        <div className="mt-4">
                          <p className="text-3xl font-bold">$24,565.89</p>
                          <p className="mt-1 flex items-center text-sm text-purple-100">
                            <span className="flex items-center text-green-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="mr-1 h-4 w-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              10.2%
                            </span>
                            &nbsp;from last month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg transition-transform hover:scale-[1.02]">
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-red-100">Spending</p>
                          <DollarSign className="h-5 w-5 text-red-100" />
                        </div>
                        <div className="mt-4">
                          <p className="text-3xl font-bold">$3,352.40</p>
                          <p className="mt-1 flex items-center text-sm text-red-100">
                            <span className="flex items-center text-red-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="mr-1 h-4 w-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              2.5%
                            </span>
                            &nbsp;from last month
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <div className="col-span-4">
                      <div className="rounded-xl bg-white shadow-md dark:bg-gray-800">
                        <div className="p-6">
                          <h3 className="text-lg font-medium">Recent Transactions</h3>
                          <div className="mt-4">
                            <TransactionsTable limit={5} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="rounded-xl bg-white shadow-md dark:bg-gray-800">
                        <div className="p-6">
                          <h3 className="text-lg font-medium">Your Accounts</h3>
                          <p className="text-sm text-muted-foreground">Overview of your banking accounts</p>
                          <div className="mt-4">
                            <AccountsOverview />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="transactions">
                  <div className="rounded-xl bg-white shadow-md dark:bg-gray-800">
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
                      <p className="text-muted-foreground mb-6">View and manage all your recent transactions</p>
                      <TransactionsTable detailed />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="accounts">
                  <div className="rounded-xl bg-white shadow-md dark:bg-gray-800">
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Your Accounts</h2>
                      <p className="text-muted-foreground mb-6">Manage your banking accounts and cards</p>
                      <AccountsOverview detailed />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="profile">
                  <div className="rounded-xl bg-white shadow-md dark:bg-gray-800">
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                      <p className="text-muted-foreground mb-6">
                        Manage your personal information and security settings
                      </p>
                      <ProfileSection />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="beneficiaries">
                  <div className="rounded-xl bg-white shadow-md dark:bg-gray-800">
                    <div className="p-6">
                      <BeneficiariesSection />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings">
                  <div className="rounded-xl bg-white shadow-md dark:bg-gray-800">
                    <div className="p-6">
                      <SettingsSection />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </SidebarInset>
      </div>

      {/* Add the ChatBot component */}
      <ChatBot />

      {showFaceId && <FaceIdVerification onClose={() => setShowFaceId(false)} />}
      {showVoice && <VoiceRecognition onClose={() => setShowVoice(false)} />}
    </SidebarProvider>
  )
}
