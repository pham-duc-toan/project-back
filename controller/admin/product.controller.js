const Product = require("../../models/product.model");
// // [GET] /admin/products
// module.exports.index = async (req, res) => {
    
//     let find = req.query;
//     find.deleted= false;
    
//     // danh dau class active
//     let filterStatus =[
//       {
//         name: "Tất cả",
//         status: "",
//         class: ""
//       },
//       {
//         name: "Hoạt động",
//         status: "active",
//         class: ""
//       },
//       {
//         name: "Dừng hoạt động",
//         status: "inactive",
//         class: ""
//       }
//     ];
  
    
//       const index = filterStatus.findIndex((item) => {
//         return item.status == req.query.status;
//       });
//       filterStatus[index].class = "active";
    
    
//     console.log(find);
//     const products = await Product.find(find);
//     res.render("admin/page/products/index", {
//       pageTitle: "Danh sách sản phẩm",
//       products: products,
//       filterStatus: filterStatus
//     });
//   }


module.exports.index = async (req, res) => {

  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: ""
    },
    {
      name: "Hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""
    }
  ];

  if(req.query.status) {
    const index = filterStatus.findIndex((item) => {
      return item.status == req.query.status;
    });

    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => {
      return item.status == "";
    });

    filterStatus[index].class = "active";
  }

  let find = {
    deleted: false
  
  };

  if(req.query.status) {
    find.status = req.query.status;
  }

  const products = await Product.find(find);

  res.render("admin/page/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus
  });
}