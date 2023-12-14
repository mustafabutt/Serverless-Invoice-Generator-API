import { handlerPath } from "@libs/handler-resolver";

const functions = {
  createCustomer:{
    handler: `${handlerPath(__dirname)}/userAccountCreate.main`,
    events: [
      {
        httpApi: {
          method: "post",
          path: "/",
          authorizer: "customAuthorizer",
        },
      },
    ]
    },
  getCustomers: {
    handler: `${handlerPath(__dirname)}/userAccountGetAll.main`,
    events: [
      {
        httpApi: {
          method: "get",
          path: "/customers",
          authorizer: "customAuthorizer",
        },
      },
    ]
  },
  deleteCustomer: {
    handler: `${handlerPath(__dirname)}/userAccountDelete.main`,
    events: [
      {
        httpApi: {
          method: "post",
          path: "/customer/del/{params}",
          authorizer: "customAuthorizer",
        },
      },
    ]
  },
  updateCustomer: {
    handler: `${handlerPath(__dirname)}/userAccountUpdate.main`,
    events: [
      {
        httpApi: {
          method: "post",
          path: "/customer/{params}",
          authorizer: "customAuthorizer",
        },
      },
    ]
  },
  singleCustomer: {
    handler: `${handlerPath(__dirname)}/userAccountGetOne.main`,
    events: [
      {
        httpApi: {
          method: "get",
          path: "/customer/single/{params}",
          authorizer: "customAuthorizer",
        },
      },
    ]
  },
  signIn: {
    handler: `${handlerPath(__dirname)}/userSignin.main`,
    events: [
      {
        httpApi: {
          method: "post",
          path: "/signin"
        },
      },
    ]
  },
  signUp: {
    handler: `${handlerPath(__dirname)}/userSignup.main`,
    events: [
      {
        httpApi: {
          method: "post",
          path: "/signup"
        },
      },
    ]
  },
  confirmPassword: {
    handler: `${handlerPath(__dirname)}/confirmPassword.main`,
    events: [
      {
        httpApi: {
          method: "post",
          path: "/password-confirm"
        },
      },
    ]
  },
  changePassword: {
    handler: `${handlerPath(__dirname)}/changePassword.main`,
    events: [
      {
        httpApi: {
          method: "post",
          path: "/password-change"
        },
      },
    ]
  },
  customAuthorizer: {
    handler: `${handlerPath(__dirname)}/customauth.main`,
  }
}

export default functions;
