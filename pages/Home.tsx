
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

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const latestPost = posts[0];
  const trendingPosts = posts.slice(1, 5);

  if (loading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Featured Hero Section */}
      {latestPost && (
        <section className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
          <div className="flex flex-col">
            <div className="relative w-full aspect-[4/3] md:aspect-[21/9]">
              <img 
                src={latestPost.images?.[0]?.url || extractFirstImage(latestPost.content) || `https://picsum.photos/seed/${latestPost.id}/1200/600`}
                className="w-full h-full object-cover"
                alt={latestPost.title}
              />
              <span className="absolute top-6 left-6 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg">
                Latest Post
              </span>
            </div>
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-[1.1]">
                {latestPost.title}
              </h1>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed line-clamp-2 md:line-clamp-none">
                {extractExcerpt(latestPost.content, 200)}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Editorial Team</p>
                    <p className="text-xs font-semibold text-gray-400">Head of Content</p>
                  </div>
                </div>
                <a href={`#/post/${latestPost.id}`} className="btn-primary w-full md:w-auto px-10">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AdSense Unit */}
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] text-center mb-4">Sponsored Content</p>
        <AdUnit className="bg-white border border-dashed border-gray-200 p-8 text-center text-gray-300 rounded-2xl" />
      </div>

      {/* Trending Stories */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-1.5 h-8 bg-primary rounded-full mr-4"></div>
            <h2 className="text-2xl font-black text-gray-900">Trending Stories</h2>
          </div>
          <a href="#/" className="text-sm font-bold text-primary flex items-center hover:underline">
            View All
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {trendingPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Load More Section */}
      <div className="pt-4 pb-12">
        <button className="w-full py-5 border-2 border-primary/10 text-primary font-black rounded-2xl hover:bg-primary hover:text-white transition-all flex items-center justify-center">
          Load More Articles
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
