import React from "react";
import dayjs from "dayjs";

function JobCard(props) {
  const date1 = dayjs(Date.now());
  const diffInDays = date1.diff(props.postedOn, "day");

  return (
    <div className="mx-4 sm:mx-6 md:mx-30 mb-5">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 items-start md:items-center px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg hover:border-blue-500">
        {/* Left Section */}
        <div className="flex flex-col items-start gap-3 w-full">
          <h1 className="text-lg font-semibold">
            {props.title} - {props.company}
          </h1>
          <p className="text-sm sm:text-base">
            {props.type} - {props.experience} - {props.location}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {props.skills.map((skill) => (
              <p
                key={skill}
                className="text-gray-500 py-1 px-2 rounded-md border border-black text-sm"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
          <p className="text-gray-500 text-sm sm:text-base">
            Posted{" "}
            {diffInDays > 1 ? `${diffInDays} days` : `${diffInDays}  day`} Ago
          </p>
          <a href={props.job_link} className="w-full sm:w-auto">
            <button className="text-blue-500 border border-blue-500 px-6 py-2 rounded-md w-full sm:w-auto">
              Apply
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
