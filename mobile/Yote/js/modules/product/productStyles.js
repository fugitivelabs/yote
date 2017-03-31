// product styles 

import Dimensions from 'Dimensions'; 
import Platform from 'Platform'; 

import StyleSheet from 'StyleSheet'; 
import YTColors from '../../global/styles/YTColors'; 

var productStyles = StyleSheet.create({
  cell: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom: 10,
  },
  comment: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    flex: 1,
    justifyContent: 'space-between', 

  },
  container: {
    flex: 1,
    // paddingBottom: 50,
    backgroundColor: '#fff',
    // backgroundColor: '#572d66',
    // backgroundColor: '#fff',
  },
  content: {
    color: YTColors.darkText,
    textAlign: 'left',
    padding: 10,
    fontSize: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: YTColors.lightText,
    padding: 10,
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
  emptyMessage: {
    fontSize: 12,
    textAlign: 'left',
    color: "#fff",
    padding: 10,
    fontStyle: "italic",
    color: YTColors.lightText,
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    color: "#fff",
    padding: 4,
    color: YTColors.actionText,
  },
  infoBox: {
    // backgroundColor: 'white',
    padding: 8,
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
  scrollView: {
    marginBottom: 50
  },

});

export default productStyles; 