import axios from "axios";
import { useState } from "react";

const AddSale = () => {
  const [sale, setSale] = useState({});
  const [name, setName] = useState("");
  const [saleNumber, setSaleNumber] = useState("");

  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [buyer_firstname, setBuyer_firstname] = useState("");
  const [buyer_lastname, setBuyer_lastname] = useState("");
  const [files, setFiles] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("date", date);
    formData.append("registrationNumber", registrationNumber);
    formData.append("buyer_firstname", buyer_firstname);
    formData.append("buyer_lastname", buyer_lastname);
    formData.append("saleNumber", saleNumber);
    files.forEach((file) => {
      formData.append("buyer_card", file);
    });

    axios
      .post(`http://127.0.0.1:3000/api/v1/sales/`, formData)
      .then((res) => {
        alert("تمت الاضافة بنجاح");
        window.location.href = "/";
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="container" dir="rtl">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <h1 className="text-right m-4 mt-5">اظافة مبيعة</h1>
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
            {" "}
            حفظ
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddSale;
