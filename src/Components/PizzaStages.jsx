import { useDispatch, useSelector } from "react-redux";
import { setPizzaData } from "../redux/reducers/pizzaSlice";
import "./style.css";
import { calculateTimeDifference } from "./Util";
import PropTypes from "prop-types";

function PizzaStages({ currentTime }) {
  const { pizzaData } = useSelector((state) => state.pizza);
  const dispatch = useDispatch();

  function changeStatus(data) {
    if (data?.orderPlaced?.active) {
      return {
        ...data,
        orderPlaced: { ...data.orderPlaced, active: false },
        orderMaking: { active: true, inTime: new Date() },
      };
    } else if (data?.orderMaking?.active) {
      return {
        ...data,
        orderMaking: { ...data.orderMaking, active: false },
        orderReady: { active: true, inTime: new Date() },
      };
    } else if (data?.orderReady?.active) {
      return {
        ...data,
        orderReady: { ...data.orderReady, active: false },
        orderPicked: { active: true, inTime: new Date() },
      };
    }
  }

  function goToNext(orderId) {
    let list = structuredClone(pizzaData);
    let updatedData = list?.map((pData) => {
      if (pData?.id === orderId) {
        return { ...pData, stages: changeStatus(pData?.stages) };
      }
      return pData;
    });

    dispatch(setPizzaData(updatedData));
  }

  const getPizzaOverdueTime = (size) => {
    if (size === "medium") {
      return 240;
    } else if (size === "large") {
      return 300;
    }
    return 180;
  };
  return (
    <div className="pizzaStageContainer">
      <table>
        <thead>
          <tr>
            <th>Order Placed</th>
            <th>Order in Making</th>
            <th>Order Ready</th>
            <th>Order Picked</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {pizzaData?.map((pizza, index) => {
                return (
                  pizza?.stages?.orderPlaced?.active &&
                  pizza?.active && (
                    <div
                      key={index}
                      style={{
                        border: "1px solid black",
                        background: `${
                          calculateTimeDifference(
                            pizza?.stages?.orderPlaced?.inTime,
                            currentTime
                          ).diff > getPizzaOverdueTime(pizza?.size)
                            ? "red"
                            : ""
                        }`,
                      }}
                    >
                      <h6>Order {pizza?.id}</h6>
                      <p>
                        {
                          calculateTimeDifference(
                            pizza?.stages?.orderPlaced?.inTime,
                            currentTime
                          ).text
                        }
                      </p>
                      <button
                        onClick={() => {
                          goToNext(pizza?.id);
                        }}
                      >
                        Next
                      </button>
                    </div>
                  )
                );
              })}
            </td>
            <td>
              {pizzaData?.map((pizza, index) => {
                return (
                  pizza?.stages?.orderMaking?.active &&
                  pizza?.active && (
                    <div
                      key={index}
                      style={{
                        border: "1px solid black",
                        background: `${
                          calculateTimeDifference(
                            pizza?.stages?.orderMaking?.inTime,
                            currentTime
                          ).diff > getPizzaOverdueTime(pizza?.size)
                            ? "red"
                            : ""
                        }`,
                      }}
                    >
                      <h6>Order {pizza?.id}</h6>
                      <p>
                        {
                          calculateTimeDifference(
                            pizza?.stages?.orderMaking?.inTime,
                            currentTime
                          ).text
                        }
                      </p>
                      <button
                        onClick={() => {
                          goToNext(pizza?.id);
                        }}
                      >
                        Next
                      </button>
                    </div>
                  )
                );
              })}
            </td>
            <td>
              {pizzaData?.map((pizza, index) => {
                return (
                  pizza?.stages?.orderReady?.active &&
                  pizza?.active && (
                    <div
                      key={index}
                      style={{
                        border: "1px solid black",
                        background: `${
                          calculateTimeDifference(
                            pizza?.stages?.orderReady?.inTime,
                            currentTime
                          ).diff > getPizzaOverdueTime(pizza?.size)
                            ? "red"
                            : ""
                        }`,
                      }}
                    >
                      <h6>Order {pizza?.id}</h6>
                      <p>
                        {
                          calculateTimeDifference(
                            pizza?.stages?.orderReady?.inTime,
                            currentTime
                          ).text
                        }
                      </p>
                      <button
                        onClick={() => {
                          goToNext(pizza?.id);
                        }}
                      >
                        Next
                      </button>
                    </div>
                  )
                );
              })}
            </td>
            <td>
              {pizzaData?.map((pizza, index) => {
                return (
                  pizza?.stages?.orderPicked?.active &&
                  pizza?.active && (
                    <div key={index}>
                      <h6>Order {pizza?.id}</h6>
                      <p>Picked</p>
                    </div>
                  )
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

PizzaStages.propTypes = {
  currentTime: PropTypes.object,
};

export default PizzaStages;
