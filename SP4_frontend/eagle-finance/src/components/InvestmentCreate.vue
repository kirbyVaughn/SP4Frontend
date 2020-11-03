
<template>
  <v-container grid-list-md>
    <v-row align="center" justify="center">
      <v-col class="align-center">
        <v-row class="align-center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-alert v-if="showMsg === 'error'"
                     dismissible
                     :value="true"
                     type="error"
            >
              Please verify investment information.
            </v-alert>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-card class="login-card">
              <v-card-title>
                <span class="headline">{{pageTitle}}</span>
              </v-card-title>
              <v-spacer/>

              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-container>

                    <v-text-field
                      v-model="investment.customer"
                      label="Customer"
                      required
                    />
                    <v-text-field
                      v-model="stock.cust_number"
                      label="customer number"
                      required
                    />
                    <v-text-field
                      v-model="investment.category"
                      label="Category"
                      required
                    />
                    <v-text-field
                      v-model="investment.description"
                      label="Description"
                      required
                    />
                      <v-text-field
                      v-model="investment.aquired_value"
                      label="Aquired Value"
                      required
                    />
                      <v-text-field
                      v-model="investment.aquired_date"
                      label="Aquired date"
                      required
                    />

                      />
                      <v-text-field
                      v-model="investment.aquired_value"
                      label="Aquired value"
                      required
                    />
                     />
                      <v-text-field
                      v-model="investment.recent_date"
                      label="Recent date"
                      required
                    />
                  </v-container>
                  <v-btn v-if="!isUpdate" class="blue white--text" @click="createStock">Save</v-btn>
                  <v-btn v-if="isUpdate" class="blue white--text" @click="updateStock">Update</v-btn>
                  <v-btn class="white black--text" @click="cancelOperation">Cancel</v-btn>

                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>  
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: 'StockCreate',
    components: {},
    data() {
      return {
        showError: false,
        stock: {},
        pageTitle: "Add New Stock",
        isUpdate: false,
        showMsg: '',
      };
    },
    methods: {
      createInvestment() {
        apiService.addNewInvestment(this.investment).then(response => {
          if (response.status === 201) {
            this.movie = response.data;
            this.showMsg = "";
            router.push('/investment-list/new');
          }else{
            this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      },
      cancelOperation(){
        router.push("/investment-list");
      },
      updateCustomer() {
        apiService.updateCustomer(this.Customer).then(response => {
          if (response.status === 200) {
            this.Customer = response.data;
            router.push('/investment-list/update');
          }else{
            this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      }
    },
    mounted() {
      if (this.$route.params.pk) {
        this.pageTitle = "Edit Investment";
        this.isUpdate = true;
        apiService.getInvestment(this.$route.params.pk).then(response => {
          this.investment = response.data;
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }
        });
      }
    },
  }
</script>
<style scoped>
  .aform {
    margin-left: auto;
    width: 60%;
  }
</style>
