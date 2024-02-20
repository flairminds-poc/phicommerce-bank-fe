export function convertIdsToString(array) {
    let arr = [];
    array?.map(item => {
        let obj = {...item};
        obj.id = String(item.id);
        arr.push(obj);
    });
    console.log(arr, 'check');
    return arr;

  }
  