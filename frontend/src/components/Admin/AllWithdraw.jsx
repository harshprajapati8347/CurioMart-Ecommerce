import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const AllWithdraw = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_SERVER_URL}/withdraw/get-all-withdraw-request`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.withdraws);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  const handleSubmit = async () => {
    await axios
      .put(
        `${import.meta.env.VITE_APP_SERVER_URL}/withdraw/update-withdraw-request/${withdrawData._id}`,
        {
          sellerId: withdrawData.seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Withdraw request updated successfully!");
        setData(res.data.withdraws);
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to update status");
      });
  };

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-semibold pb-2 text-foreground">Withdraw Requests</h3>
        <div className="w-full min-h-[45vh] bg-card rounded-md border border-border shadow-sm overflow-hidden">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b border-border">
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Withdraw Id</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Shop Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Shop Id</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Requested At</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {data && data.map((item) => (
                  <tr key={item._id} className="border-b border-border transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">{item._id}</td>
                    <td className="p-4 align-middle">{item.seller.name}</td>
                    <td className="p-4 align-middle">{item.seller._id}</td>
                    <td className="p-4 align-middle">IND₹ {item.amount}</td>
                    <td className="p-4 align-middle">{item.status}</td>
                    <td className="p-4 align-middle">{item.createdAt.slice(0, 10)}</td>
                    <td className="p-4 align-middle">
                      {item.status === "Processing" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { setWithdrawData(item); setOpen(true); }}
                          className="h-8 w-8 text-primary"
                        >
                          <BsPencil size={18} />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
                {(!data || data.length === 0) && (
                  <tr>
                    <td colSpan={7} className="h-24 text-center text-muted-foreground">
                      No withdraw requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {open && (
        <div className="w-full fixed h-screen top-0 left-0 bg-black/50 z-[9999] flex items-center justify-center animate-in fade-in duration-200">
          <div className="w-[50%] min-h-[40vh] bg-card rounded-xl border border-border shadow-lg p-6">
            <div className="flex justify-end w-full text-muted-foreground hover:text-foreground cursor-pointer">
              <RxCross1 size={25} onClick={() => setOpen(false)} />
            </div>
            <h1 className="text-2xl text-center font-semibold text-foreground mb-6">
              Update Withdraw Status
            </h1>
            <div className="flex flex-col gap-4">
              <select
                onChange={(e) => setWithdrawStatus(e.target.value)}
                className="w-full h-12 px-4 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              >
                <option value="Processing">Processing</option>
                <option value="Succeed">Succeed</option>
              </select>
              <Button size="lg" className="w-full mt-4" onClick={handleSubmit}>
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllWithdraw;
