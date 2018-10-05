// utility functions to manipulat api resource objects
let logger = global.logger;

exports.defaultValueFromSchema = (schemaType) => {
  /**
   * accepts a mongoose schemaType object from the __model__Schema.eachPath()
   * iterator method that lives on the __Model__.js static methods
   *
   * returns appropriate default value.
   */
  let val;
  switch(schemaType.instance) {
    case "Date": {
      if(schemaType.path === 'created' || schemaType.path === 'updated') {
        // ignore, these are set on the Model or controller
        break;
      } else {
        val = new Date()
        break;
      }
    }
    case "String": {
      val = schemaType.defaultValue ? schemaType.defaultValue : '';
      break;
    }
    case "ObjectID": {
      if(schemaType.path === "_id") {
        // ignore, this is set by mongo
        break;
      } else {
        val = null;
        break;
      }
    }
    case "Number": {
      if(schemaType.path === '__v') {
        // ignore, this is a mongo default;
        break;
      } else {
        val = schemaType.defaultValue ? schemaType.defaultValue : 0;
        break;
      }
    }
    case "Boolean": {
      val = schemaType.defaultValue ? schemaType.defaultValue : false;
      break;
    }
    case "Array": {
      val = [];
      break
    }
    default: {
      val = null
    }
  }
  return val;
}
