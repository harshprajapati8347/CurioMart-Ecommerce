import React, { useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller]);

  const availableBalance = seller?.availableBalance?.toFixed(2) || "0.00";

  return (
    <div className="w-full p-6 space-y-6 bg-background">
      <h3 className="text-2xl font-bold tracking-tight">Overview</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Balance <span className="text-xs text-muted-foreground font-normal">(with 10% fee)</span>
            </CardTitle>
            <AiOutlineMoneyCollect className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${availableBalance}</div>
            <Link to="/dashboard-withdraw-money" className="text-xs text-primary hover:underline mt-2 inline-block">
              Withdraw Money
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Orders</CardTitle>
            <MdBorderClear className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders?.length || 0}</div>
            <Link to="/dashboard-orders" className="text-xs text-primary hover:underline mt-2 inline-block">
              View Orders
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Products</CardTitle>
            <AiOutlineMoneyCollect className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products?.length || 0}</div>
            <Link to="/dashboard-products" className="text-xs text-primary hover:underline mt-2 inline-block">
              View Products
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
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {orders && orders.map((item) => (
                <tr key={item._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">{item._id}</td>
                  <td className="p-4 align-middle">
                    <Badge variant={item.status === "Delivered" ? "success" : "default"} className={item.status === "Delivered" ? "bg-success text-success-foreground" : "bg-primary"}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle">{item.cart.reduce((acc, cartItem) => acc + cartItem.qty, 0)}</td>
                  <td className="p-4 align-middle">IND₹ {item.totalPrice}</td>
                  <td className="p-4 align-middle text-right">
                    <Link to={`/dashboard/order/${item._id}`}>
                      <Button variant="ghost" size="icon">
                        <AiOutlineArrowRight size={20} />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {(!orders || orders.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
