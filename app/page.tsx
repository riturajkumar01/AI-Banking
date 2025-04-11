import { DashboardPage } from "@/components/dashboard-page"

export default function Home() {
  // In a real app, you would check authentication here
  // If not authenticated, redirect to login
  // For demo purposes, we'll add a simple redirect

  // Uncomment this line to enable the redirect to login page
  // redirect("/login")

  return <DashboardPage />
}
