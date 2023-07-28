import { ReactNode, createContext, useContext, useState } from "react";
import { api } from "../services/api";
import { User, useAuth } from "./UserContext";

interface ProductProviderProps {
  children: ReactNode;
}

export interface Product {
  id: string;
  product: string;
  producer: User;
}

export interface ProductInfo {
  product: string;
  producer: string;
}

interface ProductContextData {
  thisProduct: Product;
  productList: Product[];
  saveProduct: (info: ProductInfo) => void;
  productFinder: (arg: string) => void;
  productsLoader: () => void;
}

export const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData
);

const useProduct = () => useContext(ProductContext);

const ProductProvider = ({ children }: ProductProviderProps) => {
  const { token } = useAuth();
  const [thisProduct, setThisProduct] = useState<Product>({} as Product);
  const [productList, setProductList] = useState<Product[]>([]);

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

  const productsLoader = async () => {
    await api
      .get("/products", { headers: { authorization: `Bearer ${token}` } })
      .then((response) => setProductList(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <ProductContext.Provider
      value={{
        thisProduct,
        productList,
        saveProduct,
        productFinder,
        productsLoader,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { useProduct, ProductProvider };
