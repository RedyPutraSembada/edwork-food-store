import { useEffect, useMemo, useState } from "react";
import { Pagination } from "react-bootstrap";
import { getProduct } from "../../app/api/product";
import { getAllProducts } from "../../app/features/product/actions";
import { useDispatch } from "react-redux";

const Paginat = () => {
    let [active, setActive] = useState(0);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();


    const items = useMemo(() => {
        let data = [];
        const totalPage = Math.ceil(total / 10)
        for (let number = 1; number <= totalPage; number++) {
            data.push(
                <Pagination.Item key={number} active={number === active + 1} onClick={(e) => getItems(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        return data;
    }, [total, active])

    useEffect(() => {
        getDataWherePaginate()
    }, [active])

    const getDataWherePaginate = async () => {
        let res = await getProduct('', '', [], active * 10);
        let data = getAllProducts(res.data.data);
        setTotal(res.data.count);
        dispatch(data);
    }

    const getItems = (number) => {
        setActive(number - 1)
    }

    return (
        <Pagination className="pt-5">{items}</Pagination>
    )
}

export default Paginat;