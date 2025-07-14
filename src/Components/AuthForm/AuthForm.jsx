import { useForm } from "react-hook-form";
import { useState } from "react";
import FormInput from "../FormInput/FormInput";
import Loader from "../Loader/Loader";
import { formData } from "./login_form_data.js";
import { signUpFormData } from "./signup_form_data.js";
import style from "./auth_form.module.css"
import { userSignUp, userLogIn } from "../../Requests/requestService.js";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [action, setAction] = useState("log-in");

  return (
    <div className={style.wrapper}>
      {action == "log-in" ? <LoginForm setAction={setAction}/> : <SignupForm setAction={setAction}/>}
    </div>
  );
}

function LoginForm({ setAction }) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    setFocus,
  } = useForm({
    mode: "all",
  });

  const navigate = useNavigate()

  const onLoginSubmit = async (data) => {
    setLoading(true);
    const userValidateData = await userLogIn(data.username, data.password);
    setLoading(false);
    if (userValidateData) {
      if (userValidateData.username) {
        setError("username", {
          message: userValidateData.username,
        });
        setFocus("username");
      }
      if (userValidateData.password) {
        setError("password", {
          message: userValidateData.password,
        });
        setFocus("password");
      }
      return;
    } else {
      navigate('/web/graph');
    }
  };

  const [loading, setLoading] = useState(false);

  return (
    <div className={style.form_wrapper}>
      <form onSubmit={handleSubmit(onLoginSubmit)}>

        <Loader isVisible={loading}/>

        <p className={style.title}>ASSIGNMENT 4 WEB</p>
        <p className={style.subtitle}>Рыцев Максим (409483)</p>

        {formData.map((el) => (
          <FormInput
          {...el}
          register={register(el.name, el.registerConfig)}
          errors={errors[el.name]}
          />
        ))}

        <input
        className={isValid ? style.submit_button : style.submit_button + " " + style.disabled}
        style={{
        marginTop: "10px",
        }}
        type="submit"
        value="Войти"
        />
      </form>
      <button className={style.action_button} onClick={() => setAction("sign-up")}>Нет аккаунта?</button>
    </div>
  );
}

function SignupForm({ setAction }) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    setFocus,
  } = useForm({
    mode: "all",
  });

  const navigate = useNavigate()

  const onSignUpSubmit = async (data) => {
    setLoading(true);
    const userValidateData = await userSignUp(data.username, data.password);
    setLoading(false);
    if (userValidateData) {
      if (userValidateData.username) {
        setError("username", {
          message: userValidateData.username,
        });
        setFocus("username");
      }
      if (userValidateData.password) {
        setError("password", {
          message: userValidateData.password,
        });
        setFocus("password");
      }
      return;
    } else {
      navigate('/web/graph');
    }
  };

  const [loading, setLoading] = useState(false);

  return (
    <div className={style.form_wrapper}>
      <form onSubmit={handleSubmit(onSignUpSubmit)}>

        <Loader isVisible={loading}/>

        <p className={style.title}>ASSIGNMENT 4 WEB</p>
        <p className={style.subtitle}>Рыцев Максим (409483)</p>

        {signUpFormData.map((el) => (
          <FormInput
          {...el}
          register={register(el.name, el.registerConfig)}
          errors={errors[el.name]}
          />
        ))}

        <input
        className={isValid ? style.submit_button : style.submit_button + " " + style.disabled}
        style={{
        marginTop: "10px",
        }}
        type="submit"
        value="Зарегистрироваться"
        />
      </form>
      <button className={style.action_button} onClick={() => setAction("log-in")}>Есть аккаунт?</button>
    </div>
  );
}