
exports.buildMongoQueryFromUrlQuery = urlQuery => {
  let newQuery = {...urlQuery}
  let pagination, sort, limit;
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

  if(newQuery.limit) {
    limit = Number(newQuery.limit);
  }
  delete newQuery.limit;
  // loop. keys should stay the same, but we need to change value for various types
  for(key in newQuery) {
    // catch for "all" here and return a blank query
    if(key === "all") {
      newQuery = {}
      break;
    } else if(key === "textSearch") {
      // console.log("found text search in query: " + newQuery.textSearch);
      /**
       * By default, text search is lenient and returns every match for every string.
       * We want it more strict where "Joe Smith" doesn't also return "Joe Green" and "Jim Smith"
       * To do so we need the string to look like this \"joe" \"smith". More info: https://docs.mongodb.com/manual/reference/operator/query/text/#phrases
       */
      // split the query string at each space so we get an array of strings ["joe", "smith"]
      const queryArray = newQuery.textSearch.split(' ');
      // console.log('queryArray', queryArray);
      
      let queryString = ''
      // format each string as described above and build the queryString.
      queryArray.forEach(string => {
        queryString += `\\"${string}"`
      })
      newQuery.$text = {
        $search: queryString
      }
      delete newQuery.textSearch;
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
  return { query: newQuery, pagination, sort , limit };
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