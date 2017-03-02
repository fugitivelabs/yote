// import react/redux dependencies
import React, { PropTypes } from 'react';
import Base from '../../../global/components/BaseComponent';
import { connect } from 'react-redux';
// import react-native components & apis
import View from 'View';
import Text from 'Text';
import StyleSheet from 'StyleSheet';
import TouchableOpacity from 'TouchableOpacity';


// import custom components
import YTHeader from '../../../global/components/YTHeader';
import YTButton from '../../../global/components/YTButton';
import YTCard from '../../../global/components/YTCard';
import ProductTitleList from './ProductTitleList';
import ScrollContainer from '../../../global/components/ScrollContainer';

// import Styles
import YTColors from '../../../global/styles/YTColors';

// import actions
import { listActions } from '../actions'



const FILTER_HEIGHT = 30;

var styles = StyleSheet.create({
  container: {
    flex: 1
    // , paddingBottom: 50
    // , backgroundColor: '#572d66'
    , backgroundColor: '#fff'
  },
  filterWrapper: {
    height: FILTER_HEIGHT,
    flexDirection: 'row',
    // backgroundColor:'green',
    backgroundColor: YTColors.subHeader,
    // paddingBottom: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  filters: {
    flex: 1,
  },
  filter: {
    flex: 1,
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 6.5,
    height: FILTER_HEIGHT,
    borderBottomWidth: 4,
    borderColor: YTColors.subHeader,
    // borderRadius: BUTTON_HEIGHT * 0.5,
  },
  caption: {
    fontSize: 12,
    color: YTColors.lightText,
  },
  cell: {

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
  details: {
    height: 52,
    flex: 1,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.7)'
  },

});

const Filter = ({index, isSelected, onPress, selectionColor, value }) => {
  var selectedFilterStyle;
  var selectedCaptionStyle;
  if(isSelected) {
    selectedFilterStyle = { borderColor: YTColors.buttonPrimaryBG };
    selectedCaptionStyle = { color: "#fff" }
  }
  // var deselectedLabelStyle;
  // if (!isSelected && Platform.OS === 'android') {
  //   deselectedLabelStyle = styles.deselectedLabel;
  // }


  var accessibilityTraits = ['button'];
  if (isSelected) {
    accessibilityTraits.push('selected');
  }
  return (
    <TouchableOpacity
      accessibilityTraits={accessibilityTraits}
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.filter, selectedFilterStyle]}>
      <Text style={[styles.caption, selectedCaptionStyle]}>
        {value}
      </Text>
    </TouchableOpacity>
  )
}

class MyProducts extends Base {
  constructor(props) {
    super(props);
    this._bind(
      '_setFilter'
      , '_renderEmptyList'
      , '_renderHeader'
      , '_openNew'
      , '_openProfile'
    );
  }

  _setFilter(filter) {
    console.log("set filter to ", filter);
    this.props.dispatch(listActions.setMyProductFilter(filter));
  }

  _renderHeader() {
    const { myProducts } = this.props;
    return (
      <View/>
    )
  }

  _openNew() {
    console.log("NEW OPENED");
    this.props.navigator.push({newProduct: true});

  }
  _openProfile() {
    console.log("NEW OPENED");
    this.props.navigator.push({profile: true});

  }

  _renderEmptyList() {
    const { myProducts, isFetching } = this.props;
    if(isFetching) {
      return (
        <View style={styles.cell}>


          <View style={[styles.infoBox]}>
            <View style={styles.inputWrapper}>
              <Text style={styles.emptyMessage}>Loading...</Text>


            </View>
          </View>
        </View>
      )
    } else {

        return (
          <View style={styles.cell}>


            <View style={[styles.infoBox]}>
              <View style={styles.inputWrapper}>
                <Text style={styles.emptyMessage}>You don't have any products yet. Would you like to create one? </Text>

                <YTButton
                  type="primary"
                  caption={"Create New Product"}
                  onPress={this._openNew}
                />
              </View>
            </View>
          </View>
        )
      }

  }

  render() {

    const {  itemList, navigator, filter } = this.props;

    const rightItem = {
      title: 'New',
      onPress: () => this._openNew(),
    };

    const leftItem = {
      title: 'Profile',
      onPress: () => this._openProfile(),
      icon: require('../../../global/img/profile.png'),
      layout: "icon",
    };

    return (
      <View style={styles.container}>
        <YTHeader
          title="Soflete"
          rightItem={rightItem}
          leftItem={leftItem}
        />
        <ScrollContainer>
          <YTCard
            header="Welcome"
          >
            <Text> Welcome To Soflete </Text>
          </YTCard>
          <YTCard
            header="Today's Workout"
          >
            <Text> Die Living </Text>
          </YTCard>
        </ScrollContainer>
      </View>
    )
  }
}

MyProducts.propTypes = {
  dispatch: PropTypes.func
}

const mapStateToProps = (state) => {
  console.log("mapping state to props");
  // console.log(state);
  const { myProductFilter, myProductSort, itemMap, items, isFetching } = state.myProduct;
  // console.log("itemMap");
  // console.log(itemMap);
  var now = new Date();
  var lastWeek = new Date();
  lastWeek.setDate(now.getDate() - 7);
  // var test = new Date(items[4].targetStartDate);
  const user = state.user.current;


  let list = Object.keys(itemMap).filter((myProducts) => {
    console.log("filter the map");
    return (
      itemMap[myProducts].archived === false
      // true
      )
    }
  )

  /****
  APPLY  sortBy
  ****/
  let sortedMyProducts;
  if(myProductSort === 'title') {
    sortedMyProducts = list.map((myProducts, i) => itemMap[myProducts]).sort((a,b) => ( b.title - a.title ) );
  } else if(myProductSort === 'category') {
    sortedMyProducts = list.map((myProducts, i) => itemMap[myProducts]).sort((a,b) => ( a.listing.category - b.listing.category ) );

  } else {
    sortedMyProducts = list.map((myProducts, i) => itemMap[myProducts]).sort((a,b) => ( new Date(b.created) - new Date(a.created) ) );

  }


  /****
  APPLY ANY FILTERS
  ****/

  const filter = myProductFilter;

  let filteredMyProducts = sortedMyProducts.filter((myProducts) => {
    console.log(myProducts.status);
    if(!filter) {
      return myProducts;
    }

    return myProducts.category === filter.toLowerCase();
  });

  console.log("filteredMyProducts");
  // console.log(filteredMyProducts);
  console.log("isFetching",isFetching);

  return {
    filter: myProductFilter
    , user: user
    , itemMap: itemMap
    , itemList: filteredMyProducts
    , isFetching
    // , itemList: []
  }
}

export default connect(
  mapStateToProps
)(MyProducts);
