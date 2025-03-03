import React from 'react';
import { motion } from 'framer-motion';
import { Code, Users, Globe, Coffee } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            We're passionate about creating innovative solutions that make a difference
            in people's lives and businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 p-8 rounded-xl border border-slate-700"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-slate-300">
              To develop intuitive and powerful tools that solve real-world problems,
              making life easier for individuals and businesses alike. We believe in
              creating solutions that are not just functional, but also beautiful and
              enjoyable to use.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 p-8 rounded-xl border border-slate-700"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-slate-300">
              To be the leading provider of innovative digital solutions, recognized
              globally for our commitment to excellence, user experience, and
              continuous innovation in solving complex challenges.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center"
            >
              <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 p-8 rounded-xl border border-slate-700"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-emerald-400 mb-2">{member.role}</p>
                <p className="text-slate-300">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const stats = [
  { icon: Code, value: '15+', label: 'Projects Completed' },
  { icon: Users, value: '1000+', label: 'Happy Users' },
  { icon: Globe, value: '10+', label: 'Countries Reached' },
  { icon: Coffee, value: '∞', label: 'Cups of Coffee' },
];

const team = [
  {
    name: 'Manish Sharma',
    role: 'Lead Developer',
    bio: 'Full-stack developer with 8+ years of experience in building scalable applications.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Himanshu Bhargava',
    role: 'UI/UX Designer',
    bio: 'Passionate about creating beautiful and intuitive user experiences.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  }
];