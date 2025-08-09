"use client";

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ExportButton = () => {
  const exportToFile = (fileType: string) => {
    // Placeholder for export logic
    alert(`Exporting to ${fileType}...`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
          <DialogDescription>
            Export your work to various formats.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <Button onClick={() => exportToFile("PNG")}>Export to PNG</Button>
            <Button onClick={() => exportToFile("SVG")}>Export to SVG</Button>
            <Button onClick={() => exportToFile("JSON")}>Export to JSON</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportButton;
