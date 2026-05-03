import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_SERVER_URL}/event/admin-all-events`, {
        withCredentials: true,
      })
      .then((res) => {
        setEvents(res.data.events);
      });
  }, []);

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-semibold pb-2 text-foreground">All Events</h3>
        <div className="w-full min-h-[45vh] bg-card rounded-md border border-border shadow-sm overflow-hidden">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b border-border">
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product Id</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stock</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Sold out</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Preview</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {events && events.map((item) => (
                  <tr key={item._id} className="border-b border-border transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">{item._id}</td>
                    <td className="p-4 align-middle">{item.name}</td>
                    <td className="p-4 align-middle">IND₹ {item.discountPrice}</td>
                    <td className="p-4 align-middle">{item.stock}</td>
                    <td className="p-4 align-middle">{item.sold_out || 0}</td>
                    <td className="p-4 align-middle">
                      <Link to={`/product/${item._id}?isEvent=true`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                          <AiOutlineEye size={20} />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                {(!events || events.length === 0) && (
                  <tr>
                    <td colSpan={6} className="h-24 text-center text-muted-foreground">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
