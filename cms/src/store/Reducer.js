const initialState = {
  userData: [],
  guitarData: [],
  userName: "",
  emailId: "",
  contactNo: "",
  password: "",
  confirmPassword: "",
  selectedGuitarType: "Electric",
  guitarDetails: {
    guitarName: "",
    guitarMake: "",
    guitarPrice: 0,
    guitarImage: "",
    guitarType: ""
  },
  editId: ""
};
const reducer = (state = initialState, action) => {
  const newState = { ...state };
  if (action.type === "getvalue") {
    if (action.inputfield === "userName") {
      newState.userName = action.key;
    } else if (action.inputfield === "emailId") {
      newState.emailId = action.key;
    } else if (action.inputfield === "contactNo") {
      newState.contactNo = action.key;
    } else if (action.inputfield === "password") {
      newState.password = action.key;
    } else if (action.inputfield === "confirmPassword") {
      newState.confirmPassword = action.key;
    }
  }
  if (action.type === "cleardata") {
    newState.userName = "";
    newState.emailId = "";
    newState.contactNo = "";
    newState.password = "";
    newState.confirmPassword = "";
  }
  if (action.type === "Electric") {
    newState.selectedGuitarType = "Electric";
  }
  if (action.type === "List") {
    newState.selectedGuitarType = "List";
  }
  if (action.type === "getguitardetails") {
    if (action.inputfield === "guitarName") {
      newState.guitarDetails.guitarName = action.key;
    } else if (action.inputfield === "guitarMake") {
      newState.guitarDetails.guitarMake = action.key;
    } else if (action.inputfield === "guitarPrice") {
      newState.guitarDetails.guitarPrice = action.key;
    } else if (action.inputfield === "guitarImage") {
      newState.guitarDetails.guitarImage = action.key;
    } else if (action.inputfield === "guitarType") {
      newState.guitarDetails.guitarType = action.key;
    }
  }
  if (action.type === "getGuitarData") {
    newState.guitarData = action.key;
  }
  if (action.type === "editData") {
    newState.selectedGuitarType = "Electric";
    newState.editId = action.key;
  }

  if (action.type === "clearID") {
    newState.editId = action.key;
  }

  if (action.type === "editsingleinfo") {
    console.log("action.key", action.key);
    newState.selectedGuitarType = "Electric";

    newState.guitarDetails.guitarName = action.key.guitarName;

    newState.guitarDetails.guitarMake = action.key.guitarMake;

    newState.guitarDetails.guitarPrice = action.key.guitarPrice;

    newState.guitarDetails.guitarImage = action.key.guitarImage;

    newState.guitarDetails.guitarType = action.key.guitarType;
  }
  if (action.type === "resetData") {
    console.log("infdjkvbj", action.key);
    newState.selectedGuitarType = action.key;

    newState.guitarDetails.guitarName = "";

    newState.guitarDetails.guitarMake = "";

    newState.guitarDetails.guitarPrice = 0;

    newState.guitarDetails.guitarImage = "";

    newState.guitarDetails.guitarType = "";
  }
  return newState;
};
export default reducer;
