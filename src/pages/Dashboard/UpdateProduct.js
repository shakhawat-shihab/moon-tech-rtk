import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import updateProductData from "../../redux/thunk/products/updateProductData";

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.product);
    const { register, handleSubmit } = useForm();
    const [product, setProduct] = useState({});
    const [isLoading, setIsloading] = useState(true);
    const { id } = useParams();

    console.log('PRODUCTS IN UPDATEPRODUCT.JS ', products, id);

    useEffect(() => {
        // console.log('all products ', products);
        if (products?.length) {
            setIsloading(true);
            const found = products.find(x => x._id == id);
            console.log('found ', found);
            setProduct(found);
            setIsloading(false);
        }

    }, [products, id, dispatch])


    const submit = (data) => {
        const product = {
            model: data.model,
            brand: data.brand,
            status: data.status === "true" ? true : false,
            price: data.price,
            keyFeature: [
                data.keyFeature1,
                data.keyFeature2,
                data.keyFeature3,
                data.keyFeature4,
            ],
            spec: [],
        };

        console.log(product);
        //add product data to mongo db
        // dispatch(updateProductData(product, id))
    };

    return (
        <div className='flex justify-center items-center h-full '>
            {
                !isLoading
                &&
                <form
                    className='shadow-lg p-10 rounded-md flex flex-wrap gap-3 max-w-3xl justify-between bg-white'
                    onSubmit={handleSubmit(submit)}
                >
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='model'>
                            Model
                        </label>
                        <input type='text' id='model' {...register("model")} defaultValue={product?.model} />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='image'>
                            Image
                        </label>
                        <input type='text' name='image' id='image' {...register("image")} defaultValue={product?.image} />
                    </div>

                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-3' htmlFor='brand'>
                            Brand
                        </label>
                        <select name='brand' id='brand' {...register("brand")} defaultValue={product?.brand}>
                            <option defaultValue='amd'>AMD</option>
                            <option defaultValue='intel'>Intel</option>
                        </select>
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='price'>
                            Image
                        </label>
                        <input type='text' name='price' id='price' {...register("price")} defaultValue={product?.price} />
                    </div>

                    <div className='flex flex-col w-full max-w-xs'>
                        <h1 className='mb-3'>Availability</h1>
                        <div className='flex gap-3'>
                            <div>
                                <input
                                    type='radio'
                                    id='available'
                                    // defaultValue={true}
                                    {...register("status")}
                                    checked={product?.status ? true : false}

                                />
                                <label className='ml-2 text-lg' htmlFor='available'>
                                    Available
                                </label>
                            </div>
                            <div>
                                <input
                                    type='radio'
                                    id='stockOut'
                                    name='status'
                                    // defaultValue={false}
                                    {...register("status")}
                                    checked={!product?.status ? 'true' : 'false'}
                                />
                                <label className='ml-2 text-lg' htmlFor='stockOut'>
                                    Stock out
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full max-w-xs'></div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='keyFeature1'>
                            Key Feature 1
                        </label>
                        <input
                            type='text'
                            name='keyFeature1'
                            id='keyFeature1'
                            {...register("keyFeature1")}
                            defaultValue={product?.keyFeature?.[0]}
                        />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='keyFeature2'>
                            Key Feature 2
                        </label>
                        <input
                            type='text'
                            name='keyFeature2'
                            id='keyFeature2'
                            {...register("keyFeature2")}
                            defaultValue={product?.keyFeature?.[1]}
                        />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='keyFeature3'>
                            Key Feature 3
                        </label>
                        <input
                            type='text'
                            name='keyFeature3'
                            id='keyFeature3'
                            {...register("keyFeature3")}
                            defaultValue={product?.keyFeature?.[2]}
                        />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='keyFeature4'>
                            Key Feature 4
                        </label>
                        <input
                            type='text'
                            name='keyFeature4'
                            id='keyFeature4'
                            {...register("keyFeature4")}
                            defaultValue={product?.keyFeature?.[3]}
                        />
                    </div>

                    <div className='flex justify-between items-center w-full'>
                        <button
                            className=' px-4 py-3 bg-indigo-500 rounded-md font-semibold text-white text-lg disabled:bg-gray-500'
                            type='submit'
                        // onClick={()=>updateProductData(product,_id)}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            }

        </div>
    );
};

export default UpdateProduct;
