"use client";
import { useState, useEffect } from "react";
import mockJobs from "./mockJobs.json";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobListings, setJobListings] = useState(mockJobs);
  const [missingSkills, setMissingSkills] = useState([]);

  // User-defined skills
  const userSkills = ["React", "Next.js", "JavaScript"]; // Example user skills

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/mockJobs"); // Adjust this if using a real API
        const data = await response.json();
        setJobListings(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }
    fetchJobs();
  }, []);

  const openModal = (job) => {
    setSelectedJob(job);
    checkMissingSkills(job.requiredSkills);
    setIsOpen(true);
  };

  const checkMissingSkills = (jobSkills) => {
    const missing = jobSkills.filter(skill => !userSkills.includes(skill));
    setMissingSkills(missing);
  };

  const handleApply = () => {
    alert("Submission Complete");
    setIsOpen(false);
  };

  return (
    <>
      <div className="h-20 bg-red-300 w-full flex justify-center items-center mb-24">
        <div className="h-3/4 w-4/5 flex">
          <div className="w-1/5 flex text-black justify-center gap-1 items-center">
            <h3 className="text-black text-center font-bold">JOBS ARE US</h3>
          </div>
          <div className="w-4/5 flex justify-end">
            <nav className="flex justify-center items-center gap-10">
              <h2 className="font-semibold text-black">Story</h2>
              <h2 className="font-semibold text-black">Find a Job</h2>
              <h2 className="font-semibold text-black">Find Talent</h2>
              <button className="bg-yellow-400 text-black font-medium h-10 mr-5 p-3 flex text-center justify-center items-center rounded border-1 border-black">SEARCH</button>
            </nav>
          </div>
        </div>
      </div>

      <div className="w-4/5 m-auto rounded-xl h-62 bg-red-300 flex flex-col items-center justify-center mb-16">
        <h1 className="text-center mb-8 xl:text-4xl text-white font-bold sm:text-2xl ">Find Your Dream Job Here</h1>
        <h2 className="text-center mb-8 text-xl font-medium sm:text-xl ">We help you find exciting opportunities around the world.<br /> Have the latest openings at your fingertips in your inbox</h2>
        <div className="h-12 w-4/5 flex gap-2">
          <input type="search" placeholder="JOB...?" className="w-4/5 bg-purple-300 h-full border-0 border-transparent rounded pl-3" />
          <button className="w-1/5 h-full font-semibold bg-yellow-300 border-1 rounded text-black">Search!!</button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="bg-red-300 h-fit w-full flex flex-col gap-5 pt-16 pb-16 justify-center items-center">
        {jobListings.map((job) => (
          <div
            key={job.id}
            onClick={() => openModal(job)}
            className="bg-white h-40 flex w-4/5 rounded border border-gray-300 cursor-pointer shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="w-1/5 bg-red-100 flex flex-col items-center justify-center md:w-2/5">
              <h1 className="font-semibold">{job.company}</h1>
            </div>
            <div className="w-4/5 bg-blue-200 flex md:w-3/5">
              <div className="w-full h-full bg-blue-400 flex flex-col justify-center gap-2 pl-5 text-white">
                <h2 className="text-lg font-bold">{job.title}</h2>
                <h2>{job.location}</h2>
                <h2>{job.salary}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && selectedJob && (
        <div className="fixed inset-0 flex justify-center items-center bg-purple-300 bg-opacity-20">
          <div className="bg-white w-4/5 h-96 flex flex-col justify-center p-6 rounded-lg shadow-lg ">
            <h2 className="text-xl font-bold mb-4">{selectedJob.title}</h2>
            <p className="text-gray-700"><strong>Company:</strong> {selectedJob.company}</p>
            <p className="text-gray-700"><strong>Location:</strong> {selectedJob.location}</p>
            <p className="text-gray-700"><strong>Salary Range:</strong> {selectedJob.salary}</p>
            <p className="text-gray-700"><strong>Required Skills:</strong> {selectedJob.requiredSkills.join(", ")}</p>

            {/* Missing Skills Section */}
            {missingSkills.length > 0 && (
              <div className=" flex items-center gap-10">
                <p className="text-red-500 font-bold mt-3"><strong>Missing Skills:</strong> {missingSkills.join(", ")}</p>
                <button onClick={handleApply} className="mt-4 px-4 py-2 font-normal bg-blue-200 text-white rounded w-30">
                UPSKILL
                </button>
              </div>
            )}

            {/* Buttons */}
            <div className="flex w-4/5 gap-5">
              <button onClick={() => setIsOpen(false)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-1/5 sm:text-xl">
                Close
              </button>

              <button onClick={handleApply} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-1/5">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
