import React, { useState } from "react";
import "./main.css";
import { Button, Table, message, Skeleton, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IProduct } from "../../interface/product";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../api/product";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";

const AdminProduct = () => {
  const [messApi, contextHolder] = message.useMessage();
  const [deleteLoadingMap, setDeleteLoadingMap] = useState<
    Record<number | string, boolean>
  >({});
  const [deleteProduct, { isLoading: isDeleteLOading }] =
    useDeleteProductMutation();
  const { data: productData, isLoading: isLoadingProduct } =
    useGetProductsQuery();
  const confirm = (id: number | string) => {
    setDeleteLoadingMap((prevMap) => ({ ...prevMap, [id]: true }));
    deleteProduct(id)
      .unwrap()
      .then(() => {
        messApi.open({
          type: "success",
          content: "Xóa thành công!",
        });
        setDeleteLoadingMap((prevMap) => ({ ...prevMap, [id]: false }));
      });
  };
  const dataSource = productData?.map((item: IProduct) => ({
    key: item.id,
    name: item.name,
    price: item.price,
  }));

  const columns: ColumnsType<IProduct> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      render: ({ key: id }: { key: number | string }) => (
        <div>
          <Popconfirm
            placement="top"
            title={"Xóa sản phẩm"}
            description={"Mày có chắc chắn muốn xóa không?"}
            onConfirm={() => confirm(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              {deleteLoadingMap[id] && isDeleteLOading ? (
                <AiOutlineLoading3Quarters className=" animate-spin" />
              ) : (
                "Xóa"
              )}
            </Button>
          </Popconfirm>
          |
          <Button>
            <Link to={`/admin/product/${id}/update`}>Sửa</Link>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-2xl">Quản lý sản phẩm</h2>
        <Button type="primary" primary>
          <Link to="/admin/product/add">Thêm</Link>
        </Button>
      </header>
      {/* Hiện xóa thành công */}
      {contextHolder}
      {isLoadingProduct ? (
        <Skeleton /> // loading kiểu từ trái sang phải nhìn ngầu
      ) : (
        <Table columns={columns} dataSource={dataSource} />
      )}
    </div>
  );
};

export default AdminProduct;
