class appFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    filter(){
        let querystring=JSON.stringify(this.queryStr);
      //  console.log(querystring)
        querystring=querystring.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`);
        let queryobj=JSON.parse(querystring);
        // console.log(queryobj);
        this.query=this.query.find(queryobj);
        // console.log(this.query);
        return this;
    }
    sort(){
        if(this.queryStr.sort){
            let sortBy=this.queryStr.sort.split(',').join(' ');
            this.query=this.query.sort(sortBy);
            return this;
        }
    }
    limiting(){
        if(this.queryStr.field){
            let fields=this.queryStr.field.split(',').join(' ');
            this.query=this.query.select(fields);
            return this;
        }
    }
    paginate(){
        if(this.queryStr.page&&this.queryStr.limit){
        let page=this.queryStr.page*1||1;
        let limit=this.queryStr.limit*1||2;
        let skip=(page-1)*10;
        this.query.skip(skip).limit(limit);
        return this;
        }
    }
}
module.exports=appFeatures;