const  sql = require("./db");   

//Create Constructor
const Restaurant = function(restaurant) {    //รับพารามิเตอร์ หรืออ็อบเจ็กมา
    this.id = restaurant.id;    //Attributes
    this.name = restaurant.name; 
    this.type = restaurant.type; 
    this.imageurl = restaurant.imageurl; 
};

//Method
//Insert Data
Restaurant.create = (newRestaurant, result) => {    //รับnewRestaurantตัวใหม่เข้ามา
    //INSERT INTO restaurants SET id, name, type, imageurl Values ("1", "KFC", "Fastfood", "url")
    sql.query("INSERT INTO restaurants SET ?", newRestaurant, (err, res)=>{ //เพิ่มdata //? = ค่าที่ใส่เข้ามา //ดักerror
        if(err) {        //ถ้ามีerror
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("create restaurant:", { id:res.insertId, ...newRestaurant });
        result(null, { id:res.insertId, ...newRestaurant })
    });
};

//Get Data By ID
Restaurant.getById = (restaurantId, result) => {    //1ร้าน
    //ซินแทคของคิวรี่ในsql -> SELECT * FROM restaurants WHERE id = restaurantId
    sql.query(
        `SELECT * FROM restaurants WHERE id = ${restaurantId}`,
        (err, res) => {
            if (err) {    //เกิดerror
                console.log("error: ", err);    //แสดงว่า error
                result(err, null);  //ส่งค่าdataเป็นnull
                return;
            }
            if (res.length) {  //หาเจอ มีค่าไม่เท่ากับ0
                result(null, res[0]);  //ตัวdataต้องส่งresกลับไป [แค่แถวแรกเเถวเดียว]
                return;
            }
            //Restaurant not found with this id
            result({ kind: "not_found" }, null);    //ไม่เข้าเลย หาidไม่เจอ
        }
    );
};   

//Get all Restaurant
Restaurant.getAll = (result) => { //เอามาทั้งหมด
    //SELECT * FROM restaurants
    sql.query("SELECT * FROM restaurants", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};   

Restaurant.updateById = (id, restaurant, result) => { //อัพเดต   
    //UPDATE restaurants SET name = "name", type = "type", imageurl = "imageurl" WHERE id = "id"
    sql.query("UPDATE restaurants SET name=?, type=?, imageurl=? WHERE id=?", 
        [restaurant.name, restaurant.type, restaurant.imageurl, id],
        (err, res) => {
            if (err) {    //เกิดerror
                console.log("error: ", err);    //แสดงว่า error
                result(err, null);  //ส่งค่าdataเป็นnull
                return;
            }
            if (res.affectedRows == 0) {  //ถ้าเท่ากับ0 ไม่มีการอัพเดตข้อมูล    //ใส่ไอดีที่ไม่มี
                result({ kind: "not_found" });  //แสดงว่า not_found
                return;
            }
            //Restaurant data is updated
            result(null, { id: id, ...restaurant });    
        }
    );
};   

//Delete Restaurant by Id
Restaurant.removeById = (id, result) => {     //ลบทีละอัน
    //DELETE FROM restaurants WHERE id = ?
    sql.query("DELETE FROM restaurants WHERE id = ?", id, (err, res) => {
        if(err) {
            console.log("error : ", err)
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "noy_found"}, null);
            return;
        }
        console.log("Deleted restaurant with id: ", id);
        result(null , res);
    });
};   

Restaurant.removeAll = () => {} //ลบหมด

module.exports = Restaurant;
