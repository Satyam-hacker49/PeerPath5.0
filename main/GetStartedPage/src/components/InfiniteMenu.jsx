import { useEffect, useState } from 'react';
import './InfiniteMenu.css';

export default function InfiniteMenu() {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [topSolvers, setTopSolvers] = useState([]);
  const [loading, setLoading] = useState(true);

  const reviews = [
    {
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Harsh Jain',
      year: '2nd Year',
      branch: 'CSE',
      text: 'PeerPath made it so easy to find project partners!'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'Granth Agrawal',
      year: '2nd Year',
      branch: 'ECE',
      text: 'The resources section is a goldmine.'
    },
    {
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      name: 'Sumit Sahu',
      year: '2nd Year',
      branch: 'CSE',
      text: 'Mentorship helped me ace my exams!'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      name: 'Madhav Manawat',
      year: '2nd Year',
      branch: 'CSE',
      text: 'Great for networking and learning.'
    },
    {
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      name: 'Aditya Soni',
      year: '2nd Year',
      branch: 'CSE',
      text: 'I love the community vibe!'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/33.jpg',
      name: 'Siddhant Jain',
      year: '2nd Year',
      branch: 'ECE',
      text: 'PeerPath is the best for project collaboration.'
    },
    {
      image: 'https://randomuser.me/api/portraits/women/22.jpg',
      name: 'Parth Birla',
      year: '2nd Year',
      branch: 'cse',
      text: 'Found amazing mentors here!'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/54.jpg',
      name: 'ParthSarthi Ghosh',
      year: '2nd Year',
      branch: 'EE',
      text: 'The community is super helpful.'
    },
    {
      image: 'https://randomuser.me/api/portraits/women/77.jpg',
      name: 'Shashank Agrawal',
      year: '2nd Year',
      branch: 'EE',
      text: 'PeerPath helped me grow my network.'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/29.jpg',
      name: 'Sumit Singh',
      year: '2nd Year',
      branch: 'CSE',
      text: 'Best platform for students!'
    },
  ];

  // Fetch most active users from backend
  useEffect(() => {
    const fetchMostActive = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/most-active');
        if (!response.ok) {
          throw new Error('Failed to fetch most active users');
        }
        const data = await response.json();
        setTopSolvers(data);
      } catch (error) {
        console.error('Error fetching most active users:', error);
        // Fallback to sample data if API fails
        setTopSolvers([
          {
            _id: '1',
            username: 'Alex Chen',
            profilePhoto: 'https://picsum.photos/900/900?random=1',
            activeDays: 45,
            expertise: 'Web Development'
          },
          {
            _id: '2',
            username: 'Sarah Kim',
            profilePhoto: 'https://picsum.photos/900/900?random=2',
            activeDays: 38,
            expertise: 'Data Science'
          },
          {
            _id: '3',
            username: 'Mike Johnson',
            profilePhoto: 'https://picsum.photos/900/900?random=3',
            activeDays: 32,
            expertise: 'Machine Learning'
          },
          {
            _id: '4',
            username: 'Emma Wilson',
            profilePhoto: 'https://picsum.photos/900/900?random=4',
            activeDays: 28,
            expertise: 'Mobile Development'
          },
          {
            _id: '5',
            username: 'David Lee',
            profilePhoto: 'https://picsum.photos/900/900?random=5',
            activeDays: 25,
            expertise: 'Cybersecurity'
          },
          {
            _id: '6',
            username: 'Lisa Park',
            profilePhoto: 'https://picsum.photos/900/900?random=6',
            activeDays: 22,
            expertise: 'UI/UX Design'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchMostActive();
  }, []);

  // Only auto-rotate, no mouse/touch/drag/hover/click
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.6);
    }, 24);
    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return (
      <div className="infinite-menu-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading top solvers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="infinite-menu-container" style={{ background: 'none' }}>
      <div 
        className="gallery-sphere"
        style={{ 
          transform: `rotateY(${rotation}deg)`,
          transition: 'transform 0.45s cubic-bezier(0.4,0.2,0.2,1)'
        }}
      >
        {reviews.map((review, index) => {
          const angle = (index / reviews.length) * 360;
          const radius = 300;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const z = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <div
              key={review.name}
              className={`gallery-item ${index === activeIndex ? 'active' : ''}`}
              style={{
                transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${-rotation}deg)`,
                zIndex: index === activeIndex ? 10 : 1,
                width: 'auto',
                minWidth: 240,
                maxWidth: 320,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                boxSizing: 'border-box',
                background: 'rgba(26,10,82,0.92)',
                border: '2px solid #a259ff',
                borderRadius: 18,
                padding: '1.5rem 1.2rem 1.2rem 1.2rem',
                boxShadow: '0 4px 18px #a259ff22',
                margin: '0 2.2rem',
              }}
            >
              <img
                src={review.image}
                alt={review.name}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: 16,
                  border: '3px solid #a259ff',
                  background: '#222',
                  boxShadow: '0 2px 12px #a259ff44',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, textAlign: 'center', marginBottom: 4 }}>{review.name}</div>
              <div style={{ color: '#64b5f6', fontSize: 14, marginBottom: 10, textAlign: 'center' }}>{review.year} • {review.branch}</div>
              <p style={{ color: '#fff', fontSize: 15, fontStyle: 'italic', margin: 0, textAlign: 'center' }}>
                "{review.text}"
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
} 