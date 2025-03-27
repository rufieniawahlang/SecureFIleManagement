import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AlertTriangle, Badge, History, Lock, RefreshCw, Shield, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold">SecureFileEdu</span>
            </Link>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-4">
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
            <Link href="/docs" className="text-sm font-medium">
              Documentation
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Enterprise-Grade Security
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Secure File Storage & Management
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Protect your sensitive data with military-grade encryption, multi-factor authentication, and
                  comprehensive access controls in our secure file management system.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth">
                    <Button
                      size="lg"
                      className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/docs">
                    <Button
                      variant="outline"
                      size="lg"
                      className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg border bg-background p-2 shadow-lg transition-all">
                  <div className="flex h-full flex-col rounded-md border shadow-sm">
                    <div className="flex h-9 items-center border-b px-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                      </div>
                      <div className="ml-2 flex-1 text-center text-sm font-medium">Secure File Management System</div>
                    </div>
                    <div className="flex-1 p-4 overflow-hidden">
                      <div className="grid gap-3">
                        <div className="flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2 text-sm">
                          <div className="flex items-center">
                            <Lock className="mr-2 h-4 w-4 text-green-500" />
                            <span>Multi-factor authentication enabled</span>
                          </div>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            Secure
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2 text-sm">
                          <div className="flex items-center">
                            <Shield className="mr-2 h-4 w-4 text-green-500" />
                            <span>AES-256 encryption active</span>
                          </div>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            Protected
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2 text-sm">
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-blue-500" />
                            <span>Role-based access control</span>
                          </div>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                            Managed
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2 text-sm">
                          <div className="flex items-center">
                            <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                            <span>Real-time threat detection</span>
                          </div>
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                            Monitored
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2 text-sm">
                          <div className="flex items-center">
                            <History className="mr-2 h-4 w-4 text-purple-500" />
                            <span>Comprehensive audit logs</span>
                          </div>
                          <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                            Tracked
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2 text-sm">
                          <div className="flex items-center">
                            <RefreshCw className="mr-2 h-4 w-4 text-cyan-500" />
                            <span>Automatic key rotation</span>
                          </div>
                          <Badge variant="outline" className="bg-cyan-500/10 text-cyan-500 border-cyan-500/20">
                            Updated
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Enterprise-Grade Security
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Comprehensive Security Features
              </h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides end-to-end protection for your most sensitive files and data
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 xl:gap-10 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Multi-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Secure access with password, biometrics, and time-based verification codes
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <line x1="3" x2="21" y1="9" y2="9" />
                    <line x1="9" x2="9" y1="21" y2="9" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Secure File Operations</h3>
                <p className="text-sm text-muted-foreground text-center">
                  End-to-end encrypted upload, download, sharing and management
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <path d="M8 10h8" />
                    <path d="M8 14h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Military-Grade Encryption</h3>
                <p className="text-sm text-muted-foreground text-center">
                  AES-256 and RSA-2048 encryption with secure key management
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Advanced Threat Protection</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Real-time monitoring and AI-powered anomaly detection
                </p>
              </div>
            </div>
            <div className="mt-12 flex justify-center">
              <Link href="/auth">
                <Button size="lg" className="rounded-full">
                  Try It Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Trusted by Security Professionals
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Users Say</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Organizations trust our platform to secure their most sensitive data
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-yellow-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "The multi-factor authentication and encryption features give us peace of mind when handling
                    sensitive client data. The intuitive interface makes security accessible to our entire team."
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="rounded-full bg-muted p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-foreground"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">CTO, TechSecure Solutions</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-yellow-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "The role-based access control has transformed how we manage team permissions. We can now
                    confidently share files internally and with clients while maintaining strict security protocols."
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="rounded-full bg-muted p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-foreground"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Michael Chen</p>
                    <p className="text-xs text-muted-foreground">Security Director, FinTech Global</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-yellow-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "The threat detection system has already prevented several potential security incidents. The
                    real-time alerts and comprehensive audit logs make compliance reporting effortless."
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="rounded-full bg-muted p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-foreground"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Emily Rodriguez</p>
                    <p className="text-xs text-muted-foreground">Compliance Officer, HealthData Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex h-16 items-center">
          <p className="text-sm text-muted-foreground">© 2025 SecureFileEdu. Educational purposes only.</p>
        </div>
      </footer>
    </div>
  )
}

