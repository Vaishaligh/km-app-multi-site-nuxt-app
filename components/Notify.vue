<template>
  <div>
    <div class="notify-box" v-if="showModel==true">
      <div class="modal-box ">
        <!-- Modal -->
        <div class="modal " id="staticBackdrop">
          <div class="modal-dialog">
            <div class="modal-content">
              <button type="button" class="close" @click=close()>
                <span aria-hidden="true">&times;</span>
              </button>
              <div class="modal-body">
                <h4>Interested in the product?</h4>
                <p>
                  Subscribe to receive updates as soon the product is available
                </p>
                <hr />
                <h2 class="font-bold brand_name">{{ name }}</h2>
                <h5 class="select-size">SELECT SIZE</h5>
                <div class="size-box mt-2">
                  <label
                    class="size-button select-one-size"
                    :key="`sizes${index}`"
                    v-for="(items, index) in Psize"
                    @click="select_size(items)"
                    :class="{
                      selected: clicked,
                      selected: sizeval === Object.entries(items)[0][1],
                    }"
                  >
                    <!-- <input type="radio" class="radio-size" name="size" /> -->
                    <span v-text="value(items)"></span>
                  </label>
                  <p style="font-size:13px;">
                    <span style="color:red;" v-if="size_error">
                      {{ size_error }}</span
                    >
                  </p>
                </div>
                <p class="sku" v-text="sku"></p>
                <div class="option_box">
                  <div class="input-box mt-2 w-100">
                    <div class="form-group" v-show="email">
                      <input
                        type="email"
                        class="form-control"
                        v-model="emailVal"
                        @keyup="email_valid"
                        placeholder="Email address"
                        autocomplete="off"
                      />
                      <span
                        style="color:red; font-size:14px"
                        v-text="emailValError"
                      >
                      </span>
                    </div>
                   
                    <button
                      type="submit"
                      class="btn notify-btn w-100"
                      @click="insertNotify()"
                    >
                      Notify Me
                    </button>
                  </div>
                </div>

                <!-- {{ size }} -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showModel: true,
      sizeval: "",
      size: "",
      size_error: "",
      emailVal: "",
      emailValError: "",
      
      clicked: false,
      option: false,
      email: true,
      sms: false,
      sku: "",
    };
  },
  props: ["Psize", "name"],
  methods: {
    close(){
      this.$emit('modalValue')

    },
    value(item){
      return Object.entries(item)[0][1]

    },
    select_size: function(item) {
      this.sizeval = Object.entries(item)[0][1];
      this.sku = Object.entries(item)[1][1].sku;
      this.clicked = true;
      this.size_error = "";
    },
    options: function(opt) {
      if (opt === "email") {
        this.sms = false;
        this.email = true;
      } else if (opt === "SMS") {
        this.sms = true;
        this.email = false;
        this.emailVal = "";
      }
    },
   
    email_valid: function() {
      var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.emailVal.match(email)) {
        this.emailValError = "";
      } else {
        this.emailValError = "Please enter valid Email";
      }
    },
    insertNotify: function() {
      if (this.sizeval === "") {
        this.size_error = "Please Select Size";
        return false;
      } else {
        this.size_error = "";
      }
      if ((this.emailVal != "") && this.sizeval != "") {
        var form = new FormData();
        form.append("sku", this.sku);
        form.append("email", this.emailVal);
        let config = { headers: { "Content-Type": "multipart/form-data" } };
        this.$store.state.list.page_loader = true;
        axios
          .post(this.$store.state.list.cart_api_url+'/v1' + "/product/notify", form, config)
          .then((response) => {
            if (response.data.success == true) {
              this.$store.state.list.page_loader = false;
              this.emailVal = ""
              this.sizeval = ""
              this.$toast.success(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              this.close()
            }
          });
      } else {
        if (this.email === true) {
          this.email_valid();
        } else if (this.sms === true) {
          this.mobile_no();
        }
      }
    },
  },
};
</script>

<style scoped>
.size-button {  
    border: 1px solid #a1a1a1;
    background: #fff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 10px!important;
    line-height: 50px!important;
    text-align: center;
}
.size-button.selected{
  background: var(--bs-primary) !important;
}
.notify-box {
  width: 100%;
}
.notify-box .notify-btn {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  text-transform: uppercase;
  color: #fff;
  background:gray;
  letter-spacing: 0.5px;
}
.notify-box .modal-box .modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
.notify-box .modal-box .modal .modal-content {
  padding: 20px;
}
.notify-box .modal-box .modal .close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  border: none;
}

.notify-box .modal-box .modal .modal-content .modal-body h4 {
  font-weight: 600;
}
.notify-box .modal-box .modal .modal-content .modal-body p {
  font-size: 14px;
  margin: 5px 0;
}
.brand_name {
  font-size: 20px !important;
}
.select-size {
  font-size: 15px;
  margin-top: 10px;
}
.option_box {
  width: 100%;
  padding: 10px 0;
}
.option_box .option_btn .choies_btn {
  width: 50%;
  background: transparent;
  border: var(--bs-primary) !important
}
.option_box .option_btn .choies_btn.active {
  background: var(--bs-primary) !important;
  color: #fff;
}
.option_box .option_btn .choies_btn.left {
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.option_box .option_btn .choies_btn.right {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.notify-btn {
  padding: 10px;
  background:var(--bs-primary) !important
}
.notify-btn:hover {
  opacity: 0.7;
}

.sku {
  font-size: 14px;
  font-weight: 600;
  margin: 5px 0;
}
</style>
