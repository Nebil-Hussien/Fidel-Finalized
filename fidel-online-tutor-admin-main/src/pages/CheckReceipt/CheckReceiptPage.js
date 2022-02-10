import { Check } from "@mui/icons-material";
import axios from "../../axios";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import { requests } from "../../constants/requests";
import { displayimage } from "../../helpers/displayImage";

const CheckReceiptPage = () => {
  const { state } = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  if (!state) {
    history.goBack();
  }
  const receipt = state.receipt;

  const confirmPayment = async () => {
    const paymentData = {
      id: receipt._id,
      paid: true,
    };
    setIsLoading(true);
    try {
      const { data } = await axios.post(requests.confirmpayment, paymentData);
      if (!data.success) {
        return alert(data.message);
      } else {
        alert("Payment Confirmed Successfully!!!");
        history.goBack();
      }
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Header />
      <Container className="check-receipt-page ">
        <h1 className="heading-primary--main">Student's Receipt</h1>
        <div className="check-receipt-page__receipt">
          <img
            src={displayimage(receipt.receipt.receiptVerification)}
            alt="receipt-img"
          />
        </div>
        <Button
          disabled={isLoading}
          loading={isLoading}
          onClick={confirmPayment}
          success
        >
          <Check className="btn__icon small" /> Confirm
        </Button>
      </Container>
    </>
  );
};

export default CheckReceiptPage;
