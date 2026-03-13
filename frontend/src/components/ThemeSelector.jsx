import { useEffect, useRef, useState } from "react";
import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !buttonRef.current?.contains(e.target) &&
        !panelRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn btn-ghost btn-circle"
        aria-label="Select theme"
      >
        <PaletteIcon className="size-5" />
      </button>

      {/* Dropdown panel — position: fixed so it escapes ALL stacking contexts */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed top-16 right-2 sm:right-6 lg:right-8 z-[99999]
            p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
            w-56 border border-base-content/10 max-h-80 overflow-y-auto"
        >
          <div className="space-y-1">
            {THEMES.map((themeOption) => (
              <button
                key={themeOption.name}
                className={`
                  w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                  ${
                    theme === themeOption.name
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-base-content/5"
                  }
                `}
                onClick={() => {
                  setTheme(themeOption.name);
                  setIsOpen(false);
                }}
              >
                <PaletteIcon className="size-4" />
                <span className="text-sm font-medium">{themeOption.label}</span>
                {/* Theme preview swatches */}
                <div className="ml-auto flex gap-1">
                  {themeOption.colors.map((color, i) => (
                    <span
                      key={i}
                      className="size-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;