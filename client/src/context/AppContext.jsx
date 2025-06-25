/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppProvider = ({children }) => {

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: '',
    });

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs] = useState([]);
    
    // fn to fetch jobs
    const fetchJobs = async () => {
        setJobs(jobsData); // Clear previous jobs
    };

    useEffect(() => {
        // Fetch jobs when the component mounts
        fetchJobs();
    }, []);
    const value = {
        searchFilter,
        setSearchFilter,
        isSearched,
        setIsSearched,
        jobs,
        setJobs
    };
    
    return (
        <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>
    );
}

export default AppProvider;


