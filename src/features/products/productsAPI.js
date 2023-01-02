import instanceOfAxios from "../../utils/axios.config";

export const fetchProducts = async () => {
    const data = await instanceOfAxios.get("/products")
    return data.data.data;
}

export const postProduct = async (productData) => {
    await instanceOfAxios.post("/product", productData)
    // return data.data.data;
}

export const deleteProduct = async (id) => {
    await instanceOfAxios.delete(`/product/${id}`)
}