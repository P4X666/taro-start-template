import React from 'react';
import UserContext from 'src/hooks/User/user';

const useUser = () => React.useContext(UserContext);

export default useUser;
