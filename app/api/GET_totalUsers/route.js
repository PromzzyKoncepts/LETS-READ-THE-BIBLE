import dbConnect from '@/app/lib/mongodb';
import User from '@/app/api/models/User';
import KingsChatUser from '../models/KingsChat';
import InfluencerUser from '../models/InfluencerUser';
import InfluencerKingsChat from '../models/InfluencerKC';

export async function GET(req, res) {
  try {
    // Connect to the database
    await dbConnect();

    // Extract query parameters from the request URL
    const url = new URL(req.url);
    const influencerId = url.searchParams.get('influencerId');

    // Define the list of influencer IDs to filter by
    const influencerIds = ['PLEROO', 'DOXA', 'SOZO', 'TELEIOS', 'em', 'ig','fb','yt'];

    // If an influencerId is provided in the query, fetch users for that specific influencer
    if (influencerId) {
      if (!influencerIds.includes(influencerId)) {
        return new Response(JSON.stringify({ message: 'Unauthorised pathway/influencer!' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Fetch users registered through the specified influencer (both email and KingsChat)
      const influencerEmailUsers = await InfluencerUser.find({ influencerId });
      const influencerKingsChatUsers = await InfluencerKingsChat.find({ influencer: influencerId });

      // Combine the results
      const usersForInfluencer = [...influencerEmailUsers, ...influencerKingsChatUsers];

      return new Response(JSON.stringify({
        influencerId,
        totalUsers: usersForInfluencer.length,
        users: usersForInfluencer,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If no influencerId is provided, fetch totals for all routes
    const totalUsers = await User.countDocuments();
    const totalKingsChatUsers = await KingsChatUser.countDocuments();
    const totalInfluencerUsers = await InfluencerUser.countDocuments();
    const totalInfluencerKingsChatUsers = await InfluencerKingsChat.countDocuments();

    // Calculate totals
    const totalUsersThroughInfluencers = totalInfluencerUsers + totalInfluencerKingsChatUsers;
    const totalUsersThroughUsualRoutes = totalUsers + totalKingsChatUsers;
    const totalAllUsers = totalUsers + totalKingsChatUsers + totalInfluencerUsers + totalInfluencerKingsChatUsers;

    // Return the response
    return new Response(JSON.stringify({
      totalUsersThroughInfluencers,
      totalUsersThroughUsualRoutes,
      totalAllUsers,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching user counts:', error);
    return new Response(JSON.stringify({ message: 'Something went wrong!', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}