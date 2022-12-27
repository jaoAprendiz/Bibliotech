import { useRef, useState } from "react";

import { signup, login, logout, useAuth } from "../firebase-config";
import Profile from "./tools/Profile";

function UserConfig() {
    const [ loading, setLoading ] = useState(false);
    const currenteUser = useAuth();

    return (
    <div>
      {currenteUser && 
        <>
          <Profile />
        </>
}

    </div>
    )
    }

  export default UserConfig;