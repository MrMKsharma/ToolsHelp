import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserCircle, LogOut, Pencil } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const [editForm, setEditForm] = useState({
    full_name: profile?.full_name || '',
    title: profile?.title || '',
    bio: profile?.bio || '',
    website: profile?.website || ''
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-menu')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const handleEditProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...editForm,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (error) throw error;
      setIsEditing(false);
      // Refresh profile data
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="relative profile-menu">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
          <span className="text-white font-semibold">
            {profile?.full_name?.[0] || user?.email?.[0] || 'U'}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-0 mt-2 w-72 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden z-50"
          >
            {!isEditing ? (
              <div className="p-4">
                <div className="text-white font-semibold mb-2">
                  {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                </div>
                <div className="text-slate-400 text-sm mb-4">{user?.email}</div>
                {profile?.title && (
                  <div className="text-emerald-400 text-sm mb-2">{profile.title}</div>
                )}
                {profile?.bio && (
                  <div className="text-slate-300 text-sm mb-2">{profile.bio}</div>
                )}
                {profile?.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 text-sm hover:underline"
                  >
                    {profile.website}
                  </a>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-slate-700
                           text-slate-200 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            ) : (
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  className="w-full mb-2 px-3 py-2 bg-slate-700 rounded-lg
                           text-white placeholder-slate-400"
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full mb-2 px-3 py-2 bg-slate-700 rounded-lg
                           text-white placeholder-slate-400"
                />
                <textarea
                  placeholder="Bio"
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full mb-2 px-3 py-2 bg-slate-700 rounded-lg
                           text-white placeholder-slate-400"
                />
                <input
                  type="url"
                  placeholder="Website"
                  value={editForm.website}
                  onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                  className="w-full mb-2 px-3 py-2 bg-slate-700 rounded-lg
                           text-white placeholder-slate-400"
                />
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 bg-slate-700 text-slate-200
                             rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditProfile}
                    className="px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-2 px-4 py-2 text-red-400
                       hover:bg-slate-700 transition-colors border-t border-slate-700"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};