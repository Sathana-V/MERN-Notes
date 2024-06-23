class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    // Extract the query parameters from the request
    let queryString = { ...this.queryString };

    // Fields to be excluded from the query
    const limitedFields = ["sort", "page", "limit", "fields"];

    // Remove the limited fields from queryString
    for (const field of limitedFields) {
      delete queryString[field];
    }

    // Convert the query string object to JSON string
    let queryObj = JSON.stringify(queryString);

    // Replace operators with MongoDB query operators
    queryObj = queryObj.replace(
      /\b(ge|le|gte|lte|eq)\b/g,
      (match) => `$${match}`
    );

    // Parse the modified JSON string back to an object
    queryObj = JSON.parse(queryObj);
    this.query = this.query.find(queryObj);

    // const allMovies = await movieModel.find(req.query);

    //below two fails because it reruns exact match
    // const allMovies = await movieModel.find({duration : req.query.duration});
    // const allMovies = await movieModel.find().where('duration').equals( req.query.duration);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort); // if you use await bef movieModel then sort will be taken as js function not mongoose so pass query
    } else {
      this.query = this.query.sort("createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      // select('-duration') excludes it
      // select('duration') only displays duration
      // // select('-duration time') Cannot do inclusion on field time in exclusion projection
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }
    return this;
  }
  async pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const countQuery = this.query.model.countDocuments(this.query.getQuery()); // Create a new query for count

    const movieCount = await countQuery; // Execute the count query

    if (skip >= movieCount) {
      throw new Error("Page not found");
    }

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = ApiFeatures;
