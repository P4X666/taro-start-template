import React from 'react';
import UserContext from 'src/hooks/Configuration/configuration';

const useConfiguration = () => React.useContext(UserContext);

export default useConfiguration;
