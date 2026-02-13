
import React from 'react';
import { BloggerPost } from '../types';
import { extractFirstImage, extractExcerpt } from '../services/bloggerService';

interface PostCardProps {
  post: BloggerPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const imageUrl = post.images?.[0]?.url || extractFirstImage(post.content) || `https://picsum.photos/seed/${post.id}/600/400`;
  const date = new Date(post.published).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group h-full flex flex-col">
      <a href={`#/post/${post.id}`} className="block relative overflow-hidden h-48 md:h-56">
        <img 
          src={imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {post.labels && post.labels.length > 0 && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            {post.labels[0]}
          </span>
        )}
      </a>
      
      <div className="p-5 flex-grow flex flex-col">
        <p className="text-gray-400 text-xs mb-2 font-medium">{date}</p>
        <h3 className="text-lg font-bold leading-tight mb-3 group-hover:text-blue-600 transition-colors">
          <a href={`#/post/${post.id}`}>{post.title}</a>
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
          {extractExcerpt(post.content, 120)}
        </p>
        <a 
          href={`#/post/${post.id}`} 
          className="text-blue-600 font-semibold text-sm hover:underline inline-flex items-center"
        >
          Read Article
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </article>
  );
};

export default PostCard;
