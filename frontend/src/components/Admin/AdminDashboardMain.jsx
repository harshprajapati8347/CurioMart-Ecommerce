import React, { useEffect } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAllSellers } from "../../redux/actions/sellers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector((state) => state.order);
  const { sellers } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, [dispatch]);

  const adminEarning =
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);

  const adminBalance = adminEarning?.toFixed(2) || "0.00";

  return (
    <>
      {adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-6 space-y-6 bg-background">
          <h3 className="text-2xl font-bold tracking-tight">Overview</h3>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earning</CardTitle>
                <AiOutlineMoneyCollect className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹ {adminBalance}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">All Sellers</CardTitle>
                <MdBorderClear className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sellers?.length || 0}</div>
                <Link to="/admin-sellers" className="text-xs text-primary hover:underline mt-2 inline-block">
                  View Sellers
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">All Orders</CardTitle>
                <AiOutlineMoneyCollect className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminOrders?.length || 0}</div>
                <Link to="/admin-orders" className="text-xs text-primary hover:underline mt-2 inline-block">
                  View Orders
                </Link>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-xl font-bold tracking-tight mt-8 mb-4">Latest Orders</h3>
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
                  {adminOrders && adminOrders.slice(0, 4).map((item) => (
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
                  {(!adminOrders || adminOrders.length === 0) && (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-muted-foreground">No orders found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
