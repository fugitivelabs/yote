var mongoose = require('mongoose')
  ;

//define product schema
var productSchema = mongoose.Schema({
  title:            { type: String, required: '{PATH} is required!' }
  , description:    { type: String, required: '{PATH} is required!' }
  , price:          { type: Number, required: '{PATH} is required!' }
  , imgUrl:         { type: String }
  , featured:       { type: Boolean, default: false }
  , tags:           [String]
});

Product = mongoose.model('Product', productSchema);

//product model methods
function createDefaults() {
  Product.find({}).exec(function(err, products) {
    if(products.length == 0) {
      Product.create({title: "Fugitive Labs t-shirt", description: "An awesome t-shirt from the Fugitive Labs team.", price: 20.0, featured: true});
      console.log("created initial product defaults");
    }
  });
}

exports.createDefaults = createDefaults;