import React, { useEffect, useState } from 'react';

const UsersThisMonth = () => {
    const [totalUser, setTotalUser] = useState(0);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await fetch('http://localhost:9999/api/customer');
                const UserData = await response.json();

                const totalUser = UserData?.length;

                setTotalUser(totalUser);

            } catch (error) {
                console.error('Error fetching Users data:', error);
            }
        };

        fetchUsersData();
    }, []);


    return (
        <div>
            <div className="row align-items-center">
                <div className="col-12">
                    <h5 className="card-title fw-semibold">Subscribers :</h5>
                    <div className="d-flex align-items-center mb-3">
                        <span className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
                            {totalUser > 0 ? (
                                <i className="ti ti-arrow-up-right text-success"></i>
                            ) : (
                                <i className="ti ti-arrow-down-right text-danger"></i>
                            )}
                        </span>
                        <p className="text-dark me-1 fs-3 mb-0">+{totalUser} Sub</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UsersThisMonth;
