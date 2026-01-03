"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function CloudinaryImageComponent({ images, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Create FormData
        const formData = new FormData();
        formData.append("file", file);

        // Call your upload API route
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      onChange([...images, ...uploadedUrls]);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer w-full">
          <div className="border-2 border-dashed border-zinc-500 rounded-lg p-6 hover:border-zinc-400 transition-colors">
            <div className="flex flex-col items-center justify-center gap-2 text-zinc-400">
              {uploading ? (
                <>
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8" />
                  <span>Click to upload images</span>
                  <span className="text-sm">or drag and drop</span>
                </>
              )}
            </div>
          </div>
        </label>
      </div>

      {/* Display uploaded images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-zinc-800">
                <Image
                  src={url}
                  alt={`Room image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}