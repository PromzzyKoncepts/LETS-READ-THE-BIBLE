// app/daily-bible/page.jsx
import DailyBibleReader from "/app/components/DailyBibleReader";

export const metadata = {
  title: "Daily Bible Reading - Read Scripture Day by Day",
  description:
    "Daily Bible reading plan with Old and New Testament videos. Catch up on missed readings with our playlist feature.",
};

export default function DailyBiblePage() {
  return <DailyBibleReader />;
}
