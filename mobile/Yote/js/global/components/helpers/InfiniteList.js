/**
 * Infinite scrolling list designed to be used with infinite list hooks, uses RecyclerListView to render massive lists with less lag. 
 * Docs: https://github.com/Flipkart/recyclerlistview#recyclerlistview
 */

import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";


// import react-native components
import {
  Text
  , RefreshControl
} from 'react-native';


const InfiniteList = ({
  data
  , itemWidth
  , itemHeight
  , rowRenderer
  , isFetching
  , getNextPage
  , skeleton = <Text>Loading...</Text>
  , emptyList = <Text>No results found</Text>
  , refresh
}) => {

  // Define stuff required for RecyclerListView
  // DataProvider is a class that provides the data to the RecyclerListView.
  const [dataProvider, setDataProvider] = useState(new DataProvider((r1, r2) => r1 === r2));

  // each time data changes, we need to update the dataProvider with the new data
  useEffect(() => {
    setDataProvider(dataProvider.cloneWithRows(data))
  }, [data]);

  /**
   * LayoutProvider is a class that provides the layout to the RecyclerListView. Having a defined layout size is part of how it's optimized.
   * It's capable of setting different layouts for different `types`, but we only have one `type`.
   * We're using useMemo to memoize the LayoutProvider so that we don't have to re-create it every render. Recommended for performance.
   * It will only be re-created if the dataProvider or width changes.
   */
  const layoutProvider = useMemo(() => {
    return new LayoutProvider(
      (index) => {
        // check data to return a layout type
        // const data = dataProvider.getDataForIndex(index);
        // what we return here is passed in as type in the function below
        return 1;
      },
      (type, dim) => {
        // currently only have one type, but this is the place to set the layout size for all types
        switch(type) {
          case 1:
            dim.width = itemWidth;
            dim.height = itemHeight;
            break;
          default:
            break;
        }
      }
    );
  }, [dataProvider, itemWidth, itemHeight]);

  return (
    <>
      { // don't render RecyclerListView if there's no data (it will complain)
        dataProvider?._size ? (
          <RecyclerListView
            layoutProvider={layoutProvider}
            dataProvider={dataProvider}
            rowRenderer={rowRenderer}
            // has to always maintain a height of at least 1. Otherwise it will throw an error (lame), but here we are.
            style={{ minHeight: 1 }}
            // canChangeSize is required unless we define the static height of the list (we don't)
            canChangeSize={true}
            refreshControl={ refresh ?
              <RefreshControl
                refreshing={isFetching}
                onRefresh={refresh}
              />
              : null
            }
            onEndReached={getNextPage}
            // how far ahead to fetch data
            onEndReachedThreshold={20 * itemHeight}
            refreshing={!data.length && isFetching}
          />
        ) : isFetching ? (
          skeleton
        ) : (
          emptyList
        )

      }
    </>
  )
}

InfiniteList.propTypes = {
  data: PropTypes.array.isRequired
  , itemWidth: PropTypes.number.isRequired
  , itemHeight: PropTypes.number.isRequired
  , rowRenderer: PropTypes.func.isRequired
  , isFetching: PropTypes.bool.isRequired
  , getNextPage: PropTypes.func.isRequired
  , skeleton: PropTypes.element
  , emptyList: PropTypes.element
  , refresh: PropTypes.func
}

export default InfiniteList;