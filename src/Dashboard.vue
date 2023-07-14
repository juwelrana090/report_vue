<template>
  <!-- <router-link to="/admin/about">About</router-link> -->

  <div class="container py-3">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark"
      aria-label="Ninth navbar example"
    >
      <div class="container-xl">
        <a class="navbar-brand" href="#">Reports</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample07XL"
          aria-controls="navbarsExample07XL"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample07XL">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>

          <ul class="nav navbar-nav navbar-right">
            <li>
              <span v-on:click="logout" class="text-white">
                <i class="bi bi-box-arrow-right"></i>
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="row mt-4 mb-3">
      <div class="col-lg-6 mb-2 d-flex justify-content-star">
        <button
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#reportAdd"
          data-bs-whatever="@getbootstrap"
        >
          New Report
        </button>
      </div>
      <div class="col-lg-6 mb-2">
        <div class="row">
          <div class="col-md-6 d-flex justify-content-end">
            <div class="input-group">
              <input
                class="form-control border-end-0 border"
                type="text"
                @change="onChangeSearch"
                @input="onChangeSearch"
              />
              <span class="input-group-append">
                <button
                  class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                  type="button"
                >
                  <i class="fa fa-search"></i>
                </button>
              </span>
            </div>
          </div>
          <div class="col-md-6 d-flex justify-content-end">
            <VueDatePicker v-model="date" range @update:model-value="onDateRange" />
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="table-responsive">
          <table class="table table-bordered table-hover">
            <thead class="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Buyer</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Amount</th>
                <th scope="col">Receipt ID</th>
                <th scope="col">Items</th>
                <th scope="col">Note</th>
                <th scope="col">City</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!reports.length">
                <td colspan="9" style="text-align: center">Data not found!</td>
              </tr>
              <tr v-for="report in reports" :key="report.id">
                <td>{{ report.id }}</td>
                <td>{{ report.buyer }}</td>
                <td>{{ report.buyer_email }}</td>
                <td>{{ report.phone }}</td>
                <td>{{ report.amount }}</td>
                <td>{{ report.receipt_id }}</td>
                <td>{{ report.items }}</td>
                <td>{{ report.note }}</td>
                <td>{{ report.city }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="reportAdd"
    tabindex="-1"
    aria-labelledby="reportAddLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <Form
        class="modal-content"
        @submit="reportSubmit()"
        :validation-schema="schema"
      >
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="reportAddLabel">Add New Report</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3">
            <div class="col-md-6 text-start">
              <label for="text" class="mb-2 text-muted">Amount</label>
              <Field
                name="Amount"
                type="text"
                class="form-control"
                id="Amount"
                placeholder="Amount"
                v-model="formData.amount"
                rules="required|numeric"
              />
              <ErrorMessage class="text-danger" name="Amount" />
            </div>
            <div class="col-md-6 text-start">
              <label for="text" class="mb-2 text-muted">Buyer</label>
              <Field
                name="buyer"
                type="text"
                class="form-control"
                id="buyer"
                placeholder="Buyer"
                v-model="formData.buyer"
                rules="required"
              />
              <ErrorMessage class="text-danger" name="buyer" />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6 text-start">
              <label for="text" class="mb-2 text-muted">Buyer Email</label>
              <Field
                name="buyer_email"
                type="text"
                class="form-control"
                id="buyer_email"
                placeholder="Buyer Email"
                v-model="formData.buyer_email"
                rules="required|email"
              />
              <ErrorMessage class="text-danger" name="buyer_email" />
            </div>
            <div class="col-md-6 text-start">
              <label for="text" class="mb-2 text-muted">Receipt ID</label>
              <Field
                name="Receipt ID"
                type="text"
                class="form-control"
                id="receipt_id"
                placeholder="Receipt ID"
                v-model="formData.receipt_id"
                rules="required"
              />
              <ErrorMessage class="text-danger" name="Receipt ID" />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6 text-start">
              <label for="text" class="mb-2 text-muted">City</label>
              <Field
                name="city"
                type="text"
                class="form-control"
                id="city"
                placeholder="City"
                v-model="formData.city"
                rules="required"
              />
              <ErrorMessage class="text-danger" name="city" />
            </div>
            <div class="col-md-6 text-start">
              <label for="text" class="mb-2 text-muted">Phone Number</label>
              <Field
                name="phone"
                type="text"
                class="form-control"
                id="phone"
                placeholder="Phone Number"
                v-model="formData.phone"
                rules="required"
              />
              <ErrorMessage class="text-danger" name="phone" />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-12 text-start">
              <label for="text" class="mb-2 text-muted">Items</label>
              <Field
                name="items"
                type="text"
                class="form-control"
                id="items"
                placeholder="Items"
                v-model="formData.items"
                rules="required"
              />
              <ErrorMessage class="text-danger" name="items" />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-12 text-start">
              <label for="text" class="mb-2 text-muted"
                >Note *(allow only 30 words)</label
              >
              <Field
                as="textarea"
                v-bind="note"
                class="form-control"
                name="Note"
                v-slot="{ note }"
                v-model="formData.note"
                cols="10"
                rows="5"
                placeholder="Note"
              />
              <ErrorMessage class="text-danger" name="Note" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button class="btn btn-primary" data-bs-dismiss="modal">Save</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style>
textarea ~ span {
  display: block;
  font-size: small;
  color: #666;
}
</style>
<script>
import { ref, onMounted } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { Validator } from "vee-validate";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
import { API_URL } from "./config/appConfig";
import axios from "axios";
const date = ref();

function countWords(str) {
  var matches = str.match(/[\w\d\’\'-]+/gi);
  return matches ? matches.length : 0;
}

yup.addMethod(yup.string, "MaxWords", function (errorMessage) {
  return this.test(`max-words`, errorMessage, function (value) {
    const { path, createError } = this;
    return (
      countWords(value) <= 30 || createError({ path, message: errorMessage })
    );
  });
});

const schema = yup.object().shape({
  Note: yup
    .string()
    .MaxWords((data) => `${data.path} allow only 30 words`)
    .required("Required"),
});

// For demo purposes assign range from the current date
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [{startDate:startDate, endDate:endDate}];
});

const tokenLocal = localStorage.getItem("tokenLocal");


export default {
  name: "Dashboard",
  components: {
    Field,
    Form,
    ErrorMessage,
    VueDatePicker,
  },
  data() {
    return {
      schema,
      date,
      page: 1,
      loading: false,
      dialog: false,
      saveLoader: false,
      formData: {
        amount: "",
        buyer: "",
        receipt_id: "",
        items: "",
        buyer_email: "",
        note: "",
        city: "",
        phone: "880",
      },
      reports: [],
    };
  },

  methods: {
    logout() {
      localStorage.removeItem("tokenLocal");
      this.$router.push("/");
    },
    async onDateRange(date) {
      let dateSrt = `${date}`;
      var dateArr = dateSrt.split(',');

      const startDate = moment(dateArr[0]).format("YYYY-MM-DD");
      const endDate = moment(dateArr[1]).format("YYYY-MM-DD");

      // console.log('dateArr',dateArr);

      this.loading = true;
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API_URL}/api/report/date-range?start=${startDate}&end=${endDate}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenLocal}`,
        },
      };

      await axios
        .request(config)
        .then((response) => {
          const result = response.data;

          if (result.success == true) {
            this.reports = result.reports.data;
          } else {
            this.$toast.error(`Server not respond`, {
              position: "top-right",
            });
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(error, {
            position: "top-right",
          });
        });
    },
    async onChangeSearch(e) {
      console.log('value', e.target.value)
      this.loading = true;
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API_URL}/api/report/search?q=${e.target.value}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenLocal}`,
        },
      };

      await axios
        .request(config)
        .then((response) => {
          const result = response.data;

          if (result.success == true) {
            this.reports = result.reports.data;
          } else {
            this.$toast.error(`Server not respond`, {
              position: "top-right",
            });
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(error, {
            position: "top-right",
          });
        });
    },
    async report() {
      this.loading = true;
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API_URL}/api/report/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenLocal}`,
        },
      };

      await axios
        .request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));

          const result = response.data;

          // console.log("result", result);
          // console.log("reports", result.reports.data);

          if (result.success == true) {
            this.reports = result.reports.data;
          } else {
            this.$toast.error(`Server not respond`, {
              position: "top-right",
            });
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(error, {
            position: "top-right",
          });
        });
    },
    async reportSubmit() {
      this.loading = true;

      let data = JSON.stringify({ ...this.formData });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${API_URL}/api/report/create`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenLocal}`,
        },
        data: data,
      };

      await axios
        .request(config)
        .then((res) => {
          console.log("res.success", res);
          if (res.data.status == "success") {
            this.formData.amount = "";
            this.formData.buyer = "";
            this.formData.receipt_id = "";
            this.formData.items = "";
            this.formData.buyer_email = "";
            this.formData.note = "";
            this.formData.city = "";
            this.formData.phone = "";

            this.report();
            this.$toast.success(res.data.message, {
              position: "top-right",
            });
          } else {
            this.$toast.error(`Server not respond`, {
              position: "top-right",
            });
          }
          this.loading = false;
        })
        .catch((error) => {
          this.$toast.error(error, {
            position: "top-right",
          });
        });
    },
  },

  mounted() {
    this.report();
  },
  created() {
    this.report();
  },
};
</script>

