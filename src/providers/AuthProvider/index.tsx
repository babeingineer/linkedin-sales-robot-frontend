import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { setToken } from "../../utils/axios";

interface IAccount {
  _id?: string;
  id?: string;
  email?: string;
  hasLinkedin?: boolean;
}

const initialAccount: IAccount = {} as IAccount;

interface IAuthContext {
  isLogin: boolean;
  setIsLogin: (_: boolean) => void;
  account: IAccount | null;
  setAccount: (_: IAccount) => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  isLogin: false,
  setIsLogin: () => {},
  account: {},
  setAccount: () => {},
});

interface IMainProps {
  children: React.ReactNode;
}

function Main({ children }: IMainProps) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [account, setAccount] = useState<IAccount | null>(initialAccount);

  const userLogin = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await axios("/me", {
      headers: {
        authorization: token,
      },
    }).then((response) => response.data);
    const { id, email, signed: hasLinkedin } = response;

    setAccount({ id, email, hasLinkedin });
    setIsLogin(true);
    setToken(token);
    navigate("/");
  };

  useEffect(() => {
    userLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, account, setAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Main;
