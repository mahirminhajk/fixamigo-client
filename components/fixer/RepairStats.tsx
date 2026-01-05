'use client';

import { Wrench, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface RepairStatsProps {
  totalRepairs: number;
  rating: number;
  primaryColor?: string;
}

export default function RepairStats({ totalRepairs, rating, primaryColor }: RepairStatsProps) {
  const stats = [
    {
      icon: Wrench,
      label: 'Total Repairs',
      value: totalRepairs.toLocaleString(),
      color: primaryColor || '#0f172a',
    },
    {
      icon: CheckCircle,
      label: 'Success Rate',
      value: '98%',
      color: '#10b981',
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: rating > 0 ? rating.toFixed(1) : 'New',
      color: '#fbbf24',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon 
                  className="w-6 h-6" 
                  style={{ color: stat.color }}
                />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
