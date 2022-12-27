import { useEffect, useState } from "react";
import { useAuth, upload } from "../../firebase-config";

export default function Profile() {
  const currenteUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

    function handleChange(e) {
        if (e.target.files[0]) {
          setPhoto(e.target.files[0])
        }
      }

    function handleClick() {
      upload(photo, currenteUser, setLoading);
    }

    
    useEffect(() => {
        if (currenteUser?.photoURL) {
          setPhotoURL(currenteUser.photoURL);
        }
      }, [currenteUser])

      const avatar2 = {
        verticalAlign: "middle",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        borderWidth: "5px",
        borderColor: "gray",
        borderStyle: "outset",
      }


    return (
        <div className="fields">
          <img src={photoURL} alt="Avatar" className="avatar" style={avatar2} />
        </div>
      );
    }