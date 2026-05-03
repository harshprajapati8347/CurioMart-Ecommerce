import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
    }
  }, [dispatch, seller]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-8 mt-4 bg-background">
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
                      <td className="p-4 align-middle">{item.cart.length}</td>
                      <td className="p-4 align-middle">IND₹ {item.totalPrice}</td>
                      <td className="p-4 align-middle text-right">
                        <Link to={`/order/${item._id}`}>
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
      )}
    </>
  );
};

export default AllOrders;
