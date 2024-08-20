import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./User.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function AdminList(props) {
    const [admin, setAdmin] = useState([])
    const [fullInfor, setfullInfor] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9999/api/admin');
                // console.log('Status:', response.status);
                // console.log('Data:', response.data);
                setAdmin(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
        // console.log("haha");
    }, [])
    function handleView(admin) {
        setfullInfor(admin);
        setShowDetails(true);
    }

    const handleBanned = async (id) => {
        const confirmBan = async () => {
            try {
                const response = await axios.put(`http://localhost:9999/api/admin/bannedAdmin/${id}`);
                if (response.status === 200) {
                    setAdmin((pre) => {
                        let list = pre.map((item) =>
                            item.id === id ? { ...item, status: 2 } : item
                        );
                        return list;
                    });
                }
            } catch (error) {
                console.log(error.response);
            }
        };

        confirmAlert({
            title: 'Are You Sure?',
            message: 'Are you really sure to ban?',
            buttons: [
                {
                    label: 'Sure',
                    onClick: confirmBan,
                },
                {
                    label: 'No',
                    onClick: () => { },
                },
            ],
        });
    };

    //Unban
    const handleUnbanned = async (id) => {
        const confirmUnban = async () => {
            try {
                const response = await axios.put(`http://localhost:9999/api/customer/unbanned/${id}`);
                if (response.status === 200) {
                    setAdmin((pre) => {
                        let list = pre.map((item) =>
                            item.id === id ? { ...item, status: 1 } : item
                        );
                        return list;
                    });
                }
            } catch (error) {
                console.log(error.response);
            }
        };

        confirmAlert({
            title: 'Unban this account !',
            message: 'Are you really sure to unban this account?',
            buttons: [
                {
                    label: 'Sure',
                    onClick: confirmUnban,
                },
                {
                    label: 'No',
                    onClick: () => { },
                },
            ],
        });
    };

    //css btn
    const buttonStyle = {
        width: '50px',
        // padding: '1px', // Thu nhỏ kích thước của button
        marginRight: '10px',
        backgroundColor: 'red', // Đổi màu nền của button thành màu đỏ
        border: 'none', // Loại bỏ viền mặc định
        borderRadius: '5px', // Bo tròn góc button
        color: 'white', // Đổi màu chữ thành màu trắng
        fontSize: '14px', // Kích thước font chữ
        // cursor: 'pointer', // Đổi con trỏ chuột khi hover vào button
    };
    const buttonStyle1 = {
        width: '50px',
        // padding: '1px', // Thu nhỏ kích thước của button
        backgroundColor: 'green', // Đổi màu nền của button thành màu đỏ
        border: 'none', // Loại bỏ viền mặc định
        borderRadius: '5px', // Bo tròn góc button
        color: 'white', // Đổi màu chữ thành màu trắng
        fontSize: '14px', // Kích thước font chữ
        // cursor: 'pointer', // Đổi con trỏ chuột khi hover vào button
    };
    return (
        <div className="table-responsive mt-5">
            <table className="table text-nowrap mb-0 align-middle">
                <thead className="text-dark fs-4">
                    <tr>
                        <th className="border-bottom-0">
                            <h6 className="fw-semibold mb-0">Name</h6>
                        </th>
                        <th className="border-bottom-0">
                            <h6 className="fw-semibold mb-0">Role</h6>
                        </th>


                        <th className="border-bottom-0">
                            <h6 className="fw-semibold mb-0">Phone</h6>
                        </th>
                        <th className="border-bottom-0">
                            <h6 className="fw-semibold mb-0">Action <i className="ti ti-activity"></i> <i className="ti">&#xf345;</i></h6>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {admin.length > 0 && admin.map((item, index) => {
                        const isBanned = item.status === 2;
                        const rowStyle = isBanned ? { opacity: 0.5 } : {};
                        //   const banButtonStyle = isBanned ? { ...buttonStyle, opacity: 0.5, cursor: 'not-allowed' } : buttonStyle;
                        return (
                            <tr key={index} style={rowStyle}>
                                <td>{item.name}</td>
                                <td>{item.role}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <button
                                        style={buttonStyle}
                                        onClick={() => {
                                            if (isBanned) {
                                                handleUnbanned(item.id);
                                            } else {
                                                handleBanned(item.id);
                                            }
                                        }}
                                    >
                                        <i className="ti"> &#xea2e;</i>
                                    </button>
                                    <button style={buttonStyle1} onClick={() => handleView(item)}>
                                        <i className="ti"> &#xeb6e;</i>
                                    </button>

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {showDetails && fullInfor && (
                <div className="overlay">
                    <div className="user-details-form">
                        <h2>Customer Details</h2>
                        <p><span style={{ fontWeight: 'bold', color: 'black' }}>ID:</span> {fullInfor.id}</p>
                        <p><span style={{ fontWeight: 'bold', color: 'black' }}>Name: </span>{fullInfor.name}</p>
                        <p><span style={{ fontWeight: 'bold', color: 'black' }}>Email: </span>{fullInfor.email}</p>
                        <p><span style={{ fontWeight: 'bold', color: 'black' }}>Address:</span> {fullInfor.address}</p>
                        <p><span style={{ fontWeight: 'bold', color: 'black' }}>Phone:</span> {fullInfor.phone}</p>
                        {/* Thêm các thông tin khác cần hiển thị */}
                        <button className='close-button' onClick={() => setShowDetails(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminList;