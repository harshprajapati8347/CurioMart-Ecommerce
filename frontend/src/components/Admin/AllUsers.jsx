import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/user";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${import.meta.env.VITE_APP_SERVER_URL}/user/delete-user/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
         toast.error(err.response?.data?.message || "Error deleting user");
      });

    dispatch(getAllUsers());
  };

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-semibold pb-2 text-foreground">All Users</h3>
        <div className="w-full min-h-[45vh] bg-card rounded-md border border-border shadow-sm overflow-hidden">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b border-border">
                  <tr className="border-b border-border transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User Role</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined At</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {users && users.map((item) => (
                    <tr key={item._id} className="border-b border-border transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">{item._id}</td>
                      <td className="p-4 align-middle">{item.name}</td>
                      <td className="p-4 align-middle">{item.email}</td>
                      <td className="p-4 align-middle">{item.role}</td>
                      <td className="p-4 align-middle">{item.createdAt.slice(0, 10)}</td>
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
                  {(!users || users.length === 0) && (
                    <tr>
                      <td colSpan={6} className="h-24 text-center text-muted-foreground">
                        No users found.
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
                Are you sure you wanna delete this user?
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

export default AllUsers;
