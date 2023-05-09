class appFeatures {
  constructor(query,querystr){
  this.query=query;
  this.querystr=querystr;
  }
  //filtermethod
  filtering(){
    let querystring = JSON.stringify(this.querystr);
    querystring = querystring.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`);
    let queryObj = JSON.parse(querystring);
    this.query = this.query.find(queryObj);
    return this;
  }
  sort(){
    if(this.querystr.sort){
      console.log('i am in sort method')
      let sortby = this.querystr.sort.split(',').join(' ');
    this.query =this.query.sort(sortby);
   
    }
    return this;
  }
  limiting(){
    if(this.querystr.fields){
      let field = this.querystr.fields.split(',').join(' ');
      this.query = this.query.select(field);
   
    }
    return this;
  }
  pagination(){
    if(this.querystr.page){
      let page= this.querystr.page*1||1;
      let limit = this.querystr.limit*1||3;
      let skip = (page-1)*2
      this.query = this.query.skip(skip).limit(limit);
  
    }
    return this;
  }
}
module.exports = appFeatures;
