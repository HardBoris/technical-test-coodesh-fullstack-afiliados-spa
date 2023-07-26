import "./style.css";
import { useEffect } from "react";
import { Movement, useMovement } from "../../../context/MovementContext";
import { User, useAuth } from "../../../context/UserContext";

export const MovementsByUser = () => {
  const { moveList, dateFormatter, movementsList } = useMovement();
  const { usersList, usersLoader } = useAuth();

  useEffect(() => {
    movementsList();
    usersLoader();
  }, []);

  const reformed =
    moveList &&
    moveList.map((item) => ({
      ...item,
      date: dateFormatter(item.date),
    }));

  const movementsByUser = (user: User): Movement[] =>
    reformed && reformed.filter((item) => item.seller.name === user.name);

  return (
    <div className="movements">
      <div className="move_head_wrapper">
        <div className="move_head">
          <div className="move_data">
            <div className="transaction_column">
              <div className="transaction_date">data</div>
            </div>
            <div className="transaction_column">
              <div className="transaction_seller">produto</div>
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
        {usersList &&
          usersList.map(
            (item) =>
              item.name !== "admin" && (
                <div key={item.id} className="product_report">
                  <div className="product_head">
                    <div className="product_info">{item.name}</div>
                    <div className="product_info">
                      TOTAL:{" R$"}
                      {new Intl.NumberFormat("pt-BR").format(
                        movementsByUser(item).reduce(
                          (a, b) =>
                            b.type.kind === "Entrada"
                              ? a + b.price
                              : a - b.price,
                          0
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    {movementsByUser(item).map((detail, index) => (
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
                            {detail.product.product}
                          </div>
                        </div>
                        <div className="transaction_column">
                          <div className="transaction_price">
                            {new Intl.NumberFormat("pt-BR").format(
                              detail.price
                            )}
                          </div>
                        </div>
                        <div className="transaction_column">
                          <div className="transaction_type">
                            {detail.type.type}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};
