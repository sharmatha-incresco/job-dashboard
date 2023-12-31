import React, { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "./component/topbar";
import Sidebar from "./component/sidebar";
import Module from "./component/module";
import i18next, { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

const languageOptions = {
  en: 'English',
  ta: 'Tamil',
  ar: 'Arabic',
};

function Screen() {
  const { t, i18n } = useTranslation();
  const getAllURL = "http://ec2-15-206-167-181.ap-south-1.compute.amazonaws.com:3000/";
  const [searchQuery, setSearchQuery] = useState("");
  const [alljob, setAllJob] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(2);
  const [language, setLanguage] = useState('');
  const [filterOptions, setFilterOptions] = useState({});
  const userSkills = ["JavaScript", "Artificial Intelligence", "Css"];
  // useEffect(() => {

  // }, [language]);

  useEffect(() => {
    changeLanguage(language || 'en');
    console.log("userSkills in Screen:");
    getAllPost();
    if (searchQuery === "") {
      getAllPost();
    }
  }, [searchQuery, language]);

  // useEffect(() => {

  // }, [searchQuery]);
  console.log("userSkills in Screen:");
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  console.log("userSkills in Screen:", userSkills);
  const handleSearch = () => {
    const filteredResults = alljob.filter(
      (job) =>
        job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
    if (filteredResults.length === 0) {
      alert(t('screen.noResults'));
    }
  };

  const getAllPost = () => {
    let endpoint = "job/get/all";

    const selectedFilters = Object.values(filterOptions).flat();
    if (selectedFilters.length > 0) {
      endpoint = "job/get/filter";
      const queryParams = selectedFilters.map(
        (filter) => `${filter.filterKey}=${filter.optionName}`,
      );
      endpoint += `?${queryParams.join("&")}`;
    }

    axios
      .get(getAllURL + endpoint)
      .then((response) => {
        setAllJob(response.data);
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const comparePositions = (a, b) => {
    if (a.position < b.position) return sortAscending ? -1 : 1;
    if (a.position > b.position) return sortAscending ? 1 : -1;
    return 0;
  };

  const sortedJobs = [...(searchResults.length > 0 ? searchResults : alljob)].sort(comparePositions);

  const handleSortBy = () => {
    setSortAscending(!sortAscending);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  console.log("--------->", currentJobs)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (filterKey, optionId, optionName) => {
    const updatedFilterOptions = { ...filterOptions };

    if (!updatedFilterOptions[filterKey]) {
      updatedFilterOptions[filterKey] = [];
    }

    const existingOptionIndex = updatedFilterOptions[filterKey].findIndex(
      (option) => option.optionId === optionId
    );

    if (existingOptionIndex !== -1) {
      updatedFilterOptions[filterKey].splice(existingOptionIndex, 1);
    } else {
      updatedFilterOptions[filterKey].push({ optionId, optionName });
    }

    setFilterOptions(updatedFilterOptions);

    if (Object.keys(updatedFilterOptions).length === 0) {
      // If all filters are cleared, retrieve all data from the database
      getAllPost();
    } else {
      const queryParams = Object.entries(updatedFilterOptions)
        .flatMap(([key, options]) =>
          options.map((option) => `${key}=${option.optionName}`)
        )
        .join("&");

      const endpoint = queryParams ? `job/get/filter?${queryParams}` : "job/get/all";

      axios
        .get(getAllURL + endpoint)
        .then((response) => {
          setAllJob(response.data);
          setSearchResults(response.data);
          setCurrentPage(1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const filterByDate = (date) => {
    const currentDate = new Date(); // Get the current date

    let startDate = new Date(currentDate); // Create a new date object for the start date
    let endDate = new Date(currentDate); // Create a new date object for the end date

    // Calculate the start and end dates based on the selected option
    if (date === 'last24') { // Last 24 hours
      startDate.setDate(currentDate.getDate() - 1);
    } else if (date === 'last48') { // Last 48 hours
      startDate.setDate(currentDate.getDate() - 2);
    } else if (date === 'last7') { // Last 7 days
      startDate.setDate(currentDate.getDate() - 7);
    } else if (date === 'last14') { // Last 14 days
      startDate.setDate(currentDate.getDate() - 14);
    }

    // Filter the jobs based on the calculated date range
    let filteredResults = alljob.filter((job) => {
      const jobDate = new Date(job.date); // Assuming job.date is a valid date string

      // Check if the job date is within the calculated date range
      return jobDate >= startDate && jobDate <= endDate;
    });

    // If the date parameter is not specified or empty, retrieve all jobs

    setSearchResults(filteredResults);
    setCurrentPage(1);
  };

  const pageNumbers = Array(Math.ceil(sortedJobs.length / jobsPerPage))
    .fill()
    .map((_, index) => index + 1);

  const renderPageNumbers = () => {
    if (pageNumbers.length <= 1) {
      return null;
    }

    const minViewPages = 3;
    const ellipsis = "...";

    let visiblePages = pageNumbers;

    if (pageNumbers.length > minViewPages) {
      const middleIndex = Math.ceil(minViewPages / 2);
      const startPages = pageNumbers.slice(0, middleIndex);
      const endPages = pageNumbers.slice(-middleIndex);

      if (currentPage <= middleIndex) {
        visiblePages = [...startPages, ellipsis, pageNumbers.length];
      } else if (currentPage > pageNumbers.length - middleIndex) {
        visiblePages = [1, ellipsis, ...endPages];
      } else {
        visiblePages = [1, ellipsis, currentPage, ellipsis, pageNumbers.length];
      }
    }

    return (
      <div className="flex justify-center my-4">
        {currentPage !== 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            className="mx-1 px-3 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-900"
          >
            Previous
          </button>
        )}
        {visiblePages.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-1 px-3 py-2 rounded focus:outline-none ${currentPage === number
              ? "bg-slate-600 text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-900"
              }`}
          >
            {number === ellipsis ? ellipsis : number}
          </button>
        ))}
        {currentPage !== pageNumbers.length && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className="mx-1 px-3 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-900"
          >
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto gap-4 w-full bg-slate-800 min-h-screen">
      <select
        className="appearance-none rounded-full p-2 px-5 drop-shadow-2xl text-xs outline-none bg-gray-800 text-white"
        onChange={handleLanguageChange}
      >
        {Object.entries(languageOptions).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div className="header rounded-lg w-full border border-black bg-slate-800 py-5">
        <Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-2 p-3 px-8 pl-2 bottom-20 sm:col-span-2 rounded-lg border border-black bg-slate-800">
          <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">{t('screen.filterBy')}</label>
          <hr className="h-px w-32 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <Sidebar handleFilterChange={handleFilterChange} filterByDate={filterByDate} />
        </div>
        <div className="col-span-10 pl-2 w-full sm:col-span-10 rounded-lg border border-black bg-slate-800">
          <div className="pt-2 w-full inline-flex pl-3 justify-between text-sm text-white">
            <div className="text-white text-base inline-flex pt-6 ">{t('screen.searchResults')}-{searchResults.length}</div>
            <div className="pt-3 flex-1 inline-flex place-items-center pr-4 flex-end justify-end">
              <button
                onClick={handleSortBy}
                className="bg-slate-700 hover:bg-slate-500 text-white font-bold py-2 px-3 rounded"
              >
                {t('screen.sortBy')}{sortAscending ? "A-Z" : "Z-A"}
              </button>
            </div>
          </div>
          <div className="pb-2 w-2 content-center">
            <svg width="250" height="48" viewBox="0 0 652 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 0.5H651.5V47.5H24C11.0213 47.5 0.5 36.9787 0.5 24C0.5 11.0213 11.0213 0.5 24 0.5Z"
                stroke="url(#paint0_linear_0_12)"
              />
              <defs>
                <linearGradient id="paint0_linear_0_12" x1="-1.21445e-06" y1="24" x2="652" y2="23.9999" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#566292" />
                  <stop offset="1" stopColor="#566292" stopOpacity="0" />
                </linearGradient>
              </defs>
              <input
                type="text"
                name="s"
                id="s"
                className="block w-full pl-10 pr-3 py-2 border border-transparent text-white rounded-md leading-5 bg-slate-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
                placeholder="jobs"
              />
            </svg>
          </div>
          <div>
            {currentJobs.map((job) => (
              <Module
                jobId={job._id}
                position={job.position}
                company={job.company}
                location={job.location}
                date={job.date}
                applicantsCount={job.applicantsCount}
                skills={job.skills || []}
                userSkills={userSkills}
              />
            ))}
          </div>
          {renderPageNumbers()}
        </div>
      </div>
    </div>
  );
}

export default Screen;
