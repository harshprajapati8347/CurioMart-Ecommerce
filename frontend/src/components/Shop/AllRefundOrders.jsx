import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Button } from "@/components/ui/button";

const AllRefundOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller._id]);

  const refundOrders =
    orders &&
    orders.filter(
      (item) =>
        item.status === "Processing refund" || item.status === "Refund Success"
    );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10">
          <div className="rounded-md border border-border bg-card">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b border-border">
                  <tr className="border-b border-border transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Items Qty</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {refundOrders && refundOrders.map((item) => (
                    <tr key={item._id} className="border-b border-border transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">{item._id}</td>
                      <td className="p-4 align-middle">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "Refund Success" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 align-middle">{item.cart.length}</td>
                      <td className="p-4 align-middle">IND₹ {item.totalPrice}</td>
                      <td className="p-4 align-middle">
                        <Link to={`/order/${item._id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <AiOutlineArrowRight size={20} />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {(!refundOrders || refundOrders.length === 0) && (
                    <tr>
                      <td colSpan={5} className="h-24 text-center text-muted-foreground">
                        No refund orders found.
                      </td>
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

export default AllRefundOrders;
