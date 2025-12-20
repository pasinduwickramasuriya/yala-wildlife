import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Hash, Globe, Mail, Phone, Calendar } from 'lucide-react';
import InvoiceActions from '@/components/InvoiceActions';

export default async function SuccessPage({
    searchParams
}: {
    searchParams: Promise<{ orderId?: string; order_id?: string }>
}) {
    const params = await searchParams;
    const idToSearch = params.orderId || params.order_id;

    // --- ERROR STATE ---
    if (!idToSearch) return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="text-white font-mono bg-white/5 p-6 rounded-xl text-center">
                <p className="text-red-500 font-bold mb-4">ERROR: NO ORDER ID</p>
                <Link href="/" className="text-xs uppercase underline">Return Home</Link>
            </div>
        </div>
    );

    const booking = await prisma.advanceBooking.findUnique({
        where: { id: idToSearch }
    });

    // --- NOT FOUND STATE ---
    if (!booking) return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="text-white font-mono bg-white/5 p-6 rounded-xl text-center">
                <p className="text-red-500 font-bold mb-4">BOOKING NOT FOUND</p>
                <Link href="/" className="text-xs uppercase underline">Return Home</Link>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 font-sans selection:bg-[#00ff00] selection:text-black">

            {/* --- 1. BACKGROUND IMAGE (Darker & Fixed) --- */}
            <div className="fixed inset-0 z-0 pointer-events-none print:hidden">
                <Image
                    src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
                    alt="Yala Wildlife Background"
                    fill
                    className="object-cover object-center opacity-50"
                    priority
                />
                {/* Darker Overlay */}
                <div className="absolute inset-0 bg-black/20 " />
            </div>

            {/* --- 2. THE INVOICE CARD --- */}
            <div className="relative z-10 w-full max-w-[380px] my-8 animate-in fade-in zoom-in duration-500 print:shadow-none print:my-0 print:w-full print:max-w-xl">

                {/* Card Container: No Borders, Just Glass */}
                {/* ADDED id="invoice-card" for the downloader */}
                <div id="invoice-card" className="bg-black/50 backdrop-blur-sm rounded-[2.5rem] shadow-2xl overflow-hidden print:bg-white print:text-black print:rounded-none">

                    {/* --- HEADER --- */}
                    <div className="bg-black/40 pt-8 pb-6 text-center print:bg-transparent">
                        <h2 className="font-black text-lg uppercase tracking-[0.2em] text-white/80 mb-6 print:text-black">
                            Yala<span className="text-[#00ff00] print:text-black">.</span>Wildlife
                        </h2>

                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00ff00] text-black mb-4 shadow-[0_0_25px_rgba(0,255,0,0.5)] print:shadow-none">
                            <Check className="w-8 h-8 stroke-[3]" />
                        </div>

                        <h1 className="text-2xl font-black text-white uppercase tracking-tight leading-none print:text-black">
                            Payment<br />Successful
                        </h1>
                        <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mt-2 print:text-neutral-600">
                            Booking Secured
                        </p>
                    </div>

                    {/* --- AMOUNT PILL --- */}
                    <div className="flex justify-center -mt-6 relative z-10">
                        {/* Removed border here too */}
                        <div className="bg-black rounded-full px-8 py-3 shadow-xl flex items-baseline gap-2 print:bg-white">
                            <span className="text-[#00ff00] font-bold text-xs print:text-black">LKR</span>
                            <span className="text-white font-black text-2xl tracking-tighter print:text-black">{booking.amount.toLocaleString()}</span>
                            <span className="text-[#00ff00] font-bold text-xs print:text-black">.00</span>
                        </div>
                    </div>

                    {/* --- DETAILS BODY --- */}
                    <div className="p-6 pt-8 space-y-5">

                        {/* Transaction ID */}
                        {/* Removed border, kept bg-white/5 for contrast */}
                        <div className="bg-white/5 rounded-2xl p-3 flex items-center justify-between print:bg-transparent">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-9 h-9 shrink-0 rounded-full bg-[#00ff00]/10 flex items-center justify-center text-[#00ff00] print:bg-black/10 print:text-black">
                                    <Hash className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[9px] text-neutral-500 uppercase font-bold tracking-wider print:text-black">Transaction ID</p>
                                    <p className="text-white font-mono text-xs tracking-wide truncate print:text-black">
                                        {booking.id}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center px-4 py-3 rounded-2xl bg-white/5 print:bg-transparent">
                                <span className="text-neutral-500 text-[10px] font-bold uppercase print:text-black">Customer</span>
                                <span className="text-white font-bold text-xs uppercase print:text-black">{booking.firstName} {booking.lastName}</span>
                            </div>

                            <div className="flex justify-between items-center px-4 py-3 rounded-2xl bg-white/5 print:bg-transparent">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3 h-3 text-neutral-500 print:text-black" />
                                    <span className="text-neutral-500 text-[10px] font-bold uppercase print:text-black">Date</span>
                                </div>
                                <span className="text-white font-mono text-xs print:text-black">{booking.createdAt.toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Contact Pills */}
                        <div className="flex flex-wrap gap-2 justify-center pt-2">
                            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full max-w-full print:bg-transparent">
                                <Mail className="w-3 h-3 text-[#00ff00] shrink-0 print:text-black" />
                                <span className="text-[10px] text-neutral-300 truncate print:text-black">{booking.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full print:bg-transparent">
                                <Phone className="w-3 h-3 text-[#00ff00] shrink-0 print:text-black" />
                                <span className="text-[10px] text-neutral-300 print:text-black">{booking.phone}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full print:bg-transparent">
                                <Globe className="w-3 h-3 text-[#00ff00] shrink-0 print:text-black" />
                                <span className="text-[10px] text-neutral-300 uppercase print:text-black">{booking.country}</span>
                            </div>
                        </div>

                        {/* Note */}
                        {booking.additionalNote && (
                            <div className="text-center pt-2">
                                <p className="text-[9px] text-neutral-500 uppercase font-bold mb-1 print:text-black">Note</p>
                                <p className="text-xs text-neutral-300 italic px-4 print:text-black">&quot;{booking.additionalNote}&quot;</p>
                            </div>
                        )}
                    </div>

                    {/* --- CLIENT BUTTONS (Download / Home) --- */}
                    <InvoiceActions />

                </div>
            </div>
        </div>
    );
}