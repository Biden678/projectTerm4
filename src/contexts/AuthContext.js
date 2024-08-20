import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";


// tạo chức năng context, tạo thư viện
const AuthContext = createContext();

// tạo nhà cung cấp < kẹp thằng nào thì thằng đó hưởng các chức năng AuthProvider có >
function AuthProvider({ children }) {

    const navigate = useNavigate();

    // =============================================================================================
    // Phat lấy tất cả danh sách cách bảng
    // =============================================================================================
    const [products, setProducts] = useState([]);
    async function handleFetchProducts() {
        try {
            const response = await axios.get("http://localhost:9999/api/products");
            if (response.status === 200) {
                setProducts(response.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }

    const [categories, setCategories] = useState([]);
    async function handleFetchCategories() {
        try {
            const response = await axios.get("http://localhost:9999/api/categories");
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }
    const [countries, setCountries] = useState([]);
    async function handleFetchCountries() {
        try {
            const response = await axios.get("http://localhost:9999/api/countries");
            if (response.status === 200) {
                setCountries(response.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }
    const [prescribes, setPrescribes] = useState([]);
    async function handleFetchPrescribes() {
        try {
            const response = await axios.get("http://localhost:9999/api/prescribes");
            if (response.status === 200) {
                setPrescribes(response.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }
    const [whouses, setWhouses] = useState([]);
    async function handleFetchWhouses() {
        try {
            const response = await axios.get("http://localhost:9999/api/whouses");
            if (response.status === 200) {
                setWhouses(response.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }
    const [brands, setBrands] = useState([]);
    async function handleFetchBrands() {
        try {
            const response = await axios.get("http://localhost:9999/api/brands");
            if (response.status === 200) {
                setBrands(response.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }
    
    const [productPrice, setProductPrice] = useState(null);
    async function handleFetchProductPrice() {
        try {
            const response = await axios.get(`http://localhost:9999/api/ups`);
            if (response.status === 200) {
                setProductPrice(response.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        } 
    }

    // =============================================================================================
    // =============================================================================================



    useEffect(() => {
        // Tìm nạp dữ liệu tại đây hoặc thực hiện bất kỳ hành động nào khác dựa trên tham số id
        handleFetchProducts();
        handleFetchProductPrice();
    }, []);

    // Phuc Phuc Phuc Phuc Phuc Phuc Phuc Phuc Phuc Phuc Phuc Phuc Phuc Phuc Phuc Phuc
    //
    const logout = () => {
        sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("user"); // Xóa object người dùng
    toast.success("Logout successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        closeButton:false
       
        });
    navigate("/login");
    };

    //admin
    const logoutAdmin = () => {
        sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("admin"); // Xóa object người dùng
    toast.success("Logout successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        closeButton:false
       
        });
    navigate("/loginadmin");
    };

// =============================================================================================
    // ly
    // =============================================================================================

    const [types, setTypes] = useState([]);
    async function handleFetchTypes() {
        try {
            const response = await axios.get("http://localhost:9999/api/blog/type");
            if (response.status === 200) {
                setTypes(response.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }

    const [blogs, setBlogs] = useState([]);
    async function handleFetchBlogs() {
        try {
            const response = await axios.get("http://localhost:9999/api/blog");
            if (response.status === 200) {
                setBlogs(response.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }

    const [comments, setComments] = useState([]);
    async function handleFetchComments() {
        try {
            const response = await axios.get("http://localhost:9999/api/comment");
            if (response.status === 200) {
                setBlogs(response.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }

    const [words, setWords ] = useState([]);
    async function handleFetchWords() {
        try {
            const response = await axios.get("http://localhost:9999/api/words");
            if (response.status === 200) {
                setWords(response.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }


     //-------------------Nhi----------------------
     const [topics, setTopics] = useState([]);

    const handleFetchTopics = async () => {
        try {
            const response = await axios.get("http://localhost:9999/api/health/question-topic");
            if (response.status === 200) {
                setTopics(response.data);
            }
        } catch (error) {
            console.error("Error fetching topics:", error);
        }
    };

    const [questions, setQuestions] = useState([]);

    const handleFetchQuestions = async () => {
        try {
            const response = await axios.get("http://localhost:9999/api/health/list-question");
            if (response.status === 200) {
                setQuestions(response.data);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const [answers, setAnswers] = useState([]);

    const handleFetchAnswers = async () => {
        try {
            const response = await axios.get("http://localhost:9999/api/health/score-question");
            if (response.status === 200) {
                setAnswers(response.data);
            }
        } catch (error) {
            console.error("Error fetching answers:", error);
        }
    };

    const [results, setResults] = useState([]);

    const handleFetchResults = async () => {
        try {
            const response = await axios.get("http://localhost:9999/api/health/percentage");
            if (response.status === 200) {
                setResults(response.data);
            }
        } catch (error) {
            console.error("Error fetching results:", error);
        }
    };


    // bỏ hàng vô thùng
    const values = {
        navigate,
        handleFetchProducts, products, setProducts,
        handleFetchCategories, categories, setCategories,
        handleFetchCountries, countries, setCountries,
        handleFetchPrescribes, prescribes, setPrescribes,
        handleFetchWhouses, whouses, setWhouses,
        handleFetchBrands, brands, setBrands,
        handleFetchProductPrice, productPrice, setProductPrice,

        // phuc
        logout,logoutAdmin,

        //LY
        handleFetchTypes, types, setTypes,
        handleFetchBlogs, blogs, setBlogs, 
        handleFetchComments, comments, setComments,
        handleFetchWords, words, setWords,

        //Nhi
        handleFetchTopics, topics, setTopics,
        handleFetchQuestions, questions, setQuestions,
        handleFetchAnswers, answers, setAnswers,
        handleFetchResults, results, setResults,
    }

    // bỏ thùng lên xe cb đem đi cung cấp
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthContext,
    AuthProvider
}