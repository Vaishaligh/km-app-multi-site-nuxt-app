<template>
  <div class="container-fluid" id="vue">
    <div>
      <Shimmer v-show="displayPdp == false" />    
      <div v-html="productDetails"  v-show="displayPdp"></div>
      <Notify v-if="isNotify==true" :Psize="variation" :name="name" @modalValue="isNotify=false"/>
    </div>
  </div>

</template>
<script src="https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.3/lightgallery.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.3/plugins/zoom/lg-zoom.umd.js"></script>


<script>
import axios from "axios";
import Vue from "vue";
import Shimmer from "../../components/custom/PdpShimmer";
import VueCookies from "vue-cookies";
import { forEach } from '~/binaryMimeTypes';
Vue.use(VueCookies);
import  {modifyMixin} from "../../mixin.js"


var that = {};
var selectedSize ='';
if (process.client) {
 
  document.addEventListener("click", function(event) {
      // let data = document.getElementById('pincodeinbox'); // keyup for pincode
      // if(data !== '' && data !== undefined && data !== null){
      //   data.addEventListener("keyup",checkPincode(event.target) );
      // }
    if (event.target.closest("[data-ref]") !== null) {
      let targetClick = event.target
        .closest("[data-ref]")
        .getAttribute("data-ref");
      if(targetClick == 'km-size-modal-close'){
        if(document.querySelectorAll('[id^="product-size"]') !== undefined && document.querySelectorAll('[id^="product-size"]') !==null && document.querySelectorAll('[id^="product-size"]') !== '' && that.isMobile){
            let sizeModelDiv = document.querySelectorAll('[id^="product-size"]')[0].classList;
            if(sizeModelDiv.contains('modal-active')){
              sizeModelDiv.remove('modal-active')
            }
        }
      }
      else if (targetClick == "km-select-size-ref") {
        kmSelectSizeAction(event.target);
      }
      else if(targetClick == "km-all-reviews-ref"){
        let allReviewsClicked =  document.getElementById("km-all-review-list").classList.contains('active');
        if(allReviewsClicked){
          document.getElementById("km-all-reviews").innerHTML = " View all reviews "
          document.getElementById("km-all-review-list").classList.remove("active");
          document.getElementById("km-all-review-list").getElementsByTagName('ul')[0].scrollTo(0,0)
        }else{
          document.getElementById("km-all-reviews").innerHTML = " Hide all reviews "
          document.getElementById("km-all-review-list").classList += ' active'
        }
       
      }
      else if (targetClick == "km-add-to-cart-ref") {
        kmAddToCartAction();
      }
      else if (targetClick == "km-pdp-wishlist-ref") {
        kmPdpWIshlist();
      }
      else if (targetClick == "chekout") {
        check();
      }
      else if (targetClick == "km-check-pincode-ref") {
        checkPincode(event.target);
      }
      

      else if (targetClick == "km-minus-qty-ref") {
        kmMinusQtyAction(event.target);
      }
      else if (targetClick == "km-plus-qty-ref") {
        kmPlusQtyAction(event.target);
      }
      else if (targetClick == "km-notify") {
        kmNotify();
      }
      
    }
  });
  
 
}
var app = new Vue({
  methods: {
    kmSelectSizeAction: async function(param) {
      let size = document.getElementById("km-select-size");
      let x = size.getElementsByClassName('active')
        if (x[0] !== undefined)
        for(let i=0;i<x.length;i++){
            x[i].classList.remove("active");
        }
        param.closest('div').className += " active";
        this.selectedSize = param.value;
        selectedSize = this.selectedSize;

        // find selling price for selected size km-product-price
        let index = that.variation.findIndex(e => e[0] == this.selectedSize);
          let y = document.querySelectorAll("#km-product-price");
          for (let i=0; i<y.length; i++) {
            y[i].innerHTML = `<i class="kartmax_currency"></i>` + that.variation[index][1].selling_price;
          }
      },

      kmAddToCartAction: function() {
        if (this.selectedSize == undefined && (that.selected_size == '' || that.selected_size == undefined)) {
          let sizeErr = document.getElementById('km-select-size')
          sizeErr.insertAdjacentHTML('afterend', '<span class="text-danger" id="sizeErr">Please select size first</soan>');
          // if size is not selected in mobile view then open new model for select size first 
          if(document.querySelectorAll('[id^="product-size"]') !== undefined && document.querySelectorAll('[id^="product-size"]') !==null && document.querySelectorAll('[id^="product-size"]') !== '' && that.isMobile){
                let sizeModelDiv = document.querySelectorAll('[id^="product-size"]')[0].classList;
                sizeModelDiv.add('modal-active')
          }
         
          setTimeout(() => {
            document.getElementById('sizeErr').remove()
          }, 1000);
          return;
        } else {
              if(this.selectedSize == undefined){
                if(that.selected_size !== ''){
                 this.selectedSize =  that.selected_size
                }
                else{
                let sizeErr = document.getElementById('km-select-size')
                sizeErr.insertAdjacentHTML('afterend', '<span class="text-danger" id="sizeErr">Please select size first</soan>');

                }
              }
        let index = that.variation.findIndex(e => e[0] == this.selectedSize);
        this.selectedSizeData = that.variation[index];
        if(this.selectedSize !== undefined)
        that.add_to_cart(this.selectedSizeData[1]);
      }
    },
    checkPincode: function(e) {
      let inputdata = document.getElementById("pincodeinbox");
      if(inputdata.value !== ''){
        this.pincode = inputdata.value;
        that.pin_code(this.pincode);
      }
      
    },
    kmMinusQtyAction: function() {
      that.qty_minus();
    },
    kmPlusQtyAction: function() {
      that.qty_plus();
    },
    check: function() {
      window.location.href = "/cart";
    },
    kmPdpWIshlist() {
      // if(that.product_added == true){
      //   that.remove_w();
      // }
      // else{
        that.add_w();
      // }
    },
    kmNotify(){
      that.isNotify = true;
    }
  }
});

var kmSelectSizeAction = function(param) {
  if(param.classList.contains('disabled-button')){
    return;
  }else{
    app.$options.methods.kmSelectSizeAction(param);

  }
};
var kmAddToCartAction = function(param) {
  app.$options.methods.kmAddToCartAction(param);
};
var check = function() {
  app.$options.methods.check();
};
var checkPincode = function() {
  app.$options.methods.checkPincode();
};
var kmPlusQtyAction = function() {
  app.$options.methods.kmPlusQtyAction();
};
var kmMinusQtyAction = function() {
  app.$options.methods.kmMinusQtyAction();
};
var kmPdpWIshlist = function() {
  app.$options.methods.kmPdpWIshlist();
};
var kmNotify=function(){
  app.$options.methods.kmNotify();
};
export default {
  mixins:[modifyMixin],
  name: "Product_detail",
  components :{
    Shimmer,
  },
 
  head() {
    return {
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.meta_description
        },
        {
          property: "keywords",
          content: this.meta_keyword
        }
      ],
     
    };
  },
  data: function() {
    return {
      time:0,
      isNotify:false,
      galleryScript:'',
      productDetails: "",
      dataLoaded: false,
      callLightgallery: false,
      galleryImages: [],
      galleryIndex: null,
      gender: "Men",
      activeEMIClass: "",
      emiPlans: {},
      bankPlans: {
        minAmount: 0,
        plans: { 3: 14, 6: 14, 9: 14, 12: 14, 18: 14, 24: 14 }
      },
      showEMIPopup: false,
      tableContent: "",
      careInsTab: false,
      returnTab: false,
      importerTab: false,
      sale: "",
      rating: {
        star: "",
        review: "",
        title: ""
      },
      reviews: "",
      brand: "",
      productURLkey: "",
      sizechartDetails: [],
      sizechartlabel: [],

      size: {
        select_size: "",
        max_qty: "1",
        variant_id: "",
        sku: ""
      },
      product_attr_data: {
        count: 4,
        text: "Show More",
        active: false
      },
      wishlist: [],
      meta_title: "",
      productColor: "",
      meta_description: "",
      meta_keyword: "",
      size_active: true,
      qty: "1",
      size_error: "",
      pro_id: this.$route.params.pro_id,
      pro_url_key: this.$route.params.product,
      name: "",
      master_sku: "",
      sub_group_id: "",
      price: 0,
      stock_status: "",
      product_cat: "",
      selling_price: 0,
      quantity: 0,
      description: "",
      variation: [],
      clicked: false,
      color_options: [],
      placeholder_image: "",
      gallery: [],
      is_discount: "",
      offers_list: "",
      product_attr: [],
      couponoffers: [],
      show_hide_product_attr: [],
      show_hide_product_attr_type: false,
      team_up_products: [],
      size_guide: "",
      size_chart_content: "",
      size_guide_popup: false,
      size_guide_type: "IN",
      pincode: "",
      isMobile: false,
      pincode_success: "",
      cod_available: "",
      //pincode_success: '<span class="span1">Free delivery on all orders above Rs '+ this.$store.state.list.shipping_charges_below +'. COD charge Rs '+ this.$store.state.list.cod_charges +'.</span><span class="span4">Easy Return within 15 days.</span>',
      pincode_error: "",
      displayPdp:false,
      productOutOfStock:false,
      selected_size:'',
      product_added:false
    };
  },
  methods: {
    notifyMe(){

    },
    async replaceCode(){
     if(this.$store.state.list.cart_id !== null && this.$store.state.list.cart_id !== ''){
            $cookies.set(
            window.location.hostname.substring(10, 4) + "_cart",
            this.$store.state.list.cart_id,
            "1y"
          );
      }
    that = this;
    var productDatanew 
    let crousel = document.createElement("script");
      crousel.setAttribute(
        "src",
        "https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
      );
      document.head.appendChild(crousel);
      let key = this.$route.params.product;

      // ***** call widget api *******
      let productData = await axios.get(this.$store.state.list.editor_url+
        "/single-product"
      );
      this.productDetails = productData.data.data;
      // this.scrollToLastLoc()
      // this.SaveScrollHistory()

      this.galleryScript = productData.data.scripts;
      
      // **** call product detail api **** 
      await axios.get(
        this.$store.state.list.cart_api_url+'/v1'+`/product-size-guide/${key}`
      ).then(res=>{
        if(res.data.success ==  true){
          let body = document.getElementById("offcanvasSizeGuide").querySelector('.offcanvas-body') 
          body.innerHTML = res.data.data
        }
        else{
          document.getElementsByClassName('km-size-guide')[0].getElementsByTagName('a')[0].innerHTML = ''
        }
      }).catch(err=>{console.log(err)})
      
      await axios.get(
        this.$store.state.list.cart_api_url+'/v1'+`/product-pdp/${key}`
      )
      .then(response=>{
        if(response.data.success == false){
          this.$toast.error(response.data.message, {
            position: "top-center",
            duration: 3000
          });
          
        }
        else{
          productDatanew = response.data.result
          this.selected_size = response.data.result.selected_size
          // call api for product viewed entry 
          let payload = {
            url_key:key,
            sku:response.data.result.sku,
          }
          if(
            this.$store.state.list.customer_id != "" &&
            this.$store.state.list.customer_id != null
          ) {
            payload.customer_id = this.$store.state.list.customer_id
            }
            axios.post(
              this.$store.state.list.cart_api_url+'/v1'+"/most-view-product",payload
            );
        }
        
       })

      let data = productDatanew;
     
      this.product = productDatanew;
      this.name = this.product.name;

      // create json for store in local stroage
      this.$store.state.list.customer_id = $cookies.get(
        window.location.hostname.substring(10, 4) + "_customer"
      );
      var productJSON = {
          'product_id': this.product.product_id,
          'master_sku': this.product.sku,
          'custmor_id': this.$store.state.list.customer_id ? this.$store.state.list.customer_id : 'null',
          'product_url':window.location.href,
          'name':this.product.name,
          'product_desc':this.product.description ? this.product.description:' '
      };
      localStorage.setItem('productJSON', JSON.stringify(productJSON));

      if(window.dataLayer !== undefined && window.dataLayer !== null && window.dataLayer !== ''){
        window.dataLayer.push({
            event: 'ProductDetail',
            action: 'Product Detail',
            ecommerce: {
                detail: {
                    actionField:
                    {
                        list:'list',
                        action: 'detail'
                    },
                    product: [{
                        name: this.product.name,
                        id: this.product.sku,
                        price: this.product.selling_price,
                        // category: this.product.product_cat,
                        product_id: this.product.sku,
                        // sub_group_id: this.product.sub_group_id,
                        original_product_price: this.product.selling_price,
                        // product_category:this.product.product_cat
                    }
                    ]
                }
            }
        });
      }
     
     
      if (data != undefined && that.productDetails != undefined) {
        let checkData = setInterval(async () => {
          that.master_sku = that.product.sku;
          // that.get_review();
          // here should be change according to need
          if(document.getElementById("km-product-sub-title") !== null){
                let subTitle = (document.getElementById(
            "km-product-sub-title"
          ).innerHTML = "");
          }
      
          // ** change product tiltle ** 
          var x, j;
          x = document.querySelectorAll("#km-product-title");
          for (j = 0; j < x.length; j++) {
            x[j].innerHTML = data.name;
          }

          var y, k;

          y = document.querySelectorAll("#km-product-price");
          for (k = 0; k < y.length; k++) {
            y[k].innerHTML = `<i class="kartmax_currency"></i>` + data.selling_price;
          }

          // <------------------------------------------------------- discount amount change ------------------------->
          if (data.discount > 0) {
            if(document.getElementById("km-discount-price") !==null && document.getElementById("km-discount-price")!=='' && document.getElementById("km-discount-price") !==undefined){
             document.getElementById("km-discount-price").innerHTML = `<i class="kartmax_currency"></i>`  + data.price + ' ';
            }
            if(document.getElementById("km-show-discount")!==''&&document.getElementById("km-show-discount")!==null &&document.getElementById("km-show-discount")!==undefined){
              document.getElementById("km-show-discount").innerHTML = `<span class="brackit">(</span><span class="dis_amt">${data.discount}</span><span class="dis_text">%off</span><span class="brackit">)</span>`
            }
          } else {
            if(document.getElementById("km-discount-price") !== null){
              document.getElementById("km-discount-price").innerHTML = ""
            }
            if(document.getElementById("km-show-discount") !== null){
              document.getElementById("km-show-discount").innerHTML = ''
            }

          }
          // <------------------------------------- dynamic breadcrumbs start here-------------------------------->

            if( document.getElementById("km-breadcrumb") !== undefined && document.getElementById("km-breadcrumb") !==null){
              let breadcrumbList =  document.getElementById("km-breadcrumb").getElementsByTagName('li');
                for (let i = 0; i < breadcrumbList.length; i++) {
                if(i==0){
                   breadcrumbList[i].getElementsByTagName('a')[0].href = '/'
                }else if(i==1){
                  if(that.product.breadcrumb_category !== undefined && that.product.breadcrumb_category !== null ){
                   breadcrumbList[i].getElementsByTagName('a')[0].href = '/category/'+that.product.breadcrumb_category.url_key
                   breadcrumbList[i].getElementsByTagName('a')[0].innerHTML = this.capitalizeFirstLetter(that.product.breadcrumb_category.name)
                  }
                  // else{
                  //  breadcrumbList[i].getElementsByTagName('a')[0].innerHTML = ''

                  // }
                }
                else{
                  breadcrumbList[i].innerHTML = that.product.name
                }

                  
                }
            }
          // <-----------------------------------product details dynamic start here -------------------------------->


          let details = document.getElementById("km-product-details");
          let detailsOctave = document.getElementById("collapseOne");
          let data1 =  document.querySelectorAll('#collapseOne > div > div > div:nth-child(1)')
          if(data1[0] !== undefined && data1[0] !== null){
                let datamain =  document.querySelectorAll('#collapseOne > div > div')
                if(datamain[0] !== undefined){
                datamain[0].innerHTML = ''

                }

          this.product.attributes.map(e=>{
            if(e.value !== null && e.value !== ''){
              let str =  e.code.charAt(0).toUpperCase() + e.code.slice(1)
              if(str.includes("_")){
                str = str.replaceAll('_', ' ');
              }
              // data1.querySelectorAll('h2 > span')[0].innerHTML = str
              data1[0].getElementsByTagName('h2')[0].getElementsByTagName('span')[0].innerHTML = str
              data1[0].getElementsByTagName('div')[0].getElementsByTagName('h2')[0].getElementsByTagName('span')[0].innerHTML = e.value
              datamain[0].innerHTML += data1[0].outerHTML
            }
              
            })
          }
       
          if(details !== null){
            let staticDis = details.getElementsByTagName('li')
            var productCloneDiv  =  staticDis[0];
            details.innerHTML =''
            if(this.product.attributes.length == 0 && details !== null){
            document.getElementsByClassName('product_detail')[0].innerHTML = ''
              
            }
          
          setTimeout(() => {
            this.product.attributes.map(e=>{
              let str =  e.code.charAt(0).toUpperCase() + e.code.slice(1)
              if(str.includes("_")){
                str = str.replaceAll('_', ' ');
              }
              if(productCloneDiv!==null && productCloneDiv !== undefined && productCloneDiv !==''){
                productCloneDiv.children[0].innerHTML = str;
                productCloneDiv.children[1].innerHTML =e.value;
              }
              
              details.innerHTML += productCloneDiv.outerHTML
            })
           
          },100);
          }
           
          let brand = document.getElementById("km-pdp-brand")
          if(brand !== null && brand !== undefined && brand !== ''){
            if(that.product.brand !==null && that.product.brand !==undefined && that.product.brand !== ''){
              brand.innerHTML=that.product.brand
            }
            else{
              brand.innerHTML = ''

            }

          }          
          let sku =  document.getElementById("km-sku")
          if(sku !== null && sku !== undefined && sku !== ''){
            sku.getElementsByTagName('span')[1].innerHTML = that.product.sku
          } 
         
          

          // <============================ slider for mobile ============================>
          if(document.getElementById("km-mobile-pdp-slider")){
            
            
              let imageContainer = document.getElementById("km-mobile-pdp-slider");
              that.imageProperty = JSON.parse(imageContainer.getAttribute('data-sizeinfo'));
              if(that.imageProperty == undefined || that.imageProperty == '' || that.imageProperty == null ) { 
               that.imageProperty={}
                that.imageProperty.imageObjectFit = 'cover'
                that.imageProperty.imgSizeW ='200'
                that.imageProperty.imgSizeH ='200'
              }
              let imageDIvs = imageContainer.getElementsByTagName("img");
              let getSlides = imageContainer.getElementsByClassName("swiper-wrapper")[0].getElementsByClassName("swiper-slide");
              let total = imageDIvs.length;
              for (let i = 0; i < data.gallery.length; i++) {
                if (total > i) {
                  getSlides[i].getElementsByTagName('img')[0].src =
                   this.$store.state.list.image_url+`${that.imageProperty.imageObjectFit}/${that.imageProperty.imgSizeW}x${that.imageProperty.imgSizeH}/` +
                    data.gallery[i].image;
                } else {
                    var original =getSlides[0];
                    var clone = original.cloneNode(true);
                    original.parentNode.appendChild(clone);
                    let image = original
                      .getElementsByTagName("img");
                    image[0].src= this.$store.state.list.image_url+`${that.imageProperty.imageObjectFit}/${that.imageProperty.imgSizeW}x${that.imageProperty.imgSizeH}/` +

                    data.gallery[i].image;
                }
              }
          }
          

         


          // <======================================= dynamic size buttons start here ============================> //

          var buttonData = document.getElementById("km-select-size");
          if(buttonData !==null){
            var div = buttonData.getElementsByTagName('div')[0];
            this.cloneDiv = buttonData.getElementsByTagName('div')[0];
          }
          
          if(div !== null && div !== '' && div !== undefined){
            var inputDIvs = div.getElementsByTagName("input");
              var totalInput = inputDIvs.length;
          }
       
          if(data.variation == undefined || data.variation == null){
              that.$toast.error('There are some variation issue', {
              position: "top-center",
              duration: 3000
            });
          }
          else{
          if(div !== null && div !== '' && div !== undefined){

            that.variation = Object.entries(data.variation);
            if(totalInput>that.variation.length){
              // remove static size inputs
              let diff = totalInput - that.variation.length;
              for(let i=that.variation.length;i<=diff;i++){
                inputDIvs[i].outerHTML = ''
              }
            }
            var outStockCount = 0;
            for (let i = 0; i < that.variation.length; i++) {
                if (i==0) {
                  inputDIvs[0].value = that.variation[i][0];
                    buttonData.getElementsByTagName('div')[i].innerHTML += ''
                
                } else {
                    buttonData.innerHTML += div.outerHTML;
                   
                    buttonData.getElementsByTagName('div')[i].getElementsByTagName('input')[0].value = that.variation[i][0];
                }
              }
              let totalButtons = document.querySelectorAll('[id^="km-select-size-2"]')
              for(let i=0; i<totalButtons.length;i++){
                     // size left count 
                      let sizeBox = document.querySelectorAll('[id^="product-size"]')[0];
                      if (sizeBox.dataset.sizeinfo) {
                        if (sizeBox.dataset.sizeinfo == 'Add') {
                            if (that.variation[i][1].quantity <= sizeBox.dataset.sizecount && that.variation[i][1].quantity > 0) {
                                buttonData.getElementsByTagName('div')[i].innerHTML += `<span class="size_left"> ${that.variation[i][1].quantity}  left </span>` 
                          }
                        }
                      }
                        // size left count end
              }
             if(this.selected_size !== null){
                var buttonData = document.getElementById("km-select-size");
                let index = that.variation.findIndex(e => e[0] == this.selected_size);
                buttonData.getElementsByTagName('div')[index].classList.add('active')
                let y = document.querySelectorAll("#km-product-price");
                for (let k = 0; k < y.length; k++) {
                  y[k].innerHTML = `<i class="kartmax_currency"></i>` + that.variation[index][1].selling_price;
                }

              }
          }
          }
          for (let i = 0; i < that.variation.length; i++) {
                if(that.variation[i][1].stock_status =='out-of-stock'){
                  buttonData.getElementsByTagName('div')[i].classList.add('disabled-button')
                  outStockCount = outStockCount + 1;
                }

            }
            if(outStockCount == that.variation.length){
              this.productOutOfStock = true;
              if(document.getElementById("km-add-to-cart") !==null && document.getElementById("km-add-to-cart") !==undefined){
                 document.getElementById("km-add-to-cart").classList.add('d-none')

              }
              if(document.getElementById('km-stock') !== null){
                
                document.getElementById('km-stock').innerHTML = '<span class="text-danger">Out of stock</span>'
              }
            }else{
               if(document.getElementById('km-stock') !== null){
                document.getElementById('km-stock').innerHTML = ''
                 
              }

              // notify dynamic widget start //
              
              if(!this.productOutOfStock){  
                if(document.getElementById("km-notify") !== null){
                  document.getElementById("km-notify").classList.add('d-none')
                }
              }
            }

          // dynamic buttons end here //


          // <============================================ dynamic colors start ====================================>

            if(data.color_options.length > 0){
              let colorDiv = document.getElementById("km-colors-list");
              let colorDivImage = document.getElementById("km-colors-list-img");

              if(colorDiv !== null){
                let colorList = colorDiv.getElementsByTagName("a"); // get all a tags
                const forLoop = async _ => {
                  for(let i=0;i<colorList.length ;i++) {
                      if(i>0){
                        colorList[i].remove() 
                      }
                  }
                }
                forLoop();
                data.color_options.forEach(async (item,i) => { 
                  if(i>0){
                      var j = 0;
                      var original = colorList[0];
                      var clone = original.cloneNode(true);
                      clone.key = i;
                      original.parentNode.appendChild(clone);
                  }
                })

                let newDiv = document.querySelectorAll('#km-colors-list');
                let newList = newDiv[0].getElementsByTagName("a");
                const forhref = async _ => {
                  for(let i=0;i<newList.length ;i++) {
                      newList[i].href = data.color_options[i].url_key
                     if(data.product_id == data.color_options[i].id_product){
                         newList[i].getElementsByTagName('a')[0].parentNode.classList.add('active')
                        }
                   console.log("llllllllllllllllllllllll")
                    newList[i].getElementsByTagName('div')[0].setAttribute("style", `background-color: ${(data.color_options[i].colour).toLowerCase()};`)

                  }
                }
                forhref();

              }
              if(colorDivImage !==null){
                let colorImage = colorDivImage.getElementsByTagName("div"); // get all a tags
                const forImage = async _ => {
                  for(let i=0;i<colorImage.length ;i++) {
                      if(i>0){
                        colorImage[i].remove() 
                      }
                  }
                }
                forImage()
                data.color_options.forEach(async (item,i) => { 
                  if(i>0){
                      var j = 0;
                      var original = colorImage[0];
                      var clone = original.cloneNode(true);
                      clone.key = i;
                      original.parentNode.appendChild(clone);
                  }
                })
                let newDiv = document.querySelectorAll('#km-colors-list-img');
                let newList = newDiv[0].getElementsByTagName("div");
                const forhref = async _ => {
                  for(let i=0;i<newList.length ;i++) {
                      newList[i].getElementsByTagName('a')[0].href = data.color_options[i].url_key
                       if(data.product_id == data.color_options[i].id_product){
                         newList[i].getElementsByTagName('a')[0].parentNode.classList.add('active')
                        }
                        console.log("data.color_options[i]",newList[i].getElementsByTagName('a')[0])
                      newList[i].getElementsByTagName('a')[0].parentNode.innerHTML += `<span class="color_name d-none">${data.color_options[i].colour}</span>`;
                      newList[i].getElementsByTagName('img')[0].src = this.$store.state.list.image_url+`cover/150x200/`+data.color_options[i].image
                 }
                }
                forhref();
              }

            }else{
              if(document.getElementById('km-color-options') !==null && document.getElementById('km-color-options') !== undefined)
              document.getElementById('km-color-options').innerHTML = ''
            }

              // ***************** this code is written for change colour value ********* //
              let index = this.product.attributes.findIndex(e => e.code == 'colour')
              if(index>-1){
                if( document.getElementById('color-value') !== null &&  document.getElementById('color-value') !== undefined)
                document.getElementById('color-value').innerHTML = this.product.attributes[index].value
              }
            
          // <================================dynamic colors end=========================================>
          // ******************* selected size code start hare ******************************* //
            // let selectedSize = document.getElementById('selected-size')
            // if(selectedSize !== '' &&selectedSize !== null && selectedSize !== undefined){
            //   selectedSize.innerText = that.selectedSize
            // }
            
          // ******************* selected size code end hare ******************************* //

          // <================================ wishlist icon code start==================================> 
          if(this.$store.state.list.wishlist.length>0){
             let index =  this.$store.state.list.wishlist.indexOf(data.group_id)
             if(index > -1){
               // means product is already addded 
               let classes =  document.getElementById('km-pdp-wishlist').getElementsByTagName('i')[0].classList
                for await (const [j] of classes.entries()) {
                  document.getElementById('km-pdp-wishlist').getElementsByTagName('i')[0].classList.remove(classes[j])
                }
              document.getElementById('km-pdp-wishlist').getElementsByTagName('i')[0].classList.add("fas")
              document.getElementById('km-pdp-wishlist').getElementsByTagName('i')[0].classList.add("fa-heart")
               that.product_added = true
             }
          }
          if(document.getElementById('delivery-option-error') !== null)
          document.getElementById('delivery-option-error').innerHTML = '' // delete default error for pincode
          that.dataLoaded = true;

          // ** this code is for show/hide delivery options 
          let delivery_options = document.getElementById('delivery-option');
          if(delivery_options.classList.contains('hide-delivery')){ // mean hide option till user did't type any pincode
            delivery_options.classList.add('d-none')
          }
          that.displayPdp = true
          
          clearInterval(checkData);
          that.gallary();

        },1000)
      } 
      else {
        that.nocontent = true;
      }


    },
    getClass(){
      return {
        'v-hide-class': this.displayPdp,
        'v-show-class': !this.displayPdp
        }
    },
    selectProduct(article) {
      this.pro_id = article.id_product;
      this.master_sku = article.sku;
      this.price = article.price;
      // this.qty = article.quantity
      this.selling_price = article.selling_price;
    },
   
    vibrate() {
      window.navigator.vibrate(200);
    },

   
    get_review() {
      var form = new FormData();
      form.append("store", 1);
      form.append("master_sku", this.master_sku);
      let config = { headers: { "Content-Type": "multipart/form-data" } };

      axios
        .post(
          this.$store.state.list.cart_api_url+'/v1'+"/review/review-count",
          form,
          config
        )
        .then(response => {
          if (response.data.success == true) {
            this.reviews = response.data.data;
            if(this.reviews > 0){

            this.totalReview = this.reviews.total_review;
            this.avrageRating = this.reviews.average_rating;
            this.reviewsCount = this.reviews.reviews_count;
            this.reviewsArr = this.reviews.reviews.data;
              if(this.avrageRating > 0){
                if(document.getElementById("km-rating").getElementsByTagName('span')[0] !== undefined){
                  document.getElementById("km-rating").getElementsByTagName('span')[0].innerHTML =  this.avrageRating
                }
            
                if(document.getElementById("km-all-review-count").getElementsByTagName('span')[2] !== undefined){
                  document.getElementById("km-all-review-count").getElementsByTagName('span')[2].innerHTML = this.totalReview;
                }
              }
            }

            else{
              if(document.getElementById("km-all-review-count") !== null)
              document.getElementById("km-all-review-count").innerHTML = ""
            }

            // all review container 
            if(document.getElementById("km-all-review-container") !== undefined){
                if( this.avrageRating > 0){
                    document.getElementById("km-average-rating").getElementsByTagName('h4')[0].innerHTML =  this.avrageRating;
                    document.getElementById("km-average-rating").getElementsByTagName('span')[0].innerHTML =  this.avrageRating + ' Reviews';
                }else{
                  if(document.getElementById("km-all-review-container") !== null)
                  document.getElementById("km-all-review-container").innerHTML = ''
                  
                }
            }


            if(document.getElementsByClassName("rating-range") !== undefined && document.getElementsByClassName("rating-range") !==null ){
              if( this.avrageRating > 0){
                this.reviewsCount
             
                document.getElementById("km-fill-range-1").getElementsByTagName('span')[0].style.width = this.reviewsCount[1]+"%";
                document.getElementById("km-fill-range-2").getElementsByTagName('span')[0].style.width = this.reviewsCount[2]+"%";
                document.getElementById("km-fill-range-3").getElementsByTagName('span')[0].style.width = this.reviewsCount[3]+"%";
                document.getElementById("km-fill-range-4").getElementsByTagName('span')[0].style.width = this.reviewsCount[4]+"%";
                document.getElementById("km-fill-range-5").getElementsByTagName('span')[0].style.width = this.reviewsCount[5]+"%";
              }else{
              }
            }

            // all reviews by customer

            if(document.getElementById("km-all-review-list") !== undefined && document.getElementById("km-all-review-list") !== null){
              if(this.totalReview>0){
                document.getElementById("km-all-review-list").getElementsByTagName('h4')[0].childNodes[1].innerHTML = '('+ this.totalReview + ')'; 
                let review =  document.getElementById("km-all-review-list").getElementsByTagName('ul')[0].innerHTML;
                let mainDiv = document.getElementById("km-all-review-list").getElementsByTagName('ul')[0]
                document.getElementById("km-all-review-list").getElementsByTagName('ul')[0].innerHTML = ""

                for(let i=0;i<this.totalReview;i++){
                  mainDiv.innerHTML += review

                }
                let totalReviewTitle = document.querySelectorAll("#km-comments-review");
                let totalReviewMessage = document.querySelectorAll("#km-comments-msg");
                let totalReviewUsers= document.querySelectorAll("#km-review-user-info");
                

                for(let i =0;i<totalReviewTitle.length; i++){
                  totalReviewTitle[i].childNodes[0].childNodes[1].innerHTML = this.reviewsArr[i].rr_rating;
                  totalReviewTitle[i].childNodes[2].innerHTML = this.reviewsArr[i].rr_title
                  totalReviewMessage[i].innerHTML = this.reviewsArr[i].rr_description
                }
                for(let i=0;i<totalReviewUsers.length;i++){
                  totalReviewUsers[i].getElementsByTagName('span')[0].innerHTML=this.reviewsArr[i].rr_customer_name;
                  totalReviewUsers[i].getElementsByTagName('span')[1].innerHTML=this.reviewsArr[i].rr_updated_at | dateFormat

                }
                if(this.totalReview > 2){
                  document.getElementById("km-all-reviews")
                }
                else{
                  document.getElementById("km-all-reviews").innerHTML = ""
                }
              }
              else{
                  document.getElementById("km-all-review-list").innerHTML = ""
              }
            }
          }
          else{
            if(document.getElementById("km-rating")!==undefined &&  document.getElementById("km-rating")!=='' && document.getElementById("km-rating")!==null){
              document.getElementById("km-rating").innerHTML = ''

              document.getElementById("km-all-review-container").innerHTML = ''

              document.getElementById("km-all-review-list").innerHTML = "";

              document.getElementById("km-all-review-count").innerHTML = "";
            }
          }
        }).catch(err=>{
          if(document.getElementById("km-rating")!==undefined &&  document.getElementById("km-rating")!=='' && document.getElementById("km-rating")!==null){
              document.getElementById("km-rating").innerHTML = ''

              document.getElementById("km-all-review-container").innerHTML = ''

              document.getElementById("km-all-review-list").innerHTML = "";

              document.getElementById("km-all-review-count").innerHTML = "";
            }

        });
    },

    close_popup_emi() {
      this.showEMIPopup = false;
    },
    pin_code: function(pin) {
      if (pin != undefined) {
        this.pincode = pin;
      }
      let pincode = /^([0-9]{6,})+$/;
      if (this.pincode.match(pincode)) {
         this.$store.state.list.page_loader = true;
            if(document.getElementById('delivery-option') !== null && document.getElementById('delivery-option') !== undefined && document.getElementById('delivery-option') !== ''){
                 document.getElementById('delivery-option').innerHTML = "";
            }
            let size;
            if(selectedSize !==''){
              size = selectedSize
            }else if(this.selected_size !== null && this.selected_size !==''){
              size = this.selected_size
            }
            else{
              size=null
            }
        axios
          .get(this.$store.state.list.cart_api_url+'/v1'+"/serviceable-pincode", {
            params: {
              pincode: this.pincode,
              size:size,
              product_id:this.product.product_id
            }
          })
          .then(response => {
   
            if (response.data.success === true) {
              if(document.getElementById("delivery-option-error") !==null && document.getElementById("delivery-option-error") !== ''){
                document.getElementById("delivery-option-error").classList.add('d-none')
              }
              this.pincode_success = response.data.result.delivery;
              this.cod_available = response.data.result.cod;
              if(document.getElementById('delivery-option') !== null && document.getElementById('delivery-option') !== undefined && document.getElementById('delivery-option') !== ''){
                //  ** check if delivery option para have display none class
                if(document.getElementById('delivery-option').classList.contains('d-none')){
                  document.getElementById('delivery-option').classList.remove('d-none')
                }
                document.getElementById('delivery-option').innerHTML = response.data.response.success_message
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_pin",
                  this.pincode
                );
                this.pincode_error = "";
              }
  
            } else {
              // alert(response.data.message)
              document.getElementById("delivery-option-error").classList.remove('d-none')
              document.getElementById("delivery-option-error").innerHTML =response.data.message;
              document.getElementById('delivery-option').innerHTML = ''
              this.pincode_error = response.data.message;
              this.pincode_success = "";
              this.cod_available = "";
            }
             this.$store.state.list.page_loader = false;
          });
      } else {
        this.pincode_error =
          "<span class='error'>Please enter valid Pin code</span>";
            this.$toast.error("Please enter valid Pin code.", {
            position: "top-center",
            duration: 3000
          });
        this.pincode_success = "";
        this.cod_available = "";
      }
    },
   
    qty_plus() {
      if (selectedSize != "" && selectedSize !== undefined) {
        this.$store.state.list.error_message = "";
        this.$store.state.list.success_message = "";
        // ***** todo ******
        // qty max check is remaing
        // if (this.qty < this.size.max_qty && this.qty < 5) {
        //     this.qty = (this.qty * 1) + 1;
        // }

        let qty_val = document.getElementById("km-qty-value");
        qty_val.value = Number(qty_val.value) + 1;
        this.qty = qty_val.value;
      } else {
        this.size_active = false;
        this.size_error = "Please select a size first !";
        this.vibrate();

        if (window.innerWidth > 767) {
          this.$toast.error("Please select a size first.", {
            position: "top-center",
            duration: 4000
          });
        }
      }
    },
    qty_minus() {
      if (selectedSize != "" && selectedSize !== undefined) {
        this.$store.state.list.error_message = "";
        this.$store.state.list.success_message = "";

        // ***** todo ******
        // qty min check is remaing

        // if (this.qty > 1) {
        //     this.qty = (this.qty * 1) - 1;
        // }
        let qty_val = document.getElementById("km-qty-value");
        if(this.qty > 1){
            qty_val.value = Number(qty_val.value) - 1;
            this.qty = qty_val.value;
        }
        
      } else {
        this.size_active = false;
        this.size_error = "Please select a size first";
        this.vibrate();
        this.$toast.error("Please select a size first.", {
          position: "top-center",
          duration: 4000
        });
      }
    },
   
    size_popup_show() {
      this.size_guide_popup = true;
      document.body.style.overflow = "hidden";
    },
    close_popup() {
      this.size_guide_popup = false;
      document.body.style.overflow = "auto";
    },
    add_to_cart: function(item) {
    
      this.size = item;
      this.$store.state.list.customer_id = $cookies.get(
        window.location.hostname.substring(10, 4) + "_customer"
      );
      if (this.$store.state.list.cart_product.length != 0) {
          this.$store.state.list.cart_id = $cookies.get(
            window.location.hostname.substring(10, 4) + "_cart"
          );

          this.product = this.size;
          this.selectedSize = this.product.size;
          if(this.selected_size !== null && this.selected_size !==''){
              if(this.selectedSize == "" ||this.selectedSize == undefined){
                  this.selectedSize = this.selected_size
              }
          }
          if (this.selectedSize != "" && this.selectedSize !== undefined) {
            this.$store.state.list.page_loader = true;
            var form = new FormData();
            form.append("product_id", this.size.id_product);
            form.append("product_parent_id", this.product.id_product);
            form.append("product_options", this.product.size);
            form.append("name", this.product.name);
            form.append("sku", this.product.sku);
            form.append("master_sku", this.product.sku);
            form.append("price", this.product.price);
            form.append("qty_ordered", this.qty);
            form.append("final_price", this.product.selling_price);
            form.append("store", this.$store.state.list.store);
            if (
              this.$store.state.list.cart_id != null &&
              this.$store.state.list.cart_id != ""
            ) {
              form.append("cart_id", this.$store.state.list.cart_id);
              form.append("cart_session", this.$store.state.list.cart_session);
            }
            if (this.$store.state.list.customer_session) {
              form.append("customer_id", this.$store.state.list.customer_id);
              form.append(
                "customer_session",
                this.$store.state.list.customer_session
              );
            }
            let config = { headers: { "Content-Type": "multipart/form-data" } };
            
            axios
              .post(
                this.$store.state.list.cart_api_url+'/v1'+"/product/add-product",
                form,
                config
              )
              .then(response => {
                if (response.data.success === true) {
                

                  this.$toast.success(response.data.message, {
                    position: "top-center",
                    duration: 3000
                  });
                  response.data.data.cart_session = this.$store.state.list.cart_session;
                  this.$store.state.list.error_message = "";
                  this.$store.state.list.page_loader = false;
                  this.$store.state.list.cart_product =
                    response.data.data.products;
                  //  this.$store.state.list.googleAnalyticsTag('add_to_cart')
                  this.$store.state.list.cart_total =
                    response.data.data.grand_total;

                  this.$store.state.list.cart_subtotal =
                    response.data.data.order_subtotal;
                  this.$store.state.list.discount_code =
                    response.data.data.discount_code;
                  this.$store.state.list.discount_amount =
                    response.data.data.discount_amount;
                  this.$store.state.list.address = response.data.data.address;
                  $cookies.set(
                    window.location.hostname.substring(10, 4) + "_cart",
                    response.data.data.cart_id
                  );
                  this.$store.state.list.cart_id = response.data.data.cart_id;
                  this.$store.state.list.thankyou_cart =
                    response.data.data.cart_id;
                  if (response.data.data.cart_session) {
                    $cookies.set(
                      window.location.hostname.substring(10, 4) + "_ct_sess",
                      response.data.data.cart_session,
                      "1y"
                    );
                    this.$store.state.list.cart_session =
                      response.data.data.cart_session;
                  }
                  
                  if (this.$store.state.list.address.length != 0) {
                    for (
                      let i = 0;
                      i < this.$store.state.list.address.length;
                      i++
                    ) {
                      if (i == 0) {
                        this.$store.state.list.address_id =
                          this.$store.state.list.address[i].id * 1;
                        this.$store.state.list.select_address_no = i;
                      }
                    }
                  }
                   this.miniCart();
                    this.selectedSize = "";
                  } else {
                    this.$store.state.list.success_message = "";
                    this.$toast.error(response.data.message, {
                      position: "top-center",
                      duration: 4000
                    });
                    this.$store.state.list.page_loader = false;
                    if (
                      response.data.cart_session_status == false ||
                      response.data.customer_session_status == false
                    ) {
                      $cookies.set(
                        window.location.hostname.substring(10, 4) + "_customer",
                        "",
                        "1y"
                      );
                      $cookies.set(
                        window.location.hostname.substring(10, 4) + "_cus_sess",
                        "",
                        "1y"
                      );
                      this.$store.state.list.customer_id = "";
                      this.$store.state.list.customer_session = "";
                      $cookies.set(
                        window.location.hostname.substring(10, 4) + "_cart",
                        "",
                        "1y"
                      );
                      $cookies.set(
                        window.location.hostname.substring(10, 4) + "_ct_sess",
                        "",
                        "1y"
                      );
                      this.$store.state.list.cart_id = "";
                      this.$store.state.list.cart_session = "";
                      this.$store.state.list.cart_product = [];
                    }
                  }
              })
              .catch(error => {
                this.$store.state.list.page_loader = false;
                if (error.message === "Network Error") {
                  this.$toast.error(
                    "Oops there seems to be some Network issue, please try again.",
                    {
                      position: "top-center",
                      duration: 4000
                    }
                  );
                }
              });
          } else {
            this.size_active = false;
            this.size_error = "Please select a size first";
            this.vibrate();
            if (window.innerWidth > 767) {
              this.$toast.error("Please select a size first.", {
                position: "top-center",
                duration: 4000
              });
            }
          }
        } else {
          // this.$store.state.list.cart_id = $cookies.get(
          //   window.location.hostname.substring(10, 4) + "_cart"
          // );
          this.product = this.size;
          if (this.selectedSize != "") {
            this.$store.state.list.page_loader = true;
            var form = new FormData();
            form.append("product_id", this.product.id_product);
            form.append("product_parent_id", this.product.id_product);
            form.append("product_options", this.product.size);
            form.append("name", this.product.name);
            form.append("sku", this.product.sku);
            form.append("master_sku", this.product.sku);
            form.append("price", this.product.price);
            form.append("qty_ordered", this.qty);
            form.append("final_price", this.product.selling_price);
            form.append("store", this.$store.state.list.store);
            if (
              this.$store.state.list.cart_id != null &&
              this.$store.state.list.cart_id != ""
            ) {
              form.append("cart_id", this.$store.state.list.cart_id);
              form.append("cart_session", this.$store.state.list.cart_session);
            }
            if (
              this.$store.state.list.customer_id != null &&
              this.$store.state.list.customer_id != ""
            ) {
              form.append("customer_id", this.$store.state.list.customer_id);
              form.append(
                "customer_session", 
                this.$store.state.list.customer_session
              );
            }
            let config = { headers: { "Content-Type": "multipart/form-data" } };
     
            axios
              .post(
                this.$store.state.list.cart_api_url+'/v1'+"/product/add-product",
                form,
                config
              )
              .then(response => {
                if (response.data.success === true) {
                  this.$toast.success(response.data.message, {
                    position: "top-center",
                    duration: 4000
                  });
                  // response.data.data.cart_session = this.$store.state.list.cart_session

                  this.$store.state.list.error_message = "";
                  this.$store.state.list.page_loader = false;
                  this.$store.state.list.cart_product =
                    response.data.data.products;

                  this.$store.state.list.cart_total =
                  response.data.data.grand_total;
                  this.$store.state.list.cart_subtotal =
                    response.data.data.order_subtotal;
                  this.$store.state.list.discount_code =
                    response.data.data.discount_code;
                  this.$store.state.list.discount_amount =
                    response.data.data.discount_amount;
                  this.$store.state.list.address = response.data.data.address;
                  $cookies.set(
                    window.location.hostname.substring(10, 4) + "_cart",
                    response.data.data.cart_id
                  );
                  this.$store.state.list.cart_id = response.data.data.cart_id;
                  this.$store.state.list.thankyou_cart =
                    response.data.data.cart_id;
                  if (response.data.data.cart_session) {
                  $cookies.set(
                    window.location.hostname.substring(10, 4) + "_ct_sess",
                    response.data.data.cart_session,
                    "1y"
                  );
                  this.$store.state.list.cart_session = response.data.data.cart_session;
                 
                }

                  if (this.$store.state.list.address.length != 0) {
                    for (
                      let i = 0;
                      i < this.$store.state.list.address.length;
                      i++
                    ) {
                      if (i == 0) {
                        this.$store.state.list.address_id =
                          this.$store.state.list.address[i].id * 1;
                        this.$store.state.list.select_address_no = i;
                      }
                    }
                  }
                  this.miniCart();
                this.selectedSize = "";
              } else {
                this.$store.state.list.success_message = "";
                this.$toast.error(response.data.message, {
                  position: "top-center",
                  duration: 4000
                });
                this.$store.state.list.page_loader = false;
                if (
                  response.data.cart_session_status == false ||
                  response.data.customer_session_status == false
                ) {
                  $cookies.set(
                    window.location.hostname.substring(10, 4) + "_customer",
                    "",
                    "1y"
                  );
                  $cookies.set(
                    window.location.hostname.substring(10, 4) + "_cus_sess",
                    "",
                    "1y"
                  );
                  this.$store.state.list.customer_id = "";
                  this.$store.state.list.customer_session = "";
                  $cookies.set(
                    window.location.hostname.substring(10, 4) + "_cart",
                    "",
                    "1y"
                  );
                  $cookies.set(
                    window.location.hostname.substring(10, 4) + "_ct_sess",
                    "",
                    "1y"
                  );
                  this.$store.state.list.cart_id = "";
                  this.$store.state.list.cart_session = "";
                  this.$store.state.list.cart_product = [];
                }
              }
            })
            .catch(error => {
              this.$store.state.list.page_loader = false;
              if (error.message === "Network Error") {
                this.$toast.error(
                  "Oops there seems to be some Network issue, please try again.",
                  {
                    position: "top-center",
                    duration: 4000
                  }
                );
              }
            });
        } else {
          this.size_active = false;
          this.size_error = "Please select a size first";
          this.vibrate();
          if (window.innerWidth > 767) {
            this.$toast.error("Please select a size first.", {
              position: "top-center",
              duration: 4000
            });
          }
        }
      }
    },
    select_size: function(item) {
      this.clicked = true;
      this.size_error = "";
      this.qty = "1";
      this.selectProduct(item);
    },
    size_close: function() {
      this.size_active = true;
    },
    openModel() {
      this.openGallary = true;
    },
    get_wish() {
      var form = new FormData();
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + `/wishlist/customer-wishlist`,
          form
        )
        .then(response => {
          if (response.data.success == true) {
            this.wishlist = response.data.data.product.split(",");
            this.$store.state.list.wishlist_count =
              response.data.data.result.count;
          }
          
        });
    },
    getoffer() {
      var form = new FormData();
      form.append("sku", this.master_sku);
      form.append("is_discount", this.is_discount);
      axios
        .post(this.$store.state.list.cart_api_url+'/v1' + `/cart/coupon`, form)
        .then(response => {
          if (response.data.success == true) {
            this.couponoffers = response.data.data;
          }
        });
    },
    add_w(id) {
      // if(this.product_added){
      //   this.remove_w()
      // }
      // else{
      id = this.product.product_id;
      this.$store.state.list.customer_id = $cookies.get(
        window.location.hostname.substring(10, 4) + "_customer"
      );
      if (
        this.$store.state.list.customer_id != "" &&
        this.$store.state.list.customer_id != null
      ) {
        this.$store.state.list.page_loader = true;
        var form = new FormData();
        form.append("product_id", id);
        form.append("group_id", this.product.group_id);
        form.append("sub_group_id", this.product.sub_group_id);
        form.append("customer_id", this.$store.state.list.customer_id);
        form.append(
          "customer_session",
          this.$store.state.list.customer_session
        );
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + `/wishlist/add-wishlist`,
            form
          )
          .then(async response => {
            this.$store.state.list.page_loader = false;
            if (response.data.success == true) {
              //this.$store.state.list.wishlist = response.data.data.product;
              this.wishlist = response.data.data.product.split(",");
              this.$store.state.list.wishlist_count =
                response.data.data.total_row;
              //this.wishlist = true;
              this.$toast.success(response.data.message, {
                position: "top-right",
                duration: 4000
              });
              this.product_added = true
              if (this.$store.state.list.wishlist_count) {
                // let count = document.getElementsByClassName(
                //   "custom-counter-number"
                // );
                // count[0].classList.add("d-block");
                document.getElementById(
                  "wishlist-count"
                ).innerHTML = this.$store.state.list.wishlist_count;
                let classes =  document.getElementById('km-pdp-wishlist').getElementsByTagName('i')[0].classList
                for await (const [j] of classes.entries()) {
                  document.getElementById('km-pdp-wishlist').getElementsByTagName('i')[0].classList.remove(classes[j])
                }
                document.getElementById('km-pdp-wishlist').getElementsByTagName('i')[0].classList.add("fas")
                document.getElementById('km-pdp-wishlist').getElementsByTagName('i')[0].classList.add("fa-heart")
                // this.product_added = true
              }
            } else {
              this.$store.state.list.page_loader = false;
              if (response.data.data.customer_session_status == false) {
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_customer",
                  "",
                  "1y"
                );
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_cus_sess",
                  "",
                  "1y"
                );
                this.$store.state.list.customer_id = "";
                this.$store.state.list.customer_session = "";
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_cart",
                  "",
                  "1y"
                );
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_ct_sess",
                  "",
                  "1y"
                );
                this.$store.state.list.cart_id = "";
                this.$store.state.list.cart_session = "";
                this.$store.state.list.cart_product = [];
              }
            }
          });
      } else {
        this.$store.state.list.mainProduct = true
        this.$router.push('/login')
      }
      // }

    },
    remove_w(id) {
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      id = this.product.product_id;
      form.append("group_id", this.product.group_id);
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + `/wishlist/remove-wishlist`,
          form
        )
        .then(response => {
          if (response.data.success == true) {
            this.$store.state.list.page_loader = false;
            if (response.data.data.product) {
              this.wishlist = response.data.data.product.split(",");
              this.$store.state.list.wishlist_count =
                response.data.data.total_row;
            } else {
              this.$store.state.list.wishlist_count = "0";
              this.wishlist = [];
            }
            this.$toast.success(response.data.message, {
              position: "top-right",
              duration: 4000
            });
            document.getElementById('km-pdp-wishlist').getElementsByTagName('i')[0].classList.remove("fas")
          } else {
            this.$store.state.list.page_loader = false;
            if (response.data.data.customer_session_status == false) {
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_customer",
                "",
                "1y"
              );
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cus_sess",
                "",
                "1y"
              );
              this.$store.state.list.customer_id = "";
              this.$store.state.list.customer_session = "";
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cart",
                "",
                "1y"
              );
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_ct_sess",
                "",
                "1y"
              );
              this.$store.state.list.cart_id = "";
              this.$store.state.list.cart_session = "";
              this.$store.state.list.cart_product = [];
            }
          }
        });
    },
    wishActive: function(wish) {
      return this.wishlist.indexOf(wish) > -1;
    },
    truncate(value) {
      if (value.length >= 50) {
        return value.substring(0, 50) + "...";
      } else {
        return value;
      }
    },
    gallary() {
      new Function(this.galleryScript)()
      const root = document.querySelector("body, html");
      root.style.overflow = "hidden !important";
   }
  },
  computed: {
    pincode_success_new: {
      get: function() {
        return '<span class="span1">Free shipping on order above Rs. 600.</span><span class="span4">15 days free returns.</span>';
      },
      set: function(newValue) {
        //return newValue
        this.pincode_success = newValue;
      }
    }
  },
  async fetch() {
    this.$store.state.list.error_message = "";
    this.$store.state.list.success_message = "";
    this.$store.state.list.page_loader = false;
    // await this.getprodetail();
  },
  created() {

  },

  async mounted() {

    var that = this;
    await that.get_wish()
    let similar = setInterval(() => {
    that.time = that.time+1
    if(that.time>10 && document.querySelectorAll('[data-wishlist=km-wish]').length == 0){
        clearInterval(similar)
    }else{
      let data = document.querySelectorAll('[data-wishlist=km-wish]')
      if(data.length >0){
        for(let i=0; i<data.length;i++){
          data[i].setAttribute("onClick", "add_w");
        }
        data.forEach((e, i) => {
          let id = e.parentElement.getElementsByClassName('wislist-box')[0].getAttribute('data-id')
          if(id !== undefined && that.wishlist !== undefined){
            
            if (that.wishlist.indexOf(id) > -1) {
             e.getElementsByTagName('i')[0].classList += " fas";
              return (e.wish_added = true);
            }
          }
        })
        clearInterval(similar)
      }
    }
    }, 2000);

     document.addEventListener("click", function (event) {
      if(event.target.parentElement.parentElement.getAttribute('data-productid') !== null && event.target.parentElement.parentElement.getAttribute('data-productid') !== undefined 
      && event.target.parentElement.parentElement.getAttribute('data-productid') !== ''){
        let product_id = event.target.parentElement.parentElement.getAttribute('data-productid')
        let group_id = event.target.parentElement.parentElement.getAttribute('data-groupid')
        let sub_group_id = event.target.parentElement.parentElement.getAttribute('data-subgroupid')
        if(event.target.classList.contains('fas')){
          event.target.classList.remove('fas')
          that.remove_w_mixin(product_id,group_id,sub_group_id)
        }
        else{
          that.add_w_mixin(product_id,group_id,sub_group_id)
          event.target.classList.add('fas')
        }
      }
     })
     let getwish = (localStorage.getItem('wish'))
     if(getwish !== undefined)
     {
       getwish = JSON.parse(getwish)
     }
       if(getwish !== undefined && this.$store.state.list.wishlistFrom ){
         that.add_w_mixin(getwish.id,getwish.g_id,getwish.sub_group_id)
      }
    if (window.innerWidth < 767) {
      this.isMobile = true;
    }
    this.$store.state.list.customer_id = "";
          // $cookies.set(window.location.hostname.substring(10, 4) + "_cart", "");
    if (
      this.$store.state.list.customer_id != "" &&
      this.$store.state.list.customer_id != null
    ) {
      this.get_wish();
      this.minicart()
    }
    this.pincode = $cookies.get(
      window.location.hostname.substring(10, 4) + "_pin"
    );
    if (this.pincode != "" && this.pincode != null) {
      // this.pin_code();
    }
   

 
  },
  updated() {},
  beforeDestroy() {
    window.removeEventListener("click",kmAddToCartAction)
    window.removeEventListener("click",kmAddToCartAction)
    window.removeEventListener("click",check)
    window.removeEventListener("click",checkPincode)
    window.removeEventListener("click",kmMinusQtyAction)
    window.removeEventListener("click",kmPlusQtyAction)
  },
  async beforeMount() {
    let key = this.$route.params.product;
    localStorage.setItem('key', key);
     this.$store.state.list.cart_id = $cookies.get(
        window.location.hostname.substring(10, 4) + "_cart"
      );
    await this.replaceCode();
    if(this.$store.state.list.mainProduct){
      this.add_w()
    }
    this.custom_code('pdp')
  }
};
</script>

<style>
body {
  padding-top: 0px !important;
  font-family: "Mulish", sans-serif;
}
.logo {
  float: left !important;
}
.mystyle {
  background-color: coral;
  color: red !important;
}
.slick-carousel {
  margin: 0 auto;
  width: 90% !important;
}
.container-fluid {
  /* padding-left: 0px !important; */
  /* padding-right: 0px !important; */
}
.active-bg {
  border: 1px solid #ee1010;
}
.disabled-button{
    opacity: .5;
    position: relative;
    pointer-events: none;
}
.disabled-button:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color:gray;
    -webkit-transform: rotate(
-45deg
);
    transform: rotate(
-45deg
);
}
.modal-backdrop.show {    opacity: 0.5;    z-index: 0;}
.disabled-button:after{
      left: -5px !important;
    width: 127%!important;
    height: 1px!important;
    background-color: #808080c9 !important;
    transform: rotate(45deg) !important;
}
</style>