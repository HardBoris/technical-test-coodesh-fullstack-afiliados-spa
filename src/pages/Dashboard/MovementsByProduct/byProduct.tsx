import "./style.css";
import { useEffect } from "react";
import { Movement, useMovement } from "../../../context/MovementContext";
import { Product, useProduct } from "../../../context/ProductContext";

export const MovementsByProduct = () => {
  const { moveList, dateFormatter, movementsList } = useMovement();
  const { productList, productsLoader } = useProduct();

  useEffect(() => {
    movementsList();
    productsLoader();
  }, []);

  const reformed =
    moveList &&
    moveList.map((item) => ({
      ...item,
      date: dateFormatter(item.date),
    }));

  const movementsByProduct = (product: Product): Movement[] =>
    reformed &&
    reformed.filter((item) => item.product.product === product.product);

  return (
    <div className="movements">
      <div className="move_head_wrapper">
        <div className="move_head">
          <div className="move_data">
            <div className="transaction_column">
              <div className="transaction_date">data</div>
            </div>
            <div className="transaction_column">
              <div className="transaction_seller">vendedor</div>
            </div>
            <div className="transaction_column">
              <div className="transaction_price">preço</div>
            </div>
            <div className="transaction_column">
              <div className="transaction_type">tipo</div>
            </div>
          </div>
        </div>
      </div>
      <div className="products_list">
        {productList &&
          productList.map((item) => (
            <div key={item.id} className="product_report">
              <div className="product_head">
                <div className="product_info">{item.product}</div>
                <div className="product_info">{item.producer.name}</div>
                <div className="product_info">
                  TOTAL:{" R$"}
                  {new Intl.NumberFormat("pt-BR").format(
                    movementsByProduct(item).reduce(
                      (a, b) =>
                        b.type.kind === "Entrada" ? a + b.price : a - b.price,
                      0
                    )
                  )}
                </div>
              </div>
              <div>
                {movementsByProduct(item).map((detail, index) => (
                  <div
                    key={detail.id}
                    className={
                      Number(index) % 2 !== 0
                        ? "transaction_row"
                        : "transaction_row alterno"
                    }
                  >
                    <div className="transaction_column">
                      <div className="transaction_date">{detail.date}</div>
                    </div>
                    <div className="transaction_column">
                      <div className="transaction_seller">
                        {detail.seller.name}
                      </div>
                    </div>
                    <div className="transaction_column">
                      <div className="transaction_price">
                        {new Intl.NumberFormat("pt-BR").format(detail.price)}
                      </div>
                    </div>
                    <div className="transaction_column">
                      <div className="transaction_type">{detail.type.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
