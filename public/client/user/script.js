function update(e) {
  console.log("essa");
  console.log(e.dataset.doc);
  
  //e.style.display='none';
  const user = e.parentNode.parentNode;
  
  updateForm(user,e.dataset.doc,e.name);
  console.log(parent);
}

function updateForm(_user,doc,type){
  console.log(document.cookie,document.cookie.split(';')[1].split('=')[1]);
    if(_user){
        const friends = _user.querySelectorAll("h5");
        const id = doc;
        const name = friends[1].innerText;
        const age = friends[2].innerText;
        const nationality = friends[3].innerText;
        const password = friends[4].innerText;
        const form=_user.parentNode.querySelector('.form');
        form.innerHTML='';
        var text='';
        if(type=='delete'){
          const q=confirm('Are you sure? you want to delete this user?');
          if(!q){
            return;
          }
          text=`<form action="/users/delete" method='post'>
          <div class="row"> <label for="_id"></label>
          <input type="password" id='_id' name='id' value='${id}' style='display:none;'   ></div>
          <div class="row"><label for="name" >name</label>
          <input type="text" id='name'  value='${name}'  disabled></div>
          <div class="row">  <label for="age">age</label>
          <input type="text" id='age'   value='${age}' disabled></div>
        
          
          <div class="row"><label for="nationality">nationality</label>
          <input type="text" id='nationality'  value='${nationality}' disabled></div>
        
        <div class="row">  <label for="password">password</label>
          <input type="password" id='password' value='${password}'>
       </div>
          <div class="row submit"><input type="submit" value="delete" style='color:red'><a onclick="this.parentNode.parentNode.remove() ">cancel</a>  </div>
     </form>
      `;
        }
       else{
        text=`<form action="/users/update" method='post'>
         <div class="row"> <label for="_id"></label>
        <input type="password" id='_id' name='id' value='${id}' style='display:none;'   ></div>
        <div class="row"><label for="name" >name:         ${name}</label>
        <input type="text" id='name' name='name' value='${name}' style='display:none;'  ></div>
        <div class="row">  <label for="age">age</label>
        <input type="text" id='age' name='age'  value='${age}'></div>
      
        
        <div class="row"><label for="nationality">nationality</label>
        <input type="text" id='nationality' name='nationality' value='${nationality}'></div>
      
      <div class="row">  <label for="password">password</label>
        <input type="password" id='password' name='password' value='${password}'>
     </div>
     <div class="row submit"><input type="submit" value="update"><a onclick="this.parentNode.parentNode.remove() ">cancel</a>  </div>
     </form>
     `; 
       }
      
    
    
    
    form.innerHTML=text;
        
        


        
    }
}
const addbtn=document.getElementById('add');
addbtn.addEventListener('click',()=>{
const addForm=document.getElementById('ad');

var text='';
  text=`<form action="/users/add" method='post'>
  
<div class="row abs"><label for="name" >name</label>
<input type="text" id='name' name='name' required onChange="checkUser(this)"  ></div>
<div class="row">  <label for="age">age</label>
<input type="text" id='age' name='age' required   ></div>


<div class="row"><label for="nationality">nationality</label>
<input type="text" id='nationality' name='nationality' required ></div>

<div class="row">  <label for="password">password</label>
<input type="password" id='password' name='password' required >
</div>
<div class="row submit"><input type="submit" class='add' value="add user" ><a onclick="this.parentNode.parentNode.remove() ">cancel</a>  </div>
</form>
`;

addForm.innerHTML=text;
});

function checkUser(e){
  const names=document.querySelectorAll('h5.name');
  const errmsg=document.querySelector('.errmsg');
      errmsg.innerText='';
  console.log(names[0].innerText);
  for(let i=0;i<names.length;i++){
    console.log(i,names[i].innerText,e.value,names[i].innerText==e.value);
    if(names[i].innerText==e.value){
      
      console.log('user already exist',names[i]);
      errmsg.innerText='('+e.value+') already exist!'
      e.value='';
      return;
    }
  }
  return true;
}