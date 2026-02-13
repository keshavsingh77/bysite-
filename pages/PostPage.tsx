
import React, { useEffect, useState } from 'react';
import { fetchPostById } from '../services/bloggerService';
import { BloggerPost } from '../types';
import AdUnit from '../components/AdUnit';
import Sidebar from '../components/Sidebar';

interface PostPageProps {
  postId: string;
  categories: string[];
}

const PostPage: React.FC<PostPageProps> = ({ postId, categories }) => {
  const [post, setPost] = useState<BloggerPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = await fetchPostById(postId);
        setPost(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [postId]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!post) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-gray-400">Article not found</h2>
      <a href="#/" className="text-blue-600 mt-4 block">Return to home</a>
    </div>
  );

  const date = new Date(post.published).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <article className="flex-grow max-w-full">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {post.labels?.map(label => (
              <a key={label} href={`#/category/${encodeURIComponent(label)}`} className="text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors">
                {label}
              </a>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500 pb-8 border-b border-gray-100">
            <span className="font-semibold text-gray-900">{post.author.displayName}</span>
            <span className="mx-2">•</span>
            <span>{date}</span>
          </div>
        </header>

        {/* Ad Unit: After Introduction */}
        <AdUnit className="mb-10" />

        <div 
          className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed 
            [&>p]:mb-6 [&>img]:rounded-xl [&>img]:shadow-lg [&>img]:my-10 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Ad Unit: Before Conclusion */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-4">You might also be interested in</p>
          <AdUnit />
        </div>

        <div className="mt-12 bg-gray-50 p-8 rounded-xl flex items-center">
          <img src={post.author.image.url} alt={post.author.displayName} className="w-16 h-16 rounded-full border-4 border-white shadow-sm mr-6" />
          <div>
            <h4 className="font-bold text-gray-900">Written by {post.author.displayName}</h4>
            <p className="text-sm text-gray-500 mt-1">Contributor and specialized researcher focusing on technology and professional lifestyle developments.</p>
          </div>
        </div>
      </article>

      <Sidebar categories={categories} />
    </div>
  );
};

export default PostPage;
