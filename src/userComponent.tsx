import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserState, clearUser, setUser } from './store/userSlice';

const UserComponent: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: UserState) => state);
  console.log('??')
  console.log(user)
  const u = user.user
  console.log(u)
  console.log(u)

  const handleSetUser = () => {
    dispatch(setUser('John Doe'));
  };

  const handleClearUser = () => {
    dispatch(clearUser());
  };

  return (
    <div>
      <h1>User:</h1>
      <button onClick={handleSetUser}>Set User</button>
      <button onClick={handleClearUser}>Clear User</button>
    </div>
  );
};

export default UserComponent;