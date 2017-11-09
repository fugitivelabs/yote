/**
* sets up datasource and necessary functions for the ListView call
* _renderRow is where each productId of the datasource is sent to ProductTitleCard
*/

// import react things
import React from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
  , Image
  , ListView
  , Platform
  , RefreshControl
  , ScrollView
  , StyleSheet
  , Text
  , TouchableHighlight
  , View
} from 'react-native'; 

// import actions
import * as productActions from '../productActions';

// import global components
import Base from '../../../global/components/BaseComponent';

// import module components
import ProductListItem from './ProductListItem';

// import Styles
import productStyles from '../productStyles'; 
import YTColors from '../../../global/styles/YTColors';

// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = Platform.OS === 'android' ? 20 : 1;


class ProductList extends Base {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      contentHeight: 0,
      dataSource: cloneWithData(dataSource, props.products),
      refreshing: false
    }
    this._bind(
      '_renderFooter'
      , '_onContentSizeChange'
      , '_renderRow'
      , '_renderSeparator'
      , '_handleRefresh'
      , '_openProduct'
      , '_renderHeader'
    )
  }

  componentDidMount() {
    let listViewScrollView = this.refs.templateList.getScrollResponder();
    listViewScrollView.scrollTo({y:1});
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.products !== nextProps.products || this.props.productMap !== nextProps.productMap) {
      this.setState({
        dataSource: cloneWithData(this.state.dataSource, nextProps.products)
      });
    }
  }

  _onContentSizeChange(contentWidth: number, contentHeight: number) {
    if(contentHeight !== this.state.contentHeight) {
      this.setState({contentHeight});
    }
  }

  _renderHeader() {
    
  }

  _renderFooter() {

  }

  _renderSeparator(sectionID, rowID) {
    return (
        <View style={productStyles.listSeparator} key={rowID} />
      )
  }

  _renderRow(productId) {
    const { productMap } = this.props; 
    return (
      <ProductListItem
        product={productMap[productId]}
        onPress={() => this._openProduct(productId)}
      />
    )
  }

  _handleRefresh() {
    // this.setState({refreshing: true});
    this.props.dispatch(productActions.fetchList()).then(() => {
      // this.setState({refreshing: false});
      // calling setState after this mounts causes the debugger to send warning 
    });
  }

  _openProduct(productId) {
    console.log("open product", productId); 
    // this.props.navigator.push({singleProduct: true, productId: productId}); 
    this.props.navigation.navigate('SingleProduct', {productId: productId}); 
  }

  render() {
    const { contentInset, products } = this.props;
    const isEmpty = !products || products.length < 1;
    const bottom = contentInset.bottom + Math.max(0, this.props.minContentHeight - this.state.contentHeight);

    let listFlex = isEmpty ? { flex: 1 } : { flex: 1 }; // ??? the same

    const refreshControl =
     <RefreshControl
       refreshing={this.state.refreshing}
       onRefresh={this._handleRefresh}
     />

   return (
     <View style={productStyles.container}>
       <ListView
         ref="templateList"
         initialListSize={10}
         pageSize={LIST_VIEW_PAGE_SIZE}
         dataSource={this.state.dataSource}
         renderRow={this._renderRow}
         renderHeader={this._renderHeader}
         renderFooter={this._renderFooter}
         renderSeparator={this._renderSeparator}
         enableEmptySections={true}
         onContentSizeChange={this._onContentSizeChange}
         scrollRenderAheadDistance={600}
         refreshControl={ refreshControl }
         removeClippedSubviews={false}
         automaticallyAdjustContentInsets={false}
       />
     </View>
   )
  }
}

ProductList.propTypes = {
  products: PropTypes.array
  , contentInset: PropTypes.object
  , minContentHeight: PropTypes.number
}

ProductList.defaultProps = {
  products: []
  , contentInset: { top: 0, bottom: 0 }
    // TODO: This has to be scrollview height + fake header
  , minContentHeight: Dimensions.get('window').height + 20
  , renderSeparator: (sectionID, rowID) => <View style={styles.separator} key={rowID} />
}

function cloneWithData(dataSource: ListView.DataSource, data: ?Data) {
  if (!data) {
    return dataSource.cloneWithRows([]);
  }
  if (Array.isArray(data)) {
    return dataSource.cloneWithRows(data);
  }
  return dataSource.cloneWithRowsAndSections(data);
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.loggedIn.user
    , productMap: store.product.byId
  }
}

export default connect(mapStoreToProps)(ProductList);
