import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeftSheetProps {
  toggleSheet: () => void;
}

const LeftSheet = ({ toggleSheet }: LeftSheetProps) => {
  return (
    <div className="h-full w-80 border-r bg-background p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Settings</h2>
        <Button variant="ghost" size="icon" onClick={toggleSheet}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">Manage your settings here.</p>
    </div>
  );
};

export default LeftSheet;
