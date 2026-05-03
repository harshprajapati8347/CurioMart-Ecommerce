import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";

const AllProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_APP_SERVER_URL}/product/admin-all-products`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setData(res.data.products);
      });
  }, []);

  return (
    <div className="w-full p-8 mt-4 bg-background">
      <div className="rounded-md border bg-card">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product Id</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stock</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Sold out</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {data && data.map((item) => (
                <tr key={item._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">{item._id}</td>
                  <td className="p-4 align-middle">{item.name}</td>
                  <td className="p-4 align-middle">IND₹ {item.discountPrice}</td>
                  <td className="p-4 align-middle">{item.stock}</td>
                  <td className="p-4 align-middle">{item?.sold_out}</td>
                  <td className="p-4 align-middle text-right">
                    <Link to={`/product/${item._id}`}>
                      <Button variant="ghost" size="icon">
                        <AiOutlineEye size={20} />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-muted-foreground">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
