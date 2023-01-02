import instanceOfAxios from "../../utils/axios.config";

export const fetchProducts = async () => {
    const data = await instanceOfAxios.get("/products")
    return data.data.data;
}