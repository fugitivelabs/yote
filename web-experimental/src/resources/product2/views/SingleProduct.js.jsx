// // import primary libraries
// import React from 'react';
// // import PropTypes from 'prop-types'; // this component gets no props
// import { Link, useLocation, useParams } from 'react-router-dom'

// // import global components
// import AsyncWrapper from '../../../global/components/helpers/AsyncWrapper';

// // import actions/reducer
// import { useGetSingleProduct } from '../productService';

// // import resource components
// import ProductLayout from '../components/ProductLayout.js.jsx'

// const SingleProduct = () => {
//   // get the product id from the url. Below is equivalent to const { productId } = this.props.match.params;
//   const { productId } = useParams();
//   // get location. Below is equivalent to const location = this.props.location;
//   const location = useLocation();

//   // get the product from the store (or fetch it from the server)
//   const { item: product, ...productFetch } = useGetSingleProduct(productId);

//   const isEmpty = !product;
//   return (
//     <ProductLayout title={'Single Product'}>
//       <h3> Single Product </h3>
//       <hr />
//       <AsyncWrapper {...productFetch}>
//         { isEmpty ?
//           <div>No product found</div>
//           :
//           <>
//             <h1> {product.title} </h1>
//             <hr />
//             <p> {product.description}</p>
//             <Link to={`${location.pathname}/update`}> UPDATE PRODUCT </Link>
//           </>
//         }
//       </AsyncWrapper>
//     </ProductLayout>
//   )
// }

// export default SingleProduct;


// import primary libraries
import React from 'react';
// import PropTypes from 'prop-types'; // this component gets no props
import { Link, useLocation, useParams } from 'react-router-dom'

// import global components
// import AsyncWrapper from '../../../global/components/helpers/AsyncWrapper';
import Fetchie from '../../../global/components/helpers/AsyncWrapper';

// import actions/reducer
import { useGetSingleProduct } from '../productService';

// import resource components
import ProductLayout from '../components/ProductLayout.js.jsx'



const SingleProduct = () => {
  // get location. Below is equivalent to const location = this.props.location;
  const location = useLocation();

  // get the product id from the url. Below is equivalent to const { productId } = this.props.match.params;
  const { productId } = useParams();

  // get the product from the store (or fetch it from the server)
  const productFetch = useGetSingleProduct(productId);

  return (
    <ProductLayout title={'Single Product'}>
      <h3> Single Product </h3>
      <hr />
      <Fetchie fetch={productFetch}>
        {product => (
          <>
            <h1> {product.title} </h1>
            <hr />
            <p> {product.description}</p>
            <Link to={`${location.pathname}/update`}> UPDATE PRODUCT </Link>
          </>
        )}
      </Fetchie>
    </ProductLayout>
  )
}

export default SingleProduct;
