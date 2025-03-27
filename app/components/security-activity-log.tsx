"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Clock, FileText, Lock, Shield, User } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SecurityEvent {
  id: string
  type: "login" | "file_access" | "encryption" | "threat" | "admin"
  description: string
  timestamp: Date
  severity: "low" | "medium" | "high"
  ip?: string
  user?: string
}

export function SecurityActivityLog() {
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    // Generate mock security events
    const mockEvents: SecurityEvent[] = [
      {
        id: "1",
        type: "login",
        description: "Successful login",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        severity: "low",
        ip: "192.168.1.1",
        user: "admin@example.com",
      },
      {
        id: "2",
        type: "file_access",
        description: "Financial_Data.xlsx accessed",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        severity: "low",
        user: "admin@example.com",
      },
      {
        id: "3",
        type: "encryption",
        description: "Project_Report.docx encrypted with AES-256",
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        severity: "low",
        user: "admin@example.com",
      },
      {
        id: "4",
        type: "threat",
        description: "Failed login attempt (3 consecutive failures)",
        timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        severity: "medium",
        ip: "203.0.113.42",
      },
      {
        id: "5",
        type: "admin",
        description: "Security settings updated",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        severity: "medium",
        user: "admin@example.com",
      },
      {
        id: "6",
        type: "threat",
        description: "Unusual file access pattern detected",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        severity: "high",
        ip: "198.51.100.23",
        user: "admin@example.com",
      },
    ]

    setEvents(mockEvents)

    // Add a new event every 30 seconds for demo purposes
    const interval = setInterval(() => {
      const eventTypes = ["login", "file_access", "encryption", "threat", "admin"] as const
      const severities = ["low", "medium", "high"] as const

      const newEvent: SecurityEvent = {
        id: Math.random().toString(36).substring(2, 11),
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        description: getRandomDescription(),
        timestamp: new Date(),
        severity: severities[Math.floor(Math.random() * severities.length)],
        ip: "192.168.1." + Math.floor(Math.random() * 255),
        user: Math.random() > 0.3 ? "admin@example.com" : undefined,
      }

      setEvents((prev) => [newEvent, ...prev].slice(0, 20)) // Keep only the 20 most recent events
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getRandomDescription = () => {
    const descriptions = [
      "User session started",
      "File downloaded",
      "Password changed",
      "New device authenticated",
      "File sharing permissions updated",
      "Encryption key rotated",
      "Suspicious IP address blocked",
      "File access attempt blocked",
    ]

    return descriptions[Math.floor(Math.random() * descriptions.length)]
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  const getEventIcon = (type: SecurityEvent["type"]) => {
    switch (type) {
      case "login":
        return <User className="h-4 w-4" />
      case "file_access":
        return <FileText className="h-4 w-4" />
      case "encryption":
        return <Lock className="h-4 w-4" />
      case "threat":
        return <AlertTriangle className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: SecurityEvent["severity"]) => {
    switch (severity) {
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "medium":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20"
    }
  }

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true
    return event.type === filter
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Security Activity Log</CardTitle>
          <CardDescription>Real-time monitoring of security events</CardDescription>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter events" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="login">Authentication</SelectItem>
            <SelectItem value="file_access">File Access</SelectItem>
            <SelectItem value="encryption">Encryption</SelectItem>
            <SelectItem value="threat">Security Threats</SelectItem>
            <SelectItem value="admin">Admin Actions</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Shield className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">No security events found</p>
              <p className="text-xs text-muted-foreground">Try changing your filter or check back later</p>
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
              {filteredEvents.map((event) => (
                <div key={event.id} className="flex items-start justify-between rounded-md border p-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-1.5 ${getSeverityColor(event.severity)}`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div>
                      <p className="font-medium">{event.description}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{formatTime(event.timestamp)}</span>
                        {event.user && (
                          <>
                            <span>•</span>
                            <span>{event.user}</span>
                          </>
                        )}
                        {event.ip && (
                          <>
                            <span>•</span>
                            <span>IP: {event.ip}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={getSeverityColor(event.severity)}>
                    {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          )}
          <Button variant="outline" className="w-full" onClick={() => setFilter("all")}>
            View All Security Events
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

