import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

function Contact(props) {
  const [dataContact, setDataContact] = useState([])
  const [selectedContact, setSelectedContact] = useState(null);
  const [btnInput, setBtnInput] = useState(false);
  const schema = yup.object({
    message: yup
      .string()
      .required('Message is required')
      .max(100, 'Message must be at most 100 characters'),
  });
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9999/api/contact');
        // console.log('Status:', response.status);
        // console.log('Data:', response.data);
        setDataContact(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
    // console.log("haha");
  }, [])

  //   const handleBanned = async (cus_id) => {
  //       try {
  //         const response = await axios.put(`http://localhost:9999/api/customer/banned/${cus_id}`);
  //         if (response.status === 200) {
  //           setUsers((pre) => {
  //             let list = pre.map((item) => 
  //               item.cus_id === cus_id ? { ...item, cus_status: 2 } : item
  //             );
  //             return list;
  //           });
  //         }
  //       } catch (error) {
  //         console.log(error.response);
  //       }
  //   };
  const handleReply = (contact) => {
    setSelectedContact(contact);
    setBtnInput(true);
  };
  const closeInput = () => {
    setBtnInput(false);
    setSelectedContact(null);
  };

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      if (data && selectedContact) {
        const dataForAPI = {
          id: selectedContact.id,
          email: selectedContact.email,
          message: data.message
        };
        const response = await axios.put('http://localhost:9999/api/contact/reply', dataForAPI)
        if (response.status === 200) {
          closeInput();
          // setDataContact((pre) => {
          //   let list = pre.filter((item) => item.id !== selectedContact.id);
          //   return list;
          // });
          reset();
          toast.success(' ♥ Reply successfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        // console.log(dataForAPI);
      }
    } catch (error) {
      // console.log(error.response.data);
      if (error.response.status === 409) {
        const message = error.response.data;
        toast.error(message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }


    }
  }

  const buttonStyle = {
    width: '50px',
    // padding: '1px', // Thu nhỏ kích thước của button
    marginRight: '10px',
    backgroundColor: 'green', // Đổi màu nền của button thành màu đỏ
    border: 'none', // Loại bỏ viền mặc định
    borderRadius: '5px', // Bo tròn góc button
    color: 'white', // Đổi màu chữ thành màu trắng
    fontSize: '20px', // Kích thước font chữ
    // cursor: 'pointer', // Đổi con trỏ chuột khi hover vào button
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    setTotalPages(Math.ceil(dataContact.length / PAGE_SIZE));
  }, [dataContact]);
  const displayedContacts = dataContact.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  return (
    <div className='table-responsive mt-5'>
      {/* phân trang */}
      <div className="d-flex justify-content-between mt-3">
        <div className="d-flex">
          <button
            className="btn btn-outline-primary me-2 ti"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &#xea19;
          </button>
          <button
            className="btn btn-outline-primary me-2 ti"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &#xea1f;
          </button>
        </div>
        <div>
          Page {currentPage} of {totalPages}
        </div>
      </div>
      <hr />
      <table className="table text-nowrap mb-0 align-middle">
        <thead className="text-dark fs-4">
          <tr>
            <th className="border-bottom-0">
              <h6 className="fw-semibold mb-0">Email</h6>
            </th>
            <th className="border-bottom-0">
              <h6 className="fw-semibold mb-0">Name</h6>
            </th>
            <th className="border-bottom-0">
              <h6 className="fw-semibold mb-0">Message</h6>
            </th>
            <th className="border-bottom-0">
              <h6 className="fw-semibold mb-0">Action <i className="ti ti-activity"></i> <i className="ti">&#xf345;</i></h6>
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedContacts.length > 0 && displayedContacts.map((item, index) => {
            const isReplied = item.status === 0;
            const rowStyle = isReplied ? { opacity: 0.5 } : {};
            //   const banButtonStyle = isBanned ? { ...buttonStyle, opacity: 0.5, cursor: 'not-allowed' } : buttonStyle;

            return (

              <tr key={index} style={rowStyle} >
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.message}</td>
                <td>
                  {!isReplied && (
                    <button
                      style={buttonStyle}
                      onClick={() => handleReply(item)}
                    >
                      <i className="ti"> &#xeaec;</i>
                    </button>
                  )}
                  {/* <button style={buttonStyle1} onClick={() => handleView(item)}>
                  <i className="ti"> &#xeb6e;</i>
                </button> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {btnInput && selectedContact && (
        <div className="modal-container">
          <div className="modal-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Reply to Contact #{selectedContact.id}</h2>
              <table>
                <tbody className="custom-tbody">
                  {/* Hiển thị các thông tin cũ tại đây */}
                  <tr>
                    <td>Email:</td>
                    <td>{selectedContact.email}</td>
                  </tr>
                  <tr>
                    <td>Name:</td>
                    <td>{selectedContact.name}</td>
                  </tr>
                  <tr>
                    <td>Mesage:</td>
                    <td>{selectedContact.message}</td>
                  </tr>
                  <tr>
                    <td><label htmlFor="replyInput">Reply:</label></td>
                    <td>
                      {/* <input
                        type="text"
                        id="replyInput"
                        name="HtmlContent"
                        className="custom-input"
                        placeholder="Enter your reply"
                        value={replyText.HtmlContent}
                        onChange={(e) =>handleChangeInput(e)}
                      /> */}
                      {/* <Input
                        // label="HtmlContent"
                        id="HtmlContent"
                        type="text"
                        placeholder="Enter Your Reply"
                        register={{ ...register("HtmlContent") }}
                        className="form-control border-0 py-3"
                        errorMessage={errors.HtmlContent?.message}
                    /> */}
                      <textarea
                        className="w-100 form-control border-3 mb-4"
                        rows="5"
                        cols="100"
                        placeholder="Reply this contact"
                        {...register('message')}  // Register the textarea with useForm
                      ></textarea>
                      <span className="text-danger">{errors.message?.message}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="add-button" type='submit'>Reply</button>
              <button type="button" className="close-button" onClick={closeInput}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}

export default Contact;