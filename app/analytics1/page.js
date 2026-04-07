"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

// ─── Config ──────────────────────────────────────────────────────────────────
// Change this to your PHP endpoint
const API_BASE = "https://parentforum.lovetoons.org/php/simple-tracker.php"; // Or your full PHP URL

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtNum(n) {
  if (n == null || isNaN(n)) return "—";
  n = parseInt(n);
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "k";
  return n.toLocaleString();
}

function getDateFrom(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
}

function buildLabels(days) {
  const labels = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    labels.push(
      d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
    );
  }
  return labels;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function MetricCard({ label, value, color, sub }) {
  return (
    <div style={styles.metricCard}>
      <div style={styles.metricLabel}>{label}</div>
      <div style={{ ...styles.metricValue, color: color ?? "inherit" }}>
        {value}
      </div>
      {sub && <div style={styles.metricSub}>{sub}</div>}
    </div>
  );
}

function ChartCard({ title, legend, children }) {
  return (
    <div style={styles.chartCard}>
      {legend && (
        <div style={styles.legend}>
          {legend.map((l) => (
            <span key={l.label} style={styles.legendItem}>
              <span style={{ ...styles.legendDot, background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      )}
      <div style={styles.chartTitle}>{title}</div>
      <div style={styles.chartWrap}>{children}</div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
const RANGES = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
];

export default function AnalyticsPage() {
  const [days, setDays] = useState(7);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (d) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch from your PHP API
      const res = await fetch(`${API_BASE}?days=${d}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(days);
  }, [days, fetchData]);

  // Prepare chart data
  const labels = data?.labels || buildLabels(days);
  const hitsData = data?.hits || [];
  const uniquesData = data?.uniques || [];
  const ipsData = data?.ips || [];

  const baseChartOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 10 },
          maxRotation: 45,
          autoSkip: true,
          maxTicksLimit: 8,
        },
      },
      y: {
        grid: { color: "rgba(128,128,128,0.08)" },
        ticks: { font: { size: 10 } },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={styles.page}>
      {/* ── Header ── */}
      <div style={styles.topBar}>
        <div>
          <h1 style={styles.title}>Site Analytics</h1>
          <p style={styles.subtitle}>Last {days} days — Visitor Statistics</p>
        </div>
        <div style={styles.dateRow}>
          {RANGES.map(({ label, days: d }) => (
            <button
              key={label}
              onClick={() => setDays(d)}
              style={{
                ...styles.dateBtn,
                ...(days === d ? styles.dateBtnActive : {}),
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div style={styles.errorBanner}>
          Could not load data: {error}. Make sure your PHP endpoint is
          configured.
        </div>
      )}

      {/* ── Metric cards ── */}
      <div style={styles.metricsGrid}>
        <MetricCard
          label="Total Hits"
          value={loading ? "…" : fmtNum(data?.totalHits)}
          color="#378ADD"
          sub="All page views"
        />
        <MetricCard
          label="Unique Visitors"
          value={loading ? "…" : fmtNum(data?.totalUniques)}
          color="#1D9E75"
          sub="30-min session window"
        />
        <MetricCard
          label="Countries"
          value={loading ? "…" : fmtNum(data?.totalCountries)}
          color="#D85A30"
          sub="Unique countries"
        />
        <MetricCard
          label="Pages"
          value={loading ? "…" : fmtNum(data?.totalPages)}
          color="#BA7517"
          sub="Unique URLs"
        />
        <MetricCard
          label="Active Days"
          value={loading ? "…" : fmtNum(data?.activeDays)}
          color="#D4537E"
          sub={`of ${days} days`}
        />
      </div>

      {/* ── Charts ── */}
      {!loading && data && (
        <div style={styles.chartsRow}>
          <ChartCard
            title="Hits vs Unique Visitors"
            legend={[
              { label: "Total Hits", color: "#378ADD" },
              { label: "Unique Visitors", color: "#1D9E75" },
            ]}
          >
            <Bar
              data={{
                labels,
                datasets: [
                  {
                    label: "Hits",
                    data: hitsData,
                    backgroundColor: "#378ADD",
                    borderRadius: 3,
                    barPercentage: 0.75,
                  },
                  {
                    label: "Uniques",
                    data: uniquesData,
                    backgroundColor: "#1D9E75",
                    borderRadius: 3,
                    barPercentage: 0.75,
                  },
                ],
              }}
              options={baseChartOpts}
            />
          </ChartCard>

          <ChartCard
            title="Daily Unique Visitors"
            legend={[{ label: "Unique IPs per day", color: "#D85A30" }]}
          >
            <Line
              data={{
                labels,
                datasets: [
                  {
                    label: "Unique Visitors",
                    data: ipsData,
                    borderColor: "#D85A30",
                    backgroundColor: "rgba(216,90,48,0.08)",
                    fill: true,
                    tension: 0.35,
                    pointRadius: 2,
                  },
                ],
              }}
              options={baseChartOpts}
            />
          </ChartCard>
        </div>
      )}

      {loading && <div style={styles.loadingRow}>Loading analytics…</div>}

      <p style={styles.footerNote}>Data from your PHP hitcounter database</p>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  page: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "2rem 1.25rem",
    fontFamily: "system-ui, sans-serif",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: 22,
    fontWeight: 500,
    margin: 0,
    color: "var(--foreground, #111)",
  },
  subtitle: {
    fontSize: 13,
    color: "#888",
    margin: "3px 0 0",
  },
  dateRow: { display: "flex", gap: 6 },
  dateBtn: {
    fontSize: 12,
    padding: "5px 12px",
    border: "1px solid #ddd",
    borderRadius: 8,
    background: "transparent",
    color: "#666",
    cursor: "pointer",
  },
  dateBtnActive: {
    background: "#f4f4f4",
    color: "#111",
    borderColor: "#bbb",
    fontWeight: 500,
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: 10,
    marginBottom: "1.5rem",
  },
  metricCard: {
    background: "#f7f7f7",
    borderRadius: 8,
    padding: "0.9rem 1rem",
  },
  metricLabel: {
    fontSize: 11,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: 500,
    lineHeight: 1,
  },
  metricSub: {
    fontSize: 11,
    color: "#aaa",
    marginTop: 4,
  },
  chartsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: "1.5rem",
  },
  chartCard: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 12,
    padding: "1rem 1.25rem",
  },
  chartTitle: {
    fontSize: 13,
    fontWeight: 500,
    marginBottom: "0.75rem",
    color: "#111",
  },
  chartWrap: {
    position: "relative",
    width: "100%",
    height: 180,
  },
  legend: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 6,
  },
  legendItem: {
    fontSize: 11,
    color: "#888",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
    display: "inline-block",
  },
  errorBanner: {
    background: "#fff3f3",
    border: "1px solid #fcc",
    borderRadius: 8,
    padding: "0.75rem 1rem",
    fontSize: 13,
    color: "#b00",
    marginBottom: "1rem",
  },
  loadingRow: {
    textAlign: "center",
    padding: "2rem",
    color: "#aaa",
    fontSize: 14,
  },
  footerNote: {
    fontSize: 11,
    color: "#bbb",
    textAlign: "center",
    marginTop: "1rem",
  },
};
