<template>
  <div class="container-fluid m-0 p-0">
    <div id="mobile-categories" class="row mb-3 m-0 p-0">
      <div class="col-md-12 m-0 p-0 mt-3 mobileMarginNone">
        <!-- {{menu}} -->
        <div class="other-info mt-3 mobileAccordion">
          <div class="card accordion-card" v-for="menuItem in menu" :key="menuItem">
            <div v-if="menuItem.childs" class="card-header p-0">
              <h2
                class="parent mb-0"
                :style="`background-image:url(${menuItem.image})`"
                @click="menuItem.isActive = !menuItem.isActive"
              >
                <span>{{ menuItem.name }}</span>
                <i
                  v-if="menuItem.isActive == false"
                
                  class="fa fa-angle-down ml-3"
                ></i>
                <i
                  v-else
                  class="fa fa-angle-up ml-3"
                  
                ></i>
                 <p class="title-text-mobile-categories">{{menuItem.childs ? getTitle(menuItem.childs): ''}} </p>
              </h2>
              <div v-show="menuItem.isActive == true">
                <div class="card-body parentCardBody">
                  <div
                    class="card accordion-card"
                    v-for="menuChildItem in menuItem.childs" :key="menuChildItem"
                  >
                    <div v-if="menuChildItem.childs" class="card-header p-0 mobileCatChild">
                      <h2
                        class="mb-0 "
                        @click="
                          menuChildItem.isActive = !menuChildItem.isActive
                        "
                      >
                        {{ menuChildItem.name }}
                      </h2>
                      <div class="icon-accordion-box">
                        <i
                          v-if="menuChildItem.isActive == false"
                          @click="menuChildItem.isActive = true"
                          class="fa fa-angle-down"
                        ></i>
                        <i
                          v-else
                          class="fa fa-angle-up"
                          @click="menuChildItem.isActive = false"
                        ></i>
                      </div>
                      <div v-show="menuChildItem.isActive == true">
                        <div class="card-body">
                          <div
                            class="card accordion-card"
                            v-for="menuGChildItem in menuChildItem.childs"  :key="menuGChildItem"
                          >
                            <div
                              v-if="menuGChildItem.childs"
                              class="card-header p-0"
                            >
                              <h2
                                class="mb-0"
                                @click="
                                  menuGChildItem.isActive = !menuGChildItem.isActive
                                "
                              >
                                {{ menuGChildItem.name }}
                              </h2>
                              <div class="icon-accordion-box">
                                <i
                                  v-if="menuGChildItem.isActive == false"
                                  @click="menuGChildItem.isActive = true"
                                  class="fa fa-angle-down"
                                ></i>
                                <i
                                  v-else
                                  class="fa fa-angle-up"
                                  @click="menuGChildItem.isActive = false"
                                ></i>
                              </div>
                              <div v-show="menuGChildItem.isActive == true">
                                <div class="card-body">
                                  <div
                                    class="card accordion-card" :key="menuGGChildItem"
                                    v-for="menuGGChildItem in menuGChildItem.childs"
                                  >
                                    <div
                                      v-if="menuGGChildItem.childs"
                                      class="card-header p-0"
                                    >
                                      <h2
                                        class="mb-0"
                                        @click="
                                          menuGGChildItem.isActive = !menuGGChildItem.isActive
                                        "
                                      >
                                        {{ menuGGChildItem.name }}
                                      </h2>
                                      <div class="icon-accordion-box">
                                        <i
                                          v-if="
                                            menuGGChildItem.isActive == false
                                          "
                                          @click="
                                            menuGGChildItem.isActive = true
                                          "
                                          class="fa fa-angle-down"
                                        ></i>
                                        <i
                                          v-else
                                          class="fa fa-angle-up"
                                          @click="
                                            menuGGChildItem.isActive = false
                                          "
                                        ></i>
                                      </div>
                                      <div
                                        v-show="
                                          menuGGChildItem.isActive == true
                                        "
                                      >
                                        <div class="card-body">
                                          <div
                                            class="card accordion-card"
                                            v-for="menuGGGChildItem in menuGGChildItem.childs" :key="menuGGGChildItem"
                                          >
                                            <div
                                              v-if="menuGGGChildItem.childs"
                                              class="card-header p-0"
                                            >
                                              <h2
                                                class="mb-0"
                                                @click="
                                                  menuGGGChildItem.isActive = !menuGGGChildItem.isActive
                                                "
                                              >
                                                {{ menuGGGChildItem.name }}
                                              </h2>
                                              <div class="icon-accordion-box">
                                                <i
                                                  v-if="
                                                    menuGGGChildItem.isActive ==
                                                    false
                                                  "
                                                  @click="
                                                    menuGGGChildItem.isActive = true
                                                  "
                                                  class="fa fa-angle-down"
                                                ></i>
                                                <i
                                                  v-else
                                                  class="fa fa-angle-up"
                                                  @click="
                                                    menuGGGChildItem.isActive = false
                                                  "
                                                ></i>
                                              </div>
                                              <div
                                                v-show="
                                                  menuGGGChildItem.isActive ==
                                                  true
                                                "
                                              >
                                                <div class="card-body"></div>
                                              </div>
                                            </div>
                                            <div v-else class="card-header p-0">
                                              <h2 class="mb-0">
                                                <nuxt-link
                                                  v-if="
                                                    menuGGGChildItem.landing_page ==
                                                    null
                                                  "
                                                  class="nav-link font-bold"
                                                  :to="{
                                                    path:
                                                      menuGGGChildItem.menu_url_key 
                                                      ,
                                                    params: {
                                                      cat_id:
                                                        menuGGGChildItem.id_category,
                                                      menu_url_key:
                                                        menuGGGChildItem.menu_url_key,
                                                    },
                                                  }"
                                                  :key="
                                                    menuGGGChildItem.id_category
                                                  "
                                                  v-text="menuGGGChildItem.name"
                                                ></nuxt-link>
                                                <nuxt-link
                                                  v-else
                                                  class="nav-link font-bold"
                                                  :to="{
                                                    path:
                                                      '/collection/' +
                                                      menuGGGChildItem.menu_url_key ,
                                                    params: {
                                                      cat_id:
                                                        menuGGGChildItem.id_category,
                                                      menu_url_key:
                                                        menuGGGChildItem.menu_url_key,
                                                    },
                                                  }"
                                                  :key="
                                                    menuGGGChildItem.id_category
                                                  "
                                                  v-text="menuGGGChildItem.name"
                                                ></nuxt-link>
                                                <!-- {{menuGGGChildItem.name}} -->
                                              </h2>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div v-else class="card-header p-0">
                                      <h2 class="mb-0">
                                        <nuxt-link
                                          v-if="
                                            menuGGChildItem.landing_page == null
                                          "
                                          class="nav-link font-bold"
                                          :to="{
                                            path:
                                              
                                              menuGGChildItem.menu_url_key ,
                                            params: {
                                              cat_id:
                                                menuGGChildItem.id_category,
                                              menu_url_key:
                                                menuGGChildItem.menu_url_key,
                                            },
                                          }"
                                          :key="menuGGChildItem.id_category"
                                          v-text="menuGGChildItem.name"
                                        ></nuxt-link>
                                        <nuxt-link
                                          v-else
                                          class="nav-link font-bold"
                                          :to="{
                                            path:
                                              '/collection/' +
                                              menuGGChildItem.menu_url_key ,
                                            params: {
                                              cat_id:
                                                menuGGChildItem.id_category,
                                              menu_url_key:
                                                menuGGChildItem.menu_url_key,
                                            },
                                          }"
                                          :key="menuGGChildItem.id_category"
                                          v-text="menuGGChildItem.name"
                                        ></nuxt-link>
                                        <!-- {{menuGGChildItem.name}} -->
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div v-else class="card-header p-0">
                              <h2 class="mb-0">
                                <nuxt-link
                                  v-if="menuGChildItem.landing_page == null"
                                  class="nav-link font-bold"
                                  :to="{
                                    path:
                                    
                                      menuGChildItem.menu_url_key ,
                                    params: {
                                      cat_id: menuGChildItem.id_category,
                                      menu_url_key: menuGChildItem.menu_url_key,
                                    },
                                  }"
                                  :key="menuGChildItem.id_category"
                                  v-text="menuGChildItem.name"
                                ></nuxt-link>
                                <nuxt-link
                                  v-else
                                  class="nav-link font-bold"
                                  :to="{
                                    path:
                                      '/collection/' +
                                      menuGChildItem.menu_url_key ,
                                    params: {
                                      cat_id: menuGChildItem.id_category,
                                      menu_url_key: menuGChildItem.menu_url_key,
                                    },
                                  }"
                                  :key="menuGChildItem.id_category"
                                  v-text="menuGChildItem.name"
                                ></nuxt-link>
                                <!-- {{menuGChildItem.name}} -->
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="card-header p-0">
                      <h2 class="mb-0">
                        <nuxt-link
                          v-if="menuChildItem.landing_page == null"
                          class="nav-link font-bold"
                          :to="{
                            path:
                             
                              menuChildItem.menu_url_key ,
                            params: {
                              cat_id: menuChildItem.id_category,
                              menu_url_key: menuChildItem.menu_url_key,
                            },
                          }"
                          :key="menuChildItem.id_category"
                          v-text="menuChildItem.name"
                        ></nuxt-link>
                        <nuxt-link
                          v-else
                          class="nav-link font-bold"
                          :to="{
                            path:
                              '/collection/' +
                              menuChildItem.menu_url_key ,
                            params: {
                              cat_id: menuChildItem.id_category,
                              menu_url_key: menuChildItem.menu_url_key,
                            },
                          }"
                          :key="menuChildItem.id_category"
                          v-text="menuChildItem.name"
                        ></nuxt-link>
                        <!-- {{menuChildItem.name}} -->
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="card-header p-0">
              <h2
                class="parent mb-0"
                :style="`background-image:url(${menuItem.image})`"
              >
                <nuxt-link
                  v-if="menuItem.landing_page == null"
                  class="nav-link font-bold"
                  :to="{
                    path: menuItem.menu_url_key ,
                    params: {
                      cat_id: menuItem.id_category,
                      menu_url_key: menuItem.menu_url_key,
                    },
                  }"
                  :key="menuItem.id_category"
                  v-text="menuItem.name"
                ></nuxt-link>
                <nuxt-link
                  v-else
                  class="nav-link font-bold"
                  :to="{
                    path: '/collection/' + menuItem.menu_url_key ,
                    params: {
                      cat_id: menuItem.id_category,
                      menu_url_key: menuItem.menu_url_key,
                    },
                  }"
                  :key="menuItem.id_category"
                  v-text="menuItem.name"
                ></nuxt-link>
                <!-- {{ menuItem.name }} -->
              </h2>
            </div>
          </div>

          <!-- new accordion for testing in ios device -->
       
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import Login from "./Login.vue";
// import ClickOutside from "vue-click-outside";
export default {
  name: "Header",

  data: function () {
    return {
      menuName: " ",
      menu: [],
      inputFocus: false,
      showLimitedOffer: true,
      activeBoys: true,
      activeGirls: false,
      activeSearchClass: false,
      scrollPosition: null,
      search: false,
      searchshow: true,
      mobileview: false,
    };
  },
  
  directives: {
    // ClickOutside,
  },

  updated() {
    if (this.$route.name === "thankyou") {
      this.showLimitedOffer = false;
    } else {
      this.showLimitedOffer = true;
    }
  },
  mounted() {
    // this.get_menu();
    window.addEventListener("scroll", this.updateScroll);
  },
  destroy() {
    window.removeEventListener("scroll", this.updateScroll);
  },
  beforeMount() {
    if (window.innerWidth < 767) {
      this.mobileview = true;
      this.searchshow = false;
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    getTitle (childs) {
      let title = [],count = 0
      childs.forEach (child => {
        if(count <= 2){ 
          title.push(child.name)
          count += 1
        }
        
        else  return title.join(', ')
        
      })

      return title.join(', ')

    },

    toggleActive(item) {
      return !item;
    },

    clearInput() {
      this.$refs.searchControl.focus();
    },
    addCountToreactiveComponent() {
      this.$store.state.list.reactiveComponentCount = this.$store.state.list.reactiveComponentCount + 1;
    },
    activeClass() {
      var dflt = "active-boys";
      if (this.activeGirls == true) {
        dflt = "active-girls";
      }
      return dflt;
    },
    checkDepth(item) {
      var depth = false;
      if (item.childs) {
        if (item.childs[0].childs) {
          if (item.childs[0].childs[0].childs) {
            depth = true;
          }
        }
      }

      return depth;
    },
    menuClass(item) {
      // var name = (' ' + item).slice(1);
      item = item.toLowerCase().replace(/ /g, "-");
      item = item.replace(/-$/g, "");
      return item;
    },
    toggleSearch() {
      this.activeSearchClass = !this.activeSearchClass;
      if (this.activeSearchClass === true) {
        setTimeout(() => {
          this.$refs.searchControl.focus();
        }, 100);
      }
    },
    updateScroll() {
      if (this.activeSearchClass === true) {
        this.activeSearchClass = false;
      }
      this.scrollPosition = window.scrollY;
      if (this.scrollPosition < 170) {
        this.activeSearchClass = false;
      }
    },
  },
};
</script>
<style scoped>
.card.accordion-card:first-child {
  border-top: none;
}
#mobile-categories .card-body{
    padding: 0 !important;
}
#mobile-categories .card-header h2{
    padding: 15px 15px 15px 15px;
    background-color: #f8f8f8;
}
#mobile-categories .icon-accordion-box i{
    color: #252525;
}
#mobile-categories .card-header{
    border: none;
}
.mobileCatChild .card-header h2{
    padding: 10px 0 !important;
    background-color: #fff !important;
}
.mobileCatChild .card-header h2 a{
    font-weight: normal;
    padding: 0;
    /* padding-left: 30px; */
}
.parentCardBody{
    position: relative;
}
.parentCardBody::before{
    content: '';
    width: 10px;
    height: 10px;
    display: block;
    position: absolute;
    top: -5px;
    left: 50px;
    background-color: #f8f8f8;
    transform: rotate(45deg);
}
.parentCardBody .card-header .card-header{
    padding-left: 30px !important;
}
.parentCardBody .card-header .card-header .card-header{
    padding-left: 0px !important;
}
.parent a{
    padding: 0;
}
.mobileAccordion{
    padding-bottom: 42px !important;
}
</style>