import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { LS } from "@/lib/storage";

const ThemeContext = createContext(null);

function readInitial() {
  try {
    return localStorage.getItem(LS.THEME) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function applyTheme(theme, animate) {
  const root = document.documentElement;
  if (animate) {
    root.classList.add("theme-anim");
    window.clearTimeout(applyTheme.t);
    applyTheme.t = window.setTimeout(() => root.classList.remove("theme-anim"), 650);
  }
  root.classList.toggle("dark", theme === "dark");
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#050506" : "#f5f4ef");
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitial);
  const first = useRef(true);

  // satu-satunya tempat sumber kebenaran tema: state -> <html class="dark"> + localStorage
  useEffect(() => {
    applyTheme(theme, !first.current);
    first.current = false;
    try {
      localStorage.setItem(LS.THEME, theme);
    } catch {
      /* abaikan */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <AntdBridge theme={theme}>{children}</AntdBridge>
    </ThemeContext.Provider>
  );
}

/** Ant Design ikut tema aktif (dark/light) + warna brand */
function AntdBridge({ theme, children }) {
  const dark = theme === "dark";
  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: dark ? "#00ff88" : "#059669",
          colorInfo: dark ? "#00ff88" : "#059669",
          borderRadius: 14,
          fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif',
          colorBgElevated: dark ? "#0b0c0e" : "#ffffff",
          colorBgContainer: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)",
          colorBorder: dark ? "rgba(255,255,255,0.14)" : "rgba(10,30,20,0.16)",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme harus dipakai di dalam <ThemeProvider>");
  return ctx;
}
