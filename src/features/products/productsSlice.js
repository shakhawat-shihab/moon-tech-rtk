import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct } from "./productsAPI";
const initialState = {
    products: [],
    isLoading: false,
    postSuccess: false,
    deleteSuccess: false,
    isError: false,
    error: ""
};

export const getProducts = createAsyncThunk("products/getProduct", async () => {
    const products = fetchProducts();
    return products;
})

export const addProduct = createAsyncThunk("products/addProduct", async (data) => {
    const products = postProduct(data);
    return products;
})

export const removeProduct = createAsyncThunk("products/removeProduct", async (_id, thunkAPI) => {
    await deleteProduct(_id);
    thunkAPI.dispatch(removeFromList(_id))
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        togglePostSuccess: (state) => {
            state.postSuccess = false;
        },
        toggleDeleteSuccess: (state) => {
            state.deleteSuccess = false;
        },
        removeFromList: (state, action) => {
            state.products = state.products.filter(x => x._id != action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                console.log(action.payload)
                state.products = action.payload;
                state.isLoading = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })

            .addCase(addProduct.pending, (state, action) => {
                state.isLoading = true;
                state.postSuccess = false;
                state.isError = false;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.postSuccess = true;
                state.isLoading = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.products = [];
                state.postSuccess = false;
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })

            .addCase(removeProduct.pending, (state, action) => {
                state.isLoading = true;
                state.deleteSuccess = false;
                state.isError = false;
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.deleteSuccess = true;
                state.isLoading = false;
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.products = [];
                state.deleteSuccess = false;
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            });

    }


})

export const { togglePostSuccess, toggleDeleteSuccess, removeFromList } = productsSlice.actions;
export default productsSlice.reducer;

