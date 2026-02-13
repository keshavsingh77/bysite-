
import React, { useEffect, useState } from 'react';
import { fetchPosts, extractFirstImage, extractExcerpt } from '../services/bloggerService';
import { BloggerPost } from '../types';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import { BloggerBlog } from '../types';

interface HomeProps {
  blogInfo?: BloggerBlog;
  categories: string[];
}

const Home: React.FC<HomeProps> = ({ blogInfo, categories }) => {
  const [posts, setPosts] = useState<BloggerPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async (token?: string) => {
    try {
      setLoading(true);
      const data = await fetchPosts(token);
      if (token) {
        setPosts(prev => [...prev, ...data.items]);
      } else {
        setPosts(data.items);
      }
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  if (loading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      {featuredPost && (
        <section className="relative overflow-hidden rounded-2xl bg-gray-900 min-h-[500px] flex items-center">
          <div className="absolute inset-0 z-0">
            <img 
              src={featuredPost.images?.[0]?.url || extractFirstImage(featuredPost.content) || `https://picsum.photos/seed/${featuredPost.id}/1200/800`} 
              alt={featuredPost.title}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-8 py-20 text-center text-white">
            {featuredPost.labels && featuredPost.labels.length > 0 && (
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded mb-6">
                Featured: {featuredPost.labels[0]}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              {featuredPost.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              {extractExcerpt(featuredPost.content, 180)}
            </p>
            <a 
              href={`#/post/${featuredPost.id}`} 
              className="inline-block px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg"
            >
              Read Full Article
            </a>
          </div>
        </section>
      )}

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-bold text-gray-900">Latest Insights</h2>
            <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gridPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {nextPageToken && (
            <div className="mt-12 text-center">
              <button 
                onClick={() => loadPosts(nextPageToken)}
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Loading More...' : 'Load More Articles'}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar 
          blogInfo={blogInfo} 
          categories={categories} 
          recentPosts={posts.slice(0, 5).map(p => ({ id: p.id, title: p.title }))}
        />
      </div>
    </div>
  );
};

export default Home;
