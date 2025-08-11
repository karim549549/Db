"use client";
import React, { useCallback, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import LeftSheet, { LeftSheetRef } from "@/components/LeftSheet";

function SheetToggle() {
  const [isSheetVisible, setIsSheetVisible] = useState(true);
  const sheetRef = useRef<LeftSheetRef>(null);

  const handleSheetClose = useCallback(() => {
    setIsSheetVisible(false);
  }, []);

  const handleOpenSheet = useCallback(() => {
    setIsSheetVisible(true);
    sheetRef.current?.open();
  }, []);

  return (
    <>
      <AnimatePresence>
        {isSheetVisible && (
          <motion.div
            key="left-sheet"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full z-50"
          >
            <LeftSheet
              ref={sheetRef}
              onSheetClose={handleSheetClose}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-4 left-4 z-40">
        <AnimatePresence>
          {!isSheetVisible && (
            <motion.div
              key="toggle-button"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Button variant="outline" size="sm" onClick={handleOpenSheet}>
                <PanelLeft className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default SheetToggle;
