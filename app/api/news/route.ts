import { NextResponse } from 'next/server';

// RSS Feed URLs for Indian Fintech News
const RSS_FEEDS = [
  'https://economictimes.indiatimes.com/tech/fintech/rssfeeds/63996239.cms',
  'https://bfsi.economictimes.indiatimes.com/rss/topstories',
];

interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
}

let cachedNews: NewsItem[] = [];
let cacheTimestamp = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Parse RSS feed
async function parseRSSFeed(url: string): Promise<NewsItem[]> {
  try {
    const response = await fetch(url);
    const text = await response.text();
    
    const items: NewsItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const matches = text.matchAll(itemRegex);
    
    for (const match of matches) {
      const itemContent = match[1];
      
      const titleMatch = itemContent.match(/<title><!\[CDATA\[(.+?)\]\]><\/title>|<title>(.+?)<\/title>/);
      const linkMatch = itemContent.match(/<link>(.+?)<\/link>/);
      const descriptionMatch = itemContent.match(/<description><!\[CDATA\[(.+?)\]\]><\/description>|<description>(.+?)<\/description>/);
      const pubDateMatch = itemContent.match(/<pubDate>(.+?)<\/pubDate>/);
      
      if (titleMatch && linkMatch) {
        const title = titleMatch[1] || titleMatch[2] || '';
        const description = descriptionMatch ? (descriptionMatch[1] || descriptionMatch[2] || '') : '';
        
        items.push({
          title: title.trim(),
          link: linkMatch[1].trim(),
          description: description.trim().substring(0, 200),
          pubDate: pubDateMatch ? pubDateMatch[1] : new Date().toISOString(),
          source: new URL(url).hostname,
        });
      }
    }
    
    return items;
  } catch (error) {
    console.error('Error parsing RSS feed:', url, error);
    return [];
  }
}

export async function GET() {
  try {
    const now = Date.now();
    
    // Check if cache is still valid
    if (cachedNews.length > 0 && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json({
        news: cachedNews,
        cached: true,
        lastUpdate: new Date(cacheTimestamp).toISOString(),
      });
    }
    
    // Fetch fresh news from all RSS feeds
    const allNewsPromises = RSS_FEEDS.map(feed => parseRSSFeed(feed));
    const allNewsArrays = await Promise.all(allNewsPromises);
    
    // Flatten and sort by date
    const allNews = allNewsArrays.flat();
    allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    
    // Take top 20 news items
    const topNews = allNews.slice(0, 20);
    
    // Update cache
    cachedNews = topNews;
    cacheTimestamp = now;
    
    return NextResponse.json({
      news: topNews,
      cached: false,
      lastUpdate: new Date(cacheTimestamp).toISOString(),
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
