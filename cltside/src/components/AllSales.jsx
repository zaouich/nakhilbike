import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, InputGroup, FormControl, Button } from "react-bootstrap";
import Loading from "./Loading";

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

  const search = (value) => {
    var searchBy = sales.filter((el) => {
      return (
        el.name.toLowerCase().includes(value) ||
        `${el.price}`.toLowerCase().includes(value) ||
        `${el.date}`.toLowerCase().includes(value) ||
        el.buyer_firstname.toLowerCase().includes(value) ||
        el.buyer_lastname.toLowerCase().includes(value) ||
        el.saleNumber.toLowerCase().includes(value)
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
  <h1 className="text-right" >لائحة المبيعات</h1>
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
                <th>التمن</th>
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
  {filtred.slice(0,  Number.MAX_VALUE).map((el) => {
    return (
      <tr key={el._id}>
        <td></td>
        <td>{el.name}</td>
        <td>{el.price}</td>
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
          <Link to={`/show/${el._id}`}>
          عرض المزيد
          </Link>
        </td>
      </tr>
    );
  })}
  
</tbody>
          </Table>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AllSales;