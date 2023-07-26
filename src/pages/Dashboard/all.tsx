import "./dahsboard.style.css";
import { useEffect } from "react";
import { useMovement } from "../../context/MovementContext";

export const AllMovements = () => {
  const { moveList, dateFormatter, movementsList } = useMovement();

  useEffect(() => {
    movementsList();
  }, []);

  const reformed =
    moveList &&
    moveList.map((item) => ({
      ...item,
      date: dateFormatter(item.date),
    }));

  return (
    <div className="movements">
      <div className="move_head_wrapper">
        <div className="move_head">
          <div className="move_data">
            <div className="move_id">id</div>
            <div className="date">data</div>
            <div className="move_type">tipo</div>
            <div className="product">produto</div>
            <div className="price">preço</div>
            <div className="seller">vendedor</div>
          </div>
        </div>
      </div>
      <div className="movements_list">
        {reformed &&
          reformed.map((item, index) => (
            <div
              key={item.id}
              className={
                Number(index) % 2 !== 0 ? "move_row" : "move_row alterno"
              }
            >
              <div className="move_data">
                <div className="move_id">{item.id}</div>
                <div className="date">{item.date}</div>
                <div className="move_type">{item.type.kind}</div>
                <div className="product">{item.product.product}</div>
                <div className="price">{item.price}</div>
                <div className="seller">{item.seller.name}</div>
              </div>
              <div className="move_action"></div>
            </div>
          ))}
      </div>
    </div>
  );
};
