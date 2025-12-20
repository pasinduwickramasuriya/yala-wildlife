'use client';

import { ArrowRight, Download, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toPng } from 'html-to-image';

export default function InvoiceActions() {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        const element = document.getElementById('invoice-card');

        if (element) {
            try {
                // Generate the image using html-to-image
                // We use cacheBust to ensure external images (like the leopard) load correctly
                const dataUrl = await toPng(element, {
                    cacheBust: true,
                    pixelRatio: 2, // Higher quality (2x resolution)
                    backgroundColor: 'rgba(0,0,0,0)' // Keep transparency if needed, or use '#000' for black
                });

                // Create a link and trigger the download
                const link = document.createElement('a');
                link.download = 'YalaWildlife-Receipt.png';
                link.href = dataUrl;
                link.click();
            } catch (error) {
                console.error("Download failed:", error);
                alert("Could not generate image. Please try again.");
            }
        }
        setIsDownloading(false);
    };

    return (
        // 'data-html2canvas-ignore' is strictly for the old lib, but we keep the class 'print:hidden'
        <div className="grid grid-cols-2 gap-3 p-4 bg-black/40 border-t border-white/5 print:hidden">

            {/* Download Button */}
            <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest text-[10px] py-4 rounded-[1.5rem] transition-all border border-white/10 disabled:opacity-50 disabled:cursor-wait"
            >
                {isDownloading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Download className="w-4 h-4" />
                )}
                {isDownloading ? "Saving..." : "Download"}
            </button>

            {/* Return Home Button */}
            <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full bg-[#00ff00] hover:bg-[#00ff00]/90 text-black font-black uppercase tracking-widest text-[10px] py-4 rounded-[1.5rem] transition-all shadow-lg"
            >
                Home <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}