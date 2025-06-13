import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { load } from 'cheerio';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Extract the target URL from query parameters
    const targetUrl = req.query.url as string;
    
    if (!targetUrl) {
      return res.status(400).json({ error: 'Missing URL parameter' });
    }

    // Fetch the content from CrazyGames
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.crazygames.com/',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      }
    });

    // Load HTML into Cheerio for manipulation
    const $ = load(response.data);

    // Remove ad-related elements
    $('div[class*="ad videoAdUiClickElement videoAdUivideoAdUiTopBar videoAdUiTopBarWithGradients videoAdUiTopBarTransitions"], div[class*="enigma-watermark"], iframe[src*="ads"], script[src*="ad"], .ad-container').remove();

    // Remove CrazyGames watermark/branding
    $('.watermark, .logo, .enigma-watermark, .videoAdUiClickElement, .branding, .crazygames-logo .videoAdUiTopBar .videoAdUiTopBarWithGradients .videoAdUiTopBarTransitions').remove();

    // Modify CSS to hide remaining ads
    $('head').append(`
      <style>
        .ad-placeholder, [class*="ad-"], .adsbygoogle {
          display: none !important;
        }
          .enigma-watermark {
          display: none !important;
        }
          .videoAdUI {
          display: none !important;
        }
          .videoAdUiClickElement, .videoAdUiTopBar, .videoAdUiTopBarWithGradients, .videoAdUiTopBarTransitions {
          display: none !important;
        }
      </style>
    `);

    // Remove ad-related scripts
    $('script').each((i, el) => {
      const scriptContent = $(el).html() || '';
      if (scriptContent.includes('adsbygoogle') || scriptContent.includes('adserver')) {
        $(el).remove();
      }
    });

    // Set CORS headers to allow embedding
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send($.html());
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
}