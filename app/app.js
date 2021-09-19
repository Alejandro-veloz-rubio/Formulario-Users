class Userdata{
    constructor(id,name,username,email,phone,website,street,city,zipcode,companyname)
    {
        this.id=id;
        this.name=name;
        this.username=username;
        this.email=email;
        this.phone=phone;
        this.website=website;
        this.address={"street":street,"city":city,"zipcode":zipcode}
        this.company={"name":companyname};
    }
}

class FormUsers{
    constructor(){
        this.datos=new Map();
    }

    add(Newuser){
        this.datos.set(Newuser.id,Newuser)
        //console.log(this.datos);      
    }

    validate(Newuser){
        let res=false;
        for(const [key,value]of this.datos.entries()){
            if(Newuser.id==key || Newuser.username==value.username){
                res=true;
            }
        }
        return res;
    }

    options(){
        let res=''
        for(const[key,value] of this.datos.entries()){
            res+=`<option value='${key}'>${value.name}</option>`
        }
        return res;  
    }

    select(){
        let select=document.getElementById('userinfo').value;
        let userfind=this.datos.get(select);
        interface1.Displayuser(userfind);
    }

    listusers(){
        let res=''
        for(const[key,value] of this.datos.entries()){
            res+=`
            <p>ID user: ${key}</p>
            <p>Name user: ${value.name}</p>
            <p>Email user: ${value.email}</p>
            <p>Phone user: ${value.phone} </p><br>
            `;
        }
        return res;
    }
}

class Interface{

    Displayuser(new1){
        const list=document.getElementById('results');
        list.innerHTML=`
        <div class='style1' id=cod${new1.id}'>
        <div>
        <h2>ID: ${new1.id}</h2>
        <p>Name: ${new1.name}</p>
        <p>Username: ${new1.username}</p>
        <p>Email: ${new1.email}</p>
        <p>Phone: ${new1.phone}</p>
        <p>Website: ${new1.website}</p>
        <h2>ADDRESS</h2>
        <p>Street: ${new1.address.street}</p>
        <p>City: ${new1.address.city}</p>
        <p>Zip Code: ${new1.address.zipcode}</p>
        </div>
        <button type="button" id="edit">Edit</button>
        `;
    }

    showMessage(mesage,type){
        const container=document.getElementById('blockmessage');
        const app=document.getElementById('results');
        const div=document.createElement('div');
        div.className=`alert`;
        div.appendChild(document.createTextNode(mesage));
        container.insertBefore(div,app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000);
    }

    showMessage2(mesage,type){
        const container=document.getElementById('blockmessage');
        const app=document.getElementById('results');
        const div=document.createElement('div');
        div.className=`alert2`;
        div.appendChild(document.createTextNode(mesage));
        container.insertBefore(div,app);
        setTimeout(function(){
            document.querySelector('.alert2').remove();
        },3000);
    }

}

let FORM=new FormUsers();
let interface1=new Interface();
const btnAdd=document.getElementById('btnAdd');
btnAdd.addEventListener('click',()=>{
    let Id,Name,Username,Email,Phone,Website,Street,City,Zipcode,CompanyN;
     Id=document.getElementById('id').value;
     Name=document.getElementById('name').value;
     Username=document.getElementById('username').value;
     Email=document.getElementById('email').value;
     Phone=document.getElementById('phone').value;
     Website=document.getElementById('website').value;
     Street=document.getElementById('street').value;
     City=document.getElementById('city').value;
     Zipcode=document.getElementById('zipcode').value;
     CompanyN=document.getElementById('companyname').value;
    let new1=new Userdata(Id,Name,Username,Email,Phone,Website,Street,City,Zipcode,CompanyN);
    let Validate=FORM.validate(new1);
    if(Validate==true){
        interface1.showMessage2('The user already exists',1)
    }else{
        FORM.add(new1,id);
        interface1.showMessage('The user was added successfully',1);
    }
    
});

const btnUp=document.getElementById('btnUp');
btnUp.addEventListener('click',()=>{
    let menu=document.getElementById('userinfo');
    menu.innerHTML=FORM.options();
    
});

const menuuser=document.getElementById('userinfo');
menuuser.addEventListener('change',()=>{
    FORM.select();
});

const listuser=document.getElementById('btnlist');
listuser.addEventListener('click',()=>{
    let list=document.getElementById('results2');
    list.innerHTML='<h1>List users</h1>'+FORM.listusers();
});






