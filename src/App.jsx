import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
import { PlayerProvider } from "@/components/player-provider";
import { Router, useRouter } from "@/lib/router";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import StorePage from "@/pages/StorePage";
import StoreDetailPage from "@/pages/StoreDetailPage";
import ContactPage from "@/pages/ContactPage";

const PAGES = { "/home": HomePage, "/store": StorePage, "/contact": ContactPage };

function Routes() {
  const { path } = useRouter();
  const Page = path.startsWith("/store/") ? StoreDetailPage : PAGES[path];
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={path}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Page />
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <Router>
          <Layout>
            <Routes />
          </Layout>
        </Router>
      </PlayerProvider>
    </ThemeProvider>
  );
}
