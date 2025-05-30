//client\src\hooks\useAuth.js

import { useContext } from "react";
import AuthContext from "../context/temp";

export const useAuth = () => useContext(AuthContext);
