import React from "react";

const formMargin = {
  marginTop: "10px",
  marginBottom: '10px'
}

const loginFormStyle = {
  marginTop: "25%",
  width: "70%",
  color: "rgba(192, 199, 228, 0.95)"
}

const registerFormStyle = {
  marginTop: "10%",
  marginBottom: "15%",
  width: "70%",
  color: "rgb(76, 83, 88)"
}
// const textStyle = {
//   textAlign: "center"
// }
// const price = {
//   marginRight: "20px",
//   marginLeft: "20px"
// }

const Btn = {
  width: "45%",
  maxWidth: "300px",
  height: "40px",
  marginLeft: "2.5%",
  marginRight: "2.5%",
  display: "inline-block"
}
export function LoginForm(props) {

  return (
    <div style={loginFormStyle}><h1 style={{ textAlign: "center" }}>Image Share</h1>
      <form>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">{props.emailLabel}</label>
          <div className="col-sm-10">
            <input type="email" name={props.emailName} onChange={props.onChange} className="form-control" id="inputEmail3" placeholder="Email" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">{props.passwordLabel}</label>
          <div className="col-sm-10">
            <input type="password" name={props.passwordName} onChange={props.onChange} className="form-control" id="inputPassword3" placeholder="Password" />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <button type="submit" onClick={props.handleRegister} className="btn btn-danger" style={Btn}>{props.RgstrBtnLabel}</button>
          <button type="submit" onClick={props.handleLogin} className="btn btn-primary" style={Btn}>{props.LgnBtnLabel}</button>
        </div>
      </form>
    </div>
  )
}

export function RegisterForm(props) {

  return (
    <div style={registerFormStyle}><h1 style={{ textAlign: "center" }}>Image Share</h1>
      <form>
        <div className="form-group row">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">{props.emailLabel}</label>
          <div className="col-sm-10">
            <input type="email" name={props.emailName} onChange={props.onChange} className="form-control" id="inputEmail" placeholder="jdoe@email.com" />
            <small id="emailHelp" className="form-text text-muted">{props.emailMessage}</small>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">{props.passwordLabel}</label>
          <div className="col-sm-10">
            <input type="password" name={props.passwordName} onChange={props.onChange} className="form-control" id="inputPassword" placeholder="Password" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputFirstName" className="col-sm-2 col-form-label">{props.firstNameLabel}</label>
          <div className="col-sm-10">
            <input type="text" name={props.firstName} onChange={props.onChange} className="form-control" id="inputFirstName" placeholder="John" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputLastName" className="col-sm-2 col-form-label">{props.lastNameLabel}</label>
          <div className="col-sm-10">
            <input type="text" name={props.lastName} onChange={props.onChange} className="form-control" id="inputLastName" placeholder="Doe" />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="exampleFormControlSelect1">{props.accountTypeLabel}</label>
          <div className="col-sm-10">
            <select className="form-control" name={props.accountType} onChange={props.onChange} id="exampleFormControlSelect1" placeholder="Account Type">
              <option value="2">{props.accountDefault}</option>
              <option value="0">{props.accountPhotographer}</option>
              <option value="1">{props.accountPurchaser}</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputAboutMe" className="col-sm-2 col-form-label">{props.aboutMeLabel}</label>
          <div className="col-sm-10">
            <textarea className="form-control" name={props.aboutMe} onChange={props.onChange} id="inputAboutMe" rows="3"></textarea>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button type="submit" onClick={props.handleRegister} className="btn btn-outline-info" style={Btn}>{props.BtnLabel}</button>

        </div>
      </form>
    </div>
  )
}

export function CheckoutForm(props) {
  return (

    <form>
      <fieldset disabled>
        <div className="form-row"><h1>Checkout</h1></div>
        <div className="form-row" style={formMargin}><h5>Personal Information</h5></div>
        <div className="form-row">
          <div className="form-group col-md-6">
            {/* <label for="inputFirstName">First Name</label> */}
            <input type="text" className="form-control" id="inputFirstName" placeholder="First Name" />
          </div>
          <div className="form-group col-md-6">
            {/* <label for="inputLastName">Last Name</label> */}
            <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" />
          </div>
        </div>
        <div className="form-group">
          {/* <label for="inputAddress">Address</label> */}
          <input type="text" className="form-control" id="inputAddress" placeholder="Address" />
        </div>
        <div className="form-group">
          {/* <label for="inputAddress2">Address 2</label> */}
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
        </div>
        <div className="form-row">
          <div className="form-group col-md-5">
            {/* <label for="inputCity">City</label> */}
            <input type="text" className="form-control" id="inputCity" placeholder="City" />
          </div>
          <div className="form-group col-md-4">
            {/* <label for="inputState">State</label> */}
            <select id="inputState" className="form-control">
              <option defaultValue>State</option>
              <option>...</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            {/* <label for="inputZip">Zip</label> */}
            <input type="text" className="form-control" id="inputZip" placeholder="Zip Code" />
          </div>
        </div>

        <div className="form-row" style={formMargin}><h5>Payment Information</h5></div>
        <div className="form-group">
          {/* <label for="inputCreditCard">Credit Card</label> */}
          <input type="text" className="form-control" id="inputCreditCard" placeholder="Credit Card Number...." />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <input type="text" className="form-control" id="inputName" placeholder="Name on Card" />
          </div>
          <div className="form-group col-md-3">
            <input type="text" className="form-control" id="expiryDate" placeholder="Expiry Date" />
          </div>
          <div className="form-group col-md-3">
            <input type="text" className="form-control" id="ccvCode" placeholder="CCV Code" />
          </div>
        </div>
      </fieldset>

      {/* <div className="form-row"> */}
      <button type="button" onClick={props.nextPage} className="btn btn-primary">Place Order</button>
      {/* </div> */}
      <div style={formMargin}>
        <h4>{props.totalPrice}</h4>
      </div>

    </form>

  )
}

// export function AddPhotos(props) {
//   return (
//     <div className="card text-center mx-auto" style={registerFormStyle}>
//       <div className="card-header">
//         Upload Image
//       </div>
//       <div className="card-body">
//         <img src="https://via.placeholder.com/700x250" class="align-middle" alt="..." />
//         <div className="input-group">
//           <div className="custom-file">
//             <input type="file" class="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" />
//             <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
//           </div>
//           <div class="input-group-append">
//             <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button>
//           </div>
//         </div>
//       </div>
//       <div class="input-group mb-3">
//   <div class="input-group-prepend">
//     <label class="input-group-text" for="inputGroupSelect01">Options</label>
//   </div>
//   <select class="custom-select" id="inputGroupSelect01">
//     <option value="1">{props.picProfile}</option>
//     <option value="2">{props.picForSale}</option>
//   </select>
// </div>
//     </div>
//   )
// }

//Function to populate the list of categories in the AddPhotos form below.
 function CategoryView(props){
  const categoryList = props.categories;
  console.log("Category List: " + categoryList)
  const categoryOptions = props.categories.map((x) => {
   return(<option key={x} value={x}>{x}</option>)
  })
  if(categoryList === null){
    return(
      <option value='N/A'>N/A</option>
    )
  }
  else{
    return(
    categoryOptions
    )
  }
}

//->Need fix "Image Description" input
//->Need add "Image Upload" option 

export function AddPhotos(props) {

  return (
    <div style={registerFormStyle}><h1 style={{ textAlign: "center" }}>Upload an Image</h1>
      <form>

        <div className="form-group row">
          <div className="col-sm-3">
            <label htmlFor="inputFirstName" className="col-form-label">{props.nameLabel}</label>
          </div>
          <div className="col-sm-9">
            <input type="text" name={props.name} onChange={props.onChange} className="form-control" id="inputFirstName" placeholder={props.imageNamePlaceholder} />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-3">
            <label htmlFor="description" className="col-form-label">{props.descriptionLabel}</label>
          </div>
          <div className="col-sm-9">
            <textarea type="text" name={props.description} onChange={props.onChange} className="form-control" rows="3" id="inputDescription" placeholder={props.descriptionPlaceholder}></textarea>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-3">
            <label className="col-form-label" htmlFor="inputPicPurpose">{props.picTypeLabel}</label>
          </div>
          <div className="col-sm-9">
            <select className="form-control" name={props.picType} onChange={props.onChange} id="exampleFormControlSelect1" placeholder="Account Type">
              <option value="0">{props.picProfile}</option>
              <option value="1">{props.picForSale}</option>
            </select>
          </div>
        </div>


        <div className="form-group row">
          <div className="col-sm-3">
            <label className="col-form-label" htmlFor="inputPicPurpose">{props.picTypeLabel}</label>
          </div>
          <div className="col-sm-9">
            <select className="form-control" name={props.picType} onChange={props.onChange} id="exampleFormControlSelect1" placeholder="Account Type">
              <CategoryView
              categories={props.categories}
              />
            </select>
          </div>
        </div>


        <div class="input-group mb-3">
          <div className="col-sm-3">
            <label className="col-form-label" htmlFor="price">{props.priceLabel}</label>
          </div>
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>
          <input type="text" name={props.price} onChange={props.onChange} className="form-control" aria-label="Amount (to the nearest dollar)" />
          <div className="input-group-append">
            <span className="input-group-text">.00</span>
          </div>
        </div>

        <div className="input-group">
          <div className="col-sm-3">
            <label className="col-form-label" htmlFor="chooseFile">{props.uploadLabel}</label>
          </div>
          <div className="col-sm-9 custom-file">
            <input type="file" name={props.fileName} onChange={props.fileUpload} class="custom-file-input" id="fileInput" aria-describedby="inputGroupFileAddon04" />
            <label className="custom-file-label" htmlFor="fileInput">{props.uploadMessage}</label>
          </div>
        </div>


        <div style={{ textAlign: "center" }}>
          <button type="submit" onClick={props.fileUpload} className="btn btn-outline-info" style={Btn}>{props.BtnLabel}</button>

        </div>
      </form>
    </div>
  )
}