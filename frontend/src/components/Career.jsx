import React from 'react';

function Career() {
  const jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      location: 'Mumbai, India',
      type: 'Full-time',
      description: 'Develop and maintain web applications using React and Node.js.',
    },
    {
      id: 2,
      title: 'Graphic Designer',
      location: 'Remote',
      type: 'Part-time',
      description: 'Create visual concepts and designs for marketing materials.',
    },
    {
      id: 3,
      title: 'Sales Manager',
      location: 'Delhi, India',
      type: 'Full-time',
      description: 'Manage client relationships and oversee the sales team.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-500 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Careers at Parksons Packaging</h1>
          <p className="text-lg mt-2">Join our team and help us shape the future!</p>
        </div>
      </header>

      {/* Introduction */}
      <section className="container mx-auto p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Why Work With Us?</h2>
        <p className="text-gray-700">
          At Parksons Packaging, we value creativity, innovation, and teamwork. Our mission is to provide 
          sustainable and innovative packaging solutions. We are looking for passionate individuals to join us 
          on this journey. Explore our current openings below!
        </p>
      </section>

      {/* Job Listings */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Current Openings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-gray-600 mt-1">{job.location}</p>
              <p className="text-gray-600 mt-1">{job.type}</p>
              <p className="text-gray-700 mt-2">{job.description}</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Career;
