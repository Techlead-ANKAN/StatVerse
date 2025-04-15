import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';
import './Dashboard.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

function Dashboard() {
  const { user } = useUser();

  const [platformUsernames, setPlatformUsernames] = useState({
    LeetCode_Username: '',
    Geeks4Geeks_Username: '',
    CodeChef_Username: ''
  });

  const [leetcode, setLeetcode] = useState({});
  const [gfg, setGfg] = useState({});
  const [codechef, setCodechef] = useState({});

  useEffect(() => {
    if (user?.id) {
      const fetchUserData = async () => {
        const { data, error } = await supabase
          .from('Users')
          .select('*')
          .eq('UserID', user.id)
          .single();

        if (data) {
          const updatedUsernames = {
            LeetCode_Username: data.LeetCode_Username || '',
            Geeks4Geeks_Username: data.Geeks4Geeks_Username || '',
            CodeChef_Username: data.CodeChef_Username || ''
          };
          setPlatformUsernames(updatedUsernames);

          if (updatedUsernames.LeetCode_Username) {
            fetchLeetCodeDetails(updatedUsernames.LeetCode_Username);
          }
          if (updatedUsernames.Geeks4Geeks_Username) {
            fetchGFGDetails(updatedUsernames.Geeks4Geeks_Username);
          }
          if (updatedUsernames.CodeChef_Username) {
            fetchCodeChefDetails(updatedUsernames.CodeChef_Username);
          }
        }

        if (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handlePlatformChange = (platform, value) => {
    setPlatformUsernames(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handlePlatformSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('Users')
        .update(platformUsernames)
        .eq('UserID', user.id);

      if (error) throw error;

      if (platformUsernames.LeetCode_Username) {
        fetchLeetCodeDetails(platformUsernames.LeetCode_Username);
      }
      if (platformUsernames.Geeks4Geeks_Username) {
        fetchGFGDetails(platformUsernames.Geeks4Geeks_Username);
      }
      if (platformUsernames.CodeChef_Username) {
        fetchCodeChefDetails(platformUsernames.CodeChef_Username);
      }

    } catch (error) {
      console.error('Error saving platforms:', error);
    }
  };

  const fetchLeetCodeDetails = async (username) => {
    try {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
      const data = await response.json();
      setLeetcode(data);
      console.log('LeetCode User Details:', data);
    } catch (error) {
      console.error("Error fetching LeetCode user details: ", error);
    }
  };

  const fetchGFGDetails = async (username) => {
    try {
      const response = await fetch(`https://geeks-for-geeks-stats-api.vercel.app/?raw=Y&userName=${username}`);
      const data = await response.json();
      setGfg(data);
      console.log('GFG User Details:', data);
    } catch (error) {
      console.error("Error fetching GFG user details: ", error);
    }
  };

  const fetchCodeChefDetails = async (username) => {
    try {
      const response = await fetch(`https://codechef-api.vercel.app/handle/${username}`);
      const data = await response.json();
      setCodechef(data);
      console.log('CodeChef User Details:', data);
    } catch (error) {
      console.error("Error fetching CodeChef user details: ", error);
    }
  };

  

  return (
    <div className="dashboard-container">
      <section className="connect-section">
        <div className="content-wrapper">
          <h2 className="section-title">Coding Profiles Integration</h2>
          <p className="section-subtitle">Connect your coding platforms to track your progress</p>

          <form onSubmit={handlePlatformSubmit} className="integration-form">
            <div className="platform-grid">
              {[
                { name: 'LeetCode_Username', label: 'LeetCode', icon: '💡' },
                { name: 'Geeks4Geeks_Username', label: 'GeeksforGeeks', icon: '📚' },
                { name: 'CodeChef_Username', label: 'CodeChef', icon: '🍁' },
              ].map((platform) => (
                <div key={platform.name} className="input-card">
                  <div className="platform-header">
                    <span className="platform-icon">{platform.icon}</span>
                    <h3 className="platform-name">{platform.label}</h3>
                  </div>
                  <input
                    type="text"
                    placeholder={`Enter ${platform.label} username`}
                    value={platformUsernames[platform.name]}
                    onChange={(e) => handlePlatformChange(platform.name, e.target.value)}
                    className="platform-input"
                  />
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">
                Update Profiles
              </button>
              <p className="form-note">Changes will be saved on button click</p>
            </div>
          </form>


        </div>
      </section>
      {(leetcode.totalSolved || gfg.totalProblemsSolved || codechef.rating) && (
        <div className="coding-stats-wrapper">
          <h2 className="section-title">Your Coding Stats</h2>
          <div className="stats-grid">

            {/* LeetCode Stats */}
            {leetcode.totalSolved && (
              <div className="stat-card fade-in">
                <h3 className="stat-platform">💡 LeetCode</h3>
                <p><strong>Total Solved:</strong> {leetcode.totalSolved}</p>
                <p><strong>Easy:</strong> {leetcode.easySolved} / {leetcode.totalEasy}</p>
                <p><strong>Medium:</strong> {leetcode.mediumSolved} / {leetcode.totalMedium}</p>
                <p><strong>Hard:</strong> {leetcode.hardSolved} / {leetcode.totalHard}</p>
                <p><strong>Ranking:</strong> {leetcode.ranking}</p>
              </div>
            )}

            {/* GeeksforGeeks Stats */}
            {gfg.totalProblemsSolved && (
              <div className="stat-card fade-in delay-1">
                <h3 className="stat-platform">📚 GeeksforGeeks</h3>
                <p><strong>Total Solved:</strong> {gfg.totalProblemsSolved}</p>
                <p><strong>Easy:</strong> {gfg.Easy}</p>
                <p><strong>Medium:</strong> {gfg.Medium}</p>
                <p><strong>Hard:</strong> {gfg.Hard}</p>
                <p><strong>Basic:</strong> {gfg.basic}</p>
              </div>
            )}

            {/* CodeChef Stats */}
            {codechef.rating && (
              <div className="stat-card fade-in delay-2">
                <h3 className="stat-platform">🍁 CodeChef</h3>
                <p><strong>Rating:</strong> {codechef.rating}</p>
                <p><strong>Stars:</strong> {codechef.stars}</p>
                <p><strong>Global Rank:</strong> {codechef.globalRank}</p>
                <p><strong>Country Rank:</strong> {codechef.countryRank}</p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
