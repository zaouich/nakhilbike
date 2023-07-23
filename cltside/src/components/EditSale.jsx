import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditSale = () => {
  const { id } = useParams();
  const [sale, setSale] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [buyer_firstname, setBuyer_firstname] = useState("");
  const [buyer_lastname, setBuyer_lastname] = useState("");
  const [files, setFiles] = useState([]);
  const [saleNumber, setSaleNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [creditPrice, setCreditPrice] = useState("");

  const [numOfMonths, setNumOfMonths] = useState("");

  const handleCreditPriceChange = (e) => {
    setCreditPrice(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleRegistrationNumberChange = (e) => {
    setRegistrationNumber(e.target.value);
  };

  const handleBuyerFirstnameChange = (e) => {
    setBuyer_firstname(e.target.value);
  };

  const handleBuyerLastnameChange = (e) => {
    setBuyer_lastname(e.target.value);
  };

  const handleSaleNumber = (e) => {
    setSaleNumber(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleNumOfMonthsChange = (e) => {
    setNumOfMonths(e.target.value);
  };

  const renderPaymentFields = () => {
    if (paymentMethod === "full_payment") {
      return (
        <div className="form-group mt-4">
          <label htmlFor="price" className="mt-2">
            السعر
          </label>
          <input
            type="number"
            onChange={handlePriceChange}
            className="form-control mt-2"
            id="price"
            value={price}
          />
        </div>
      );
    } else if (paymentMethod === "credit_payment") {
      return (
        <>
          <div className="form-group mt-4">
            <label htmlFor="price_per_month" className="mt-2">
              السعر لشهر
            </label>
            <input
              type="number"
              onChange={handleCreditPriceChange}
              className="form-control mt-2"
              id="price_per_month"
              value={creditPrice}
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="num_of_months" className="mt-2">
              عدد الأشهر
            </label>
            <input
              type="number"
              onChange={handleNumOfMonthsChange}
              className="form-control mt-2"
              id="num_of_months"
              value={numOfMonths}
            />
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000/api/v1/sales/${id}`)
      .then((res) => {
        const { sale } = res.data.data;
        setSale(sale);
        setName(sale.name);
        setPrice(sale.price);
        setCreditPrice(sale.pricePerMonth);
        setNumOfMonths(sale.numOfMonths);
        setDate(sale.date);
        setSaleNumber(sale.saleNumber);
        setRegistrationNumber(sale.registrationNumber);
        setBuyer_firstname(sale.buyer_firstname);
        setBuyer_lastname(sale.buyer_lastname);
      })
      .catch((err) => alert(err.response.data.message));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("paymentType", paymentMethod);
    formData.append("price", price);
    formData.append("date", date);
    formData.append("registrationNumber", registrationNumber);
    formData.append("buyer_firstname", buyer_firstname);
    formData.append("buyer_lastname", buyer_lastname);
    formData.append("saleNumber", saleNumber);
    formData.append("pricePerMonth", creditPrice);
    formData.append("numOfMonths", numOfMonths);

    files.forEach((file) => {
      formData.append("buyer_card", file);
    });

    axios
      .patch(`http://127.0.0.1:3000/api/v1/sales/${id}`, formData)
      .then((res) => {
        alert("تم التعديل بنجاح");
        window.location.href = "/";
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="container" dir="rtl">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <h1 className="text-right m-4 mt-5">تعديل المبيعة</h1>
      </div>
      <div className="container p-4">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group mt-4">
            <label htmlFor="name" className="mt-2">
              الاسم
            </label>
            <input
              onChange={handleNameChange}
              className="form-control mt-2"
              id="name"
              value={name}
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="payment_method" className="mt-2">
              طريقة الدفع
            </label>
            <select
              onChange={handlePaymentMethodChange}
              className="form-control mt-2"
              id="payment_method"
              value={paymentMethod}
            >
              <option value="">اختر الطريقة</option>
              <option value="full_payment">دفع المبلغ كامل</option>
              <option value="credit_payment">الدفع بالكريدي</option>
            </select>
          </div>
          {renderPaymentFields()}
          <div className="form-group mt-4">
            <label htmlFor="date" className="mt-2">
              التاريخ
            </label>
            <input
              type="date"
              onChange={handleDateChange}
              className="form-control mt-2"
              id="date"
              value={date}
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="registrationNumber" className="mt-2">
              رقم التسجيل
            </label>
            <input
              onChange={handleRegistrationNumberChange}
              className="form-control mt-2"
              id="registrationNumber"
              value={registrationNumber}
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="registrationNumber" className="mt-2">
              رقم الدراجة
            </label>
            <input
              onChange={handleSaleNumber}
              className="form-control mt-2"
              id="saleNumber"
              value={saleNumber}
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="buyer_firstname" className="mt-2">
              اسم المشتري
            </label>
            <input
              onChange={handleBuyerFirstnameChange}
              className="form-control mt-2"
              id="buyer_firstname"
              value={buyer_firstname}
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="buyer_lastname" className="mt-2">
              لقب المشتري
            </label>
            <input
              onChange={handleBuyerLastnameChange}
              className="form-control mt-2"
              id="buyer_lastname"
              value={buyer_lastname}
            />
          </div>

          <div className="form-group mt-4">
            <label htmlFor="buyer_card" className="mt-2">
              صور المشتري
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control-file mt-2"
              id="buyer_card"
              multiple
              accept="image/*"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            حفظ التعديلات
          </button>
        </form>
      </div>
      <div className="image-grid mt-4">
        <h4>صور المشتري</h4>
        <div className="row">
          {sale.buyer_card &&
            sale.buyer_card.map((el, index) => {
              const imageUrl = `http://localhost:3000/static/imgs/card/${el}`;
              return (
                <div key={index} className="col-md-4">
                  <img src={imageUrl} alt="Buyer Card" className="img-fluid" />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default EditSale;
