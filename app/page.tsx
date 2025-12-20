"use client";

import { useState, useRef } from "react";
import Countdown from "@/components/Countdown";
import { motion, useScroll } from "framer-motion";
import { Heart, Camera, Stars } from "lucide-react"; 
import Cake from "@/components/Cake"; 

// --- MOCK DATA FOTO (Pastikan nama file di folder public/images sesuai ya!) ---
const PHOTOS = {
  childhood: "/images/foto-kecil.jpeg",   
  current: "/images/foto-sekarang.jpg",  
  couple: [                              
    "/images/kita1.JPG",
    "/images/kita2.jpg",
    "/images/kita3.jpg",
    "/images/kita4.JPG", 
  ]
};

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(e => console.log("Play error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    // Auto-play music saat unlock (dengan volume agak kecil biar enak)
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch((e) => console.log("Auto-play failed:", e));
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] overflow-x-hidden font-sans text-white selection:bg-pink-500 selection:text-white">
      {/* SOURCE AUDIO */}
      <audio ref={audioRef} src="/lagu.mp3" loop />

      {!isUnlocked ? (
        <Countdown onUnlock={handleUnlock} onToggleMusic={toggleMusic} />
      ) : (
        <div className="relative w-full animate-fade-in">
           {/* Background Particles Hati */}
           <GlowingHearts />
           
           {/* Konten Utama */}
           <JourneyContent />
        </div>
      )}
    </main>
  );
}

// ==============================================
//       KOMPONEN KONTEN UTAMA (JOURNEY)
// ==============================================

function JourneyContent() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="relative pb-20 w-full overflow-hidden">
            
            {/* === 1. HERO SECTION === */}
            <section className="h-screen relative flex flex-col items-center justify-center px-4 text-center z-10">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                >
                   <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-pink-300 text-xs tracking-[0.2em] mb-6 backdrop-blur-md">
                        THE MAIN CHARACTER
                    </span>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-100 to-pink-900/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        Happy Birthday
                    </h1>
                    <p className="mt-4 text-xl text-gray-400 font-light italic">
                        "Another year bolder, another year wiser."
                    </p>
                </motion.div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 flex flex-col items-center gap-2 animate-bounce"
                >
                    <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Start Journey</span>
                </motion.div>
            </section>

            {/* === 2. TRANSFORMATION (KECIL VS SEKARANG) === */}
            
            {/* Foto Waktu Kecil */}
            <SectionLayout>
                <Polaroid 
                   src={PHOTOS.childhood} 
                   caption="Mini You" 
                   rotate={-6} 
                />
                <TextBox title="Once Upon a Time...">
                    <p>
                        Liat deh foto ini. Masih polos, belum kenal pusingnya tugas kuliah, belum kenal aku juga haha. 
                        <br/>
                        Dari kecil emang udah keliatan ya bibit-bibit lucunya. Siapa sangka bocil ini sekarang tumbuh jadi wanita hebat.
                    </p>
                    <span className="block mt-4 text-xs text-pink-400 font-mono flex items-center gap-2">
                        <Stars size={12}/> The Beginning
                    </span>
                </TextBox>
            </SectionLayout>

            {/* Foto Sekarang */}
            <SectionLayout align="right">
                 <div className="md:order-2">
                    <Polaroid 
                       src={PHOTOS.current} 
                       caption="The Woman You Are" 
                       rotate={6} 
                    />
                 </div>
                 <TextBox title="Look at You Now" align="right">
                    <p>
                        Dan liat kamu sekarang.
                        <br/>
                        Makin dewasa, makin tough ngejar cita-cita, dan makin bersinar. 
                        Bangga banget bisa jadi saksi proses kamu bertumbuh. 
                        <br/>
                        <span className="italic text-white/60">Keep shining, Cantik.</span>
                    </p>
                 </TextBox>
            </SectionLayout>

            {/* === 3. THE CAKE (BRIDGE) === */}
            <section className="min-h-[80vh] flex flex-col items-center justify-center relative z-20 py-20">
                 <div className="text-center mb-12 relative z-10">
                    <h2 className="text-5xl font-bold text-white mb-4 font-handwriting">Make a Wish</h2>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                        Sebelum liat apa yang ada di bawah, <br/>tutup mata sebentar, langitkan doa terbaikmu, lalu tiup lilinnya.
                    </p>
                 </div>
                 
                 <div className="scale-125 transform transition-transform duration-500 hover:scale-110 cursor-pointer">
                    <Cake /> 
                 </div>
            </section>

            {/* === 4. COUPLE GALLERY (OUR MEMORIES) === */}
            <section className="relative z-10 px-4 py-20 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-pink-500 text-sm font-bold tracking-widest uppercase mb-2 block">Chapter: Us</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Life is Better with You
                    </h2>
                    <p className="text-gray-400 mt-4">
                        Gak nyangka ya, frame foto kita sekarang isinya berdua terus. <br/>
                        Makasih udah bolehin aku nemenin hari-hari kamu.
                    </p>
                </div>

                {/* Grid Gallery Masonry Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PHOTOS.couple.map((src, index) => (
                        <GalleryItem key={index} src={src} index={index} />
                    ))}
                </div>
            </section>

            {/* === FOOTER === */}
            <footer className="py-20 text-center relative z-10">
                <p className="text-2xl font-handwriting text-pink-300 mb-4">I Love You, Always.</p>
                <div className="text-xs text-gray-600 tracking-widest uppercase">
                    Built with ❤️ by Your Courier Boyfriend
                </div>
            </footer>

        </div>
    );
}

// ==============================================
//          HELPER COMPONENTS (ASSETS)
// ==============================================

// 1. Layout Wrapper
function SectionLayout({ children, align = "left" }: { children: React.ReactNode, align?: "left" | "right" }) {
    return (
        <section className={`min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-20 relative z-10 ${align === "right" ? "md:text-right" : ""}`}>
            {children}
        </section>
    );
}

// 2. Polaroid (FIXED IMAGE ASPECT RATIO)
function Polaroid({ src, caption, rotate }: { src: string, caption: string, rotate: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: rotate }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", bounce: 0.4, duration: 1 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            className="group relative bg-white p-3 pb-12 shadow-2xl rounded-sm w-64 md:w-80 cursor-pointer"
        >
            {/* CONTAINER FOTO (Relative + Aspect Ratio) */}
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4 relative filter sepia-[20%] group-hover:sepia-0 transition-all duration-500">
                {/* FOTO (Absolute + Cover + Inset-0) -> Anti Gepeng */}
                <img 
                    src={src} 
                    alt={caption} 
                    className="absolute inset-0 w-full h-full object-cover" 
                />
                
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>

            <p className="font-handwriting text-gray-800 text-center text-xl absolute bottom-4 left-0 right-0">
                {caption}
            </p>
            {/* Washi Tape Decoration */}
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-pink-500/20 backdrop-blur-sm shadow-sm rotate-${rotate * -1}`}></div>
        </motion.div>
    );
}

// 3. Text Box (Elegant)
function TextBox({ children, title, align = "left" }: { children: React.ReactNode, title: string, align?: "left" | "right" }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: align === "left" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`max-w-md w-full relative z-10 ${align === "right" ? "items-end text-right" : "items-start"}`}
        >
            <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-6 drop-shadow-sm font-handwriting">
                {title}
            </h3>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors duration-500">
                <div className="text-gray-300 leading-loose font-light text-lg">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}

// 4. Gallery Item (FIXED IMAGE ASPECT RATIO)
function GalleryItem({ src, index }: { src: string, index: number }) {
    // Pola grid biar selang seling miringnya
    const rotate = index % 2 === 0 ? 2 : -2;
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02, rotate: 0, zIndex: 20 }}
            // Container (Relative + Aspect Square)
            className={`relative aspect-square overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl bg-gray-800 transform rotate-${rotate} hover:border-pink-500/50 transition-all duration-300 group`}
        >
            {/* FOTO (Absolute + Cover + Inset-0) -> Anti Gepeng */}
            <img 
                src={src} 
                alt="Us" 
                className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
            />
            
            {/* Overlay Icon Camera */}
            <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <Camera className="w-4 h-4 text-white" />
            </div>
        </motion.div>
    );
}

// 5. Background Hearts Animation
function GlowingHearts() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
             {[...Array(15)].map((_, i) => (
                 <motion.div
                    key={i}
                    initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0 }}
                    animate={{ y: "-10vh", opacity: [0, 0.5, 0] }}
                    transition={{ 
                        duration: Math.random() * 10 + 20, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: Math.random() * 20
                    }}
                    className="absolute text-pink-600/10"
                 >
                    <Heart size={Math.random() * 50 + 20} fill="currentColor" />
                 </motion.div>
             ))}
        </div>
    );
}