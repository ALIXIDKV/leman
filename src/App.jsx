import { motion } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
import { PlayerProvider } from "@/components/player-provider";
import Ambient from "@/components/Ambient";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Marketplace from "@/components/Marketplace";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MiniPlayer from "@/components/MiniPlayer";
import WhatsAppFab from "@/components/WhatsAppFab";

export default function App() {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <Ambient />
        <Loader />
        <Navbar />
        {/* transisi masuk halaman setelah loader */}
        <motion.main
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Hero />
          <About />
          <Marketplace />
          <Contact />
        </motion.main>
        <Footer />
        <MiniPlayer />
        <WhatsAppFab />
      </PlayerProvider>
    </ThemeProvider>
  );
}
