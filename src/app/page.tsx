
import React from "react";
import Playground from "@/components/Playground";
import ChatAi from "@/components/ChatAi";
import SheetToggle from "@/components/SheetToggle";
import ClearButton from "@/components/ClearButton";
import ThemeSwitch from "@/components/ThemeSwitch";
import ShareButton from "@/components/ShareButton";
import ExportButton from "@/components/ExportButton";
import '@xyflow/react/dist/style.css';

export default function Flow() {
  return (
    <div className="h-screen w-screen flex">
      <SheetToggle />

      <div className="flex-1 relative">
        <Playground
          className="h-full w-full"
        />

        <div className="absolute top-4 right-4 z-40">
          <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
            <ClearButton />
            <ExportButton />
            <ShareButton />
            <ThemeSwitch />
          </div>
        </div>

        <ChatAi />
      </div>
    </div>
  );
}

