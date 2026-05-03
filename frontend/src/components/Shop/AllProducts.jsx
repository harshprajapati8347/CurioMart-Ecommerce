import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop, deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import { Button } from "@/components/ui/button";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

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
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product Id</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stock</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Sold out</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {products && products.map((item) => (
                    <tr key={item._id} className="border-b border-border transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">{item._id}</td>
                      <td className="p-4 align-middle">{item.name}</td>
                      <td className="p-4 align-middle">IND₹ {item.discountPrice}</td>
                      <td className="p-4 align-middle">{item.stock}</td>
                      <td className="p-4 align-middle">{item.sold_out || 0}</td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <Link to={`/product/${item._id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                              <AiOutlineEye size={20} />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(item._id)}
                          >
                            <AiOutlineDelete size={20} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(!products || products.length === 0) && (
                    <tr>
                      <td colSpan={6} className="h-24 text-center text-muted-foreground">
                        No products found.
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

export default AllProducts;
