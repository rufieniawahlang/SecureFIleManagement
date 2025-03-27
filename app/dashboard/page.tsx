"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  FileText,
  FolderLock,
  Lock,
  LogOut,
  Plus,
  Settings,
  Share2,
  Shield,
  User,
  Trash,
  Search,
  Filter,
  Clock,
  Download,
  MoreHorizontal,
  RefreshCw,
  Fingerprint,
  Globe,
  Key,
  KeyRound,
  LinkIcon,
  Mail,
  Smartphone,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { FileUploadDialog } from "../components/file-upload-dialog"
import { SecurityActivityLog } from "../components/security-activity-log"

interface FileItem {
  id: string
  name: string
  type: string
  size: string
  encrypted: boolean
  shared: boolean
  lastModified: string
  permissions: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("files")
  const [showThreatSimulation, setShowThreatSimulation] = useState(false)
  const [encryptionType, setEncryptionType] = useState("aes-256")
  const [accessLevel, setAccessLevel] = useState("read-write")
  const [showEncryptionDialog, setShowEncryptionDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [showFileUploadDialog, setShowFileUploadDialog] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string | null>(null)
  const [filterEncryption, setFilterEncryption] = useState<boolean | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(15 * 60) // 15 minutes in seconds
  const [isSessionExpiring, setIsSessionExpiring] = useState(false)
  const { toast } = useToast()

  // Session timeout functionality
  useEffect(() => {
    let timer: NodeJS.Timeout

    const resetTimer = () => {
      setSessionTimeRemaining(15 * 60) // Reset to 15 minutes
      setIsSessionExpiring(false)
    }

    const handleUserActivity = () => {
      resetTimer()
    }

    timer = setInterval(() => {
      setSessionTimeRemaining((prev) => {
        const newTime = prev - 1

        // Show warning when 1 minute remaining
        if (newTime === 60) {
          setIsSessionExpiring(true)
          toast({
            title: "Session Expiring Soon",
            description: "Your session will expire in 1 minute due to inactivity",
            variant: "destructive",
          })
        }

        // Logout when timer reaches 0
        if (newTime <= 0) {
          clearInterval(timer)
          handleLogout()
          return 0
        }

        return newTime
      })
    }, 1000)

    // Add event listeners for user activity
    window.addEventListener("mousemove", handleUserActivity)
    window.addEventListener("keydown", handleUserActivity)
    window.addEventListener("click", handleUserActivity)

    return () => {
      clearInterval(timer)
      window.removeEventListener("mousemove", handleUserActivity)
      window.removeEventListener("keydown", handleUserActivity)
      window.removeEventListener("click", handleUserActivity)
    }
  }, [])

  const initialFiles: FileItem[] = [
    {
      id: "1",
      name: "Project_Report.docx",
      type: "Document",
      size: "2.4 MB",
      encrypted: true,
      shared: false,
      lastModified: "2025-03-15",
      permissions: "Owner",
    },
    {
      id: "2",
      name: "Financial_Data.xlsx",
      type: "Spreadsheet",
      size: "1.8 MB",
      encrypted: true,
      shared: true,
      lastModified: "2025-03-10",
      permissions: "Owner",
    },
    {
      id: "3",
      name: "Presentation.pptx",
      type: "Presentation",
      size: "5.2 MB",
      encrypted: false,
      shared: false,
      lastModified: "2025-03-05",
      permissions: "Owner",
    },
  ]

  const [files, setFiles] = useState<FileItem[]>(initialFiles)

  const handleLogout = () => {
    router.push("/")
  }

  const handleEncryptFile = (fileId: string) => {
    setFiles(files.map((file) => (file.id === fileId ? { ...file, encrypted: true } : file)))
    setShowEncryptionDialog(false)
    toast({
      title: "File Encrypted",
      description: `File has been encrypted using ${encryptionType.toUpperCase()}`,
    })
  }

  const handleDeleteFile = (fileId: string) => {
    setFiles(files.filter((file) => file.id !== fileId))
    toast({
      title: "File Deleted",
      description: "File has been securely deleted",
    })
  }

  const handleShareFile = (fileId: string) => {
    setFiles(files.map((file) => (file.id === fileId ? { ...file, shared: !file.shared } : file)))
    toast({
      title: files.find((f) => f.id === fileId)?.shared ? "Sharing Disabled" : "File Shared",
      description: files.find((f) => f.id === fileId)?.shared
        ? "File is no longer shared with others"
        : `File is now shared with ${accessLevel} permissions`,
    })
  }

  const simulateThreat = () => {
    setShowThreatSimulation(true)
    setTimeout(() => {
      toast({
        variant: "destructive",
        title: "Security Alert",
        description: "Unauthorized access attempt detected and blocked",
      })
    }, 500)
  }

  const handleFileUploaded = (newFile: any) => {
    setFiles([newFile, ...files])
  }

  // Filter and search files
  const filteredFiles = files.filter((file) => {
    // Search filter
    const matchesSearch = searchQuery === "" || file.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Type filter
    const matchesType = filterType === null || file.type === filterType

    // Encryption filter
    const matchesEncryption = filterEncryption === null || file.encrypted === filterEncryption

    return matchesSearch && matchesType && matchesEncryption
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderLock className="h-6 w-6" />
            <span className="font-bold">SecureFileEdu</span>
          </div>
          <div className="flex items-center gap-4">
            {isSessionExpiring ? (
              <Badge variant="destructive" className="animate-pulse">
                <Clock className="h-3 w-3 mr-1" />
                Session expiring: {Math.floor(sessionTimeRemaining / 60)}:
                {(sessionTimeRemaining % 60).toString().padStart(2, "0")}
              </Badge>
            ) : (
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                Session: {Math.floor(sessionTimeRemaining / 60)}:
                {(sessionTimeRemaining % 60).toString().padStart(2, "0")}
              </Badge>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={simulateThreat}>
                    <Shield className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Simulate Security Threat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="files">Files</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="education">Learn</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button onClick={() => setShowFileUploadDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Upload File
                </Button>
              </div>
            </div>
            <TabsContent value="files" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle>Secure Files</CardTitle>
                      <CardDescription>Manage your encrypted files with secure access controls</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search files..."
                          className="w-full sm:w-[200px] pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                          <DropdownMenuLabel>Filter Files</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <div className="p-2">
                            <div className="space-y-2 mb-2">
                              <Label>File Type</Label>
                              <Select
                                value={filterType || "all"}
                                onValueChange={(value) => setFilterType(value === "all" ? null : value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="All types" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All types</SelectItem>
                                  <SelectItem value="Document">Documents</SelectItem>
                                  <SelectItem value="Spreadsheet">Spreadsheets</SelectItem>
                                  <SelectItem value="Presentation">Presentations</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Security Status</Label>
                              <Select
                                value={
                                  filterEncryption === null ? "all" : filterEncryption ? "encrypted" : "unencrypted"
                                }
                                onValueChange={(value) => {
                                  if (value === "all") setFilterEncryption(null)
                                  else setFilterEncryption(value === "encrypted")
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="All files" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All files</SelectItem>
                                  <SelectItem value="encrypted">Encrypted only</SelectItem>
                                  <SelectItem value="unencrypted">Unencrypted only</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setFilterType(null)
                              setFilterEncryption(null)
                              setSearchQuery("")
                            }}
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reset filters
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-[25px_2fr_1fr_1fr_1fr_1fr] sm:grid-cols-[25px_2fr_1fr_1fr_1fr_1fr] border-b px-4 py-3 font-medium">
                      <div>
                        <Checkbox
                          checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFiles(filteredFiles.map((file) => file.id))
                            } else {
                              setSelectedFiles([])
                            }
                          }}
                        />
                      </div>
                      <div>Name</div>
                      <div className="hidden sm:block">Size</div>
                      <div>Security</div>
                      <div className="hidden sm:block">Last Modified</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {filteredFiles.length === 0 ? (
                      <div className="px-4 py-8 text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                          <FolderLock className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">No files found</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {searchQuery
                            ? "Try adjusting your search or filters"
                            : "Upload your first file to get started"}
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {filteredFiles.map((file) => (
                          <div
                            key={file.id}
                            className="grid grid-cols-[25px_2fr_1fr_1fr_1fr_1fr] sm:grid-cols-[25px_2fr_1fr_1fr_1fr_1fr] items-center px-4 py-3"
                          >
                            <div>
                              <Checkbox
                                checked={selectedFiles.includes(file.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedFiles([...selectedFiles, file.id])
                                  } else {
                                    setSelectedFiles(selectedFiles.filter((id) => id !== file.id))
                                  }
                                }}
                              />
                            </div>
                            <div className="flex items-center gap-2 truncate">
                              {file.type === "Document" ? (
                                <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
                              ) : file.type === "Spreadsheet" ? (
                                <FileText className="h-5 w-5 text-green-500 flex-shrink-0" />
                              ) : (
                                <FileText className="h-5 w-5 text-orange-500 flex-shrink-0" />
                              )}
                              <span className="truncate">{file.name}</span>
                            </div>
                            <div className="hidden sm:block text-sm text-muted-foreground">{file.size}</div>
                            <div className="flex items-center gap-1">
                              {file.encrypted ? (
                                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                  <Lock className="h-3 w-3 mr-1" />
                                  Secure
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Unsecured
                                </Badge>
                              )}
                            </div>
                            <div className="hidden sm:block text-sm text-muted-foreground">{file.lastModified}</div>
                            <div className="flex justify-end gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() =>
                                      toast({
                                        title: "File Downloaded",
                                        description: "Your file has been securely downloaded",
                                      })
                                    }
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </DropdownMenuItem>
                                  {!file.encrypted && (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedFile(file)
                                        setShowEncryptionDialog(true)
                                      }}
                                    >
                                      <Lock className="mr-2 h-4 w-4" />
                                      Encrypt
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem onClick={() => handleShareFile(file.id)}>
                                    <Share2 className="mr-2 h-4 w-4" />
                                    {file.shared ? "Stop Sharing" : "Share"}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteFile(file.id)}
                                    className="text-destructive"
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedFiles.length > 0 && (
                    <div className="mt-4 flex items-center justify-between bg-muted p-2 rounded-md">
                      <span className="text-sm font-medium">{selectedFiles.length} file(s) selected</span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const unencryptedSelected = files
                              .filter((file) => selectedFiles.includes(file.id) && !file.encrypted)
                              .map((file) => file.id)

                            if (unencryptedSelected.length > 0) {
                              unencryptedSelected.forEach((fileId) => handleEncryptFile(fileId))
                              toast({
                                title: "Batch Encryption Complete",
                                description: `${unencryptedSelected.length} file(s) have been encrypted`,
                              })
                            } else {
                              toast({
                                title: "No Action Required",
                                description: "All selected files are already encrypted",
                              })
                            }
                          }}
                        >
                          <Lock className="mr-2 h-4 w-4" />
                          Encrypt All
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            selectedFiles.forEach((fileId) => handleDeleteFile(fileId))
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete All
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure encryption and access control settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Encryption Settings</h3>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Active
                      </Badge>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="default-encryption">Default Encryption</Label>
                          <Select defaultValue="aes-256" onValueChange={setEncryptionType}>
                            <SelectTrigger id="default-encryption">
                              <SelectValue placeholder="Select encryption" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="aes-256">AES-256</SelectItem>
                              <SelectItem value="rsa-2048">RSA-2048</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">Applied to all new file uploads</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="key-rotation">Key Rotation Policy</Label>
                          <Select defaultValue="90-days">
                            <SelectTrigger id="key-rotation">
                              <SelectValue placeholder="Select policy" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30-days">Every 30 days</SelectItem>
                              <SelectItem value="90-days">Every 90 days</SelectItem>
                              <SelectItem value="manual">Manual rotation</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">Regular key rotation enhances security</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Encryption Strength</Label>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Standard</span>
                            <span>Military-Grade</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Access Control</h3>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        RBAC Enabled
                      </Badge>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="default-permissions">Default Permissions</Label>
                          <Select defaultValue="read-write" onValueChange={setAccessLevel}>
                            <SelectTrigger id="default-permissions">
                              <SelectValue placeholder="Select permissions" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="read-only">Read Only</SelectItem>
                              <SelectItem value="read-write">Read & Write</SelectItem>
                              <SelectItem value="full-access">Full Access</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">Applied when sharing files</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="session-timeout">Session Timeout</Label>
                          <Select defaultValue="15-min">
                            <SelectTrigger id="session-timeout">
                              <SelectValue placeholder="Select timeout" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5-min">5 minutes</SelectItem>
                              <SelectItem value="15-min">15 minutes</SelectItem>
                              <SelectItem value="30-min">30 minutes</SelectItem>
                              <SelectItem value="60-min">60 minutes</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
                        </div>
                      </div>
                      <div className="rounded-md border p-4 bg-muted/50">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Role-Based Access Control (RBAC)</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              RBAC restricts system access to authorized users based on roles within your organization.
                              Each role has specific permissions that determine what actions users can perform.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Threat Detection</h3>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Active Monitoring
                      </Badge>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="threat-level">Threat Detection Level</Label>
                          <Select defaultValue="high">
                            <SelectTrigger id="threat-level">
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">Higher levels may generate more alerts</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notification">Notification Method</Label>
                          <Select defaultValue="in-app">
                            <SelectTrigger id="notification">
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="in-app">In-App</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="both">Both</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">How you'll be alerted about threats</p>
                        </div>
                      </div>
                      <div className="rounded-md border p-4">
                        <h4 className="text-sm font-medium mb-2">Recent Security Events</h4>
                        <div className="space-y-2 max-h-[200px] overflow-y-auto">
                          <div className="flex items-center justify-between text-sm p-2 rounded-md bg-muted/50">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              <span>Failed login attempt</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Today, 10:23 AM</span>
                          </div>
                          <div className="flex items-center justify-between text-sm p-2 rounded-md bg-muted/50">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-green-500" />
                              <span>Security scan completed</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Yesterday, 11:45 PM</span>
                          </div>
                          <div className="flex items-center justify-between text-sm p-2 rounded-md bg-muted/50">
                            <div className="flex items-center gap-2">
                              <RefreshCw className="h-4 w-4 text-blue-500" />
                              <span>Encryption keys rotated</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Mar 20, 2025</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="secondary" onClick={simulateThreat}>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Simulate Threat Detection
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="ml-auto"
                    onClick={() => {
                      toast({
                        title: "Settings Saved",
                        description: "Your security settings have been updated",
                      })
                    }}
                  >
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
              <div className="mt-6">
                <SecurityActivityLog />
              </div>
            </TabsContent>
            <TabsContent value="education" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Education</CardTitle>
                  <CardDescription>Learn about secure file storage principles and best practices</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="basics">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basics">Security Basics</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced Topics</TabsTrigger>
                      <TabsTrigger value="interactive">Interactive Guide</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basics" className="mt-4 space-y-6">
                      <div className="rounded-lg border p-4 transition-all hover:bg-muted/50">
                        <h3 className="text-lg font-medium mb-2">Encryption Explained</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Encryption transforms readable data into a coded format that can only be read or processed
                          after it's been decrypted.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                              <Lock className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">AES-256</h4>
                              <p className="text-xs text-muted-foreground">
                                Advanced Encryption Standard with 256-bit key length. Symmetric encryption used for file
                                contents.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                              <Lock className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">RSA-2048</h4>
                              <p className="text-xs text-muted-foreground">
                                Asymmetric encryption with 2048-bit key length. Used for secure key exchange and digital
                                signatures.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4 transition-all hover:bg-muted/50">
                        <h3 className="text-lg font-medium mb-2">Multi-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          MFA adds additional layers of security beyond just passwords, requiring multiple forms of
                          verification.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                              <KeyRound className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Something You Know</h4>
                              <p className="text-xs text-muted-foreground">
                                Passwords, PINs, or security questions that only you should know.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                              <Smartphone className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Something You Have</h4>
                              <p className="text-xs text-muted-foreground">
                                Physical devices like smartphones, security keys, or smart cards.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                              <Fingerprint className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Something You Are</h4>
                              <p className="text-xs text-muted-foreground">
                                Biometric factors like fingerprints, facial recognition, or voice patterns.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="advanced" className="mt-4 space-y-6">
                      <div className="rounded-lg border p-4 transition-all hover:bg-muted/50">
                        <h3 className="text-lg font-medium mb-2">Zero-Knowledge Encryption</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          A security model where the service provider has no access to or knowledge of your encryption
                          keys or data.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                              <Shield className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Client-Side Encryption</h4>
                              <p className="text-xs text-muted-foreground">
                                Files are encrypted on your device before being uploaded, ensuring the service provider
                                never sees unencrypted data.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                              <Key className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Key Management</h4>
                              <p className="text-xs text-muted-foreground">
                                Encryption keys are derived from your password and never stored on the server in their
                                complete form.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4 transition-all hover:bg-muted/50">
                        <h3 className="text-lg font-medium mb-2">Secure Sharing Protocols</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Methods to securely share encrypted files with others while maintaining confidentiality.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                              <LinkIcon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Secure Links</h4>
                              <p className="text-xs text-muted-foreground">
                                Time-limited, password-protected links that expire after a set period or number of
                                downloads.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">End-to-End Encryption</h4>
                              <p className="text-xs text-muted-foreground">
                                Files remain encrypted during transit and are only decrypted by the intended recipient.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="interactive" className="mt-4">
                      <div className="rounded-lg border">
                        <div className="border-b p-4">
                          <h3 className="text-lg font-medium">Interactive Security Tutorial</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Follow this step-by-step guide to learn about secure file management
                          </p>
                        </div>
                        <div className="p-4">
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">1. Create Strong Encryption</h4>
                                <Badge>Try It</Badge>
                              </div>
                              <div className="rounded-md border p-4 bg-muted/50">
                                <div className="space-y-4">
                                  <p className="text-sm">Select the strongest encryption method:</p>
                                  <div className="grid grid-cols-1 gap-2">
                                    <Button
                                      variant="outline"
                                      className="justify-start"
                                      onClick={() => {
                                        toast({
                                          title: "Correct!",
                                          description:
                                            "AES-256 is currently one of the strongest encryption standards available.",
                                        })
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <Lock className="mr-2 h-4 w-4 text-green-500" />
                                        AES-256
                                      </div>
                                    </Button>
                                    <Button
                                      variant="outline"
                                      className="justify-start"
                                      onClick={() => {
                                        toast({
                                          variant: "destructive",
                                          title: "Not Quite",
                                          description:
                                            "While DES was once standard, it's now considered insecure due to its small key size.",
                                        })
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <Lock className="mr-2 h-4 w-4" />
                                        DES
                                      </div>
                                    </Button>
                                    <Button
                                      variant="outline"
                                      className="justify-start"
                                      onClick={() => {
                                        toast({
                                          variant: "destructive",
                                          title: "Not Recommended",
                                          description: "Basic encryption is too weak for sensitive files.",
                                        })
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <Lock className="mr-2 h-4 w-4" />
                                        Basic Encryption
                                      </div>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">2. Secure File Sharing</h4>
                                <Badge>Try It</Badge>
                              </div>
                              <div className="rounded-md border p-4 bg-muted/50">
                                <div className="space-y-4">
                                  <p className="text-sm">Which sharing method is most secure?</p>
                                  <div className="grid grid-cols-1 gap-2">
                                    <Button
                                      variant="outline"
                                      className="justify-start"
                                      onClick={() => {
                                        toast({
                                          variant: "destructive",
                                          title: "Not Secure",
                                          description: "Public links can be accessed by anyone who obtains the URL.",
                                        })
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <Globe className="mr-2 h-4 w-4" />
                                        Public link
                                      </div>
                                    </Button>
                                    <Button
                                      variant="outline"
                                      className="justify-start"
                                      onClick={() => {
                                        toast({
                                          title: "Correct!",
                                          description:
                                            "Password-protected links with expiration provide the best security for sharing.",
                                        })
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <KeyRound className="mr-2 h-4 w-4 text-green-500" />
                                        Password-protected link with expiration
                                      </div>
                                    </Button>
                                    <Button
                                      variant="outline"
                                      className="justify-start"
                                      onClick={() => {
                                        toast({
                                          variant: "destructive",
                                          title: "Not Recommended",
                                          description:
                                            "Email attachments are often unencrypted and can be intercepted.",
                                        })
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <Mail className="mr-2 h-4 w-4" />
                                        Email attachment
                                      </div>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Button
                              className="w-full"
                              onClick={() => {
                                toast({
                                  title: "Tutorial Completed!",
                                  description: "You've learned the basics of secure file management.",
                                })
                              }}
                            >
                              Complete Tutorial
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Dialog open={showEncryptionDialog} onOpenChange={setShowEncryptionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Encrypt File</DialogTitle>
            <DialogDescription>Choose encryption settings for {selectedFile?.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="encryption-type">Encryption Type</Label>
              <Select defaultValue={encryptionType} onValueChange={setEncryptionType}>
                <SelectTrigger id="encryption-type">
                  <SelectValue placeholder="Select encryption" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aes-256">AES-256</SelectItem>
                  <SelectItem value="rsa-2048">RSA-2048</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="key-storage">Key Storage Location</Label>
              <Select defaultValue="secure-keystore">
                <SelectTrigger id="key-storage">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="secure-keystore">Secure Keystore</SelectItem>
                  <SelectItem value="hardware-security">Hardware Security Module</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEncryptionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => selectedFile && handleEncryptFile(selectedFile.id)}>Encrypt File</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {showThreatSimulation && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="w-[400px] border-destructive">
            <CardHeader className="bg-destructive text-destructive-foreground">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                <CardTitle>Security Alert</CardTitle>
              </div>
              <CardDescription className="text-destructive-foreground/90">
                Potential security threat detected
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Unauthorized Access Attempt</h3>
                  <p className="text-sm text-muted-foreground">
                    An unauthorized attempt to access encrypted files has been detected from IP 192.168.1.45.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Threat Details</h3>
                  <div className="rounded-md bg-muted p-3 text-xs font-mono">
                    <p>Timestamp: {new Date().toISOString()}</p>
                    <p>Source IP: 192.168.1.45</p>
                    <p>Target: Financial_Data.xlsx</p>
                    <p>Method: Brute Force Attack</p>
                    <p>Status: Blocked</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowThreatSimulation(false)}>
                Dismiss
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setShowThreatSimulation(false)
                  toast({
                    title: "Security Response Initiated",
                    description: "Additional security measures have been activated",
                  })
                }}
              >
                Block IP
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      <FileUploadDialog
        open={showFileUploadDialog}
        onOpenChange={setShowFileUploadDialog}
        onFileUploaded={handleFileUploaded}
      />
      <Toaster />
    </div>
  )
}

