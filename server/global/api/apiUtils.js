
exports.buildMongoQueryFromUrlQuery = urlQuery => {
  let newQuery = {...urlQuery}
  let pagination, sort;
  if(newQuery.page && newQuery.per) {
    pagination = {}
    pagination.page = parseInt(newQuery.page);
    pagination.per = parseInt(newQuery.per);
  }
  delete newQuery.page;
  delete newQuery.per;

  if(newQuery.sort) {
    sort = newQuery.sort;
  }
  delete newQuery.sort;

  // loop. keys should stay the same, but we need to change value for various types
  for(key in newQuery) {
    // catch for "all" here and return a blank query
    if(key === "all") {
      newQuery = {}
      break;
    }
    if(newQuery[key] == "true") {
      newQuery[key] = true;
    } else if(newQuery[key] == "false") {
      newQuery[key] = false;
    } else if(newQuery[key] == "null") {
      newQuery[key] = null;
    } else if(Array.isArray(newQuery[key])) {
      newQuery[key] = {
        $in: newQuery[key]
      }
    }
    // TODO: numbers, dates, gt, lt
  }
  return { query: newQuery, pagination, sort };
}

exports.defaultValueFromSchema = schemaType => {
  /**
   * accepts a mongoose schemaType object from the __model__Schema.eachPath()
   * iterator method that lives on the __Model__.js static methods
   * returns appropriate default nextValue.
   */
  let nextVal;
  switch(schemaType.instance) {
    case "Date": {
      if(schemaType.path === 'created' || schemaType.path === 'updated') {
        // ignore, these are set on the Model or controller
        break;
      } else {
        nextVal = null;
        break;
      }
    }
    case "String": {
      nextVal = typeof schemaType.defaultValue === "string" ? schemaType.defaultValue : null;
      break;
    }
    case "ObjectID": {
      if(schemaType.path === "_id") {
        // ignore, this is set by mongo
        break;
      } else {
        nextVal = null;
        break;
      }
    }
    case "Number": {
      if(schemaType.path === "__v") {
        // ignore, this is a mongo default;
        break;
      } else {
        nextVal = typeof schemaType.defaultValue === "number" ? schemaType.defaultValue : null;
        break;
      }
    }
    case "Boolean": {
      nextVal = typeof schemaType.defaultValue === "boolean" ? schemaType.defaultValue : null;
      break;
    }
    case "Array": {
      nextVal = [];
      break
    }
    default: {
      nextVal = null
    }
  }
  return nextVal;
}