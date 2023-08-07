import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'
import { IProduct } from '../interface/product';

const productApi = createApi({
    reducerPath:"product",
    tagTypes:['Product'],
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:3000",
        fetchFn:async(...args)=>{
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints:(builder)=>({
        //actions
        getProducts:builder.query<IProduct[], void>({
            query:()=>`/products`,
            providesTags:['Product']
        }),
        getProductById:builder.query<IProduct,number|string>({
            query:(id)=>`/products/${id}`,
            providesTags:['Product']
        }),
        deleteProduct:builder.mutation<void,number|string>({
            query:(id)=>({
                url:`/products/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:['Product']
        }),
        addProduct:builder.mutation<IProduct,IProduct>({
            query:(product)=>({
                url:`/products`,
                method:"POST",
                body:product
            }),
            invalidatesTags:['Product']
        }),
        updateProduct:builder.mutation<IProduct,IProduct>({
            query:(product)=>({
                url:`/products/${product.id}`,
                method:"PATCH",
                body:product
            }),
            invalidatesTags:['Product']
        })
    })
});

export const {useGetProductsQuery,useGetProductByIdQuery,useAddProductMutation,useUpdateProductMutation,useDeleteProductMutation} = productApi;
export const productReducer = productApi.reducer;
export default productApi