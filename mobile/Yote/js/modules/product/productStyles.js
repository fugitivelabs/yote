// product styles 

import Dimensions from 'Dimensions'; 
import Platform from 'Platform'; 

import StyleSheet from 'StyleSheet'; 
import YTColors from '../../global/styles/YTColors'; 

var productStyles = StyleSheet.create({
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
  inputContainer: {
    // padding: 10,
    borderTopWidth: 1,
    // borderBottomColor: '#CCC',
    // borderColor: 'transparent'
    borderColor: YTColors.listSeparator
  },
  input: {
    height: 52,
    flex: 1,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.7)'
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: YTColors.lightText,
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
  scrollView: {
    marginBottom: 50
  }

});

export default productStyles; 