import { useParams } from "react-router-dom";

export const UserAccount = () => {
  const { username } = useParams();

  // Fetch the user's account data based on the username

  return (
    <div>
      <h1>{username}'s Account</h1>
      {/* Display user account information */}
    </div>
  );
};
