import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppProvider = ({children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const {user} = useUser()
    const {getToken} = useAuth()

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: '',
    });

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

    const [companyToken, setCompanyToken] = useState(null);

    const [companyData, setCompanyData] = useState(null)

    const [userData, setUserData] = useState(null);
    const [userApplications, setUserApplications] = useState([]);

    // fn to fetch jobs
    const fetchJobs = async () => {
        try{
            const { data } = await axios.get(backendUrl + 'api/jobs', {headers:{token: companyToken}})
            if (data.success) {
                setJobs(data.jobs);
            } else {
                toast.error(data.message);
            }
        }catch(error){
            toast.error(error.message);
        }
    };

    // fetch company data
    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(backendUrl + 'api/company/company', {headers:{token: companyToken}})
            if (data.success) {
                setCompanyData(data.company);
                // console.log(data)
            } else {
                toast.error(data.message);
            }
        } catch(error){
            toast.error(error.message);
        }
    };

    // function to fetch user data
    const fetchUserData = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.get(backendUrl + 'api/users/user', 
                {headers:{Authorization: `Bearer ${token}`}})
            
            if (data.success) {
                setUserData(data.user);
            } else {
                // toast.error(data.message);
            }
        } catch(error){
            // toast.error(error.message);
        }
    };

    // Function to fetch user applications
    const fetchUserApplications = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.get(backendUrl + 'api/users/applications', 
                {headers:{Authorization: `Bearer ${token}`}})
            
            if (data.success) {
                setUserApplications(data.applications);
            } else  {
                // toast.error(data.message);
            }
        } catch(error){
            // toast.error(error.message);
        }
    };  

    useEffect(() => {
        // Fetch jobs when the component mounts
        fetchJobs();

        const storedCompanyToken = localStorage.getItem('companyToken');
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken);
        }
    }, [fetchJobs]);

    useEffect(() => {
        // Fetch company data when companyToken changes
        if (companyToken) {
            fetchCompanyData();
        }
    }, [companyToken, fetchCompanyData]);

    useEffect(() => {
        // Fetch user data when user changes
        if (user) {
            fetchUserData();
        }
    }, [user, fetchUserData]);

    useEffect(() => {
        // Fetch user applications when userData changes
        if (user && userData) {
            fetchUserApplications();
        }
    }, [user, fetchUserApplications]);

    const value = {
        searchFilter,
        setSearchFilter,
        isSearched,
        setIsSearched,
        jobs,
        setJobs,
        showRecruiterLogin, 
        setShowRecruiterLogin,
        companyToken,
        setCompanyToken,    
        companyData,
        setCompanyData,
        backendUrl,
        userData,
        userApplications,
        setUserData,
        setUserApplications,
    };
    
    return (
        <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>
    );
}

export default AppProvider;


