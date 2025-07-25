import Navbar from "./Components/Navbar";
import Header from "./Components/Header/header";
import SearchBar from "./Components/SearchBar";
import JobCard from "./Components/Job Card";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  startAfter,
  limit,
  where,
} from "firebase/firestore";
import { db } from "./firebase.config";

const JOBS_PER_PAGE = 5;
const MAX_VISIBLE_PAGES = 5;

function App() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [snapshots, setSnapshots] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [customSearch, setCustomSearch] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTotalJobsCount = async () => {
    const snapshot = await getDocs(collection(db, "jobs"));
    const total = snapshot.size;
    setTotalPages(Math.ceil(total / JOBS_PER_PAGE));
  };

  const fetchJobs = async (pageNumber = 0) => {
    setCustomSearch(false);
    let jobQuery = query(
      collection(db, "jobs"),
      orderBy("postedOn", "desc"),
      limit(JOBS_PER_PAGE)
    );

    if (pageNumber > 0 && snapshots[pageNumber - 1]) {
      jobQuery = query(
        collection(db, "jobs"),
        orderBy("postedOn", "desc"),
        startAfter(snapshots[pageNumber - 1]),
        limit(JOBS_PER_PAGE)
      );
    }

    const snapshot = await getDocs(jobQuery);
    const tempJobs = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      postedOn: doc.data().postedOn.toDate(),
    }));

    const newSnapshots = [...snapshots];
    if (snapshot.docs.length > 0)
      newSnapshots[pageNumber] = snapshot.docs[snapshot.docs.length - 1];

    setJobs(tempJobs);
    setSnapshots(newSnapshots);
    setPage(pageNumber);
    setIsLastPage(snapshot.docs.length < JOBS_PER_PAGE);
  };

  const fetchJobsCustom = async (criteria, pageNumber = 0) => {
    setCustomSearch(true);
    setSearchCriteria(criteria);

    let jobQuery = query(
      collection(db, "jobs"),
      where("type", "==", criteria.type),
      where("title", "==", criteria.title),
      where("location", "==", criteria.location),
      where("experience", "==", criteria.experience),
      orderBy("postedOn", "desc"),
      limit(JOBS_PER_PAGE)
    );

    if (pageNumber > 0 && snapshots[pageNumber - 1]) {
      jobQuery = query(
        collection(db, "jobs"),
        where("type", "==", criteria.type),
        where("title", "==", criteria.title),
        where("location", "==", criteria.location),
        where("experience", "==", criteria.experience),
        orderBy("postedOn", "desc"),
        startAfter(snapshots[pageNumber - 1]),
        limit(JOBS_PER_PAGE)
      );
    }

    const snapshot = await getDocs(jobQuery);
    const tempJobs = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      postedOn: doc.data().postedOn.toDate(),
    }));

    const newSnapshots = [...snapshots];
    if (snapshot.docs.length > 0)
      newSnapshots[pageNumber] = snapshot.docs[snapshot.docs.length - 1];

    setJobs(tempJobs);
    setSnapshots(newSnapshots);
    setPage(pageNumber);
    setIsLastPage(snapshot.docs.length < JOBS_PER_PAGE);
  };

  useEffect(() => {
    fetchJobs(0);
    fetchTotalJobsCount();
  }, []);

  const handlePageChange = (pageNumber) => {
    if (customSearch) {
      fetchJobsCustom(searchCriteria, pageNumber);
    } else {
      fetchJobs(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const visiblePages = [];
    const start = Math.max(0, page - Math.floor(MAX_VISIBLE_PAGES / 2));
    const end = Math.min(start + MAX_VISIBLE_PAGES, totalPages);

    for (let i = start; i < end; i++) {
      visiblePages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 border rounded ${
            i === page ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
        >
          {i + 1}
        </button>
      );
    }

    return visiblePages;
  };

  return (
    <>
      <Navbar />
      <Header />
      <SearchBar
        fetchJobsCustom={(criteria) => {
          setSnapshots([]);
          fetchJobsCustom(criteria, 0);
        }}
      />

      {customSearch && (
        <button
          onClick={() => {
            setSnapshots([]);
            fetchJobs(0);
          }}
          className="flex pl-[1150px] mb-2 cursor-pointer"
        >
          <p className="bg-blue-500 px-10 py-2 rounded-md text-white">
            Clear Filter
          </p>
        </button>
      )}

      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}

      <div className="flex justify-center my-5 gap-2">
        <button
          disabled={page === 0}
          onClick={() => handlePageChange(page - 1)}
          className={`px-4 py-2 border rounded ${
            page === 0 ? "bg-gray-300 text-gray-700" : "bg-blue-500 text-white"
          }`}
        >
          Prev
        </button>

        {renderPageNumbers()}

        <button
          disabled={isLastPage}
          onClick={() => handlePageChange(page + 1)}
          className={`px-4 py-2 border rounded ${
            isLastPage ? "bg-gray-300 text-gray-700" : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
