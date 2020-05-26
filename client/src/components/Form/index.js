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



//Classname attributes for validation
//IsValid will be displayed if the data is proper
//isInValid will be displayed if the data is improper
//textInfo will display when file is properly uploaded
//textDanger will display when a file is not properly uploaded (i.e. server returns 400 status)
const isValid = 'is-valid'
const isInValid = 'is-invalid'
const textInfo = 'text-info'
const textDanger = 'text-danger'



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

            {/* Render error message if userNameFlag is true*/}
            {props.userNameFlag === true ? <small className="form-text text-danger">{props.userNameMessage}</small> : <div></div>}

          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">{props.passwordLabel}</label>
          <div className="col-sm-10">
            <input type="password" name={props.passwordName} onChange={props.onChange} className="form-control" id="inputPassword3" placeholder="Password" />
            
             {/* Render error message if userNameFlag is true*/}
             {props.loginFlag === true ? <small className="form-text text-danger">{props.loginMessage}</small> : <div></div>}
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

//Function to populate the password input error messages in RegisterForm 
function PasswordErr(props) {
  const passwordFlag = props.passwordFlag;
  const passwordError = props.passwordError.map((x) => {
    return (<small key={x} value={x} id="passwordErr" className="form-text text-danger">{'**' + x}</small>)
  })
  if (passwordFlag === true) {
    return (
      <div></div>
    )
  }
  else {
    return (
      passwordError
    )
  }
}
export function RegisterForm(props) {

  return (
    <div style={registerFormStyle}><h1 style={{ textAlign: "center" }}>Image Share</h1>
      <form>
        <div className="form-group row">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label form-control-warning">{props.emailLabel}</label>
          <div className="col-sm-10">
            {/*A ternary operator is used to determine if the props.emailFlag variable is set to true, false, or unset.  The styling is set based on this value */}
            <input type="email" name={props.emailName} onChange={props.onChange} className={`form-control ${props.emailFlag === true && props.duplicateFlag === true ? isValid : (props.emailFlag === false || props.duplicateFlag === false ? isInValid : {})}`} id="inputEmail" placeholder="jdoe@email.com" />

            {/*A ternary operator is used to determine if the props.emailFlag variable is set to true, false, or unset.  The styling is set based on this value */}
            {props.emailFlag === false || props.duplicateFlag === false ? <small id="inputEmail" className="form-text text-danger">{props.emailError}</small> : <small id="emailHelp" className="form-text text-muted">{props.emailMessage}</small>}

          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">{props.passwordLabel}</label>
          <div className="col-sm-10">
            <input type="password" name={props.passwordName} onChange={props.onChange} className={`form-control ${props.passwordFlag === true ? isValid : (props.passwordFlag === false ? isInValid : {})}`} id="inputPassword" placeholder="Password" />
            {props.passwordFlag === false ? <PasswordErr
              passwordFlag={props.passwordFlag}
              passwordError={props.passwordError}
            /> : <div></div>
            }
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputFirstName" className="col-sm-2 col-form-label">{props.firstNameLabel}</label>
          <div className="col-sm-10">
            {/*A ternary operator is used to determine if the props.firstNameFlag variable is set to true, false, or unset.  The styling is set based on this value */}
            <input type="text" name={props.firstName} onChange={props.onChange} className={`form-control ${props.firstNameFlag === true ? isValid : (props.firstNameFlag === false ? isInValid : {})}`} id="inputFirstName" placeholder="John" />

            {/*A ternary operator is used to determine if the props.firstNameFlag variable is set to true, false, or unset.  The styling is set based on this value */}
            {props.firstNameFlag === false ? <small id="inputFirstName" className="form-text text-danger">{props.standardError}</small> : <div></div>}

          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputLastName" className="col-sm-2 col-form-label">{props.lastNameLabel}</label>
          <div className="col-sm-10">
            {/*A ternary operator is used to determine if the props.lastNameFlag variable is set to true, false, or unset.  The styling is set based on this value */}
            <input type="text" name={props.lastName} onChange={props.onChange} className={`form-control ${props.lastNameFlag === true ? isValid : (props.lastNameFlag === false ? isInValid : {})}`} id="inputLastName" placeholder="Doe" />

            {/*A ternary operator is used to determine if the props.lastNameFlag variable is set to true, false, or unset.  The styling is set based on this value */}
            {props.lastNameFlag === false ? <small id="inputLastName" className="form-text text-danger">{props.standardError}</small> : <div></div>}

          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="exampleFormControlSelect1">{props.accountTypeLabel}</label>
          <div className="col-sm-10">
            {/*A ternary operator is used to determine if the props.accountTypeFlag variable is set to true, false, or unset.  The styling is set based on this value */}
            <select className={`form-control ${props.accountTypeFlag === true ? isValid : (props.accountTypeFlag === false ? isInValid : {})}`} name={props.accountType} onChange={props.onChange} id="accountTypeSelect" placeholder="Account Type">
              <option value="2">{props.accountDefault}</option>
              <option value="0">{props.accountPhotographer}</option>
              <option value="1">{props.accountPurchaser}</option>
            </select>

            {/*A ternary operator is used to determine if the props.accountTypeFlag variable is set to true, false, or unset.  The styling is set based on this value */}
            {props.accountTypeFlag === false ? <small id="emailHelp" className="form-text text-danger">{props.standardError}</small> : <div></div>}

          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputAboutMe" className="col-sm-2 col-form-label">{props.aboutMeLabel}</label>
          <div className="col-sm-10">
            <textarea className="form-control" name={props.aboutMe} onChange={props.onChange} id="inputAboutMe" rows="3"></textarea>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button type="button" onClick={props.handleRegister} className="btn btn-outline-info" style={Btn}>{props.BtnLabel}</button>

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

//Function to populate the list of categories in the AddPhotos form below.
function CategoryView(props) {
  const categoryList = props.categories;
  const categoryOptions = props.categories.map((x) => {
    return (<option key={x} value={x}>{x}</option>)
  })
  if (categoryList === null) {
    return (
      <option value='N/A'>N/A</option>
    )
  }
  else {
    return (
      categoryOptions
    )
  }
}


export function AddPhotos(props) {

  return (
    <div style={registerFormStyle}><h1 style={{ textAlign: "center" }}>Upload an Image</h1>
      <form encType="mulitpart/form-data">

        <div className="form-group row">
          <div className="col-sm-3">
            <label htmlFor="inputFirstName" className="col-form-label">{props.nameLabel}</label>
          </div>
          <div className="col-sm-9">

            {/* Ternary operator that checks to see if the disabled prop is true or false.  If true, it will render a disabled
          input element.  If false, it will render an input element that will allow the user to enter a title for the image. 
          Additionally, the imageNameFlag is checked to see if it is true, false, or other.  The format of the input is changed
          depending on these values.  */}
            <div>{props.disabled ? <input type="text" name={props.name} onChange={props.onChange} className="form-control" id="inputFirstName" placeholder={props.titlePlaceHolder} disabled />
              : <input type="text" name={props.name} onChange={props.onChange} className={`form-control ${props.imageNameFlag === true ? isValid : (props.imageNameFlag === false ? isInValid : {})}`} id="inputFirstName" placeholder={props.titlePlaceHolder} />}</div>

            {/* Ternary operater that will display text informing the user that this is a required field if the data is not proper. */}
            {props.imageNameFlag === false && props.disabled === false ? <small id="emailHelp" className="form-text text-danger">{props.standardError}</small> : <div></div>}

          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-3">
            <label htmlFor="description" className="col-form-label">{props.descriptionLabel}</label>
          </div>
          <div className="col-sm-9">

            {/* Ternary operator that checks to see if the disabled prop is true or false.  If true, it will render a disabled
          input element.  If false, it will render an input element that will allow the user to enter a description of the image. */}
            <div>{props.disabled ? <textarea type="text" name={props.description} onChange={props.onChange} className="form-control" rows="3" id="inputDescription" placeholder={props.descriptionPlaceholder} disabled></textarea>
              : <textarea type="text" name={props.description} onChange={props.onChange} className="form-control" rows="3" id="inputDescription" placeholder={props.descriptionPlaceholder}></textarea>}</div>

          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-3">
            <label className="col-form-label" htmlFor="inputPicPurpose">{props.picTypeLabel}</label>
          </div>
          <div className="col-sm-9">
            <select className="form-control" name={props.picType} onChange={props.onChange} id="exampleFormControlSelect1" placeholder="Account Type">
              <option value="1">{props.picForSale}</option>
              <option value="0">{props.picProfile}</option>
            </select>
          </div>
        </div>


        <div className="form-group row">
          <div className="col-sm-3">
            <label className="col-form-label" htmlFor="inputPicPurpose">{props.categoryLabel}</label>
          </div>
          <div className="col-sm-9">

            {/* Ternary operator that checks to see if the disabled prop is true or false.  If true, it will render a disabled
          input element.  If false, it will render an input element that will allow the user to enter a category for the image. */}
            <div>{props.disabled ? <select className="form-control" name={props.category} onChange={props.onChange} id="exampleFormControlSelect1" placeholder="Account Type" disabled></select>
              : <select className="form-control" name={props.category} onChange={props.onChange} id="exampleFormControlSelect1" placeholder="Account Type">
                <CategoryView
                  categories={props.categories}
                />
              </select>}</div>

          </div>
        </div>


        {/* Ternary operator that checks to see if the disabled prop is true or false.  If true, it will render a disabled
          input element.  If false, it will render an input element that will allow the user to enter a price for the image. */}
        {props.disabled ?
          <>
            <div class="input-group mb-3">
              <div className="col-sm-3">
                <label className="col-form-label" htmlFor="price">{props.priceLabel}</label>
              </div>
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>

              <input type="text" name={props.price} onChange={props.onChange} className="form-control" aria-label="Amount (to the nearest dollar)" disabled />
              <div className="input-group-append">
                <span className="input-group-text">.00</span>
              </div>
            </div>
          </>
          :

          <>
            <div className={`input-group ${props.priceFlag === false ? "mb-0" : "mb-3"}`}>
              <div className="col-sm-3">
                <label className="col-form-label" htmlFor="price">{props.priceLabel}</label>
              </div>
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input type="text" name={props.price} onChange={props.onChange} className={`form-control ${props.priceFlag === true ? isValid : (props.priceFlag === false ? isInValid : "")}`} aria-label="Amount (to the nearest dollar)" display="block" />
              <div className="input-group-append">
                <span className="input-group-text">.00</span>
              </div>
            </div>

            {/* Ternary operater that will display text informing the user that this is a required field if the data is not proper. */}
            {props.priceFlag === false && props.disabled === false ?
              <>
                <div className="row">
                  <div className="col-3"></div>
                  <small id="emailHelp" className="form-text col-9 mt-0 mb-3 text-danger">{props.priceError}</small>
                </div>
              </> :
              <div></div>}
          </>}


        <div className="input-group">
          <div className={`col-sm-3 ${props.fileFlag === false ? "mb-0" : "mb-3"}`}>
            <label className="col-form-label" htmlFor="chooseFile">{props.uploadLabel}</label>
          </div>
          <div className="col-sm-9 custom-file">

            {/* Ternary operations performed below to determine if the user tried to submit the form without selecting a proper file (png or jpg). 
              If not, an error message will be displayed.*/}
            <input type="file" name={props.imageFile} onChange={props.fileInputChange} className={`custom-file-input ${props.fileFlag === true ? isValid : (props.fileFlag === false ? isInValid : "")}`} id="fileInput" aria-describedby="inputGroupFileAddon04" />
            <label className="custom-file-label" htmlFor="fileInput">{props.uploadMessage}</label>
          </div>
        </div>

        {props.fileFlag === false ?
          <div className="row">
            <div className="col-3"></div>
            <small id="fileInput" className="form-text mb-3 mt-0 col-9 text-danger">{props.fileError}</small>
          </div> : <div></div>}


        <div style={{ textAlign: "center" }}>
          <button type="submit" onClick={props.fileUpload} className="btn btn-outline-info" style={Btn}>{props.BtnLabel}</button>
        </div>

        {/*Ternary operator to determine if the file was uploaded properly and what message to display*/}
        {props.uploadFlag === "" ? <div></div> : 
        <small style={{ textAlign: "center"}} className={`form-text ${props.uploadFlag === true ? textInfo : textDanger}`}>{props.uploadMsg}</small>
}
      </form>
    </div>
  )
}