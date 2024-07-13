import React, { useState, useEffect } from 'react';
// import Navbar from '../navbar/navbar';
import JobCard from '../jobcard/jobcard';
import './landing.css';

const Landing = () => {
  const [jobCards, setJobCards] = useState([]);

  useEffect(() => {
    // Fetch all job cards from backend API
    fetch('http://127.0.0.1:4000/vacancy/getvacancy')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch job cards');
        }
        return response.json();
      })
      .then(data => {
        setJobCards(data); // Update job cards state with fetched data
      })
      .catch(error => {
        console.error('Error fetching job cards:', error);
      });
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div>
      <div className="job-container">
         <div>    
          <h1>Number of Job Applications which is availbale now: {jobCards.length} </h1>
          <br/>  
        </div>  
</div>
      <div className='job-container'>
        {/* Render all job cards */}
        {jobCards.map(job => (
          <JobCard
            key={job.id} // Assuming each job card has a unique ID
            title={job.position}
            description={job.description}
            location={job.availability}
            salary={"xxxx"}
          />
        ))}
      </div>
    </div>
  );
};

export default Landing;