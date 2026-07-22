"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileImage, FileText, Paperclip, Upload, X } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "../../../libs/constants";

interface FileUploadProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export default function FileUpload({ files, setFiles }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useTranslation("pages/quotation-form");

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    // Validate files
    const validFiles: File[] = [];
    const errors: string[] = [];

    selectedFiles.forEach((file) => {
      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errors.push(`${file.name}: ${t("fileFormatError")}`);
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: ${t("fileSizeError")}`);
        return;
      }

      // Check duplicate
      if (files.some((f) => f.name === file.name && f.size === file.size)) {
        errors.push(`${file.name}: ${t("fileDuplicateError")}`);
        return;
      }

      validFiles.push(file);
    });

    // Show errors if any
    if (errors.length > 0) {
      toast({
        title: t("fileValidationTitle"),
        description: errors.join("\n"),
        variant: "destructive",
      });
    }

    // Add valid files
    if (validFiles.length > 0) {
      setFiles([...files, ...validFiles]);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) {
      return <FileImage className="h-5 w-5 text-blue-500" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
          <Paperclip className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900">
            {t("fileUploadTitle")}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            {t("fileUploadSubtitle")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
        >
          <Upload className="h-4 w-4" />
          {t("selectFile")}
        </Button>
        <p className="text-sm text-gray-500">{t("fileUploadNote")}</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ALLOWED_FILE_TYPES.join(",")}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <Badge
                      variant="secondary"
                      className="text-[10px] mt-1 bg-blue-50 text-blue-700 hover:bg-blue-50"
                    >
                      {formatFileSize(file.size)}
                    </Badge>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {files.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">{t("noFilesSelected")}</p>
        </div>
      )}
    </div>
  );
}
