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
import YTHeader from '../YTHeader';
import YTButton from '../YTButton';
import YTCard from '../YTCard';
import ScrollContainer from '../ScrollContainer';
import YTColors from '../../styles/YTColors'; 

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
  _squadListSeparator: {
    height: 0,
  },
  _bannerWrapper: {
    flex:1,

    // marginLeft: 12,
    padding: 20,
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  _bannerText: {
    color: '#fffFFF',
  },
  _bannerLabel: {
    fontSize: 18,
  },
  _bannerTitle: {
    fontSize: 38,
    fontWeight: "500",
  },
  scrollView: {
    marginBottom: 50
  }

});


class Home extends Base {
  constructor(props) {
    super(props);
    this._bind(
     '_openProfile'
     ,'_handleOpenDrawer'
    );
  }

  _openProfile() {
    
    this.props.navigator.push({profile: true});

  }
  
  _handleOpenDrawer() {
    this.context.openDrawer();  
  }

  render() {

    const {  itemList, navigator, user } = this.props;

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
          <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, textAlign: 'center'}}> Home page! </Text> 
          </View>
          <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 20}}>
            <Text style={{fontSize: 15, textAlign: 'center'}}> This is Yote. You can use it to make cool stuff </Text> 
          </View>
        </ScrollView>
      </View>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func
}

Home.contextTypes = {
  openDrawer: React.PropTypes.func
}

const mapStoreToProps = (store) => {
  


  /****
  APPLY  sortBy
  ****/



  /****
  APPLY ANY FILTERS
  ****/


  return {
    user: store.user
    
  }
}

export default connect(
  mapStoreToProps
)(Home);
