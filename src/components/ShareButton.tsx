"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ShareButton = () => {
  const [generatedLink, setGeneratedLink] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(true);

  const generateLink = () => {
    const uniqueId = Math.random().toString(36).substring(2, 15);
    const link = `${window.location.origin}/shared/${uniqueId}?readOnly=${isReadOnly}`;
    setGeneratedLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Generate a unique link to share your work.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={generatedLink} readOnly />
          </div>
          <Button onClick={copyToClipboard} size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
            <Label htmlFor="read-only">Read-only</Label>
            <Switch id="read-only" checked={isReadOnly} onCheckedChange={setIsReadOnly} />
        </div>
        <Button onClick={generateLink}>Generate Link</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ShareButton;
