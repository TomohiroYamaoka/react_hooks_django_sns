import React, { createContext, useState, useEffect } from "react";
import { withCookies } from "react";
import axious from "axious";
export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  /*ここでログイン認証が成功した時のユーザーのtokenを取得する。*/
  const token = props.cookies.get("current-token");
  const [profile, setProfile] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [editProfile, setEditProfile] = useState({ id: "", nickName: "" });
  const [askList, setAskList] = useState([]);
  const [askListFull, setAskListFull] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [cover, setCover] = useState([]); /*自分のプロフィールを格納*/
  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const resmy = await axios.get(
          "http://localhost:8000/api/user/myprofile/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const res = await axios.get(
          "http://localhost:8000/api/user/approval/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        resmy.data[0] && setProfile(resmy.data[0]);
        resmy.data[0] &&
          setEditProfile({
            id: resmy.data[0].id,
            nickName: resmy.data[0].nickName,
          });
        resmy.data[0] &&
          setAskList(
            resmy.data.filter((ask) => {
              return resmy.data[0].userPro === ask.askTo;
            })
          );
        setAskListFull(res.data);
      } catch {
        console.log("error");
      }
    };

    const getProfile = async () => {
      try {
        const res = await axious.get(
          "http://localhost:8000/api/user/profile/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setProfiles(res.data);
      } catch {
        console.log("error");
      }
    };
    const getInbox = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/dm/inbox/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setInbox(res.data);
      } catch {
        console.log("error");
      }
    };
    getMyProfile();
    getProfile();
    getInbox();
  }, [token, profile.id]);

  const createProfile = async () => {
    const createData = new FormData();
    createData.append("nickName", editedProfile.nickName);
    cover.name && createData.append("img", cover, cover.name);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/profile/",
        createData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      setProfile(res.data);
      setEditedProfile({ id: res.data.id, nickName: res.data.nickName });
    } catch {
      console.log("error");
    }
  };
  const deleteProfile = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/user/profile/${profile.id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      setProfiles(profiles.filter((dev) => dev.id !== profile.id));
      setProfile([]);
      setEditedProfile({ id: "", nickName: "" });
      setCover([]);
      setAskList([]);
    } catch {
      console.log("error");
    }
  };
  const editProfile = async () => {
    const editData = new FormData();
    editData.append("nickName", editedProfile.nickName);
    cover.name && editData.append("img", cover, cover.name);
    try {
      const res = await axios.put(
        `http://localhost:8000/api/user/profile/${profile.id}/`,
        editData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      setProfile(res.data);
    } catch {
      console.log("error");
    }
  };
  return (
    <div>
      <></>
    </div>
  );
};

export default withCookies(ApiContextProvider);
