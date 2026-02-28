"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, Star } from "lucide-react";

function AnimatedCounter({
  end,
  suffix = "",
  duration = 2,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold gradient-text">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

const metrics = [
  {
    icon: Clock,
    value: 2.3,
    suffix: "M",
    label: "Hours Saved",
    sublabel: "Calculated from user data",
  },
  {
    icon: TrendingUp,
    value: 847,
    suffix: "%",
    label: "ROI Average",
    sublabel: "Based on time savings",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    label: "Extraction Accuracy",
    sublabel: "User-rated quality score",
  },
];

export function SocialProof() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Results That <span className="gradient-text">Speak</span>
          </h2>
          <p className="text-text-secondary text-lg">
            Numbers don&apos;t lie. Impact that scales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-8 rounded-2xl border border-border bg-surface/30 hover:bg-surface/50 transition-colors"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <metric.icon className="w-7 h-7 text-primary" />
              </div>
              <AnimatedCounter end={metric.value} suffix={metric.suffix} />
              <p className="text-lg font-semibold text-text-primary mt-3">
                {metric.label}
              </p>
              <p className="text-sm text-text-muted mt-1">{metric.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
