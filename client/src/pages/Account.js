import Auth from "../utils/auth";

const user = Auth.loggedIn() ? Auth.getProfile().data.username : null;
const Account = () => {

  // Fetch the user's account data based on the username

  return (
    <div>
      <h1>{user}'s Account</h1>
      {/* Display user account information */}
    </div>
  );
};

export default Account;