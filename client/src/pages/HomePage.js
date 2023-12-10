import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Form, Input, Modal, Select, Table, message } from "antd";
import axios from "axios";
import Spinner from "../components/Spinner";
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setallTransaction] = useState([]);
 const [editable,setEditable]=useState(null)
  const [frequency,setfrequency]=useState('7');



  //Table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render:(text,record)=>(
        <div>
        <EditOutlined onClick={()=>{
          setEditable(record)
          setShowModal(true)
        }}></EditOutlined>
        <DeleteOutlined className="mx-2" onClick={()=>{handledelete(record)}}></DeleteOutlined>
        </div>
      )
      
    },
  ];

  //getAll transactions
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("/transection/get-transection", {
        userid: user._id,
      });
      setLoading(false);
      setallTransaction(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      message.error("Fetch Issue With Transaction");
    }
  };

  //useEffect Hook
  useEffect(() => {
    getAllTransactions();
  }, []);

  //delete handler
  const handledelete=async(record)=>{
    try {
     setLoading(true)
      await axios.post("/transection/delete-transection",{trasactionId:record._id})
      setLoading(false)
      message.success("Transaction Deleted")
    } catch (error) {
      setLoading(false)
      console.log(error)
      message.error('unable to delete')      
    }
  }

  //form handling
  const handleSubmit = async (values) => {
    //value props
    try {
      const user = JSON.parse(localStorage.getItem("user"));
     if(editable){
      setLoading(true);
      await axios.post("/transection/edit-transection", {
        payload:{
          ...values,
          userid: user._id,
        },
        trasactionId:editable._id
      });
      setLoading(false);
      message.success("Transaction Updated successfully");
     }else{
      setLoading(true);
      await axios.post("/transection/add-transection", {
        ...values,
        userid: user._id,
      });
      setLoading(false);
      message.success("Transaction added successfully");
     }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("failed To add transaction");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Filter</h6>
          <Select value={frequency}>
            <Select.Option>Week</Select.Option>
            <Select.Option>Month</Select.Option>
            <Select.Option>Year</Select.Option>
            <Select.Option>custom</Select.Option>
          </Select>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        <Table columns={columns} dataSource={allTransactions}></Table>
      </div>
      <Modal
        title={editable?'Edit Transaction':'Add Transaction'}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
        footer={false}
      >
        <Form layout="veticle" onFinish={handleSubmit} initialValues={{editable}}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="type" name="category">
            <Select>
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="Movie">Movie</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="medical">medical</Select.Option>
              <Select.Option value="Mess">Mess</Select.Option>
              <Select.Option value="Rent">Rent</Select.Option>
              <Select.Option value="Fee">Fee</Select.Option>
              <Select.Option value="tax">tax</Select.Option>
              <Select.Option value="Project">Project</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Refrence" name="refrence">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
