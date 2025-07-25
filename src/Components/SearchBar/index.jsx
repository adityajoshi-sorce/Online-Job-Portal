import React, { useState } from "react";

function SearchBar({ fetchJobsCustom }) {
  const [jobCriteria, setJobCriteria] = useState({
    title: "",
    location: "",
    experience: "",
    type: "",
  });

  const handleChange = (e) => {
    setJobCriteria((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const search = async () => {
    await fetchJobsCustom(jobCriteria);
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-4 gap-3 my-10 justify-center px-4 md:px-10 items-center">
      <select
        onChange={handleChange}
        name="title"
        value={jobCriteria.title}
        className="w-full md:w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled hidden selected>
          Job Role
        </option>
        <option value="ios Developer">iOS Developer</option>
        <option value="FrontEnd Developer">FrontEnd Developer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="Android Developer">Android Developer</option>
        <option value="AWS Developer">AWS Developer</option>
      </select>

      <select
        onChange={handleChange}
        name="type"
        value={jobCriteria.type}
        className="w-full md:w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled hidden selected>
          Job Type
        </option>
        <option value="Full Time">Full Time</option>
        <option value="Part Time">Part Time</option>
        <option value="Contract">Contract</option>
      </select>

      <select
        onChange={handleChange}
        name="location"
        value={jobCriteria.location}
        className="w-full md:w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled hidden selected>
          Location
        </option>
        <option value="Office">Office</option>
        <option value="Work From Home">Work From Home</option>
        <option value="Remote">Remote</option>
      </select>

      <select
        onChange={handleChange}
        name="experience"
        value={jobCriteria.experience}
        className="w-full md:w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled hidden selected>
          Experience
        </option>
        <option value="Fresher">Fresher</option>
        <option value="Junior">Junior</option>
        <option value="Mid Level">Mid Level</option>
        <option value="Senior">Senior</option>
      </select>

      <button
        onClick={search}
        className="w-full md:w-64 bg-blue-500 text-white font-bold py-3 rounded-md cursor-pointer"
      >
        Select
      </button>
    </div>
  );
}

export default SearchBar;
