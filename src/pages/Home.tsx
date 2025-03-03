import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { projects } from '../data/projects';

export const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Code,
      title: 'Modern Tech Stack',
      description: 'Built with React, TypeScript, and Supabase for real-time capabilities.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with efficient data loading and caching.'
    },
    {
      icon: Shield,
      title: 'Secure by Design',
      description: 'Enterprise-grade security with Row Level Security and authentication.'
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Real-time updates and seamless team collaboration features.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Welcome to <span className="text-emerald-400">ToolsHelp</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            Your one-stop platform for showcasing projects, collaborating with teams,
            and building your professional portfolio.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/products"
              className="px-6 md:px-8 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 
                       transition-colors duration-200 flex items-center space-x-2 text-sm md:text-base"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            {!user && (
              <Link
                to="/register"
                className="px-6 md:px-8 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 
                             transition-colors duration-200 text-sm md:text-base"
              >
                Get Started
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold text-white text-center mb-8 md:mb-12"
          >
            Why Choose ToolsHelp?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-400/50 transition-colors"
              >
                <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-emerald-400 mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Featured Products
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.slice(0, 3).map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 flex flex-col h-full"
              >
                <div className="relative h-48 md:h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                  <span className="absolute bottom-4 left-4 px-3 py-1 bg-emerald-500 text-white text-sm rounded-full">
                    {project.category}
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-slate-300 mb-4">{project.description}</p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-slate-700 text-slate-300 text-sm rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/products/${project.id}`}
                      className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 md:py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 p-6 md:p-8 rounded-xl border border-slate-700 text-center hover:border-emerald-400/50 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">1000+</div>
              <div className="text-slate-300 text-sm md:text-base">Active Users</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800 p-6 md:p-8 rounded-xl border border-slate-700 text-center hover:border-emerald-400/50 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">5000+</div>
              <div className="text-slate-300 text-sm md:text-base">Projects Showcased</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800 p-6 md:p-8 rounded-xl border border-slate-700 text-center hover:border-emerald-400/50 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">50+</div>
              <div className="text-slate-300 text-sm md:text-base">Countries Reached</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-slate-900">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold text-white mb-6"
          >
            Ready to Showcase Your Work?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            Join our community of developers and start building your professional portfolio today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to={user ? "/products" : "/register"}
              className="inline-flex items-center space-x-2 px-6 md:px-8 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 
                       transition-colors duration-200 text-sm md:text-base"
            >
              <span>{user ? 'View Projects' : 'Get Started'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};