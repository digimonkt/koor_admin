import { cleanEnv, str } from "envalid";
const env = cleanEnv(process.env, {
  REACT_APP_BACKEND_URL: str(),
  REACT_APP_REDIRECT_URL: str(),
});

export default env;
