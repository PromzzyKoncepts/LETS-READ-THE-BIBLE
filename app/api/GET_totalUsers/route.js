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

    // Define social media influencer types
    const socialMediaTypes = ['ig', 'yt', 'tl', 'fb', 'em'];
    
    // Define the list of all influencer IDs (including social media types)
    const influencerIds = ['PLEROO', 'DOXA', 'SOZO', 'TELEIOS', ...socialMediaTypes];

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
    
    // Get counts for all influencer types (including social media)
    const totalInfluencerUsers = await InfluencerUser.countDocuments();
    const totalInfluencerKingsChatUsers = await InfluencerKingsChat.countDocuments();

    // Calculate social media influencer counts (combined from both collections)
    const socialMediaCounts = {};
    for (const type of socialMediaTypes) {
      const emailCount = await InfluencerUser.countDocuments({ influencerId: type });
      const kcCount = await InfluencerKingsChat.countDocuments({ influencer: type });
      socialMediaCounts[`influencersThrough${type.toUpperCase()}`] = emailCount + kcCount;
    }

    // Calculate regular influencer counts (excluding social media types)
    const regularInfluencerIds = influencerIds.filter(id => !socialMediaTypes.includes(id));
    
    let totalRegularInfluencerUsers = 0;
    let totalRegularInfluencerKingsChatUsers = 0;
    
    for (const id of regularInfluencerIds) {
      totalRegularInfluencerUsers += await InfluencerUser.countDocuments({ influencerId: id });
      totalRegularInfluencerKingsChatUsers += await InfluencerKingsChat.countDocuments({ influencer: id });
    }

    const totalUsersThroughRegularInfluencers = totalRegularInfluencerUsers + totalRegularInfluencerKingsChatUsers;
    const totalUsersThroughInfluencers = totalInfluencerUsers + totalInfluencerKingsChatUsers;
    const totalUsersThroughUsualRoutes = totalUsers + totalKingsChatUsers;
    const totalAllUsers = totalUsers + totalKingsChatUsers + totalInfluencerUsers + totalInfluencerKingsChatUsers;

    // Return the response with individual social media counts
    return new Response(JSON.stringify({
      ...socialMediaCounts, // This will include each social media type separately
      totalUsersThroughRegularInfluencers,
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