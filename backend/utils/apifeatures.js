class ApiFeatures {
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
}
    search(){
        const keyword = this.queryString.keyword 
        ? {
            name:{
                $regex:this.queryString.keyword,
                $options: 'i'
            }
        }:{};
        console.log(keyword);
        this.query= this.query.find({...keyword});
        return this;
}
    filter(){
        const queryCopy ={...this.queryString}
        console.log(queryCopy);
        //removing some fields for category
        const removeFields = ["keyword","page","limit"]
        removeFields.forEach(key => delete queryCopy[key])


        //filter for price and rating
        let queryStr =JSON.stringify(queryCopy)
        console.log(queryStr);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key =>`$${key}`);
        this.query=this.query.find(JSON.parse(queryStr))
        console.log(queryStr);
        return this
    }

    pagination(resPerPage){
        const curentPage = Number(this.queryString.page)||1;
        const skip = resPerPage * (curentPage-1);
        this.query =this.query.limit(resPerPage).skip(skip);
        return this;

    }
}
module.exports = ApiFeatures;