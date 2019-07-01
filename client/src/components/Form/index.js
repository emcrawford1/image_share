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
const textStyle = {
  textAlign: "center"
}
const price = {
  marginRight: "20px",
  marginLeft: "20px"
}

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
    <div style={loginFormStyle}><h1 style={{textAlign: "center"}}>Image Share</h1>
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
          <input type="password" name={props.passwordName} onChange={props.onChange}  className="form-control" id="inputPassword3" placeholder="Password" />
        </div>
      </div>
      <div  style={{textAlign: "center"}}>
      <button type="submit" onClick={props.handleRegister} className="btn btn-danger" style={Btn}>{props.RgstrBtnLabel}</button>
      <button type="submit" onClick={props.handleLogin} className="btn btn-primary" style={Btn}>{props.LgnBtnLabel}</button>
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
              <option selected>State</option>
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
      <button type="button" onClick={props.nextPage} class="btn btn-primary">Place Order</button>
      {/* </div> */}
      <div style={formMargin}>
        <h4>{props.totalPrice}</h4>
      </div>

    </form>

  )
}

