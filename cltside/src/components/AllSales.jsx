import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, InputGroup, FormControl, Button } from "react-bootstrap";

const AllSales = () => {
  const [sales, setSales] = useState([]);
  const [filtred, setFiltred] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/api/v1/sales")
      .then((res) => {
        setSales(res.data.data.sales);
        setFiltred(res.data.data.sales);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const getPaymentTypeCode = (displayedPaymentType) => {
    return displayedPaymentType === "الدفع بالكريدي"
      ? "credit_payment"
      : "full_payment";
  };

  const search = (value) => {
    var searchBy = sales.filter((el) => {
      const paymentTypeCode = getPaymentTypeCode(el.paymentType); // Convert displayed payment type to code
      const displayedPaymentType =
        el.paymentType === "credit_payment"
          ? "الدفع بالكريدي"
          : "دفع المبلغ كامل";
      return (
        el.name.toLowerCase().includes(value.toLowerCase()) ||
        `${el.price}`.toLowerCase().includes(value.toLowerCase()) ||
        `${el.date}`.toLowerCase().includes(value.toLowerCase()) ||
        el.buyer_firstname.toLowerCase().includes(value.toLowerCase()) ||
        el.buyer_lastname.toLowerCase().includes(value.toLowerCase()) ||
        el.saleNumber.toLowerCase().includes(value.toLowerCase()) ||
        el.registrationNumber.toLowerCase().includes(value.toLowerCase()) ||
        displayedPaymentType.toLowerCase().includes(value.toLowerCase()) ||
        paymentTypeCode.toLowerCase() === value.toLowerCase()
      );
    });
    setFiltred(searchBy);
  };

  const deleteElement = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm("هل تريد حقا الحدف");
    if (ok) {
      const filtred_ = filtred.filter((el) => {
        return el._id !== id;
      });
      axios
        .delete(`http://127.0.0.1:3000/api/v1/sales/${id}`)
        .then((res) => {
          console.log(res);
          if (res.status == 204) {
            setFiltred(filtred_);
            setSales(filtred_);
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          alert(err.response.data.message);
        });
    }
  };

  return (
    <>
      {loaded ? (
        <div className="container" dir="rtl">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <h1 className="text-right mt-5">لائحة المبيعات</h1>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="البحث"
                onChange={(e) => search(e.target.value)}
              />
            </InputGroup>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>الاسم</th>
                <th>طريقة الدفع</th>
                <th>التمن</th>
                <th>عدد الأشهر في حالة الكريدي</th>
                <th>التاريخ</th>
                <th>رقم التسجيل</th>
                <th>رقم الدراجة</th>
                <th>المشتري</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtred.slice(0, Number.MAX_VALUE).map((el) => {
                return (
                  <tr key={el._id}>
                    <td></td>
                    <td>{el.name}</td>
                    <td>
                      {el.paymentType == "credit_payment"
                        ? "الدفع بالكريدي"
                        : "دفع المبلغ كامل"}
                    </td>
                    <td>
                      {el.paymentType == "credit_payment"
                        ? el.pricePerMonth
                        : el.price}
                    </td>
                    <td>
                      {el.paymentType == "credit_payment"
                        ? el.numOfMonths
                        : "لا يوجد كريدي"}
                    </td>
                    <td>{el.date}</td>
                    <td>{el.registrationNumber}</td>
                    <td>{el.saleNumber}</td>
                    <td>{`${el.buyer_firstname}  ${el.buyer_lastname}`}</td>

                    <td>
                      <Link to={`/edit/${el._id}`}>
                        <Button variant="warning">تعديل</Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => deleteElement(el._id)}
                      >
                        ❌
                      </Button>
                    </td>
                    <td>
                      <Link to={`/show/${el._id}`}>عرض المزيد</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AllSales;
