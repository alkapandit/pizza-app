import { useDispatch, useSelector } from "react-redux";
import { calculateTimeDifference } from "./Util";
import PropTypes from "prop-types";
import { cancelPizzaData } from "../redux/reducers/pizzaSlice";

function PizzaDeliveredTable({ currentTime }) {
  const { pizzaData } = useSelector((state) => state.pizza);
  const dispatch = useDispatch();
  const findStages = (d) => {
    if (d?.stages?.orderPlaced?.active) {
      return "Order Placed";
    } else if (d?.stages?.orderMaking?.active) {
      return "Order In Making";
    } else if (d?.stages?.orderReady?.active) {
      return "Order Ready";
    } else {
      return "Order Picked";
    }
  };
  const cancelOrder = (id) => {
    dispatch(cancelPizzaData(id));
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Stage</th>
            <th>Total time spent (time from order placed)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pizzaData?.map((d, index) => {
            return (
              <tr key={index}>
                <td>Order Id: {d?.id}</td>
                <td>{findStages(d)}</td>
                <td>
                  {d?.active &&
                    calculateTimeDifference(
                      d?.stages?.orderPlaced?.inTime,
                      d?.stages?.orderPicked?.inTime ?? currentTime
                    ).text}
                </td>
                <td>
                  {(d?.stages?.orderPlaced?.active ||
                    d?.stages?.orderMaking?.active) &&
                    d?.active && (
                      <button
                        onClick={() => {
                          cancelOrder(d?.id);
                        }}
                      >
                        Cancel Button
                      </button>
                    )}
                  {!d?.active && "Cancelled"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

PizzaDeliveredTable.propTypes = {
  currentTime: PropTypes.object,
};

export default PizzaDeliveredTable;
