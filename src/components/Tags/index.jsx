import { useEffect, useState } from "react";
import { getTag } from "../../app/api/tags";
import { getProduct } from "../../app/api/product";
import { getAllProducts } from "../../app/features/product/actions";
import { useDispatch } from "react-redux";

const Tags = () => {
    const [dataTags, setDataTags] = useState([]);
    const [search, setSearch] = useState([]);
    const dispatch = useDispatch();
    window.tags = [];

    useEffect(() => {
        getProductWhereTag();
    }, [search]);

    useEffect(() => {
        getTags();
    }, []);

    const getProductWhereTag = async () => {
        for (var i = 0; i < search.length; i++) {
            window.tags.push(search[i]);
        }
        //! Belum mendapatkan data saat di get data dengan tags
        console.log(window.tags);
        let res = await getProduct('', '', JSON.stringify(window.tags));
        console.log(res.data.data);
        const data = getAllProducts(res.data.data);
        dispatch(data);
    }

    const handleTags = (tag) => {
        const elementExists = search.includes(tag);
        if (!elementExists) {
            setSearch(oldArray => [...oldArray, tag]);
        } else {
            setSearch(oldValues => {
                return oldValues.filter(data => data !== tag);
            })
        }
    }

    const getTags = async () => {
        let res = await getTag();
        setDataTags(res.data);
    }
    return (
        <>
            <h4 className="mt-2">Tags</h4>
            {
                dataTags.map((item, i) => (<span onClick={(e) => handleTags(item.name)} className="btn btn-sm btn-secondary mx-1" key={`tag-${i + 1}`}>{item.name}</span>))
            }
        </>
    )
}

export default Tags;