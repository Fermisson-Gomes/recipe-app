import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestFoodDetails, requestDrinkDetails } from '../endPoints/requestAPI';

function FoodsId() {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  useEffect(() => {
    const Details = async () => {
      if (pathname.includes('/foods')) {
        const five = -5;
        const id = pathname.slice(five);
        await requestFoodDetails(id);
      }
      if (pathname.includes('/drinks')) {
        const five = -6;
        const id = pathname.slice(five);
        await requestDrinkDetails(id);
        console.log(id);
      }
    };
    Details();
  }, [pathname]);

  return (
    <h1>Foods Id</h1>
  );
}

export default FoodsId;
