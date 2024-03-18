import { useEffect, useState } from "react";
import { PizzaForm } from "./PizzaForm";
import PizzaStages from "./PizzaStages";
import { useSelector } from "react-redux";
import "./style.css";
import PizzaDeliveredTable from "./PizzaDeliveredTable";

function PizzaApp() {
  const [orderFormActive, setOrderFormActive] = useState(false);
  const { pizzaData } = useSelector((state) => state.pizza);
  function addOrder() {
    const isRestroBusy = pizzaData?.filter(
      (data) =>
        data?.stages?.orderPlaced?.active || data?.stages?.orderMaking?.active
    ).length;
    if (isRestroBusy > 5) {
      alert("Not taking any order for now");
      return;
    }
    setOrderFormActive(true);
  }
  console.log("reduxData ---------", pizzaData);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <button onClick={addOrder}>Add Order</button>
      {orderFormActive && <PizzaForm setOrderFormActive={setOrderFormActive} />}
      <PizzaStages currentTime={currentTime} />
      <PizzaDeliveredTable currentTime={currentTime} />
    </div>
  );
}

export default PizzaApp;
