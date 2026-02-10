// app/api/daily-bible/route.js
import { NextResponse } from "next/server";
import { supabaseServer } from "../../lib/supabase-server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const date =
      url.searchParams.get("date") || new Date().toISOString().split("T")[0];
    const type = url.searchParams.get("type"); // "daily" or "playlist"

    if (type === "playlist") {
      // Get all unique dates with videos (for playlist)
      const { data: datesData, error: datesError } = await supabaseServer
        .from("videos")
        .select("date")
        .order("date", { ascending: false });

      if (datesError) throw datesError;

      // Get all videos grouped by date
      const { data: allVideos, error: allError } = await supabaseServer
        .from("videos")
        .select("*")
        .order("date", { ascending: false })
        .order("video_group", { ascending: true });

      if (allError) throw allError;

      // Group videos by date
      const groupedByDate = {};
      allVideos?.forEach((video) => {
        if (!groupedByDate[video.date]) {
          groupedByDate[video.date] = [];
        }
        groupedByDate[video.date].push(video);
      });

      return NextResponse.json({
        dates: datesData?.map((d) => d.date) || [],
        videosByDate: groupedByDate,
      });
    }

    // Daily video logic
    const today = new Date().toISOString().split("T")[0];
    const isToday = date === today;

    // First, try to get videos for the requested date
    const { data: datedVideos, error: datedError } = await supabaseServer
      .from("videos")
      .select("*")
      .eq("date", date)
      .order("video_group", { ascending: true });

    if (datedError) throw datedError;

    let videos = datedVideos;

    // If no videos for requested date OR if today has no videos, get latest
    if (!videos || videos.length === 0) {
      const { data: latestVideos, error: latestError } = await supabaseServer
        .from("videos")
        .select("*")
        .order("date", { ascending: false })
        .order("video_group", { ascending: true })
        .limit(2);

      if (latestError) throw latestError;
      videos = latestVideos;
    }

    // Get previous days for playlist (excluding current date)
    const { data: previousDates } = await supabaseServer
      .from("videos")
      .select("date")
      .neq("date", date)
      .order("date", { ascending: false })
      .limit(10);

    return NextResponse.json({
      date,
      isToday,
      videos,
      previousDates: previousDates?.map((d) => d.date) || [],
    });
  } catch (err) {
    console.error("Error fetching daily Bible:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
