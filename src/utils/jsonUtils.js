export default {
  getNested (data, arr) {
    if(data && !(data instanceof Array) && typeof data == 'object'){
      for (let key in data) {
        if(data[key] && typeof data[key] === 'object' && !(data[key] instanceof Array)){
          this.getNested(data[key], arr);
        } else {
          arr.push({key: key, value: data[key]})
        }
      }
    }
    return arr
  }
}