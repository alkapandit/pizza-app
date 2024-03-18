import closeIcon from "../assets/closeIcon.svg";
import { IconButton } from "@mui/material";
import "./style.css";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizzaData } from "../redux/reducers/pizzaSlice";
import PropTypes from "prop-types";

const PizzaForm = ({ setOrderFormActive }) => {
  const { pizzaData } = useSelector((state) => state.pizza);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    type: "",
    size: "",
    base: "",
  });

  console.log("formData ---------", formData);
  const typeOptions = useMemo(() => [
    { value: "pepperoni", label: "Pepperoni" },
    { value: "margherita", label: "Margherita" },
    { value: "vegetarian", label: "Vegetarian" },
  ]);

  const sizeOptions = useMemo(() => [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ]);

  const baseOptions = useMemo(() => [
    { value: "thin", label: "Thin Crust" },
    { value: "thick", label: "Thick Crust" },
    { value: "stuffed", label: "Stuffed Crust" },
  ]);

  const memoizedTypeOptions = useMemo(() => {
    return typeOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  }, [typeOptions]);

  const memoizedSizeOptions = useMemo(() => {
    return sizeOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  }, [sizeOptions]);

  const memoizedBaseOptions = useMemo(() => {
    return baseOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  }, [baseOptions]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleClose() {
    setOrderFormActive(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(
      addPizzaData({
        id: pizzaData?.length + 1,
        type: formData?.type,
        size: formData?.size,
        base: formData?.base,
        active: true,
        stages: {
          orderPlaced: { active: true, inTime: new Date() },
          orderMaking: { active: false, inTime: null },
          orderReady: { active: false, inTime: null },
          orderPicked: { active: false, inTime: null },
        },
      })
    );
    console.log("reduxData ---------", pizzaData);
    setOrderFormActive(false);
  }

  return (
    <div className={"popup-box"}>
      <div className={"box"}>
        <div className={"createHead"}>
          <label>Add Order</label>
          <IconButton onClick={handleClose} title="Close">
            <img className="close-icon" src={closeIcon} alt="close" />
          </IconButton>
        </div>
        <div className="horizontalLine createLine"></div>
        <div className={"bodyContainer"}>
          <div className={"popupContentHolder"}>
            <form onSubmit={handleSubmit}>
              <label>
                Type:
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  {memoizedTypeOptions}
                </select>
              </label>
              <br />
              <label>
                Size:
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                >
                  <option value="">Select Size</option>
                  {memoizedSizeOptions}
                </select>
              </label>
              <br />
              <label>
                Base:
                <select
                  name="base"
                  value={formData.base}
                  onChange={handleChange}
                >
                  <option value="">Select Base</option>
                  {memoizedBaseOptions}
                </select>
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

PizzaForm.propTypes = {
  setOrderFormActive: PropTypes.func,
};

export { PizzaForm };
