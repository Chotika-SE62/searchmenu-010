const init = async () => {   //ดึงข้อมูลมา
    const allRestaurants = await fetch("http://localhost:5000/apis/restaurants", {
    //ดึงมาทั้งหมดใช้GET
    method: "GET", //เข้าถึง data โดยใช้GET
    mode: "cors", 
    cache: "no-cache", //ไม่ต้องเก็บ cache
    credentials: "same-origin",
    headers: { 
        "Content-Type": "application/json",
    },
    }).then((response) => response.json());
    allRestaurants.forEach((element) => addRestaurant(element)); //ลูป data array ให้ครบ ส่งไปที่ addRestaurant

    //allRestaurants.restaurants.forEach((element) => addRestaurant(element));
};

const addRestaurant = (element) => {
    const item = document.createElement("div"); //สร้างแท็กdiv
    item.className = "card";//กำหนดclassName
    item.style = "width: 20rem;";//กำหนดstyle
    //รูป, ชื่อ //ชนิดร้านอาหาร //ประเภทอาหาร //ปุ่มลบ(ลบจากid) //ปุ่มแก้ไข(ส่งผ่านคิวรี่สตริง เป็นลิงค์พร้อมกับส่งหมายเลขไอดีไปด้วย) 
    const card = `
                <img src="${element.imageurl}" class="card-img-top" alt="${element.name}">  
                <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">${element.type}</p> 
                        <a href="#" class="btn btn-danger" onclick="deleteRestaurant(${element.id})">Delete</a>   
                        <a href="edit.html?id=${element.id}" class="btn btn-warning">Edit</a>    
                </div>
    `;
    item.innerHTML = card;
    const restaurantsElement = document.querySelector(".restaurants");  //เข้าถึงหน้าเว็บ
    restaurantsElement.appendChild(item);   //เพิ่มnode รูป
};

const deleteRestaurant = async (id) => {
    if (id) {   //ถ้ามีid
        try {
            const restaurant = await fetch(
            "http://localhost:5000/apis/restaurants/" + id,
            {
                method: "DELETE",                      //เข้าถึงmethod ชื่อDELETE
                mode: "cors",                           //modeชื่อ cors
                cache: "no-cache",                      //ไม่ต้องเก็บ cache
                credentials: "same-origin",
                headers: { 
                    "Content-Type": "application/json",
                },
            }
            )
                .then((response) => {                   //แปลงเป็น json
                return response.json();                 //มี{ } ต้องมีreturn
                })
                .then((response) => {                           //แสดงผล
                alert(`Restaurant id:${id} is delete`);     //กล่องแจ้งเตือนข้อความด้านบน
                location.reload();
                });
        } catch (error) {
            alert(`Restaurant id:${id} not found`);     //กล่องแจ้งเตือนข้อความด้านบน
        }
    } else {  //ถ้าไม่มี
        alert("Restaurant ID is missing");   //กล่องแจ้งเตือนข้อความด้านบนว่า "Restaurant ID is missing"
    }
};
