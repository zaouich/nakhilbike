import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { Button, FormControl, InputGroup, Table } from "react-bootstrap";

const StatShoose = ()=>{
    const [date, setDate] = useState("");
    const [sales, setSales] = useState([]);
  const [filtred, setFiltred] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [length,setLength] =useState("")
  const [total,setTotal]=useState("")
  const search = (value) => {
    var searchBy = sales.filter((el) => {
      return (
        el.name.toLowerCase().includes(value) ||
        `${el.price}`.toLowerCase().includes(value) ||
        `${el.date}`.toLowerCase().includes(value) ||
        el.buyer_firstname.toLowerCase().includes(value) ||
        el.buyer_lastname.toLowerCase().includes(value)||
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
    const handleDateChange = (e) => {
        setDate(e.target.value);
      };
    
    return <>
          <div className="container" dir="rtl">
          <div className="form-group mt-4">
          <label htmlFor="date" className="mt-2">التاريخ</label>
          <input
          type="date"
            onChange={handleDateChange}
            className="form-control mt-2"
            id="date"
            value={date}
          />
          <button class="btn btn-outline-primary mt-4" onClick={()=>{
                const date_ = new Date(date);
                const year = date_.getFullYear();
                const month = String(date_.getMonth() + 1).padStart(2, '0');
                const day = String(date_.getDate()).padStart(2, '0');
                setDate(`${year}-${month}-${day}`)
              
            setLoaded(true)
            axios
      .get(`http://127.0.0.1:3000/api/v1/sales/getByDay/${date}`)
      .then((res) => {
        setSales(res.data.data.sales);
        setLength(res.data.data.length)
        setTotal(res.data.data.total)
        setFiltred(res.data.data.sales);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
          }}>احصاء</button>
        </div>
          </div>
          <>
      {loaded ? (
        <div className="container" dir="rtl">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
  <Table striped bordered hover className="mt-4">
            <thead >
              <tr>
                <th>عدد المبيعات</th>
                <th>المجموع</th>       
              </tr>
            </thead>
            <tbody>
            <tr >
        <td>{length}</td>
        <td>{total}</td>
        
       
      </tr>
  {filtred.length > 5 && (
    <tr>
      <td colSpan={8} className="text-center">
        <Link to="/sales" className="btn btn-primary">
          عرض المزيد
        </Link>
      </td>
    </tr>
  )}
</tbody>
          </Table>
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
                <th>المشتري</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
  {filtred.slice(0, 5).map((el) => {
    return (
      <tr key={el._id}>
        <td></td>
        <td>{el.name}</td>
        <td>{el.price}</td>
        <td>{el.date}</td>
        <td>{el.registrationNumber}</td>
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
  {filtred.length > 5 && (
    <tr>
      <td colSpan={8} className="text-center">
        <Link to="/sales" className="btn btn-primary">
          عرض المزيد
        </Link>
      </td>
    </tr>
  )}
</tbody>
          </Table>
        </div>
      ) : (
        <div className="container" dir="rtl">
        <h3>المرجو الاختيار</h3>
        </div>
      )}
    </>
    
    </>
}
export default StatShoose