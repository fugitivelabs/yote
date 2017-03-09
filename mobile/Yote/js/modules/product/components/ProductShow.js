// import react things
import React, { PropTypes } from 'react';
import Base from '../../../global/components/BaseComponent';
import { connect } from 'react-redux';


// import react-native components
import ListView from 'ListView';
import Dimensions from 'Dimensions';
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';
import View from 'View';
import Text from 'Text';
import Image from 'Image';
import ScrollView from 'ScrollView';
import TouchableOpacity from 'TouchableOpacity';
import TextInput from 'TextInput';
import Alert from 'Alert';

// import custom components
import YTTouchable from '../../../global/components/YTTouchable';
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';
import ActionButton from '../../../global/components/ActionButton';
import ItemList from '../../../global/components/ItemList';
import ItemListEditing from '../../../global/components/ItemListEditing';
import CheckboxInput from '../../../global/components/CheckboxInput';
import NewItemInput from '../../../global/components/NewItemInput';
import EditTitleInput from '../../../global/components/EditTitleInput';


// import libraries
import moment from 'moment';
import _ from 'lodash';

// import actions
import { singleActions } from '../actions';

// import styles
import YTColors from '../../../global/styles/YTColors';

const BUTTON_HEIGHT = 32;


const FILTER_HEIGHT = 30;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: YTColors.primaryHeader,
    // padding: 4,
    // padding: 5
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
  fitlerText: {
    fontSize: 12,
    color: YTColors.lighterText,
  },
  showingWrapper: {
    flex: 1,
    backgroundColor: YTColors.lightBackground,
    padding: 4,
  },

  cell: {

    backgroundColor: 'white',
    marginTop: 10,
    // marginBottom: 1,
  },
  infoBox: {
    backgroundColor: 'white',
    padding: 8,
  },
  header: {
    fontSize: 16,
    textAlign: 'center',
    color: "#fff",
    padding: 4,
    backgroundColor: YTColors.lightText,
  },
  instructions: {
    color: YTColors.lightText,
    marginBottom: 5,
  },
  details: {
    height: 52,
    flex: 1,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    // backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 5,
  },
  interestLevel: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingBottom: 12,
    paddingTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 20,
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: YTColors.listSeparator
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT * 0.5,
    // paddingHorizontal: 40,
  },
  icon: {
    marginBottom: 8,
    tintColor: YTColors.actionText,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 14,
    color: YTColors.lightText,
  },
  input: {
    height: 52,
    flex: 1,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.7)'
  },
  notes: {
    height: 104,
  },
  inlineInput: {
    flexDirection: "row"
  },
  quarterInput: {
    flex: 0.25
  },
  checkBoxInputCell: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    borderTopWidth: 1,
    borderColor: YTColors.listSeparator,
  },
  checkBox: {
    // flex: 1,
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#11b9de'

  },
  checkBoxTextWrapper: {
    justifyContent: 'center',
    paddingVertical: 15,
    paddingLeft: 17,
    paddingRight: 9,
    flex: 1
  },
  footerWrapper: {
    paddingVertical: 20,
    marginBottom: 40,
  }
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
      <Text style={[styles.fitlerText, selectedCaptionStyle]}>
        {value}
      </Text>
    </TouchableOpacity>
  )
}

class ProductShow extends Base {
  constructor(props){
    super(props);
    this.state = {
      newProductData: {
        title: this.props.product.title
        , test: "HEY THERE"
        , isEditingTitle: false
        // , items: this.props.listedItems
      }
    }
    this._bind(
      '_closeModal'
      , '_renderDetailsHeader'
      , '_setFilter'
      , '_completeItem'
      , '_restoreItem'
      , '_toggleCompleted'
      , '_addItem'
      , '_renderFooter'
      , '_renderEmptyList'
      , '_clearCompleted'
      , '_hideCompleted'
      , '_showCompleted'
      , '_toggleImportance'
      , '_toggleEdit'
      , '_handleInputChange'
      , '_logState'
      , '_removeItem'
      , '_saveTitle'
      , '_archiveProduct'
    )
  }

  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps");
    if(nextProps.product.title !== this.state.newProductData.title) {
      this.setState({newProductData: { title: nextProps.product.title}});
    }
  }

  componentWillUnmount() {

    this.props.dispatch(singleActions.setIsEditing(false));

  }

  _setFilter(filter) {
    console.log("set filter to ", filter);
    this.props.dispatch(singleActions.setCurrentFilter(filter));
  }


  _addItem(item) {
    // console.log(this.props);
    const { product, dispatch } = this.props;
    product.items.unshift(item);
    dispatch(singleActions.sendUpdateMyProduct(product)).then((res)=> {

      console.log("done");
      console.log(res);
    });
  }

  _closeModal() {
    this.props.navigator.pop();
  }

  _openEdit() {
    console.log("open edit product");
    // this.props.navigator.pop();s
  }

  _logState() {
    console.log(this.state);
  }

  _toggleEdit() {
    console.log("toggleEdit");
    // this.setState({isEditing: !this.state.isEditing});
    const { dispatch, isEditing } = this.props;
    dispatch(singleActions.setIsEditing(!isEditing));
  }

  _hideCompleted(){
    console.log("hideCompleted");
    this.props.dispatch(singleActions.setHideCompleted(true));
  }

  _showCompleted(){

    this.props.dispatch(singleActions.setHideCompleted(false));
  }

  _handleInputChange(e, target) {
    var newState = _.update( this.state, target, function() {
      return e.nativeEvent.text;
    });


    var oldTitle = this.props.product.title;
    var newTitle = newState.newProductData.title;
    var isSame = oldTitle !== newTitle;

    newState.newProductData.isEditingTitle = isSame;

    this.setState(newState);
  }

  _clearCompleted() {
    Alert.alert(
      "Are you sure you want to clear these items?",
      "",
      [
        {text: 'Nevermind', onPress: () => console.log('nevermind')},
        {text: 'Yes', onPress: () => {
          let newProduct = this.props.product;
          for(i = 0; i < newProduct.items.length; i++) {
            if(newProduct.items[i].isCompleted) {
              newProduct.items[i].isCleared = true;
            }
          }
          this.props.dispatch(singleActions.sendUpdateMyProduct(newProduct)).then((res)=> {

            console.log("done");
            console.log(res);
          });
        }}
      ]
    )

  }


  _saveTitle() {
    console.log("SAVE TITLE");
    let newProduct = this.props.product;
    newProduct.title = this.state.newProductData.title;
    this.props.dispatch(singleActions.sendUpdateMyProduct(newProduct)).then((res)=> {

      console.log("done");
      console.log(res);
      this._toggleEdit();
    });
  }

  _archiveProduct() {
    let newProduct = this.props.product;
    newProduct.archived = true;
    this.props.dispatch(singleActions.sendUpdateMyProduct(newProduct)).then((res)=> {

      console.log("done");
      console.log(res);
      this._closeModal();

    });
  }

  _renderDetailsHeader() {
    const { product, incompleteItems, filteredItems, isEditing } = this.props;
    console.log("TEST");
    console.log(this.state.newProductData.title);
    console.log(product.title);
    if(!isEditing) {

      return (
        <View style={styles.cell}>


          <View style={[styles.infoBox]}>
            <View style={styles.inputWrapper}>
              <Text style={styles.details}>{product.title}</Text>
              <NewItemInput
                product={product}
                addItem={this._addItem}
              />


            </View>
          </View>
        </View>
      )
    } else {
      return(

        <View style={styles.cell}>


          <View style={[styles.infoBox]}>
            <View style={styles.inputWrapper}>
              <EditTitleInput
                productTitle={this.state.newProductData.title}
                handleInputChange={this._handleInputChange}
                product={product}
                saveTitle={this._saveTitle}
              />



            </View>

          </View>
        </View>
      )
    }
  }

  _renderFooter() {
    const { product, completedItems, hideCompleted, isClearing, isEditing } = this.props;
    console.log("IS EDITING 1", isEditing);

    if(isEditing) {
      console.log('RENDER DELETE BUTTON');
      return (
        <View style={styles.footerWrapper}>
          <YTButton
            type="primary"
            buttonStyle={{backgroundColor: YTColors.danger}}
            caption={"Archive Product"}
            onPress={this._archiveProduct}
          />
        </View>
      )
    } else if(completedItems.length > 0 && hideCompleted ) {
      return (
        <View style={styles.footerWrapper}>
          <YTButton
            type="secondary"
            caption={"Show Completed"}
            onPress={this._showCompleted}
          />
        </View>
      )
    } else if(completedItems.length > 0 && !hideCompleted) {
      return (
        <View style={styles.footerWrapper}>
          <YTButton
            type="secondary"
            caption={"Hide Completed"}
            onPress={this._hideCompleted}
          />
          <YTButton
            type="primary"
            caption={isClearing ? "Clearing..." : "Clear Completed"}
            onPress={this._clearCompleted}
          />
        </View>
      )
    } else {
      return null
    }
  }


    _renderEmptyList() {
      const { product, completedItems, hideCompleted, isFetching, isEditing } = this.props;
      if(completedItems.length > 0 && hideCompleted ) {
        return (
          <View style={styles.footerWrapper}>
            <YTButton
              type="secondary"
              caption={"Show Completed"}
              onPress={this._showCompleted}
            />
          </View>
        )
      } else if(isEditing) {
        return (
          <View style={styles.footerWrapper}>
            <YTButton
              type="primary"
              buttonStyle={{backgroundColor: YTColors.danger}}
              caption={"Archive Product"}
              onPress={this._archiveProduct}
            />
          </View>
        )
      } else {
        return null
      }
    }

  _toggleCompleted(item) {
    // console.log(this.props);
    const { product, dispatch } = this.props;
    let i = _.findIndex(product.items, {_id: item._id});
    product.items[i].isCompleted = !product.items[i].isCompleted;
    product.items[i].dateCompleted = new Date();
    product.items[i].dateUncompleted = new Date();
    dispatch(singleActions.sendUpdateMyProduct(product)).then((res)=> {

      console.log("done");
      console.log(res);
    });
  }

  _toggleImportance(item) {
    // console.log(this.props);
    const { product, dispatch } = this.props;
    let i = _.findIndex(product.items, {_id: item._id});
    product.items[i].isImportant = !product.items[i].isImportant;
    dispatch(singleActions.sendUpdateMyProduct(product)).then((res)=> {

      console.log("done");
      console.log(res);
    });
  }

  _removeItem(item) {
    // console.log(this.props);
    const { product, dispatch } = this.props;
    let i = _.findIndex(product.items, {_id: item._id});
    product.items[i].isRemoved = true;
    dispatch(singleActions.sendUpdateMyProduct(product)).then((res)=> {

      console.log("done");
      console.log(res);
    });
  }

  _completeItem(item) {
    // console.log(this.props);
    const { product, dispatch } = this.props;
    let i = _.findIndex(product.items, {_id: item._id});
    product.items[i].isCompleted = true;
    dispatch(singleActions.sendUpdateMyProduct(product)).then((res)=> {

      console.log("done");
      console.log(res);
    });
  }

  _restoreItem(item) {
    // console.log(this.props);
    const { product, dispatch } = this.props;
    let i = _.findIndex(product.items, {_id: item._id});
    product.items[i].isCompleted = false;
    dispatch(singleActions.sendUpdateMyProduct(product)).then((res)=> {

      console.log("done");
      console.log(res);
    });
  }

  render() {
    const { product, navigator, isFetching, user, listedItems, incompleteItems, filteredItems, clearedItems, completedItems, filter, isEditing, allItems } = this.props;

    // const { isEditing } = this.state;

    const leftItem = {
      title: 'Back',
      onPress: this._closeModal,
    }


    let rightTitle = isEditing ? "Done" : "Edit";

    const rightItem = {
      title: rightTitle,
      onPress: this._toggleEdit,
    };



    return(

      <View style={[styles.container ]} >
        <YTHeader
          navigator={navigator}
          leftItem={leftItem}
          rightItem={rightItem}
          title={completedItems.length + "/" + listedItems.length}
        />
        <View style={styles.filterWrapper}>
          <View style={styles.filter}>

            <Text style={[{fontSize: 10, color: "#fafafa"}]}>Filter:</Text>
          </View>
          <Filter
            value="All"
            isSelected={!filter}
            onPress={() => this._setFilter(null)}
          />

          <Filter
            value="Starred"
            isSelected={filter === "Starred"}
            onPress={() => this._setFilter("Starred")}
          />
          <Filter
            value="Essential"
            isSelected={filter === "Essential"}
            onPress={() => this._setFilter("Essential")}
          />



        </View>
        {isEditing ?
          <ItemListEditing
            items={allItems}

            disabled={false}
            renderHeader={this._renderDetailsHeader}

            renderFooter={this._renderFooter}
            renderEmptyList={this._renderEmptyList}
            onPress={this._toggleCompleted}
            toggleImportance={this._toggleImportance}
            removeItem={this._removeItem}
          />
          :

            <ItemList
              items={listedItems}

              disabled={false}
              renderHeader={this._renderDetailsHeader}

              renderFooter={this._renderFooter}
              renderEmptyList={this._renderEmptyList}
              onPress={this._toggleCompleted}
              toggleImportance={this._toggleImportance}
              removeItem={this._removeItem}
            />
          }



      </View>
    )



  }

}



const mapStoreToProps = (store) => {
  let current = store.myProduct.current;
  let product = store.myProduct.itemMap[current];
  let filter = store.myProduct.currentFilter;

  let { hideCompleted, isEditing } = store.myProduct;




  // let filteredItems = product.items;
  // let filteredItems = itemsWithImage.filter((item) => {
  let filteredItems = product.items.filter((item) => {
    if(!filter) {
      return !item.isRemoved;
    } else if(filter.toLowerCase() === "essential") {
      return !item.isRemoved && item.isEssential;
    } else if(filter.toLowerCase() === "starred") {
      return !item.isRemoved && item.isImportant;
    } else if(filter.toLowerCase() === "reminders") {
      return !item.isRemoved && item.reminderDate;
    } else if(filter.toLowerCase() === "deleted") {
      return item.isCleared && item.isRemoved;
    } else {
      return !item.isRemoved;

    }
  });

  // sort items by completed


  // console.log(filteredItems);

  // hideCompleted = true;


  let incompleteItems = filteredItems.filter((item) => {
      return !item.isCompleted && !item.isCleared;
    });



  let completedItems = filteredItems.filter((item) => {
    return item.isCompleted && !item.isCleared;
  });

  let clearedItems = filteredItems.filter((item)=> {
    return item.isCleared && item.isCompleted;
  });

  let sortedIncompleteItems = incompleteItems.sort((a,b) => (new Date(a.dateUncompleted).getTime() - new Date(b.dateUncompleted).getTime()));
  let sortedCompleteItems = completedItems.sort((a,b) => (new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime() ));
  let sortedClearedItems = clearedItems.sort((a,b) => (new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime() ));




  let listedItems = sortedIncompleteItems;
  if(!hideCompleted) {
    listedItems = sortedIncompleteItems.concat(sortedCompleteItems);
  }


  let allItems = sortedIncompleteItems.concat(sortedCompleteItems, sortedClearedItems);

  // allItems = allItems.map((item) => {
  //     var newItem = item;
  //     newItem.isEditing = true;
  //     newItem.test = 'test';
  //     return newItem;
  //   });








  return {
    // isLoggedIn: state.user.single.isLoggedIn,
    user: store.user.current,
    isFetching: store.myProduct.isFetching,
    isClearing: store.myProduct.isClearing,
    product,
    filteredItems,
    incompleteItems,
    completedItems,
    clearedItems,
    listedItems,
    filter,
    hideCompleted,
    isEditing,
    allItems,
  }
}

export default connect(mapStoreToProps)(ProductShow);
