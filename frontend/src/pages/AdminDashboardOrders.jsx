import React, { useEffect } from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../redux/actions/order";
import { Badge } from "@/components/ui/badge";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, [dispatch]);

  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>

          <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
            <div className="w-[97%] flex flex-col mt-4">
              <h3 className="text-xl font-bold tracking-tight mb-4">All Orders</h3>
              <div className="rounded-md border bg-card">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Items Qty</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order Date</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {adminOrders && adminOrders.map((item) => (
                        <tr key={item._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">{item._id}</td>
                          <td className="p-4 align-middle">
                            <Badge variant={item.status === "Delivered" ? "success" : "default"} className={item.status === "Delivered" ? "bg-success text-success-foreground" : "bg-primary"}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">{item.cart?.reduce((acc, cartItem) => acc + cartItem.qty, 0)}</td>
                          <td className="p-4 align-middle">₹ {item.totalPrice}</td>
                          <td className="p-4 align-middle">{item.createdAt.slice(0, 10)}</td>
                        </tr>
                      ))}
                      {(!adminOrders || adminOrders.length === 0) && !adminOrderLoading && (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-muted-foreground">No orders found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
