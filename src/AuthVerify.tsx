import { withRouter, RouteComponentProps } from "react-router-dom";

interface AuthVerifyProps extends RouteComponentProps {
  logOut: () => void
}

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props: AuthVerifyProps) => {
  props.history.listen(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedJwt = parseJwt(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  });

  return <div></div>;
};

export default withRouter(AuthVerify);
