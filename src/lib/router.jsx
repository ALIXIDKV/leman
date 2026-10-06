import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// Router mini berbasis History API (tanpa dependency tambahan): /home, /store, /store/:kategori, /contact
export const ROUTES = ["/home", "/store", "/contact"];
const normalize = (p) => {
  const x = p.replace(/\/+$/, "") || "/";
  return ROUTES.includes(x) || /^\/store\/[a-z0-9-]+$/.test(x) ? x : "/home";
};

const Ctx = createContext(null);

export function Router({ children }) {
  const [path, setPath] = useState(() => normalize(window.location.pathname));

  useEffect(() => {
    if (normalize(window.location.pathname) !== window.location.pathname) {
      window.history.replaceState(null, "", normalize(window.location.pathname));
    }
    const onPop = () => setPath(normalize(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to) => {
    const next = normalize(to);
    if (next !== window.location.pathname) window.history.pushState(null, "", next);
    setPath(next);
    window.scrollTo({ top: 0 });
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useRouter = () => useContext(Ctx);

export function Link({ to, onClick, children, ...props }) {
  const { navigate } = useRouter();
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
