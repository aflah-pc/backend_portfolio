import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { 
  FaTrash, FaEnvelopeOpen, FaEnvelope, FaPlus, FaSave, 
  FaSignOutAlt, FaHome, FaUser, FaFolderOpen, FaCertificate, 
  FaGraduationCap, FaTrophy, FaTools, FaLock, FaSpinner, FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { 
    personalInfo, skillsData, projectsData, certificationsData, 
    educationData, achievementsData, fetchData 
  } = usePortfolioData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Active Tab: 'messages' | 'profile' | 'skills' | 'projects' | 'education' | 'certifications' | 'achievements'
  const [activeTab, setActiveTab] = useState('messages');

  // Dashboard Data
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  
  // Forms & Edit states
  const [profileForm, setProfileForm] = useState({ ...personalInfo });
  const [skillsList, setSkillsList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [certificationsList, setCertificationsList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [achievementsList, setAchievementsList] = useState([]);

  // Toast notifications
  const [toast, setToast] = useState(null); // { type: 'success'|'error', text: '' }

  const showToast = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  // 1. Verify Auth
  const verifyAuth = async () => {
    try {
      const res = await fetch('/api/auth/verify');
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  // 2. Load Dashboard Data
  useEffect(() => {
    if (isAuthenticated) {
      setProfileForm({ ...personalInfo });
      // Extract skills flatly from the grouped context data
      const flatSkills = [];
      skillsData.forEach(cat => {
        cat.skills.forEach(s => {
          flatSkills.push({
            id: s.id,
            category: cat.category,
            name: s.name,
            percentage: s.percentage,
            icon: s.icon ? s.icon.type.name : '' // rough string value or empty
          });
        });
      });
      setSkillsList(flatSkills);
      setProjectsList(projectsData);
      setCertificationsList(certificationsData);
      setEducationList(educationData);
      // Extract icon name from achievements
      setAchievementsList(achievementsData.map(a => ({
        ...a,
        icon: a.icon ? a.icon.type.name : 'FaCode'
      })));
      
      loadMessages();
    }
  }, [isAuthenticated, personalInfo, skillsData, projectsData, certificationsData, educationData, achievementsData]);

  const loadMessages = async () => {
    setMessagesLoading(true);
    try {
      const res = await fetch('/api/messages');
      const json = await res.json();
      if (json.status === 'success') {
        setMessages(json.data);
      }
    } catch (err) {
      console.error('Failed to load messages', err);
    } finally {
      setMessagesLoading(false);
    }
  };

  // 3. Handle Actions
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setIsAuthenticated(true);
        showToast('Access Granted. Welcome back.', 'success');
      } else {
        setLoginError(data.message || 'Invalid username or password.');
      }
    } catch (err) {
      setLoginError('Server connection failed.');
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      navigate('/');
      showToast('Logged out successfully.', 'success');
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  // Message Actions
  const toggleMessageRead = async (id, currentStatus) => {
    const newStatus = currentStatus === 'read' ? 'unread' : 'read';
    try {
      const res = await fetch(`/api/messages/${id}/read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m));
        showToast(`Message marked as ${newStatus}`);
      }
    } catch (err) {
      showToast('Action failed', 'error');
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages(messages.filter(m => m.id !== id));
        showToast('Message deleted');
      }
    } catch (err) {
      showToast('Delete failed', 'error');
    }
  };

  // Profile Save
  const saveProfile = async () => {
    try {
      const res = await fetch('/api/portfolio/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });
      if (res.ok) {
        showToast('Profile configuration updated!');
        fetchData();
      }
    } catch (err) {
      showToast('Failed to save settings', 'error');
    }
  };

  // Generic Dynamic REST Helpers
  const addPortfolioItem = async (endpoint, payload, listSetter, currentList) => {
    try {
      const res = await fetch(`/api/portfolio/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (res.ok && json.status === 'success') {
        listSetter([...currentList, json.data]);
        showToast('Item added successfully');
        fetchData();
        return true;
      }
      return false;
    } catch (err) {
      showToast('Failed to add item', 'error');
      return false;
    }
  };

  const updatePortfolioItem = async (endpoint, id, payload) => {
    try {
      const res = await fetch(`/api/portfolio/${endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast('Item updated successfully');
        fetchData();
      }
    } catch (err) {
      showToast('Update failed', 'error');
    }
  };

  const deletePortfolioItem = async (endpoint, id, listSetter, currentList) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/portfolio/${endpoint}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        listSetter(currentList.filter(item => item.id !== id));
        showToast('Item deleted');
        fetchData();
      }
    } catch (err) {
      showToast('Delete failed', 'error');
    }
  };

  // 4. Loading States
  if (authLoading) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex flex-col justify-center items-center">
        <FaSpinner className="animate-spin text-brand-cyan mb-4" size={40} />
        <p className="text-gray-400 font-mono">Verifying credentials, establishing handshake...</p>
      </div>
    );
  }

  // 5. Unauthenticated View (Login)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex justify-center items-center p-4">
        <div className="w-full max-w-md glass-card p-8 border border-brand-cyan/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent animate-pulse" />
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-brand-cyan/10 rounded-full flex items-center justify-center text-brand-cyan border border-brand-cyan/30">
              <FaLock size={28} />
            </div>
          </div>

          <h2 className="text-2xl font-display font-bold text-center mb-2">Security Portal Access</h2>
          <p className="text-gray-400 text-sm font-mono text-center mb-8">System Admin Authorization Required</p>

          {loginError && (
            <div className="bg-red-950/30 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6 flex items-center gap-3 text-sm">
              <FaExclamationTriangle className="flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 font-mono">ADMIN_USER</label>
              <input
                type="text"
                required
                className="w-full bg-dark-bg/80 border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan font-mono"
                placeholder="root"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 font-mono">ADMIN_PASSWORD</label>
              <input
                type="password"
                required
                className="w-full bg-dark-bg/80 border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan font-mono"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full bg-brand-cyan/20 border border-brand-cyan/40 hover:bg-brand-cyan/30 hover:border-brand-cyan/60 text-brand-cyan py-4 font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {loginSubmitting ? <FaSpinner className="animate-spin" /> : 'EXECUTE AUTHORIZATION'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-white transition-colors text-sm font-mono flex items-center justify-center gap-2 mx-auto"
            >
              &larr; Return to main site
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 6. Authenticated Admin Dashboard View
  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 flex flex-col">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 border font-mono animate-bounce ${
          toast.type === 'error' 
            ? 'bg-red-950/80 border-red-500/50 text-red-300' 
            : 'bg-green-950/80 border-green-500/50 text-green-300'
        }`}>
          <FaCheckCircle className="flex-shrink-0" />
          <span>{toast.text}</span>
        </div>
      )}

      {/* Admin Navbar */}
      <header className="border-b border-dark-border glass-nav py-4 px-6 sticky top-0 z-40 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-brand-cyan/15 flex items-center justify-center text-brand-cyan border border-brand-cyan/30">
            <FaLock size={14} />
          </div>
          <h1 className="text-xl font-display font-bold text-white tracking-wide">
            HQ Dashboard <span className="text-sm font-mono text-brand-cyan">v1.0.0</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded hover:bg-gray-800 transition-all font-mono text-sm"
          >
            <FaHome /> Main Portfolio
          </button>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 rounded hover:bg-red-950/30 transition-all font-mono text-sm border border-red-950/20"
          >
            <FaSignOutAlt /> Terminate Session
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 border-r border-dark-border p-4 space-y-2 flex-shrink-0">
          <p className="text-xs font-mono font-bold text-gray-500 px-3 uppercase tracking-wider mb-2">Systems</p>
          
          <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-mono text-sm transition-all ${
              activeTab === 'messages' 
                ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/20' 
                : 'hover:bg-gray-800/50 text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <FaEnvelope /> <span>Connection Inbox</span>
            </div>
            {messages.filter(m => m.status === 'unread').length > 0 && (
              <span className="bg-brand-cyan text-dark-bg text-xs px-2 py-0.5 rounded-full font-bold">
                {messages.filter(m => m.status === 'unread').length}
              </span>
            )}
          </button>

          <p className="text-xs font-mono font-bold text-gray-500 px-3 uppercase tracking-wider pt-6 mb-2">Content Configuration</p>

          {[
            { id: 'profile', label: 'Identity Settings', icon: <FaUser /> },
            { id: 'skills', label: 'Skills Database', icon: <FaTools /> },
            { id: 'projects', label: 'Projects Registry', icon: <FaFolderOpen /> },
            { id: 'certifications', label: 'Credentials & Certs', icon: <FaCertificate /> },
            { id: 'education', label: 'Academic Records', icon: <FaGraduationCap /> },
            { id: 'achievements', label: 'Achievements', icon: <FaTrophy /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-brand-purple/15 text-brand-purple border border-brand-purple/20' 
                  : 'hover:bg-gray-800/50 text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Dashboard Panels */}
        <main className="flex-grow p-6 md:p-8 max-w-5xl overflow-y-auto">
          {/* ==================== MESSAGES PANEL ==================== */}
          {activeTab === 'messages' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Connection Inbox</h2>
                  <p className="text-sm text-gray-400">Incoming inquiries from your portfolio contact form.</p>
                </div>
                <button 
                  onClick={loadMessages}
                  className="bg-gray-800 hover:bg-gray-750 border border-dark-border text-white px-4 py-2 rounded font-mono text-sm"
                >
                  Refresh Feed
                </button>
              </div>

              {messagesLoading ? (
                <div className="py-12 flex justify-center"><FaSpinner className="animate-spin text-brand-cyan text-2xl" /></div>
              ) : messages.length === 0 ? (
                <div className="glass-card p-12 text-center border border-dashed border-dark-border text-gray-500 font-mono">
                  No active handshakes found in the connection table.
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map(msg => (
                    <div 
                      key={msg.id} 
                      className={`glass-card p-6 border transition-all ${
                        msg.status === 'unread' 
                          ? 'border-brand-cyan/35 bg-brand-cyan/5 shadow-[0_0_10px_rgba(6,182,212,0.05)]' 
                          : 'border-dark-border bg-dark-bg/40'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold text-white">{msg.name}</h3>
                            <span className="text-xs text-gray-400 font-mono">{msg.email}</span>
                          </div>
                          <p className="text-sm text-brand-cyan font-mono mt-1">Subject: {msg.subject}</p>
                        </div>
                        <div className="text-xs text-gray-500 font-mono">
                          {new Date(msg.created_at).toLocaleString()}
                        </div>
                      </div>

                      <p className="text-gray-300 bg-black/35 p-4 rounded border border-dark-border/40 whitespace-pre-wrap mb-4 font-mono text-sm">
                        {msg.message}
                      </p>

                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => toggleMessageRead(msg.id, msg.status)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono border ${
                            msg.status === 'unread' 
                              ? 'bg-brand-cyan/10 border-brand-cyan/35 text-brand-cyan hover:bg-brand-cyan/20' 
                              : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
                          }`}
                        >
                          {msg.status === 'unread' ? <FaEnvelopeOpen /> : <FaEnvelope />}
                          {msg.status === 'unread' ? 'Mark Read' : 'Mark Unread'}
                        </button>
                        <button 
                          onClick={() => deleteMessage(msg.id)}
                          className="flex items-center gap-2 bg-red-950/30 border border-red-500/20 hover:border-red-500/40 text-red-400 px-3 py-1.5 rounded text-xs font-mono"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==================== PROFILE PANEL ==================== */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Identity Settings</h2>
                  <p className="text-sm text-gray-400">Configure global metadata and coordinates displayed on the portfolio.</p>
                </div>
                <button 
                  onClick={saveProfile}
                  className="bg-brand-cyan text-dark-bg hover:bg-cyan-400 px-5 py-2.5 rounded font-mono font-bold text-sm flex items-center gap-2"
                >
                  <FaSave /> Save settings
                </button>
              </div>

              <div className="glass-card p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 font-mono mb-2">Display Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan"
                      value={profileForm.name || ''} 
                      onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 font-mono mb-2">Job Role / Subtitle</label>
                    <input 
                      type="text" 
                      className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan"
                      value={profileForm.role || ''} 
                      onChange={e => setProfileForm({ ...profileForm, role: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 font-mono mb-2">Tagline (Hero Section)</label>
                  <input 
                    type="text" 
                    className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan"
                    value={profileForm.tagline || ''} 
                    onChange={e => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 font-mono mb-2">Department</label>
                    <input 
                      type="text" 
                      className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan"
                      value={profileForm.department || ''} 
                      onChange={e => setProfileForm({ ...profileForm, department: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 font-mono mb-2">Location</label>
                    <input 
                      type="text" 
                      className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan"
                      value={profileForm.location || ''} 
                      onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 font-mono mb-2">Email Coordinate</label>
                    <input 
                      type="email" 
                      className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan"
                      value={profileForm.email || ''} 
                      onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 font-mono mb-2">Phone</label>
                    <input 
                      type="text" 
                      className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan"
                      value={profileForm.phone || ''} 
                      onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 font-mono mb-2">LinkedIn URL</label>
                    <input 
                      type="text" 
                      className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan"
                      value={profileForm.linkedin || ''} 
                      onChange={e => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 font-mono mb-2">GitHub URL</label>
                    <input 
                      type="text" 
                      className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan"
                      value={profileForm.github || ''} 
                      onChange={e => setProfileForm({ ...profileForm, github: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 font-mono mb-2">Instagram URL</label>
                    <input 
                      type="text" 
                      className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan"
                      value={profileForm.instagram || ''} 
                      onChange={e => setProfileForm({ ...profileForm, instagram: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 font-mono mb-2">Resume PDF Link or Filename</label>
                  <input 
                    type="text" 
                    className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan"
                    value={profileForm.resumeUrl || ''} 
                    onChange={e => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                    placeholder="e.g. 74e2556158bc9328aa0e5153f22a5298080b390cd75b39f7559c16a5a86f0978 (1).pdf or an external https link"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 font-mono mb-2">Mission Statement (About Section)</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan resize-none"
                    value={profileForm.mission || ''} 
                    onChange={e => setProfileForm({ ...profileForm, mission: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ==================== SKILLS PANEL ==================== */}
          {activeTab === 'skills' && (
            <SkillsManager 
              skillsList={skillsList} 
              onAdd={(payload) => addPortfolioItem('skills', payload, setSkillsList, skillsList)}
              onUpdate={(id, payload) => updatePortfolioItem('skills', id, payload)}
              onDelete={(id) => deletePortfolioItem('skills', id, setSkillsList, skillsList)}
            />
          )}

          {/* ==================== PROJECTS PANEL ==================== */}
          {activeTab === 'projects' && (
            <ProjectsManager 
              projectsList={projectsList} 
              onAdd={(payload) => addPortfolioItem('projects', payload, setProjectsList, projectsList)}
              onUpdate={(id, payload) => updatePortfolioItem('projects', id, payload)}
              onDelete={(id) => deletePortfolioItem('projects', id, setProjectsList, projectsList)}
            />
          )}

          {/* ==================== CERTIFICATIONS PANEL ==================== */}
          {activeTab === 'certifications' && (
            <CertificationsManager 
              certsList={certificationsList} 
              onAdd={(payload) => addPortfolioItem('certifications', payload, setCertificationsList, certificationsList)}
              onUpdate={(id, payload) => updatePortfolioItem('certifications', id, payload)}
              onDelete={(id) => deletePortfolioItem('certifications', id, setCertificationsList, certificationsList)}
            />
          )}

          {/* ==================== EDUCATION PANEL ==================== */}
          {activeTab === 'education' && (
            <EducationManager 
              eduList={educationList} 
              onAdd={(payload) => addPortfolioItem('education', payload, setEducationList, educationList)}
              onUpdate={(id, payload) => updatePortfolioItem('education', id, payload)}
              onDelete={(id) => deletePortfolioItem('education', id, setEducationList, educationList)}
            />
          )}

          {/* ==================== ACHIEVEMENTS PANEL ==================== */}
          {activeTab === 'achievements' && (
            <AchievementsManager 
              achList={achievementsList} 
              onAdd={(payload) => addPortfolioItem('achievements', payload, setAchievementsList, achievementsList)}
              onUpdate={(id, payload) => updatePortfolioItem('achievements', id, payload)}
              onDelete={(id) => deletePortfolioItem('achievements', id, setAchievementsList, achievementsList)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

/* ==========================================================================
   SUB-MANAGEMENT COMPONENTS
   ========================================================================== */

const SkillsManager = ({ skillsList, onAdd, onUpdate, onDelete }) => {
  const [form, setForm] = useState({ category: 'Cyber Security', name: '', percentage: 80, icon: '' });

  const categories = ['Cyber Security', 'Programming', 'Web Technologies', 'Tools & OS'];
  const iconOptions = [
    { label: 'Shield (Cyber Sec)', val: 'FaShieldAlt' },
    { label: 'Code (General)', val: 'FaCode' },
    { label: 'React (Web)', val: 'FaReact' },
    { label: 'Bug (Tools)', val: 'FaBug' },
    { label: 'JS', val: 'FaJsSquare' },
    { label: 'Python', val: 'FaPython' },
    { label: 'C', val: 'SiC' },
    { label: 'Bash', val: 'SiGnubash' },
    { label: 'Tailwind', val: 'SiTailwindcss' },
    { label: 'HTML', val: 'FaHtml5' },
    { label: 'CSS', val: 'FaCss3Alt' },
    { label: 'Node', val: 'FaNodeJs' },
    { label: 'Wireshark', val: 'SiWireshark' },
    { label: 'Metasploit', val: 'SiMetasploit' },
    { label: 'Kali Linux', val: 'SiKalilinux' },
    { label: 'GitHub', val: 'FaGithub' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onAdd(form);
    if (success) {
      setForm({ category: 'Cyber Security', name: '', percentage: 80, icon: '' });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Skills Database</h2>
      
      {/* Add Skill Form */}
      <div className="glass-card p-6 mb-8 border-brand-purple/20">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FaPlus /> Registry New Skill
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-xs text-gray-400 font-mono mb-2">Category</label>
            <select 
              className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white font-mono"
              value={form.category} 
              onChange={e => setForm({ ...form, category: e.target.value })}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-mono mb-2">Skill Name</label>
            <input 
              type="text" required
              className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white"
              placeholder="e.g. Reverse Engineering"
              value={form.name} 
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-mono mb-2">Percentage ({form.percentage}%)</label>
            <input 
              type="range" min="0" max="100"
              className="w-full h-2 bg-dark-bg border border-dark-border rounded-lg appearance-none cursor-pointer"
              value={form.percentage} 
              onChange={e => setForm({ ...form, percentage: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-mono mb-2">Icon Representation</label>
            <select 
              className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white font-mono"
              value={form.icon} 
              onChange={e => setForm({ ...form, icon: e.target.value })}
            >
              <option value="">None</option>
              {iconOptions.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
            </select>
          </div>
          <button 
            type="submit"
            className="bg-brand-purple text-white hover:bg-purple-600 px-4 py-2.5 rounded font-mono font-bold flex items-center justify-center gap-2"
          >
            Create
          </button>
        </form>
      </div>

      {/* Skills List */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-6">Registered Skill Vectors</h3>
        <div className="space-y-4">
          {skillsList.map(skill => (
            <div key={skill.id} className="flex flex-col md:flex-row items-center gap-4 justify-between border-b border-dark-border/50 pb-4">
              <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 items-center w-full">
                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded w-fit font-mono">{skill.category}</span>
                <input 
                  type="text" 
                  className="bg-transparent border-b border-transparent hover:border-brand-cyan focus:border-brand-cyan text-white font-medium focus:outline-none"
                  value={skill.name}
                  onChange={e => {
                    const updatedName = e.target.value;
                    skillsList.forEach(s => { if(s.id === skill.id) s.name = updatedName; });
                  }}
                  onBlur={() => onUpdate(skill.id, { name: skill.name })}
                />
                <div className="flex items-center gap-2">
                  <input 
                    type="range" min="0" max="100"
                    className="w-24 h-1.5 bg-dark-bg border border-dark-border rounded-lg appearance-none cursor-pointer"
                    value={skill.percentage}
                    onChange={e => {
                      const updatedPerc = parseInt(e.target.value);
                      skillsList.forEach(s => { if(s.id === skill.id) s.percentage = updatedPerc; });
                      // Instant local sync then updates db on release/blur
                      onUpdate(skill.id, { percentage: updatedPerc });
                    }}
                  />
                  <span className="text-xs font-mono text-gray-400">{skill.percentage}%</span>
                </div>
                <select 
                  className="bg-transparent text-sm border-b border-transparent focus:border-brand-cyan text-gray-400 focus:outline-none font-mono"
                  value={skill.icon || ''}
                  onChange={e => {
                    const updatedIcon = e.target.value;
                    skillsList.forEach(s => { if(s.id === skill.id) s.icon = updatedIcon; });
                    onUpdate(skill.id, { icon: updatedIcon });
                  }}
                >
                  <option value="">None</option>
                  {iconOptions.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
                </select>
              </div>
              <button 
                onClick={() => onDelete(skill.id)}
                className="text-red-400 hover:text-red-300 p-2"
              >
                <FaTrash size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectsManager = ({ projectsList, onAdd, onUpdate, onDelete }) => {
  const [form, setForm] = useState({ title: '', description: '', technologies: '', image: '', github: '#', liveDemo: '#' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onAdd(form);
    if (success) {
      setForm({ title: '', description: '', technologies: '', image: '', github: '#', liveDemo: '#' });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Projects Registry</h2>

      {/* Add Project */}
      <div className="glass-card p-6 mb-8 border-brand-purple/20">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FaPlus /> Register New Project
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-2">Project Title</label>
              <input 
                type="text" required
                className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white"
                placeholder="e.g. Malware Sandbox"
                value={form.title} 
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-2">Tech Stack (comma separated)</label>
              <input 
                type="text" required
                className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white font-mono"
                placeholder="Python, C, Vagrant"
                value={form.technologies} 
                onChange={e => setForm({ ...form, technologies: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-mono mb-2">Description</label>
            <textarea 
              required rows={3}
              className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white resize-none"
              placeholder="Core features, architecture overview..."
              value={form.description} 
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-2">Image Link/Asset Name</label>
              <input 
                type="text"
                className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white font-mono"
                placeholder="https://unsplash... or secure_login.png"
                value={form.image} 
                onChange={e => setForm({ ...form, image: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-2">GitHub URL</label>
              <input 
                type="text"
                className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white font-mono"
                value={form.github} 
                onChange={e => setForm({ ...form, github: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-2">Live Demo URL</label>
              <input 
                type="text"
                className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white font-mono"
                value={form.liveDemo} 
                onChange={e => setForm({ ...form, liveDemo: e.target.value })}
              />
            </div>
          </div>
          <button 
            type="submit"
            className="bg-brand-purple text-white hover:bg-purple-600 px-5 py-2.5 rounded font-mono font-bold flex items-center gap-2"
          >
            Create Registry
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projectsList.map(proj => (
          <div key={proj.id} className="glass-card p-6 border border-dark-border relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={() => onUpdate(proj.id, proj)}
                className="text-brand-cyan hover:text-cyan-400 p-2"
                title="Save updates"
              >
                <FaSave size={16} />
              </button>
              <button 
                onClick={() => onDelete(proj.id)}
                className="text-red-400 hover:text-red-300 p-2"
                title="Delete project"
              >
                <FaTrash size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 font-mono mb-1">Project Title</label>
                <input 
                  type="text" 
                  className="bg-transparent border-b border-dark-border/40 focus:border-brand-cyan text-white font-bold text-lg w-full focus:outline-none"
                  value={proj.title}
                  onChange={e => {
                    const val = e.target.value;
                    projectsList.forEach(p => { if (p.id === proj.id) p.title = val; });
                  }}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-mono mb-1">Stack (comma separated)</label>
                <input 
                  type="text" 
                  className="bg-transparent border-b border-dark-border/40 focus:border-brand-cyan text-brand-cyan font-mono text-sm w-full focus:outline-none"
                  value={proj.technologies}
                  onChange={e => {
                    const val = e.target.value;
                    projectsList.forEach(p => { if (p.id === proj.id) p.technologies = val; });
                  }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs text-gray-500 font-mono mb-1">Description</label>
              <textarea 
                rows={2}
                className="w-full bg-dark-bg/40 border border-dark-border/60 rounded p-2 text-gray-300 text-sm resize-none focus:outline-none focus:border-brand-cyan"
                value={proj.description}
                onChange={e => {
                  const val = e.target.value;
                  projectsList.forEach(p => { if (p.id === proj.id) p.description = val; });
                }}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 font-mono mb-1">Image Link</label>
                <input 
                  type="text" 
                  className="bg-transparent border-b border-dark-border/40 focus:border-brand-cyan text-gray-400 font-mono text-xs w-full focus:outline-none"
                  value={proj.image}
                  onChange={e => {
                    const val = e.target.value;
                    projectsList.forEach(p => { if (p.id === proj.id) p.image = val; });
                  }}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-mono mb-1">GitHub Repo</label>
                <input 
                  type="text" 
                  className="bg-transparent border-b border-dark-border/40 focus:border-brand-cyan text-gray-400 font-mono text-xs w-full focus:outline-none"
                  value={proj.github}
                  onChange={e => {
                    const val = e.target.value;
                    projectsList.forEach(p => { if (p.id === proj.id) p.github = val; });
                  }}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-mono mb-1">Live URL</label>
                <input 
                  type="text" 
                  className="bg-transparent border-b border-dark-border/40 focus:border-brand-cyan text-gray-400 font-mono text-xs w-full focus:outline-none"
                  value={proj.liveDemo}
                  onChange={e => {
                    const val = e.target.value;
                    projectsList.forEach(p => { if (p.id === proj.id) p.liveDemo = val; });
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CertificationsManager = ({ certsList, onAdd, onUpdate, onDelete }) => {
  const [form, setForm] = useState({ title: '', issuer: '', date: '', status: 'Completed', link: '#' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onAdd(form);
    if (success) {
      setForm({ title: '', issuer: '', date: '', status: 'Completed', link: '#' });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Credentials & Certifications</h2>

      {/* Add Credential */}
      <div className="glass-card p-6 mb-8 border-brand-purple/20">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FaPlus /> Register New Certification
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-xs text-gray-400 font-mono mb-2">Certification Title</label>
            <input 
              type="text" required
              className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white"
              placeholder="e.g. OSCP"
              value={form.title} 
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-mono mb-2">Issuing Authority</label>
            <input 
              type="text" required
              className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white"
              placeholder="Offensive Security"
              value={form.issuer} 
              onChange={e => setForm({ ...form, issuer: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-mono mb-2">Date / Anticipated</label>
            <input 
              type="text" required
              className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white font-mono"
              placeholder="Dec 2026"
              value={form.date} 
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-mono mb-2">Status</label>
            <select 
              className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white font-mono"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Learning">Learning</option>
            </select>
          </div>
          <button 
            type="submit"
            className="bg-brand-purple text-white hover:bg-purple-600 px-4 py-2.5 rounded font-mono font-bold flex items-center justify-center gap-2"
          >
            Add Record
          </button>
        </form>
      </div>

      {/* Certifications List */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-6">Registered Credentials</h3>
        <div className="space-y-6">
          {certsList.map(cert => (
            <div key={cert.id} className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-dark-border/50 pb-4">
              <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                <div>
                  <label className="block text-xs text-gray-500 font-mono mb-1">Title</label>
                  <input 
                    type="text" 
                    className="bg-transparent border-b border-transparent hover:border-brand-cyan focus:border-brand-cyan text-white font-bold w-full focus:outline-none"
                    value={cert.title}
                    onChange={e => {
                      const val = e.target.value;
                      certsList.forEach(c => { if(c.id === cert.id) c.title = val; });
                    }}
                    onBlur={() => onUpdate(cert.id, { title: cert.title })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-mono mb-1">Issuer</label>
                  <input 
                    type="text" 
                    className="bg-transparent border-b border-transparent hover:border-brand-cyan focus:border-brand-cyan text-gray-300 w-full focus:outline-none"
                    value={cert.issuer}
                    onChange={e => {
                      const val = e.target.value;
                      certsList.forEach(c => { if(c.id === cert.id) c.issuer = val; });
                    }}
                    onBlur={() => onUpdate(cert.id, { issuer: cert.issuer })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-mono mb-1">Date</label>
                  <input 
                    type="text" 
                    className="bg-transparent border-b border-transparent hover:border-brand-cyan focus:border-brand-cyan text-gray-400 font-mono w-full focus:outline-none"
                    value={cert.date}
                    onChange={e => {
                      const val = e.target.value;
                      certsList.forEach(c => { if(c.id === cert.id) c.date = val; });
                    }}
                    onBlur={() => onUpdate(cert.id, { date: cert.date })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-mono mb-1">Status</label>
                  <select 
                    className="bg-transparent border-b border-transparent focus:border-brand-cyan text-brand-cyan font-mono focus:outline-none"
                    value={cert.status}
                    onChange={e => {
                      const val = e.target.value;
                      certsList.forEach(c => { if(c.id === cert.id) c.status = val; });
                      onUpdate(cert.id, { status: val });
                    }}
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Learning">Learning</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={() => onDelete(cert.id)}
                className="text-red-400 hover:text-red-300 p-2"
              >
                <FaTrash size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EducationManager = ({ eduList, onAdd, onUpdate, onDelete }) => {
  const [form, setForm] = useState({ degree: '', institution: '', year: '', cgpa: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onAdd(form);
    if (success) {
      setForm({ degree: '', institution: '', year: '', cgpa: '', description: '' });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Academic Records</h2>

      {/* Add Academic Item */}
      <div className="glass-card p-6 mb-8 border-brand-purple/20">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FaPlus /> Register Academic History
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-2">Degree / Qualification</label>
              <input 
                type="text" required
                className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white"
                placeholder="Bachelor in Cyber Security"
                value={form.degree} 
                onChange={e => setForm({ ...form, degree: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-2">Institution / School</label>
              <input 
                type="text" required
                className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white"
                placeholder="University Name"
                value={form.institution} 
                onChange={e => setForm({ ...form, institution: e.target.value })}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-2">Timeline</label>
              <input 
                type="text" required
                className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white font-mono"
                placeholder="2023 - 2027"
                value={form.year} 
                onChange={e => setForm({ ...form, year: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-2">CGPA / Percentage</label>
              <input 
                type="text" required
                className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white font-mono"
                placeholder="8.9 CGPA"
                value={form.cgpa} 
                onChange={e => setForm({ ...form, cgpa: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-mono mb-2">Description / Major Focus</label>
            <textarea 
              rows={2}
              className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white resize-none"
              placeholder="Core focus details, relevant coursework..."
              value={form.description} 
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <button 
            type="submit"
            className="bg-brand-purple text-white hover:bg-purple-600 px-5 py-2.5 rounded font-mono font-bold flex items-center gap-2"
          >
            Register Entry
          </button>
        </form>
      </div>

      {/* Education List */}
      <div className="space-y-6">
        {eduList.map(edu => (
          <div key={edu.id} className="glass-card p-6 border border-dark-border relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={() => onUpdate(edu.id, edu)}
                className="text-brand-cyan hover:text-cyan-400 p-2"
              >
                <FaSave size={16} />
              </button>
              <button 
                onClick={() => onDelete(edu.id)}
                className="text-red-400 hover:text-red-300 p-2"
              >
                <FaTrash size={14} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 font-mono mb-1">Degree</label>
                <input 
                  type="text" 
                  className="bg-transparent border-b border-dark-border/40 focus:border-brand-cyan text-white font-bold w-full focus:outline-none"
                  value={edu.degree}
                  onChange={e => {
                    const val = e.target.value;
                    eduList.forEach(x => { if (x.id === edu.id) x.degree = val; });
                  }}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-mono mb-1">Institution</label>
                <input 
                  type="text" 
                  className="bg-transparent border-b border-dark-border/40 focus:border-brand-cyan text-gray-300 w-full focus:outline-none"
                  value={edu.institution}
                  onChange={e => {
                    const val = e.target.value;
                    eduList.forEach(x => { if (x.id === edu.id) x.institution = val; });
                  }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 font-mono mb-1">Year</label>
                <input 
                  type="text" 
                  className="bg-transparent border-b border-dark-border/40 focus:border-brand-cyan text-gray-400 font-mono w-full focus:outline-none"
                  value={edu.year}
                  onChange={e => {
                    const val = e.target.value;
                    eduList.forEach(x => { if (x.id === edu.id) x.year = val; });
                  }}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-mono mb-1">CGPA / Grade</label>
                <input 
                  type="text" 
                  className="bg-transparent border-b border-dark-border/40 focus:border-brand-cyan text-brand-purple font-mono w-full focus:outline-none"
                  value={edu.cgpa}
                  onChange={e => {
                    const val = e.target.value;
                    eduList.forEach(x => { if (x.id === edu.id) x.cgpa = val; });
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 font-mono mb-1">Description</label>
              <textarea 
                rows={2}
                className="w-full bg-dark-bg/40 border border-dark-border/60 rounded p-2 text-gray-300 text-sm resize-none focus:outline-none focus:border-brand-cyan"
                value={edu.description}
                onChange={e => {
                  const val = e.target.value;
                  eduList.forEach(x => { if (x.id === edu.id) x.description = val; });
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AchievementsManager = ({ achList, onAdd, onUpdate, onDelete }) => {
  const [form, setForm] = useState({ title: '', description: '', icon: 'FaCode' });

  const iconOptions = [
    { label: 'Code', val: 'FaCode' },
    { label: 'Lock', val: 'FaLock' },
    { label: 'Search', val: 'FaSearch' },
    { label: 'Network', val: 'FaNetworkWired' },
    { label: 'Shield', val: 'FaShieldAlt' },
    { label: 'Bug', val: 'FaBug' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onAdd(form);
    if (success) {
      setForm({ title: '', description: '', icon: 'FaCode' });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Achievements Registry</h2>

      {/* Add Achievement */}
      <div className="glass-card p-6 mb-8 border-brand-purple/20">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FaPlus /> Registry New Achievement
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-2">Title</label>
              <input 
                type="text" required
                className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white"
                placeholder="CTF top rank"
                value={form.title} 
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-2">Icon representation</label>
              <select 
                className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white font-mono"
                value={form.icon}
                onChange={e => setForm({ ...form, icon: e.target.value })}
              >
                {iconOptions.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-mono mb-2">Description</label>
            <textarea 
              required rows={2}
              className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white resize-none"
              placeholder="Provide context about what you achieved..."
              value={form.description} 
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <button 
            type="submit"
            className="bg-brand-purple text-white hover:bg-purple-600 px-5 py-2.5 rounded font-mono font-bold flex items-center gap-2"
          >
            Create
          </button>
        </form>
      </div>

      {/* Achievements List */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-6">Registered Achievements</h3>
        <div className="space-y-6">
          {achList.map(ach => (
            <div key={ach.id} className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-dark-border/50 pb-4">
              <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div>
                  <label className="block text-xs text-gray-500 font-mono mb-1">Title</label>
                  <input 
                    type="text" 
                    className="bg-transparent border-b border-transparent hover:border-brand-cyan focus:border-brand-cyan text-white font-bold w-full focus:outline-none"
                    value={ach.title}
                    onChange={e => {
                      const val = e.target.value;
                      achList.forEach(x => { if(x.id === ach.id) x.title = val; });
                    }}
                    onBlur={() => onUpdate(ach.id, { title: ach.title })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-mono mb-1">Description</label>
                  <input 
                    type="text" 
                    className="bg-transparent border-b border-transparent hover:border-brand-cyan focus:border-brand-cyan text-gray-300 w-full focus:outline-none"
                    value={ach.description}
                    onChange={e => {
                      const val = e.target.value;
                      achList.forEach(x => { if(x.id === ach.id) x.description = val; });
                    }}
                    onBlur={() => onUpdate(ach.id, { description: ach.description })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-mono mb-1">Icon Represent</label>
                  <select 
                    className="bg-transparent border-b border-transparent focus:border-brand-cyan text-brand-cyan font-mono focus:outline-none"
                    value={ach.icon || ''}
                    onChange={e => {
                      const val = e.target.value;
                      achList.forEach(x => { if(x.id === ach.id) x.icon = val; });
                      onUpdate(ach.id, { icon: val });
                    }}
                  >
                    {iconOptions.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
                  </select>
                </div>
              </div>
              <button 
                onClick={() => onDelete(ach.id)}
                className="text-red-400 hover:text-red-300 p-2"
              >
                <FaTrash size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
