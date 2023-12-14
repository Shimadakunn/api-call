import axios from 'axios';

const BASE_URL = 'https://api.binance.com';

async function createOrder(
  api_key: string,
  secret_key: string,
  direction: string,
  price: number,
  amount: number,
  pair: string = 'BTCUSD_d',
  orderType: string = 'LimitOrder'
): Promise<void> {
  const url = `${BASE_URL}/api/v3/order`;
  const data = {
    symbol: pair,
    side: direction.toUpperCase(),
    type: orderType.toUpperCase(),
    price,
    quantity: amount,
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'X-MBX-APIKEY': api_key,
      }
    });
    console.log('Order Created:', response.data);
  } catch (error) {
    console.error('Error creating order:', error);
  }
}


async function cancelOrder(api_key: string, secret_key: string, uuid: string): Promise<void> {
  const url = `${BASE_URL}/api/v3/order`;
  const data = {
    orderId: uuid,
  };

  try {
    const response = await axios.delete(url, {
      headers: {
        'X-MBX-APIKEY': api_key,
      },
      data: data
    });
    console.log('Order Cancelled:', response.data);
  } catch (error) {
    console.error('Error cancelling order:', error);
  }
}
