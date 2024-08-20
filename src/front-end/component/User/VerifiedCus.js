import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function VerifiedCus(props) {
    const location = useLocation();
    // const   {cus_id} = useParams();
    const navigate = useNavigate();
    const queryString = location.search;
  const codeStartIndex = 1;
  const code = queryString.substring(codeStartIndex);
  useEffect(() => {
    const verifyAccount = async () => {
        try {
            // Đặt dữ liệu đúng định dạng
            const data = { token: code };
            
            const response = await axios.put(
                'http://localhost:9999/api/customer/verified/',
                data, // Dữ liệu gửi trong request body
        
            );

            if (response?.status === 200) {
                // Xác nhận thành công, thực hiện các thao tác khác nếu cần
                navigate('/login');
                toast.success("Verified successfully. You can login to my website", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    closeButton:false
                    });
            }
        } catch (error) {
            console.error('Error during account verification:', error);
            // navigate('/register')
        }
    };
    // Gọi hàm xác nhận khi component được mount
    verifyAccount();
}, [code, navigate]);
    return (
        <div>
            
        </div>
    );
}

export default VerifiedCus;