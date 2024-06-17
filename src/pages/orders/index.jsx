import React from 'react';

const Order = () => {
	const [ordersData, setOrdersData] = useState([]);

  const fetchData= async ()=>{
    await fetch("api/myOrdersData",{
      method:"POST",
      headers
    })
  }
	return <div>Order page visible</div>;
};

export default Order;
