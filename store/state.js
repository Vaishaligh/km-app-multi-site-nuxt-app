var list = {
    title:'',
    summary : {},
    login:false,
    dataUpdateafterResponse : false,
    optimiseLink: false,
    availableLoyalty: null,
    breadCrumbArray: [],
    isFaq: false,
    capillaryInfo: {customer: [
        {
            loyalty_points: null
        }
    ]},
    isShowFooter: true,
    availableLoyaltyPoints: null,
    capillaryAmount: null,
    topProductsCategory: '',
    topProducts : [],
    reactiveComponentCount: 0,
    footerDescription: '',
    login_popup:false,
    meta_google_content:'',
    error_message:'',
    success_message:'',
    page_loader:false,
    cart_product:[],
    search_input:'',
    gtm_product:[],
    menu:[],
    cart_subtotal:'',
    cart_total:'',
    wishlist_count:0,
    customer_detail:'',
    minicart: true,
    menuActive:true,
    address:[],
    footer_menu:[],
    select_address_no:'',
    address_id:'',
    cart_id:'',
    customer_id:null,
    customer_session:'',
    cart_session:'',
    g_customer_id:'',
    login_status:'',
    discount_code:null,
    thankyou_status:'',
    thankyou_cart:'',
    discount_amount:'',
    cod_charges:'',
    shipping_charges:'',
    store_credits_used:'',
    store_credits_discount_amount:'',
    cod_charges_below:'',
    shipping_charges_below:'',
    pre_cod_pay:0,
    gatewayDiscount:0,
    store:1,
    loyalty_discount:'',
    shiping_charges:'',
    cod_charges:'',
    tax:'',
    maddress:'',
    // staging
   
    windowOrigin:"",
    adminURL: '',
    // live
    cart_api_url: 'https://engine.kartmax.in/api/cart', 
    image_url_main:'https://pictures.kartmax.in',
    image_url:'https://pictures.kartmax.in/live/',
    api_url:'https://engine.kartmax.in',
    editor_url:'https://engine.kartmax.in/api/web',
    breadcrumb:'',
    breadcrumb_second:{
        name:'',
        url:'',
    },
    path:'',
    checkout_logo:'',
    express_delivery_charge:0,
    Product_list:[],
    plp_content:'',
    wishlist:[],
    pass_url_key:'',
    wishlist_called:{},
    wishlistFrom:false,
    mainProduct:false,
    sortBy_search:'',
    sortDir_search:'',

}

// export const actions = {
// 	async  nuxtServerInit ({ commit }, { req }) {
//         console.log("opopopopop")
//         const { host } = req.headers
//             if (host) {
//                 commit('setOrigin', host)
//             }
//     }
// }
export default {
    list
}
