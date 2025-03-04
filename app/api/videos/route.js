import Video from "@/app/api/models/Video"; // Adjust the path as necessary
import dbConnect from "@/app/lib/mongodb"; // Adjust the path as necessary

export async function GET(req, res) {
    const { method } = req;

    if (method !== "GET") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
    }

    try {
        // Connect to MongoDB
        await dbConnect();

        // Fetch all videos from MongoDB
        const videos = await Video.find({});

        // Format the response
        const formattedVideos = videos.map(video => ({
            id: video._id,
            name: video.kid_fullname, // Assuming you want to use the kid's fullname as the name
            url: video.video_url,
            kid_fullname: video.kid_fullname,
            parent_fullname: video.parent_fullname,
            book: video.book,
            chapter_start: video.chapter_start,
            chapter_end: video.chapter_end,
        }));
        console.log(formattedVideos)
        return new Response(JSON.stringify(formattedVideos), {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching videos:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch videos" }), { status: 500 });
    }
}