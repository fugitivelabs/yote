/**
* Product component called from TabsView
* sends productList as props to ProductTitleList component for the ListView datasource
*/

// import react/redux dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components & apis
import StyleSheet from 'StyleSheet';
import ScrollView from 'ScrollView';
import Text from 'Text';
import TextInput from 'TextInput';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';
import Platform from 'Platform'; 

// import global components
import ActionButton from '../../../global/components/ActionButton';
import Base from '../../../global/components/BaseComponent';
import EmptyMessage from '../../../global/components/EmptyMessage';
import ScrollContainer from '../../../global/components/ScrollContainer';
import YTButton from '../../../global/components/YTButton';
import YTCard from '../../../global/components/YTCard';
import YTColors from '../../../global/styles/YTColors';
import YTHeader from '../../../global/components/YTHeader';

// import module components
import ProductList from './ProductList';

// import actions
import * as productActions from '../productActions'

// import styles
import productStyles from '../productStyles';

class Product extends Base {
  constructor(props) {
    super(props);
    this._bind(
     '_openProfile'
     , '_openNew'
     , '_sendDelete'
     , '_handleOpenDrawer'
    );
  }

  componentDidMount() {
    // this.props.dispatch(productActions.fetchListIfNeeded());  
  }

  _openProfile() {
    this.props.navigator.push({profile: true});
  }

  _openNew() {
    this.props.navigator.push({newProduct: true});
  }

  _sendDelete(id) {
    this.props.dispatch(productActions.sendDelete(id)).then((res) => {
      this.props.dispatch(productActions.removeProductFromList(id));
    })
  }

  _handleOpenDrawer() {
    this.context.openDrawer();  
  }

  render() {

    const {  products, navigator, user } = this.props;

    let productList = products.lists.all ? products.lists.all.items : null;

    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/skull-icon.png');

    const rightItem = {
      onPress: () => this._openNew()
      , icon: require('../../../global/img/plus.png')
      , layout: 'image'
    }

    const profileItem = {
      onPress: () => this._openProfile(),
      image: profileImg,
      layout: "image",
    };

    const androidDrawerItem = {
      onPress: this._handleOpenDrawer,
      icon: require('../../../global/components/img/bulletList.png'),
      layout: "icon",
    }

    if(!products.lists.all || products.lists.all.isFetching) {
      return (
        <View style={{flex: 1}}>
          <YTHeader
            title="Products"
            leftItem={Platform.OS === 'ios' ? profileItem : androidDrawerItem}
            rightItem={rightItem}
          />
          <EmptyMessage
            message="Loading Products..."
          />
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        <YTHeader
          title="Products"
          leftItem={Platform.OS === 'ios' ? profileItem : androidDrawerItem}
          rightItem={rightItem}
        />
        
        <View style={{flex: 1}}>
          <ProductList 
            products={productList}
            navigator={navigator}
          />
        </View>
        
      </View>
    )
  }
}

Product.propTypes = {
  dispatch: PropTypes.func
}

Product.contextTypes = {
  openDrawer: React.PropTypes.func
}

const mapStoreToProps = (store) => {

  return {
    user: store.user
    , products: store.product
  }
}

export default connect(
  mapStoreToProps
)(Product);
