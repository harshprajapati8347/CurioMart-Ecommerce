import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupouns] = useState([]);
  const [minAmount, setMinAmout] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [value, setValue] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_APP_SERVER_URL}/coupon/get-coupon/${
          seller._id
        }`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch, seller._id]);

  const handleDelete = async (id) => {
    axios
      .delete(
        `${import.meta.env.VITE_APP_SERVER_URL}/coupon/delete-coupon/${id}`,
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Coupon code deleted succesfully!");
        window.location.reload();
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${import.meta.env.VITE_APP_SERVER_URL}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Coupon code created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10">
          <div className="w-full flex justify-end mb-4">
            <Button onClick={() => setOpen(true)} size="lg">
              Create Coupon Code
            </Button>
          </div>
          
          <div className="rounded-md border border-border bg-card">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b border-border">
                  <tr className="border-b border-border transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Id</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Coupon Code</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Value</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {coupouns && coupouns.map((item) => (
                    <tr key={item._id} className="border-b border-border transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">{item._id}</td>
                      <td className="p-4 align-middle font-medium">{item.name}</td>
                      <td className="p-4 align-middle">{item.value} %</td>
                      <td className="p-4 align-middle">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(item._id)}
                          >
                            <AiOutlineDelete size={20} />
                          </Button>
                      </td>
                    </tr>
                  ))}
                  {(!coupouns || coupouns.length === 0) && (
                    <tr>
                      <td colSpan={4} className="h-24 text-center text-muted-foreground">
                        No coupons found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-black/50 z-[20000] flex items-center justify-center animate-in fade-in duration-200">
              <div className="w-[90%] 800px:w-[40%] max-h-[90vh] overflow-y-auto bg-card rounded-xl border border-border shadow-lg p-6">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={25}
                    className="cursor-pointer text-muted-foreground hover:text-foreground"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-2xl font-semibold text-center text-foreground mb-6">
                  Create Coupon code
                </h5>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="w-full h-10 px-3 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your coupon code name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Discount Percentage <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      required
                      className="w-full h-10 px-3 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter your coupon code value..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Min Amount</label>
                    <input
                      type="number"
                      value={minAmount}
                      className="w-full h-10 px-3 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      onChange={(e) => setMinAmout(e.target.value)}
                      placeholder="Enter your coupon code min amount..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Max Amount</label>
                    <input
                      type="number"
                      value={maxAmount}
                      className="w-full h-10 px-3 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter your coupon code max amount..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Selected Product</label>
                    <select
                      className="w-full h-10 px-3 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="Choose your selected products">
                        Choose a selected product
                      </option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full">
                      Create Coupon
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
