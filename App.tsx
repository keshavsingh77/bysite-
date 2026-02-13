
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { fetchBlogInfo, fetchPosts } from './services/bloggerService';
import { BloggerBlog, PageType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';
import StandardPage from './pages/StandardPage';

const AppContent: React.FC = () => {
  const [blogInfo, setBlogInfo] = useState<BloggerBlog | undefined>(undefined);
  const [categories, setCategories] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const initApp = async () => {
      try {
        const info = await fetchBlogInfo();
        setBlogInfo(info);

        // Fetch initial posts to extract labels/categories
        const postData = await fetchPosts();
        const allLabels = new Set<string>();
        postData.items?.forEach(post => {
          post.labels?.forEach(label => allLabels.add(label));
        });
        setCategories(Array.from(allLabels));
      } catch (error) {
        console.error("Initialization failed", error);
      }
    };
    initApp();
  }, []);

  // Update document title for SEO
  useEffect(() => {
    if (blogInfo) {
      document.title = `${blogInfo.name} - Professional CMS Blog`;
    }
  }, [blogInfo, location]);

  const getPostIdFromHash = () => {
    const hash = window.location.hash;
    const match = hash.match(/#\/post\/(.+)/);
    return match ? match[1] : '';
  };

  const getLabelFromHash = () => {
    const hash = window.location.hash;
    const match = hash.match(/#\/category\/(.+)/);
    return match ? decodeURIComponent(match[1]) : '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header blogInfo={blogInfo} categories={categories} />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <Routes>
          <Route path="/" element={<Home blogInfo={blogInfo} categories={categories} />} />
          <Route path="/about" element={<StandardPage type={PageType.ABOUT} />} />
          <Route path="/contact" element={<StandardPage type={PageType.CONTACT} />} />
          <Route path="/privacy" element={<StandardPage type={PageType.PRIVACY} />} />
          <Route path="/disclaimer" element={<StandardPage type={PageType.DISCLAIMER} />} />
          <Route path="/terms" element={<StandardPage type={PageType.TERMS} />} />
          
          {/* Post and Category routes manually handled via dynamic checks if needed, but standard routing is preferred */}
          <Route path="/post/:id" element={<PostRoute categories={categories} />} />
          <Route path="/category/:label" element={<CategoryRoute categories={categories} />} />
          
          <Route path="*" element={<Home blogInfo={blogInfo} categories={categories} />} />
        </Routes>
      </main>

      <Footer blogInfo={blogInfo} />
    </div>
  );
};

// Helper wrappers to handle params without using complex hooks if needed
const PostRoute = ({ categories }: { categories: string[] }) => {
  const hash = window.location.hash;
  const id = hash.split('/').pop() || '';
  return <PostPage postId={id} categories={categories} />;
};

const CategoryRoute = ({ categories }: { categories: string[] }) => {
  const hash = window.location.hash;
  const label = decodeURIComponent(hash.split('/').pop() || '');
  return <CategoryPage label={label} categories={categories} />;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
