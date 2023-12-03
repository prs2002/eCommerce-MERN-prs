import {apiSlice} from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createOrder: builder.mutation({
        query: (order) => ({
          url: ORDERS_URL,
          method: 'POST',
          body: {...order},
        }),
      }),
      getMyOrders: builder.query({
        query: () => ({
          url: `${ORDERS_URL}/myorders`,
        }),
        keepUnusedDataFor: 5,
      }),
      getOrderDetails: builder.query({
        query: (orderId) => ({
          url: `${ORDERS_URL}/${orderId}`,
          method: 'GET',
        }),
        keepUnusedDataFor: 5
      }),
      payOrder: builder.mutation({
        query: ({ orderId, details }) => ({
          url: `${ORDERS_URL}/${orderId}/pay`,
          method: 'PUT',
          body: {...details},
        }),
      }),
      getPaypalClientId: builder.query({
        query: () => ({
          url: PAYPAL_URL,
        }),
        keepUnusedDataFor: 5,
      }),
      deliverOrder: builder.mutation({
        query: (orderId) => ({
          url: `${ORDERS_URL}/${orderId}/deliver`,
          method: 'PUT',
        }),
      }),
    }),
  });
  
  export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery,
    useGetMyOrdersQuery,
    useDeliverOrderMutation,
  } = ordersApiSlice;