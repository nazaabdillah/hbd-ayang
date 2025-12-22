"use client";

import { useState, useRef } from "react";
import Countdown from "@/components/Countdown";
import { motion, useScroll } from "framer-motion";
import { Heart, Camera, Stars, Send, User, MessageSquare } from "lucide-react"; 
import Cake from "@/components/Cake"; 

// --- MOCK DATA FOTO (Update jadi 5 Foto buat Bento Grid) ---
const PHOTOS = {
  childhood: "/images/foto-kecil.jpg",   
  current: "/images/foto-sekarang.jpg",  
  couple: [                              
    "/images/kita1.jpg", // Foto Utama (Paling Bagus)
    "/images/kita2.jpg",
    "/images/kita3.jpg",
    "/images/kita4.jpg",
    "/images/kita5.jpg", // Tambahan foto ke-5
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
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch((e) => console.log("Auto-play failed:", e));
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] overflow-x-hidden font-sans text-white selection:bg-pink-500 selection:text-white">
      <audio ref={audioRef} src="/lagu.mp3" loop />

      {!isUnlocked ? (
        <Countdown onUnlock={handleUnlock} onToggleMusic={toggleMusic} />
      ) : (
        <div className="relative w-full animate-fade-in">
           <GlowingHearts />
           <JourneyContent />
        </div>
      )}
    </main>
  );
}

// ==============================================
//       KOMPONEN KONTEN UTAMA
// ==============================================

function JourneyContent() {
    const containerRef = useRef(null);
    // useScroll dihapus di section gallery biar ringan
    
    return (
        <div ref={containerRef} className="relative w-full overflow-hidden">
            
            {/* 1. HERO SECTION */}
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
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 flex flex-col items-center gap-2 animate-bounce"
                >
                    <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Start Journey</span>
                </motion.div>
            </section>

            {/* 2. FLASHBACK (KECIL) */}
            <SectionLayout>
                <Polaroid src={PHOTOS.childhood} caption="Mini You" rotate={-6} />
                <TextBox title="Once Upon a Time...">
                    <p>
                        Liat deh foto ini. Masih polos, belum kenal pusingnya tugas kuliah. 
                        Dari kecil emang udah keliatan ya bibit-bibit lucunya.
                    </p>
                    <span className="block mt-4 text-xs text-pink-400 font-mono flex items-center gap-2">
                        <Stars size={12}/> The Beginning
                    </span>
                </TextBox>
            </SectionLayout>

            {/* 3. SEKARANG */}
            <SectionLayout align="right">
                 <div className="md:order-2">
                    <Polaroid src={PHOTOS.current} caption="The Woman You Are" rotate={6} />
                 </div>
                 <TextBox title="Look at You Now" align="right">
                    <p>
                        Dan liat kamu sekarang. Makin dewasa, makin tough ngejar cita-cita. 
                        Bangga banget bisa jadi saksi proses kamu bertumbuh. 
                        <br/><span className="italic text-white/60">Keep shining, Cantik.</span>
                    </p>
                 </TextBox>
            </SectionLayout>

            {/* 4. THE CAKE (OPTIMIZED COMPACT) */}
            <section className="min-h-[80vh] flex flex-col items-center justify-center relative z-20 py-20">
                 <div className="text-center mb-12 relative z-10">
                    <h2 className="text-5xl font-bold text-white mb-4 font-handwriting">Make a Wish</h2>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                        Sebelum liat apa yang ada di bawah, <br/>langitkan doa terbaikmu, lalu tiup lilinnya.
                    </p>
                 </div>
                 <div className="scale-125 transform transition-transform duration-500 hover:scale-110 cursor-pointer">
                    <Cake /> 
                 </div>
            </section>

            {/* 5. COUPLE GALLERY (BENTO GRID - FIXED) */}
            <section className="relative z-10 px-4 py-20 max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-pink-500 text-sm font-bold tracking-widest uppercase mb-2 block">Chapter: Us</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Life is Better with You</h2>
                    <p className="text-gray-400 mt-4 text-sm md:text-base">Makasih udah bolehin aku nemenin hari-hari kamu.</p>
                </div>

                {/* BENTO GRID LAYOUT */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 h-[500px] md:h-[600px]">
                    
                    {/* FOTO 1: UTAMA (Besar, Span 2x2) */}
                    <BentoItem 
                        src={PHOTOS.couple[0]} 
                        className="col-span-2 row-span-2" 
                        delay={0.1}
                    />

                    {/* FOTO 2 */}
                    <BentoItem 
                        src={PHOTOS.couple[1]} 
                        className="col-span-1 row-span-1"
                        delay={0.2} 
                    />

                    {/* FOTO 3 */}
                    <BentoItem 
                        src={PHOTOS.couple[2]} 
                        className="col-span-1 row-span-1"
                        delay={0.3} 
                    />

                    {/* FOTO 4 */}
                    <BentoItem 
                        src={PHOTOS.couple[3]} 
                        className="col-span-1 row-span-1"
                        delay={0.4} 
                    />

                    {/* FOTO 5 */}
                    <BentoItem 
                        src={PHOTOS.couple[4]} 
                        className="col-span-1 row-span-1"
                        delay={0.5} 
                    />
                </div>
            </section>

            {/* 6. WISH FORM SECTION */}
            <WishSection />

            {/* FOOTER */}
            <footer className="py-10 text-center relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-sm">
                <p className="text-xl font-handwriting text-pink-300 mb-2">I Love You, Always.</p>
                <div className="text-[10px] text-gray-600 tracking-widest uppercase">
                    Built with ❤️ by Your Courier Boyfriend
                </div>
            </footer>

        </div>
    );
}

// ==============================================
//          NEW COMPONENT: BENTO ITEM
// ==============================================
function BentoItem({ src, className, delay }: { src: string, className?: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: delay }}
            className={`relative rounded-2xl overflow-hidden border border-white/10 group ${className}`}
        >
            {/* Foto Anti Gepeng */}
            <img 
                src={src || "/images/kita1.jpg"} // Fallback image
                alt="Memory" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            
            {/* Overlay Gelap Dikit */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
        </motion.div>
    )
}

// ==============================================
//          HELPER COMPONENTS (ASSETS)
// ==============================================
// (Dibawah ini sama seperti sebelumnya, cuma copas ulang biar rapi)

function WishSection() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isFocused, setIsFocused] = useState<"name" | "message" | null>(null);

    const phoneNumber = "628123456789";

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        const text = `Hai Anis! 🎉%0A%0AAku ${name} mau ngucapin:%0A${message}%0A%0AHappy Birthday ya! 🎂`;
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
        setName("");
        setMessage("");
    };

    return (
        <section className="relative z-10 px-4 py-24 max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="inline-block mb-4">
                    <span className="text-4xl">💌</span>
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-4 font-handwriting">
                    Drop a Sweet Message!
                </h2>
                <p className="text-gray-400 text-sm md:text-base max-w-xs mx-auto">
                    Bikin hari ulang tahunnya makin berwarna dengan ucapan dari kamu.
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative bg-[#0a0a0a] ring-1 ring-white/10 rounded-[1.9rem] p-8 md:p-10 shadow-2xl">
                    <form onSubmit={handleSend} className="space-y-6">
                        <div className="space-y-2">
                            <label className={`text-xs font-bold uppercase tracking-widest ml-1 transition-colors duration-300 ${isFocused === 'name' ? 'text-pink-400' : 'text-gray-500'}`}>
                                Dari Siapa Nih?
                            </label>
                            <div className="relative">
                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isFocused === 'name' ? 'text-pink-500' : 'text-gray-600'}`} />
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setIsFocused("name")} onBlur={() => setIsFocused(null)} placeholder="Tulis nama kerenmu..." className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-pink-500/50 transition-all" />
                            </div>
                        </div>
                        <div className="space-y-2">
                             <label className={`text-xs font-bold uppercase tracking-widest ml-1 transition-colors duration-300 ${isFocused === 'message' ? 'text-pink-400' : 'text-gray-500'}`}>
                                Doa & Harapan
                            </label>
                            <div className="relative">
                                <MessageSquare className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-300 ${isFocused === 'message' ? 'text-pink-500' : 'text-gray-600'}`} />
                                <textarea required value={message} onChange={(e) => setMessage(e.target.value)} onFocus={() => setIsFocused("message")} onBlur={() => setIsFocused(null)} rows={4} placeholder="Semoga panjang umur..." className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-pink-500/50 transition-all resize-none" />
                            </div>
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full relative overflow-hidden group bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-bold py-5 rounded-2xl shadow-[0_0_30px_rgba(236,72,153,0.4)] flex items-center justify-center gap-3">
                            <span className="relative z-10 text-lg tracking-wide">Kirim ke WhatsApp 🚀</span>
                        </motion.button>
                        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 mt-4 opacity-70">
                            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                            <span>Direct Message • Privacy Safe</span>
                        </div>
                    </form>
                </div>
            </motion.div>
        </section>
    );
}

function SectionLayout({ children, align = "left" }: { children: React.ReactNode, align?: "left" | "right" }) {
    return (
        <section className={`min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-20 relative z-10 ${align === "right" ? "md:text-right" : ""}`}>
            {children}
        </section>
    );
}

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
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4 relative filter sepia-[20%] group-hover:sepia-0 transition-all duration-500">
                <img src={src} alt={caption} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
            <p className="font-handwriting text-gray-800 text-center text-xl absolute bottom-4 left-0 right-0">
                {caption}
            </p>
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-pink-500/20 backdrop-blur-sm shadow-sm rotate-${rotate * -1}`}></div>
        </motion.div>
    );
}

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