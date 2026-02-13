
import React, { useEffect, useState } from 'react';
import { fetchPosts, extractFirstImage, extractExcerpt } from '../services/bloggerService';
import { BloggerPost, BloggerBlog } from '../types';
import PostCard from '../components/PostCard';
import AdUnit from '../components/AdUnit';

interface HomeProps {
  blogInfo?: BloggerBlog;
  categories: string[];
}

const Home: React.FC<HomeProps> = ({ blogInfo, categories }) => {
  const [posts, setPosts] = useState<BloggerPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    loadInitialPosts();
  }, []);

  const loadInitialPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data.items || []);
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("Initial fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!nextPageToken || loadingMore) return;
    try {
      setLoadingMore(true);
      const data = await fetchPosts(nextPageToken);
      if (data.items) {
        setPosts(prev => [...prev, ...data.items]);
      }
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const latestPost = posts[0];
  const otherPosts = posts.slice(1);

  if (loading && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-primary border-r-4"></div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Syncing Articles...</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Featured Hero Section */}
      {latestPost && (
        <section className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="flex flex-col">
            <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-gray-200">
              <img 
                src={latestPost.images?.[0]?.url || extractFirstImage(latestPost.content) || `https://picsum.photos/seed/${latestPost.id}/1200/600`}
                className="w-full h-full object-cover"
                alt={latestPost.title}
              />
              <span className="absolute top-6 left-6 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-2xl">
                Featured Article
              </span>
            </div>
            <div className="p-10 md:p-16">
              <h1 className="text-3xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.05] tracking-tighter">
                {latestPost.title}
              </h1>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed line-clamp-2 md:line-clamp-none">
                {extractExcerpt(latestPost.content, 240)}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-8 border-t border-gray-50 pt-10">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Creative+Mind&background=2563eb&color=fff" alt="Creative Mind" className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-base font-black text-gray-900 tracking-tight">Creative Mind</p>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Master Editor</p>
                  </div>
                </div>
                <a href={`#/post/${latestPost.id}`} className="btn-primary w-full md:w-auto px-12 py-4 shadow-xl shadow-primary/30">
                  Dive Into Story
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AdSense Unit */}
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] text-center mb-6">Advertisement Gallery</p>
        <AdUnit className="bg-gray-50/50 border border-dashed border-gray-200 p-10 rounded-[2rem]" />
      </div>

      {/* Grid Stories */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center">
            <div className="w-2 h-10 bg-primary rounded-full mr-5 shadow-sm"></div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Recent Discoveries</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {otherPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Enhanced Load More Section */}
      {nextPageToken && (
        <div className="pt-12 pb-20 text-center">
          <button 
            onClick={loadMorePosts}
            disabled={loadingMore}
            className="group w-full md:w-max md:px-24 py-6 bg-white border-2 border-primary/10 text-primary font-black rounded-[2rem] hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center mx-auto shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loadingMore ? (
              <span className="flex items-center">
                <svg className="animate-spin h-6 w-6 mr-3 text-current" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Syncing More Articles...
              </span>
            ) : (
              <>
                Load More Articles
                <svg className="w-6 h-6 ml-3 transform group-hover:rotate-180 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
