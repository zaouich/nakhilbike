import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav class="navbar navbar-dark bg-dark">
        <div class="container">
          <h1>
            <a class="navbar-brand" href="">
              SIKLAN Moto
            </a>
          </h1>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" to="/">
                  الرئيسية
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/store">
                  اضافة مبيعة
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/select">
                  {" "}
                  الاحصائيات
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Nav;
