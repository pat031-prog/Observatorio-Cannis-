import { useState, useEffect } from 'react';
import { NewsItem } from './data';

export function useGoogleNews(query: string) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchNews = async () => {
      try {
        // Use Google News RSS feed via rss2json API
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=es-419&gl=AR&ceid=AR:es-419`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error fetching news');
        
        const data = await response.json();
        
        if (data.status === 'ok' && isMounted) {
          const items: NewsItem[] = data.items.slice(0, 5).map((item: any) => {
            // Extract source from title if possible (usually "Title - Source")
            const titleParts = item.title.split(' - ');
            const source = titleParts.length > 1 ? titleParts.pop() : 'Google Noticias';
            const cleanTitle = titleParts.join(' - ');

            return {
              id: item.guid || item.link,
              title: cleanTitle,
              source: source,
              date: new Date(item.pubDate).toLocaleDateString('es-AR', { month: 'short', year: 'numeric' }),
              url: item.link
            };
          });
          setNews(items);
        } else if (isMounted) {
          throw new Error(data.message || 'Failed to parse news');
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching Google News:', err);
          setError('No se pudieron cargar las noticias.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, [query]);

  return { news, loading, error };
}
