const myFunc = (param) => {
  return new Promise((resolve, reject) => {
      if (param)
        resolve('success'); 
      else
        reject('fail');
    });
}
myFunc(true)
.then(data => {console.log(data)})
.catch(err => {console.log(err)})
const myFuncSync = async (param) => {
  try { return await myFunc(param) }
  catch (err) { console.error(err); }
  }
myFuncSync(false)