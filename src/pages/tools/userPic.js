import { useEffect, useState } from "react";
import { useAuth, upload } from "../../firebase-config";

export default function UserPic() {
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


    return (
        <div className="fields">
            <input id="btnEscolherImagem" type="file" onChange={handleChange} />
          <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
          <img src={photoURL} alt="Avatar" className="avatar" />
        </div>
      );
    }