//tác dụng là tạo ra 1 mảng các object có các object con cháu, từ các object ban đầu(tìm bố, con qua id bố)
let count = 0;

function createTree(arr, parentId = "") {
  const tree = [];
  arr.forEach((item) => {
    if(item._id==item.parent_id){
        item.parent_id="";
    }
    
    if (item.parent_id === parentId) {
      count++;
      const newItem = item;
      newItem.index = count;
      const children = createTree(arr, item.id);
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });
  return tree;
}

module.exports = (arr, parentId = "") => {
  count = 0;
  const tree = createTree(arr, parentId = "");
  return tree;
}