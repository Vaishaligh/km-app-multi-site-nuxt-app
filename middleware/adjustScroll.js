// import axios from "axios";

export default function ({ store, res,route, $axios, redirect }) {
  // $axios.get('cart/urls').then(e=>{
  //   console.log("eeee",e);
  // }).catch(err=>{
  // })
  if(route.path == '/index.php' || route.path == '/index.html' || route.path == '/index.htm' || route.path =='/index.aspx'  || route.path == '/index.asp'){
    res.writeHead(301, { Location: '/' });
    res.end();
    // return redirect("/");

  }
}
