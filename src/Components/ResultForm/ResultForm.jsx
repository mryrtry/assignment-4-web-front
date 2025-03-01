import { resultFormData } from "./result_form_data";
import Loader from "../Loader/Loader"
import { useForm } from "react-hook-form";
import { useState } from "react";
import FormInput from "../FormInput/FormInput"
import style from "./result_form.module.css"
import inputStyle from "../FormInput/form_input.module.css"

export default function ResultForm({ radius, radiusStateFunc, formHandle, deleteHandle }) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    setFocus,
  } = useForm({
    mode: "all",
  });

  const onResultFormSubmit = async (data) => {
    setLoading(true);
    const formData = {
      x: data.x,
      y: data.y,
      r: String(radius)
    }
    await formHandle(formData);
    setLoading(false)
  };

  const onResultFormDelete = async () => {
    setLoading(true);
    await deleteHandle();
    setLoading(false);
  }

  const [loading, setLoading] = useState()

  return (
    <>
    <form onSubmit={handleSubmit(onResultFormSubmit)} style={{ marginTop: "10px" }}>
      <Loader isVisible={loading}/>

      {resultFormData.map((el) => (
        <FormInput
        {...el}
        register={register(el.name, el.registerConfig)}
        errors={errors[el.name]}
        />
      ))}

      <label className={inputStyle.modal_input_field}>
          <p className={inputStyle.modal_input_label}>Выберите R</p>
          <p className={inputStyle.modal_input_description}>Выберите значения радиуса</p>
      </label>
      <div className={style.radio_container}>
      {[1, 1.5, 2, 2.5, 3].map((value) => (
        <div className={style.form_radio} key={value * 2 + 1}>
          <input
            type="radio"
            name="radius"
            value={value}
            checked={radius === value}
            onChange={() => {}}
          />
          <label htmlFor="radio" onClick={() => radiusStateFunc(value)}>{value}</label>
        </div>
      ))}
      </div>

      <input
        className={style.submit_button}
        style={{ marginTop: "10px" }}
        type="submit"
        value="Отправить"
      />

      <div
        className={style.submit_button}
        style={{ marginTop: "10px", marginLeft: "5px", display: "inline-block", cursor: "pointer" }}
        onClick={() => onResultFormDelete()}
      >Удалить все точки</div>

    </form>
    </>
  )
}