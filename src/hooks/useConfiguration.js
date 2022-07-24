import React from 'react';
import UserContext from 'src/context/configuration';

const useConfiguration = () => React.useContext(UserContext);

export default useConfiguration;
