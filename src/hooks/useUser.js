import React from 'react';
import UserContext from 'src/context/user';

const useUser = () => React.useContext(UserContext);

export default useUser;
