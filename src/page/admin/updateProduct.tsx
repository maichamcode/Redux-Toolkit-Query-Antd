import { Button, Input, Skeleton, message, Form } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../api/product";
import { AiOutlineLoading } from "react-icons/ai";
import { IProduct } from "../../interface/product";
const UpdateProduct = () => {
  //Không thể thiếu khi làm update
  const [form] = Form.useForm();
  const { idProduct } = useParams<{ idProduct: string }>();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { data: productData, isLoading: isProductLoading } =
    useGetProductByIdQuery(idProduct || "");
  const [updateProduct, { isLoading: isUpdateLoading }] =
    useUpdateProductMutation();

  //end
  //Đồng bộ sản phẩm từ api vào form
  useEffect(() => {
    form.setFieldsValue(productData);
  }, [productData]);
  //
  const onFinish = (product: any) => {
    updateProduct({ ...product, id: idProduct })
      .unwrap()
      .then(() => {
        messageApi.open({
          type: "success",
          content:
            "Bạn đã cập nhập sản phẩm thành công. Chờ 3s để quay về quản trị",
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
    <>
      {contextHolder}
      <header>
        <h2>Cập nhật sản phẩm</h2>
      </header>
      {isProductLoading ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
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
              {isUpdateLoading ? (
                <AiOutlineLoading className="animate-spin" />
              ) : (
                "Cập nhật sản phẩm"
              )}
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default UpdateProduct;
