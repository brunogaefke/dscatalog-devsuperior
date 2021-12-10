import './styles.css';

import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import { Product } from 'types/product';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import Pagination from 'components/Pagination';
import ProductFilter, { ProductFilterData } from 'components/ProductFilter';

type ControlComponentData = {
  activePage: number;
  filterData: ProductFilterData;
}

const List = () => {
  const [page, setPage] = useState<SpringPage<Product>>();

  const [controlComponentData, setControlComponentData ] = useState<ControlComponentData>({
    activePage: 0,
    filterData: {name: "", category: null}
  });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentData({activePage: pageNumber, filterData: controlComponentData.filterData})
  }

  const handleSubmitFilter = (data: ProductFilterData) => {
    setControlComponentData({activePage: 0, filterData: data})
  }
  

  const getProducts = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: controlComponentData.activePage,
        size: 3,
        name: controlComponentData.filterData.name,
        categoryId: controlComponentData.filterData.category?.id,
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  } , [controlComponentData]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="product-crud-container">
      <div className="product-crud-bar-container">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>

        <ProductFilter onSubmitFilter={handleSubmitFilter} />
      </div>

      <div className="row">
        {page?.content.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-12">
            <ProductCrudCard product={product} onDelete={getProducts} />
          </div>
        ))}
      </div>

          <Pagination 
          forcePage={page?.number}
          pageCount={(page) ? page?.totalPages : 0} 
          range={3}
          onChange={handlePageChange}
          />

    </div>
  );
};

export default List;
