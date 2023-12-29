const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic:{type:String,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe1y43lS-SkM8803TYf19KJJi6eGCBz2K3_DYex8YUyA&s"},

},
{timestamps:true},);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
})

const User=mongoose.model("User",userSchema);
module.exports=User;