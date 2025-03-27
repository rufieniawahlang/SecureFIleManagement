"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

interface FileUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onFileUploaded: (file: any) => void
}

export function FileUploadDialog({ open, onOpenChange, onFileUploaded }: FileUploadDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [encryption, setEncryption] = useState("aes-256")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a file to upload",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          // Create a new file object with metadata
          const newFile = {
            id: Math.random().toString(36).substring(2, 11),
            name: selectedFile.name,
            type: getFileType(selectedFile.name),
            size: formatFileSize(selectedFile.size),
            encrypted: encryption !== "none",
            shared: false,
            lastModified: new Date().toISOString().split("T")[0],
            permissions: "Owner",
          }

          onFileUploaded(newFile)
          onOpenChange(false)
          setSelectedFile(null)
          setUploadProgress(0)

          toast({
            title: "File Uploaded Successfully",
            description: `${selectedFile.name} has been securely uploaded and ${encryption !== "none" ? "encrypted" : "stored"}`,
          })

          return 0
        }
        return prev + 5
      })
    }, 150)
  }

  const getFileType = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase()

    if (["doc", "docx", "txt", "pdf"].includes(extension || "")) {
      return "Document"
    } else if (["xls", "xlsx", "csv"].includes(extension || "")) {
      return "Spreadsheet"
    } else if (["ppt", "pptx"].includes(extension || "")) {
      return "Presentation"
    } else {
      return "Document"
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload New File</DialogTitle>
          <DialogDescription>
            Upload a file to your secure storage. All files are encrypted by default.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {selectedFile ? (
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-2">
              <Label htmlFor="file">File</Label>
              <Input id="file" type="file" onChange={handleFileChange} />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="encryption">Encryption Method</Label>
            <Select defaultValue={encryption} onValueChange={setEncryption}>
              <SelectTrigger id="encryption">
                <SelectValue placeholder="Select encryption" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aes-256">AES-256 (Recommended)</SelectItem>
                <SelectItem value="rsa-2048">RSA-2048</SelectItem>
                <SelectItem value="none">None (Not Recommended)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {encryption === "none"
                ? "Warning: Unencrypted files are vulnerable to unauthorized access."
                : "Your file will be encrypted before storage for maximum security."}
            </p>
          </div>
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Uploading & Encrypting...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUploading}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleUpload} disabled={!selectedFile || isUploading}>
            {isUploading ? "Processing..." : "Upload & Encrypt"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

