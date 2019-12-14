import React, { useCallback } from 'react';

export interface Props {
  user?: App.User;
  login: (username: string, password: string) => void;
}

export default ({ login, user }: Props) => {
  const onClick = useCallback(() => {
    login('test', '123');
  }, [login]);

  return (
    <div>
      Home
      <button onClick={onClick}>Login</button>
      {user && JSON.stringify(user)}
    </div>
  );
};
