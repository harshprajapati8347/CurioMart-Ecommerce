import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellers } from "../../redux/actions/sellers";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const AllSellers = () => {
  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${import.meta.env.VITE_APP_SERVER_URL}/shop/delete-seller/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      });

    dispatch(getAllSellers());
  };

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-semibold pb-2 text-foreground">All Sellers</h3>
        <div className="w-full min-h-[45vh] bg-card rounded-md border border-border shadow-sm overflow-hidden">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b border-border">
                  <tr className="border-b border-border transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Seller ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Address</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined At</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Preview</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {sellers && sellers.map((item) => (
                    <tr key={item._id} className="border-b border-border transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">{item._id}</td>
                      <td className="p-4 align-middle">{item.name}</td>
                      <td className="p-4 align-middle">{item.email}</td>
                      <td className="p-4 align-middle">{item.address}</td>
                      <td className="p-4 align-middle">{item.createdAt.slice(0, 10)}</td>
                      <td className="p-4 align-middle">
                        <Link to={`/shop/preview/${item._id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                            <AiOutlineEye size={20} />
                          </Button>
                        </Link>
                      </td>
                      <td className="p-4 align-middle">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => { setUserId(item._id); setOpen(true); }}
                          >
                            <AiOutlineDelete size={20} />
                          </Button>
                      </td>
                    </tr>
                  ))}
                  {(!sellers || sellers.length === 0) && (
                    <tr>
                      <td colSpan={7} className="h-24 text-center text-muted-foreground">
                        No sellers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-black/50 flex items-center justify-center h-screen animate-in fade-in duration-200">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-card rounded-xl border border-border shadow-lg p-6">
              <div className="w-full flex justify-end cursor-pointer text-muted-foreground hover:text-foreground">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-xl text-center py-5 font-semibold text-foreground">
                Are you sure you wanna delete this seller?
              </h3>
              <div className="w-full flex items-center justify-center gap-4 mt-4">
                <Button variant="outline" size="lg" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" size="lg" onClick={() => { setOpen(false); handleDelete(userId); }}>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSellers;
