// import react/redux dependencies
import React, { PropTypes } from 'react';
import Base from '../../../global/components/BaseComponent';
import { connect } from 'react-redux';
// import react-native components & apis
import View from 'View';
import Text from 'Text';
import StyleSheet from 'StyleSheet';
import TouchableOpacity from 'TouchableOpacity';
import ScrollView from 'ScrollView'; 

// import custom components
import YTHeader from '../../../global/components/YTHeader';
import YTButton from '../../../global/components/YTButton';
import YTCard from '../../../global/components/YTCard';
import ScrollContainer from '../../../global/components/ScrollContainer';
import YTColors from '../../../global/styles/YTColors'; 

import * as productActions from '../productActions'

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 50,
    backgroundColor: YTColors.lightBackground,
    // backgroundColor: '#572d66',
    // backgroundColor: '#fff',
  },
  caption: {
    fontSize: 12,
    color: YTColors.lightText,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  content: {
    color: YTColors.darkText,
    textAlign: 'left',
    paddingVertical: 10, 
    paddingHorizontal: 20,
    fontSize: 17,
  },
  cell: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom: 10,
  },
  infoBox: {
    // backgroundColor: 'white',
    padding: 8,
  },
  header: {
    fontSize: 16,
    textAlign: 'center',
    color: "#fff",
    padding: 4,
    color: YTColors.darkText,
  },
  emptyMessage: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    color: "#fff",
    padding: 4,
    marginTop: 40,
    fontStyle: "italic",
    color: YTColors.lightText,
  },
  instructions: {
    color: YTColors.lightText,
    textAlign: 'center',
    marginBottom: 5,
  },
  comment: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    flex: 0.75,
    justifyContent: 'space-between', 

  },
  details: {
    height: 52,
    textAlign: 'center',
    fontWeight: '500',
    flex: 1,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    //backgroundColor: 'rgba(255,255,255,0.7)'
  },
  input: {
    height: 80,
    fontSize: 17,
    padding: 4,
    // paddingBottom: 8,
    backgroundColor: YTColors.listSeparator,
    // backgroundColor: 'green',
  },
  scrollView: {
    marginBottom: 50
  }

});


class Product extends Base {
  constructor(props) {
    super(props);
    this._bind(
     '_openProfile'
    );
  }

  componentWillMount() {
    this.props.dispatch(productActions.fetchList()); 
  }

  _openProfile() {
    
    this.props.navigator.push({profile: true});

  }

  render() {

    const {  products, navigator, user } = this.props;

    let productList = products.lists.all.items;

    const rightItem = {
      title: 'New',
      onPress: () => this._openNew(),
    };
    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/wile.png');
    const leftItem = {

      onPress: () => this._openProfile(),
      image: profileImg,
      layout: "image",
    };

    return (
      <View style={styles.container}>
        <YTHeader
          title="Yote"
          leftItem={leftItem}
        >
        </YTHeader>
        <ScrollView style={{backgroundColor: '#fff'}}>
          {productList.map((productId, i) =>
            <View key={i} style={{borderWidth: 1, borderColor: 'black', margin: 5}}>
              <Text style={styles.content}>{products.byId[productId].title} </Text>
              <Text style={styles.caption}>{products.byId[productId].description} </Text>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}

Product.propTypes = {
  dispatch: PropTypes.func
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
