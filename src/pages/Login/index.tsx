import "./login.style.css";
import { Button } from "../../components/Button";
import { Formulario } from "../../components/Form";
import { Input } from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignInInfo, useAuth } from "../../context/UserContext";
import { useForm } from "react-hook-form";

const loginSchema = yup.object().shape({
  userName: yup.string().required(),
  userPassword: yup.string().required(),
});

export const Login = () => {
  const { signIn } = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInInfo>({ resolver: yupResolver(loginSchema) });

  const sender = (info: SignInInfo) => {
    signIn(info);
  };

  return (
    <>
      <div className="login">
        <div className="login-sheath">
          <Formulario onSubmit={handleSubmit(sender)}>
            <div className="input-form">
              <h4>Login</h4>
            </div>
            <Input
              type="text"
              name="userName"
              placeholder="Usuário"
              register={register}
              error={errors.userName?.message}
            />
            <Input
              type="password"
              name="userPassword"
              placeholder="Senha"
              register={register}
              error={errors.userPassword?.message}
            />
            <div className="input-form">
              <Button type="submit" variant="neutro yes">
                Entrar
              </Button>
            </div>
          </Formulario>
        </div>
      </div>
    </>
  );
};
