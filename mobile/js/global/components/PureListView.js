// import react things
import React, { PropTypes } from 'react';
import Base from '../BaseComponent';
import { connect } from 'react-redux';

// import react-native components
import ListView from 'ListView';
import Dimensions from 'Dimensions';
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';
import View from 'View';

// import Styles


var styles = StyleSheet.create({
  separator: {
    backgroundColor: '#eeeeee',
    height: 1,
  },
});


// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = Platform.OS === 'android' ? 20 : 1;


class PureListView extends Base {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      contentHeight: 0
      , dataSource: cloneWithData(dataSource, props.data);
    };
    this._bind(
      '_renderFooter'
      , '_onContentSizeChange'
    )
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.data !== nextProps.data) {
      this.setState({
        dataSource: cloneWithData(this.state.dataSource, nextProps.data)
      });
    }
  }

  componentDidMount() {
    let listViewScrollView = this.refs.listView.getScrollResponder();
    listViewScrollView.scrollTo({y:1});
  }

  _onContentSizeChange(contentWidth: number, contentHeight: number) {
    if (contentHeight !== this.state.contentHeight) {
      this.setState({contentHeight});
    }
  }

  _renderFooter() {
    if (this.state.dataSource.getRowCount() === 0) {
      return this.props.renderEmptyList && this.props.renderEmptyList();
    }

    return this.props.renderFooter && this.props.renderFooter();
  }


  render() {
    const { contentInset } = this.props;
    const bottom = contentInset.bottom + Math.max(0, this.props.minContentHeight - this.state.contentHeight);
    return (
      <ListView
        initialListSize={10}
        pageSize={LIST_VIEW_PAGE_SIZE}
        { ...this.props }
        ref="listView"
        dataSource={this.state.dataSource}
        renderFooter={this._renderFooter}
        contentInset={{ bottom, top: contentInset.top }}
        onContentSizeChange={this._onContentSizeChange}
      />
    )
  }
}

PureListView.propTypes = {
  data: PropTypes.array
  , contentInset: PropTypes.object
  , minContentHeight: PropTypes.number

}

PureListView.defaultProps = {
  data: [],
  contentInset: { top: 0, bottom: 0 },
  // TODO: This has to be scrollview height + fake header
  minContentHeight: Dimensions.get('window').height + 20,
  renderSeparator: (sectionID, rowID) => <View style={styles.separator} key={rowID} />,
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


export default PureListView;
