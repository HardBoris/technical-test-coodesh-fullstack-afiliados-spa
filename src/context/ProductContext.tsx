import { ReactNode, createContext, useContext, useState } from "react";
import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";

interface ProductProviderProps {
  children: ReactNode;
}

export interface Product {
  productId: string;
  product: string;
  producer?: string;
}

export interface ProductInfo {
  product: string;
  producer: string;
}

interface ProductContextData {
  thisProduct: Product;
  saveProduct: (info: ProductInfo) => void;
  productFinder: (arg: string) => void;
}

export const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData
);

const useProduct = () => useContext(ProductContext);

const ProductProvider = ({ children }: ProductProviderProps) => {
  const { token } = useAuth();
  const [thisProduct, setThisProduct] = useState<Product>({} as Product);

  const saveProduct = async ({ product, producer }: ProductInfo) => {
    await api
      .post(
        "/products/register",
        { product, producer },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const productFinder = async (product: string) => {
    await api
      .get(`/products/${product}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => setThisProduct(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <ProductContext.Provider
      value={{ thisProduct, saveProduct, productFinder }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { useProduct, ProductProvider };
