import React from "react";
import { Button, Form, Input, message } from "antd";
import { IProduct } from "../../interface/product";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../api/product";
import { AiOutlineLoading } from "react-icons/ai";
import "./main.css";
const AddProduct = () => {
  //Làm thêm phải có không thể thiếu
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [addProduct, { isLoading: isAddProductLoading }] =
    useAddProductMutation();

  //End thêm
  const onFinish = (product: any) => {
    addProduct(product)
      .unwrap()
      .then(() => {
        messageApi.open({
          type: "success",
          content:
            "Bạn đã thêm sản phẩm thành công. Chờ 3s để quay về quản trị",
        });
        form.resetFields();
        setTimeout(() => {
          navigate("/admin/product");
        }, 3000);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <header>
        <h2>Thêm sản phẩm</h2>
      </header>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<IProduct>
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<IProduct>
          label="Giá sản phẩm"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {/* Hiện thành công */}
            {contextHolder}
            {isAddProductLoading ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              "Thêm sản phẩm"
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
