"use client";

import { useState, useRef, useEffect } from "react";
import Countdown from "@/components/Countdown";
import { motion, AnimatePresence } from "framer-motion";
// SATU IMPORT SAJA UNTUK SEMUA ICON
import { Heart, Stars, User, MessageSquare, Instagram, ChevronLeft, ChevronRight } from "lucide-react"; 
import Cake from "@/components/Cake"; 
import { supabase } from "@/lib/supabase";

// --- MOCK DATA FOTO ---
// Pastikan jumlah foto di couple GANJIL (misal 5, 7) biar tengahnya pas.
const PHOTOS = {
  childhood: "/images/foto-kecil.jpeg",   
  current: "/images/foto-sekarang.jpg",  
  couple: [                              
    "/images/kita1.jpg", 
    "/images/kita2.jpg",
    "/images/kita3.jpg",
    "/images/kita4.jpg",
    "/images/kita5.jpg", 
  ]
};

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch((e) => console.log("Auto-play failed:", e));
    }

    // Preloading simulation 4 detik
    setTimeout(() => {
        setIsLoading(false);
        setIsUnlocked(true);
    }, 3500); 
  };

  return (
    <main className="min-h-screen bg-[#050505] overflow-x-hidden font-sans text-white selection:bg-pink-500 selection:text-white">
      <audio ref={audioRef} src="/lagu.mp3" loop />

      <AnimatePresence mode="wait">
        {!isUnlocked && !isLoading && (
          <motion.div key="countdown" exit={{ opacity: 0 }}>
             <Countdown onUnlock={handleUnlock} />
          </motion.div>
        )}

        {isLoading && (
           <motion.div key="preloader" exit={{ opacity: 0 }}>
              <Preloader />
           </motion.div>
        )}
      </AnimatePresence>

      {isUnlocked && (
        <div className="relative w-full animate-fade-in">
           <GlowingHearts />
           <JourneyContent />
        </div>
      )}
    </main>
  );
}

// ==============================================
//       KOMPONEN PRELOADER
// ==============================================
function Preloader() {
    const [textIndex, setTextIndex] = useState(0);
    const texts = ["Menyiapkan kenangan...", "Menyalakan lilin...", "Menghias kue...", "Are you ready? ✨"];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev < texts.length - 1 ? prev + 1 : prev));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="mb-8">
                <Heart className="w-16 h-16 text-pink-500 fill-pink-500 blur-sm" />
            </motion.div>
            <div className="h-8 overflow-hidden relative">
                <AnimatePresence mode="wait">
                    <motion.p key={textIndex} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.5 }} className="text-xl font-handwriting text-pink-200 tracking-widest">
                        {texts[textIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>
            <div className="mt-8 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 4, ease: "linear" }} className="h-full bg-gradient-to-r from-pink-500 to-purple-500" />
            </div>
        </div>
    );
}

// ==============================================
//       KOMPONEN KONTEN UTAMA
// ==============================================
type Wish = { id: number; name: string; message: string; created_at: string; };

function JourneyContent() {
    const containerRef = useRef(null);
    
    return (
        <div ref={containerRef} className="relative w-full overflow-hidden">
            
            {/* 1. HERO SECTION */}
            <section className="h-screen relative flex flex-col items-center justify-center px-4 text-center z-10">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "circOut" }}>
                   <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-pink-300 text-xs tracking-[0.2em] mb-6 backdrop-blur-md">THE MAIN CHARACTER</span>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-100 to-pink-900/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Happy Birthday</h1>
                    <p className="mt-4 text-xl text-gray-400 font-light italic">"Another year bolder, another year wiser."</p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-10 flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Start Journey</span>
                </motion.div>
            </section>

            {/* 2. FLASHBACK */}
            <SectionLayout>
                <Polaroid src={PHOTOS.childhood} caption="Mini You" rotate={-6} />
                <TextBox title="Once Upon a Time...">
                    <p>Liat deh foto ini. Masih polos, belum kenal pusingnya tugas kuliah. Dari kecil emang udah keliatan ya bibit-bibit lucunya.</p>
                    <span className="block mt-4 text-xs text-pink-400 font-mono flex items-center gap-2"><Stars size={12}/> The Beginning</span>
                </TextBox>
            </SectionLayout>

            {/* 3. SEKARANG */}
            <SectionLayout align="right">
                 <div className="md:order-2"><Polaroid src={PHOTOS.current} caption="The Woman You Are" rotate={6} /></div>
                 <TextBox title="Look at You Now" align="right">
                    <p>Dan liat kamu sekarang. Makin dewasa, makin tough ngejar cita-cita. Bangga banget bisa jadi saksi proses kamu bertumbuh. <br/><span className="italic text-white/60">Keep shining, Cantik.</span></p>
                 </TextBox>
            </SectionLayout>

            {/* 4. THE CAKE */}
            <section className="min-h-[80vh] flex flex-col items-center justify-center relative z-20 py-20">
                 <div className="text-center mb-12 relative z-10">
                    <h2 className="text-5xl font-bold text-white mb-4 font-handwriting">Make a Wish</h2>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">Sebelum liat apa yang ada di bawah, <br/>langitkan doa terbaikmu, lalu tiup lilinnya.</p>
                 </div>
                 <div className="scale-125 transform transition-transform duration-500 hover:scale-110 cursor-pointer"><Cake /></div>
            </section>

            {/* 5. COUPLE GALLERY (NEW: HORIZONTAL CAROUSEL STYLE) */}
            <section className="relative z-10 px-4 py-20 w-full overflow-hidden">
                <div className="text-center mb-16">
                    <span className="text-pink-500 text-sm font-bold tracking-widest uppercase mb-2 block">Chapter: Us</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Life is Better with You</h2>
                    <p className="text-gray-400 mt-4 text-sm md:text-base">Geser atau klik foto untuk melihat kenangan kita.</p>
                </div>
                
                {/* KOMPONEN GALERI BARU */}
                <GalleryCarousel cards={PHOTOS.couple} />

            </section>

            {/* 6. WISH FORM SECTION */}
            <WishSection />

            {/* 7. FOOTER */}
            <footer className="relative z-10 py-12 border-t border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-pink-600/10 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="relative max-w-md mx-auto text-center px-6">
                    <p className="font-handwriting text-2xl md:text-3xl bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-gradient-x mb-8 drop-shadow-sm">I Love You, Always.</p>
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mx-auto mb-6"></div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm text-gray-400 font-light tracking-wide flex items-center justify-center gap-1.5">Built with <span className="text-red-500 animate-pulse text-lg">❤️</span> by</p>
                        <a href="https://www.instagram.com/____nazaaaqr/" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-pink-500/50 transition-all duration-300">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center"><User className="w-3 h-3 text-white" /></div>
                            <span className="text-white font-bold tracking-wide group-hover:text-pink-300 transition-colors">Nzaa</span>
                            <Instagram className="w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors" />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-pink-600 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">@___nazaaaqr 📸</span>
                        </a>
                        <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] mt-2 font-medium">Your Personal Courier & Boyfriend 🛵</p>
                    </div>
                </div>
            </footer>

        </div>
    );
}

// ==============================================
//    KOMPONEN GALERI BARU (HORIZONTAL CAROUSEL)
// ==============================================
function GalleryCarousel({ cards }: { cards: string[] }) {
    // Mulai dari tengah
    const [activeIndex, setActiveIndex] = useState(Math.floor(cards.length / 2));

    return (
        // Container dibuat flex center biar gampang ngatur posisi awal
        <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center perspective-1000 my-10">
            {cards.map((src, index) => {
                const offset = index - activeIndex; // Jarak dari tengah (0=tengah, -1=kiri1, 1=kanan1, dst)
                const isActive = index === activeIndex;
                
                // Jarak horizontal antar kartu. Sesuaikan angkanya biar rapat/renggang.
                // Semakin kecil = semakin numpuk.
                const spacing = 160; // Coba ubah angka ini kalo kurang pas (misal 140 atau 180)

                return (
                    <motion.div
                        key={index}
                        layout
                        onClick={() => setActiveIndex(index)}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            // LOGIC BARU: HORIZONTAL LINE
                            x: offset * spacing, // Geser ke kiri/kanan sejajar
                            y: 0, // Tetap di garis tengah horizontal (gak melengkung ke bawah)
                            
                            // LOGIC SKALA: Tengah Besar, Samping Kecil
                            scale: isActive ? 1.3 : 1 - Math.abs(offset) * 0.15, // Tengah 1.3x, samping makin kecil
                            
                            // LOGIC TUMPUKAN: Tengah paling depan
                            zIndex: 10 - Math.abs(offset), 
                            
                            // LOGIC FOKUS: Samping agak transparan & gelap/blur
                            opacity: isActive ? 1 : 0.7 - Math.abs(offset) * 0.1,
                            filter: isActive ? "blur(0px) brightness(100%)" : "blur(1px) brightness(50%) grayscale(30%)"
                        }}
                        transition={{ type: "spring", stiffness: 180, damping: 25 }} // Animasi smooth
                        className={`absolute w-[220px] h-[320px] md:w-[280px] md:h-[400px] rounded-2xl shadow-2xl cursor-pointer overflow-hidden border-2 ${isActive ? "border-pink-500 shadow-[0_0_40px_rgba(236,72,153,0.6)]" : "border-white/10"}`}
                        style={{ 
                            // Posisi absolut di tengah container, nanti digeser pake animate x
                            left: "50%",
                            marginLeft: -110, // Setengah dari width 220px buat centering CSS
                            transformOrigin: "center center" // Putar dari tengah
                        }}
                    >
                        <img 
                            src={src} 
                            alt="Memory" 
                            className="w-full h-full object-cover pointer-events-none" 
                        />
                    </motion.div>
                );
            })}

            {/* Navigasi Manual */}
            <div className="absolute -bottom-16 flex gap-8 z-20">
                 <button 
                    onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                    disabled={activeIndex === 0}
                    className="p-3 rounded-full bg-white/10 hover:bg-pink-500 disabled:opacity-30 transition-colors border border-white/10"
                 >
                    <ChevronLeft size={20} />
                 </button>
                 <button 
                    onClick={() => setActiveIndex(prev => Math.min(cards.length - 1, prev + 1))}
                    disabled={activeIndex === cards.length - 1}
                    className="p-3 rounded-full bg-white/10 hover:bg-pink-500 disabled:opacity-30 transition-colors border border-white/10"
                 >
                    <ChevronRight size={20} />
                 </button>
            </div>
        </div>
    );
}


// ==============================================
//          DYNAMIC WISH SECTION (SUPABASE)
// ==============================================
function WishSection() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState<"name" | "message" | null>(null);

    useEffect(() => {
        const fetchWishes = async () => {
            const { data } = await supabase.from('wishes').select('*').order('created_at', { ascending: false });
            if (data) setWishes(data);
        };
        fetchWishes();
        const channel = supabase.channel('realtime-wishes').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'wishes' }, (payload) => {
            setWishes((current) => [payload.new as Wish, ...current]);
        }).subscribe();
        return () => { supabase.removeChannel(channel); };
    }, []);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;
        setLoading(true);
        const { error } = await supabase.from('wishes').insert([{ name, message }]);
        if (error) { alert("Gagal kirim. Coba lagi!"); } else { setName(""); setMessage(""); }
        setLoading(false);
    };

    return (
        <section className="relative z-10 px-4 py-24 max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="inline-block mb-4"><span className="text-4xl">💌</span></motion.div>
                <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-4 font-handwriting">Wish Wall</h2>
                <p className="text-gray-400 text-sm md:text-base max-w-xs mx-auto">Kirimkan ucapan manismu. Pesanmu akan abadi di sini dan dibaca oleh Anis.</p>
            </div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative group mb-16">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-tilt"></div>
                <div className="relative bg-[#0a0a0a] ring-1 ring-white/10 rounded-[1.9rem] p-8 shadow-2xl">
                    <form onSubmit={handleSend} className="space-y-6">
                        <div className="space-y-2">
                            <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${isFocused === 'name' ? 'text-pink-400' : 'text-gray-500'}`}>Dari Siapa?</label>
                            <div className="relative">
                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isFocused === 'name' ? 'text-pink-500' : 'text-gray-600'}`} />
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setIsFocused("name")} onBlur={() => setIsFocused(null)} placeholder="Nama kamu..." className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-pink-500/50 transition-all" />
                            </div>
                        </div>
                        <div className="space-y-2">
                             <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${isFocused === 'message' ? 'text-pink-400' : 'text-gray-500'}`}>Doa Terbaik</label>
                            <div className="relative">
                                <MessageSquare className={`absolute left-4 top-4 w-5 h-5 ${isFocused === 'message' ? 'text-pink-500' : 'text-gray-600'}`} />
                                <textarea required value={message} onChange={(e) => setMessage(e.target.value)} onFocus={() => setIsFocused("message")} onBlur={() => setIsFocused(null)} rows={3} placeholder="Semoga..." className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-pink-500/50 transition-all resize-none" />
                            </div>
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading} type="submit" className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white font-bold py-5 rounded-2xl shadow-[0_0_30px_rgba(236,72,153,0.4)] flex items-center justify-center gap-3 disabled:opacity-50">
                            {loading ? "Sending..." : "Kirim Ucapan 🚀"}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
            <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar px-2">
                {wishes.length === 0 ? <p className="text-center text-gray-500 text-sm italic">Belum ada ucapan. Jadilah yang pertama!</p> : wishes.map((wish) => (
                    <motion.div key={wish.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 flex items-center justify-center text-xs font-bold text-white uppercase">{wish.name.charAt(0)}</div>
                            <div><h4 className="font-bold text-pink-200 text-sm">{wish.name}</h4><p className="text-[10px] text-gray-500">{new Date(wish.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p></div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed font-light">"{wish.message}"</p>
                    </motion.div>
                ))}
            </div>
            <div className="text-center mt-4"><div className="w-16 h-1 bg-white/10 rounded-full mx-auto"></div></div>
        </section>
    );
}

// ==============================================
//          HELPER COMPONENTS
// ==============================================
function SectionLayout({ children, align = "left" }: { children: React.ReactNode, align?: "left" | "right" }) {
    return (
        <section className={`min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-20 relative z-10 ${align === "right" ? "md:text-right" : ""}`}>
            {children}
        </section>
    );
}

function Polaroid({ src, caption, rotate }: { src: string, caption: string, rotate: number }) {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.8, rotate: 0 }} whileInView={{ opacity: 1, scale: 1, rotate: rotate }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", bounce: 0.4, duration: 1 }} whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }} className="group relative bg-white p-3 pb-12 shadow-2xl rounded-sm w-64 md:w-80 cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4 relative filter sepia-[20%] group-hover:sepia-0 transition-all duration-500">
                <img src={src} alt={caption} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
            <p className="font-handwriting text-gray-800 text-center text-xl absolute bottom-4 left-0 right-0">{caption}</p>
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-pink-500/20 backdrop-blur-sm shadow-sm rotate-${rotate * -1}`}></div>
        </motion.div>
    );
}

function TextBox({ children, title, align = "left" }: { children: React.ReactNode, title: string, align?: "left" | "right" }) {
    return (
        <motion.div initial={{ opacity: 0, x: align === "left" ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className={`max-w-md w-full relative z-10 ${align === "right" ? "items-end text-right" : "items-start"}`}>
            <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-6 drop-shadow-sm font-handwriting">{title}</h3>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors duration-500"><div className="text-gray-300 leading-loose font-light text-lg">{children}</div></div>
        </motion.div>
    );
}

function GlowingHearts() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
             {[...Array(15)].map((_, i) => (
                 <motion.div key={i} initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0 }} animate={{ y: "-10vh", opacity: [0, 0.5, 0] }} transition={{ duration: Math.random() * 10 + 20, repeat: Infinity, ease: "linear", delay: Math.random() * 20 }} className="absolute text-pink-600/10">
                    <Heart size={Math.random() * 50 + 20} fill="currentColor" />
                 </motion.div>
             ))}
        </div>
    );
}