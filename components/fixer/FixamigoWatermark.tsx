'use client';

import Image from 'next/image';

interface FixamigoWatermarkProps {
  displayName: string;
}

export default function FixamigoWatermark({ displayName }: FixamigoWatermarkProps) {
  return (
    <div className="bg-slate-50 border-t py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
          <span className="font-medium">{displayName}</span>
          <span className="text-slate-400">×</span>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">Fixamigo</span>
            <div className="relative w-5 h-5">
              <Image
                src="/logo.png"
                alt="Fixamigo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-1">
          Powered by Fixamigo Repair Management Platform
        </p>
      </div>
    </div>
  );
}
