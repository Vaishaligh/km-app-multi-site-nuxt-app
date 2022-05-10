import Vue from 'vue'

Vue.filter('formatMoney', function (val) {
    if(val === null) {
        val = 0
    }
    var x=val;
    x= parseInt(x)
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
   return res
  })
  
  Vue.filter('ageFilter', function (val) {
    var x
    x= val.split("-");
    if(x[0] % 1 != 0 && x[0] < 1) {
        let s1 = x[0].split(".")
        let s2 = x[1].split(".")
    return `${s1[1]} - ${s2[1]} months`
    }
    else if (val == 1 || val == '1.5') return `${val} year`
    else return `${val} years`
    
//    return res
  })
  
  Vue.filter('toLowerCase', function (val) {
      return val.toLowerCase();
     
      
  //    return res
    })
  Vue.filter('formatDate', function (val) {
      let date =  new Date(val)
      return date.toUTCString()
     
      
  //    return res
    })