// import react things
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components
import Dimensions from 'Dimensions';
import Image from 'Image';
import ListView from 'ListView';
import Platform from 'Platform';
import RefreshControl from 'RefreshControl';
import ScrollView from 'ScrollView';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TouchableHighlight from 'TouchableHighlight';
import View from 'View';

// import global components
import Base from './BaseComponent';
import CheckboxInput from './CheckboxInput';

// import Styles
import YTColors from '../styles/YTColors';

var styles = StyleSheet.create({
  bigImage: {
      marginTop: Dimensions.get('window').height * 0.25
      , marginBottom: 20
    }
  , emptyContainer: {
      position: "absolute"
      , top: 0
      , bottom: 0
      , left: 0
      , right: 0
      , backgroundColor: YTColors.lightBackground
      , padding: 4
    }
  , emptyMessage: {
      flex: 1
      , alignItems: "center"
      , justifyContent: "center"
      , flexDirection: 'column'
    }
  , listWrapper: {
      flex: 1
      , backgroundColor: "transparent"
      , padding: 4
    }
  , mainContainer: {
      flex: 1
      , backgroundColor: YTColors.lightBackground
    }
  , message: {
      color: YTColors.darkText
      , fontSize: 28
      , marginBottom: 50
    }
  , separator: {
      backgroundColor: YTColors.listSeparator
      , height: 0
    }
});

// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = Platform.OS === 'android' ? 20 : 1;

class ItemList extends Base {
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
      dataSource: cloneWithData(dataSource, props.items),
      refreshing: false
    }
    this._bind(
      '_renderFooter'
      , '_onContentSizeChange'
      , '_renderRow'
      , '_renderSeparator'
      , '_handleRefresh'
      , '_renderHeader'
    )
  }

  componentWillReceiveProps(nextProps) {
    // console.log("___________________nextProps__________________");
    if(this.props.items !== nextProps.items) {
      // console.log("________________RESET ITEMS __________________");
      let newDataSource = new ListView.DataSource({
        getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
        getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      });
      var newDataSource = cloneWithData(newDataSource, nextProps.items);
      this.setState({
        dataSource: newDataSource
      });
    }
  }

  componentDidMount() {
    let listViewScrollView = this.refs.itemList.getScrollResponder();
    listViewScrollView.scrollTo({y:1});
  }

  _onContentSizeChange(contentWidth: number, contentHeight: number) {
    if(contentHeight !== this.state.contentHeight) {
      this.setState({contentHeight});
    }
  }

  _renderHeader() {
    return this.props.renderHeader && this.props.renderHeader();
  }

  _renderFooter() {
    if(this.state.dataSource.getRowCount() === 0) {
      return this.props.renderEmptyList && this.props.renderEmptyList();
    }
    return this.props.renderFooter && this.props.renderFooter();
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <View style={styles.separator} key={rowID} />
    )
  }

  _renderRow(item) {
    return (
      <CheckboxInput
        item={item}
        onPress={this.props.onPress}
        toggleImportance={this.props.toggleImportance}
        isDisabled={this.props.disabled}
        removeItem={this.props.removeItem}
      />
    )
  }

  _handleRefresh() {
    this.setState({refreshing: true});
  }

  render() {
    const { contentInset, productTemplates } = this.props;
    const isEmpty = !productTemplates || productTemplates.length < 1;
    const bottom = contentInset.bottom + Math.max(0, this.props.minContentHeight - this.state.contentHeight);

    const refreshControl =
     <RefreshControl
       refreshing={this.state.refreshing}
       onRefresh={this._handleRefresh}
     />

   return (
     <View style={styles.mainContainer}>
       <ListView
         ref="itemList"
         initialListSize={10}
         pageSize={LIST_VIEW_PAGE_SIZE}
         style={[styles.listWrapper]}
         renderRow={this._renderRow}
         renderHeader={this._renderHeader}
         dataSource={this.state.dataSource}
         renderFooter={this._renderFooter}
         renderSeparator={this._renderSeparator}
         enableEmptySections={true}
         onContentSizeChange={this._onContentSizeChange}
         scrollRenderAheadDistance={600}
       />
     </View>
   )
  }
}

ItemList.propTypes = {
  items: PropTypes.array
  , contentInset: PropTypes.object
  , minContentHeight: PropTypes.number
  , disabled: PropTypes.bool
}

ItemList.defaultProps = {
  items: [],
  contentInset: { top: 0, bottom: 0 },
  // TODO: This has to be scrollview height + fake header
  disabled: false,
  minContentHeight: Dimensions.get('window').height + 20,
  renderSeparator: (sectionID, rowID) => <View style={styles.separator} key={rowID} />,
}


function cloneWithData(dataSource: ListView.DataSource, data: ?Data) {
  if (!data) {
    return dataSource.cloneWithRows([]);
  }
  if (Array.isArray(data)) {
    console.log("RENDER AS ARRAY");
    console.log(data);
    return dataSource.cloneWithRows(data);
  }
  return dataSource.cloneWithRowsAndSections(data);
}

const mapStateToProps = (state) => {
  return {
    user: state.user.current
  }
}

export default connect(mapStateToProps)(ItemList);
