import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios';
import Input from '../../../../front-end/Input';

function Forbidden(props) {
    const [dataForbbiden,setDataForbbiden] = useState([])
    // const [selectedContact, setSelectedContact] = useState(null);
    const [btnUpdate, setBtnUpdate] = useState(false);
    const [btnInputAdd, setBtnInputAdd] = useState(false);
    const [RowToUpdate, setRowToUpdate] = useState(null)
    const schema = yup.object({
        word: yup
            .string()
            .required('forbidden word is required')
            .max(20, 'forbidden word must be at most 20 characters'),
    });
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const updateSchema = yup.object().shape({
        word: yup
            .string()
            .required('forbidden word is required')
            .max(20, 'forbidden word must be at most 20 characters'),
      });
      const { handleSubmit: handleSubmitUpdate, register: registerUpdate, formState: { errors: errorsUpdate }, reset: resetUpdate, setValue } = useForm({
        resolver: yupResolver(updateSchema)
      });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9999/api/fbw');
                // console.log('Status:', response.status);
                // console.log('Data:', response.data);
                setDataForbbiden(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
        // console.log("haha");
      }, [])
      function handleAdd (){
        setBtnInputAdd(true);
      }
      function handleUpdate (item){
        setRowToUpdate(item.id)
        setBtnUpdate(true);
        setValue('word',item.word); 
        
      }
      const closeInput = () => {
        setBtnInputAdd(false);
      };
      const closeUpdate = () => {
        setBtnUpdate(false);
      };
      const onSubmit = async (data) => {
        try {
          const response = await axios.post('http://localhost:9999/api/fbw/create', data);
          if (response.status === 200) {
            setDataForbbiden((prev) => [...prev, response.data]);
            // Cập nhật users với một mảng mới bao gồm dữ liệu mới
            toast.success(' Add new word successful', {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            reset();
            setBtnInputAdd(!btnInputAdd);
          }
        } catch (error) {
          console.log(error);
        }
      };
      const onSubmit1 = async (data) => {
        try {
          const response = await axios.put(`http://localhost:9999/api/fbw/${RowToUpdate}`,data)
          if(response.status===200){
            toast.success('👌 Update forbiddenword succcessful', {
              position: "bottom-right", 
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            
            
            // setUsers(response.data.data);
            setDataForbbiden(prev => {
                // Update the item in its original position
                return prev.map(forbidden => forbidden.id === RowToUpdate ? response.data : forbidden);
              });
            setBtnUpdate(false);
            setRowToUpdate(null);
          }
        } catch (error) {
          console.log(error);
        }
      }
      const buttonStyle = {
        width: '50px',
        // padding: '1px', // Thu nhỏ kích thước của button
        marginRight:'10px',
        backgroundColor: 'green', // Đổi màu nền của button thành màu đỏ
        border: 'none', // Loại bỏ viền mặc định
        borderRadius: '5px', // Bo tròn góc button
        color: 'white', // Đổi màu chữ thành màu trắng
        fontSize: '14px', // Kích thước font chữ
        // cursor: 'pointer', // Đổi con trỏ chuột khi hover vào button
      };
      const buttonStyle1 = {
        width: '50px',
        // padding: '1px', // Thu nhỏ kích thước của button
        marginRight:'10px',
        backgroundColor: 'orange', // Đổi màu nền của button thành màu đỏ
        border: 'none', // Loại bỏ viền mặc định
        borderRadius: '5px', // Bo tròn góc button
        color: 'white', // Đổi màu chữ thành màu trắng
        fontSize: '14px', // Kích thước font chữ
        // cursor: 'pointer', // Đổi con trỏ chuột khi hover vào button
      };
    return (
        <div className='table-responsive mt-5'>
              <button
      style={buttonStyle}
      onClick={handleAdd}>
      <i className="ti"> &#xeb04;</i>
    </button>
        <table className="table text-nowrap mb-0 align-middle">
      <thead className="text-dark fs-4">
          <tr>
              <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Id</h6>
              </th>
              <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Word</h6>
              </th>
              <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Action <i className="ti ti-activity"></i> <i className="ti">&#xf345;</i></h6>
              </th>
          </tr>
      </thead>
      <tbody>
  {dataForbbiden.length > 0 && dataForbbiden.map((item, index) => {
    // const isReplied = item.status === 0;
    // const rowStyle = isReplied ? { opacity: 0.5 } : {};
  //   const banButtonStyle = isBanned ? { ...buttonStyle, opacity: 0.5, cursor: 'not-allowed' } : buttonStyle;

    return (
     
      <tr key={index} >
        <td>{item.id}</td>
        <td>{item.word}</td>
        <td>
        <button
      style={buttonStyle1}
      onClick={() => handleUpdate(item)}>
      <i className="ti">&#xef3f;</i>
      
    </button>
    {/* <button style={buttonStyle} onClick={() => handleAdd(item)}><i class="fa-solid fa-eye" style={{ color: 'pink' }}></i></button> */}
          {/* <button style={buttonStyle1} onClick={() => handleView(item)}>
            <i className="ti"> &#xeb6e;</i>
          </button> */}
        </td>
      </tr>
    );
  })}
</tbody>
  </table>
  {btnInputAdd && (
        <div className="modal-container">
          <div className="modal-content">
            <form  onSubmit={handleSubmit(onSubmit)} >
           
              <h2>Add new word</h2>
              <table>
                <tbody className="custom-tbody">
                  <tr>
                    {/* <td><label htmlFor="input1">Name</label></td> */}
                    <td>
                      {/* <input type="text" id="input1" name="Cus_Name" className="custom-input" placeholder="Enter your Name" value={NewUser.Cus_Name}
                    onChange={(e)=>handleInputChange(e)}
                    /> */}
                      <Input
                    //   style={width:'250px'}
                        type="text"
                        placeholder="Enter the word"
                        register={{ ...register("word") }}
                        className="form-control border-4 py-7 w-8"
                        errorMessage={errors.word?.message}
                      />
                    </td>
                  </tr>
                </tbody>    

              </table>
              <button className='add-button' type='submit'>Add</button>
              <button type="button" className="close-button" onClick={closeInput}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {/*  */}
      {btnUpdate && (
        <div className="modal-container">
          <div className="modal-content">
            <form  onSubmit={handleSubmitUpdate(onSubmit1)}>
           
              <h2>Edit Forbidden word</h2>
              <table>
                <tbody className="custom-tbody">
                  <tr>
                    {/* <td><label htmlFor="input3">Phone</label></td> */}
                    <td>
                      <Input
                        type="text"
                        placeholder="Update forbidden word"
                        register={{ ...registerUpdate("word") }}
                        className="form-control border-3 py-3"
                        errorMessage={errorsUpdate.word?.message}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className='add-button'>Update</button>
              <button type="button" className="close-button" onClick={closeUpdate}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}


  </div>
    );
}

export default Forbidden;