import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { getProduct } from "../../app/api/product";
import { getAllProducts } from "../../app/features/product/actions";
import { useDispatch } from "react-redux";

const Paginat = () => {
    let [active, setActive] = useState(0);
    const dispatch = useDispatch();
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active + 1} onClick={(e) => getItems(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    useEffect(() => {
        getDataWherePaginate()
    }, [active])

    const getDataWherePaginate = async () => {
        let res = await getProduct('', '', [], active * 10);
        let data = getAllProducts(res.data.data);
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