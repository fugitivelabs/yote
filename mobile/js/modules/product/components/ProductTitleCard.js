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

// import custom components
import YTTouchable from '../../../global/components/YTTouchable';

// import libraries
import moment from 'moment';


// import styles
import YTColors from '../../../global/styles/YTColors';

var styles = StyleSheet.create({
  cell: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  details: {
    justifyContent: 'center',
    paddingVertical: 15,
    paddingLeft: 17,
    paddingRight: 9,
    flex: 1
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleAndDuration: {
    justifyContent: 'center',
  },
  titleText: {
    flex: 1,
    fontSize: 14,

    color: "#fff",
    fontWeight: '500',
    marginBottom: 4,
    marginRight: 10,

  },
  date: {
    fontSize: 11,
    textAlign: 'right',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    color: YTColors.lightText,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: YTColors.lightText,
  },
  keywords: {
    fontSize: 10,
    color: YTColors.lightText,
    fontStyle: "italic",
  },
  locationText: {
    fontSize: 12,
  },
  added: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
  },
  statusBox: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.075)'
  },
  itemCount: {
    color: "#fff",
    // marginTop: 5,
    fontSize: 17,
  }
});


class TemplateCard extends Base {
  constructor(props){
    super(props);
  }

  render() {
    const { checklist, cardStyle, user, isHistory } = this.props;

    let category = checklist.category ? checklist.category : null;
    let color = checklist.color ? checklist.color : YTColors.anagada;

    // console.log("category", category);
    let icon = <Image source={require('../../../global/img/finished.png')} />;
    if(category === "disease") {
      icon = <Image style={[{tintColor: "#fff"}]} source={require('../../../global/img/requested.png')} />
    } else if(category === "policy") {
      icon = <Image  source={require('../../../global/img/expired.png')} />
    } else if(category === "insurance") {
      icon = <Image style={[{tintColor: "#fff"}]} source={require('../../../global/img/claimed.png')} />
    } else if(category === "new-diagnosis") {
      icon = <Image style={[{tintColor: "#fff"}]} source={require('../../../global/img/accepted.png')} />
    } else if(category === "patient-education") {
      icon = <Image style={[{tintColor: "#fff"}]} source={require('../../../global/img/cancelled.png')} />
    } else if(category === "pharmaceuticals") {
      icon = <Image style={[{tintColor: "#fff"}]} source={require('../../../global/img/finished.png')} />
    } else {
      icon = null;
    }

    var inCompleteItems = checklist.items.filter((item) => {
      return !item.isCompleted;
    });


    var cell =
            <View style={[styles.cell, cardStyle, {backgroundColor: color } ]} >

              <View style={[styles.details]}>

                <View style={styles.titleSection}>
                  <Text numberOfLines={1} style={styles.titleText}>
                    {checklist.title}
                  </Text>
                </View>



              </View>
              <View style={[styles.statusBox, {width: Dimensions.get('window').width * .2 }]} >

                <Text style={styles.itemCount}>{inCompleteItems.length}</Text>
              </View>
            </View>;

    if(this.props.onPress) {
      cell =
        <YTTouchable onPress={this.props.onPress}>
          {cell}
        </YTTouchable>
    }

    return cell;

  }

}

TemplateCard.propTypes = {
  checklist: PropTypes.object.isRequired
  , onPress: PropTypes.func
  , cardStyle: PropTypes.object
  , isHistory: PropTypes.bool
}

const mapStoreToProps = (store) => {
  const user = store.user.current;

  return {
    user: user
  }
}

export default connect(mapStoreToProps)(TemplateCard);
