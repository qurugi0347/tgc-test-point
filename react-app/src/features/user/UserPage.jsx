import React, {useEffect, useState} from "react";
import BaseLayout from "components/layout/BaseLayout";
import useModalContext from "hooks/useModalContext";
import UserList from "./components/UserList";
import {getUserList} from "api/user";

const UserPage = () => {
  const modalContext = useModalContext();
  const [userData, setUserData] = useState([]);

  const getData = async () => {
    modalContext.loading();
    const res = await getUserList();
    modalContext.popLoading();

    setUserData(res?.data?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout title="유저">
      <UserList userData={userData} />
    </BaseLayout>
  );
};

export default UserPage;
