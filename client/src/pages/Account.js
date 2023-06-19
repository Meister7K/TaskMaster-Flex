import React from "react";
import AccountManage from "../components/account-manage/AccountManage";
import PlayerCard from "../components/player-card/PlayerCard";

function Account() {
  return (
    <>
      <PlayerCard/>
      <AccountManage />
    </>
  );
}

export default Account;