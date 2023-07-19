import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ModalImage from "react-modal-image";

const resizeImage = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        img,
        (img.width - size) / 2,
        (img.height - size) / 2,
        size,
        size,
        0,
        0,
        size,
        size
      );

      canvas.toBlob(
        (resizedBlob) => {
          resolve(URL.createObjectURL(resizedBlob));
        },
        "image/jpeg",
        0.7
      );
    };

    img.src = URL.createObjectURL(blob);
  });
};

const ShowSale = () => {
  const { id } = useParams();
  const [sale, setSale] = useState({});
  const [imgs, setImgs] = useState(false);
  const [resizedImages, setResizedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000/api/v1/sales/${id}`)
      .then((res) => {
        const { sale } = res.data.data;
        setSale(sale);

        // Resize images when sale data is fetched
        const resizedImagePromises = sale.buyer_card.map((el) => {
          const imageUrl = `http://localhost:3000/static/imgs/card/${el}`;
          setImgs(true);
          return resizeImage(imageUrl);
        });

        // Wait for all resized image promises to resolve
        Promise.all(resizedImagePromises).then((resizedImageURIs) => {
          setResizedImages(resizedImageURIs);
          setIsLoading(false); // Set the loading state to false when all images are loaded
        });
      })
      .catch((err) => alert(err.response.data.message));
  }, [id]);

  return (
    <div className="container" dir="rtl">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <h1 className="text-right m-4 mt-5">معلومات المبيعة</h1>
      </div>
      <div className="container p-4">
        <div className="card mb-3">
          <h5 className="card-header">الاسم</h5>
          <div className="card-body">
            <p className="card-text">{sale.name}</p>
          </div>
        </div>
        <div className="card mb-3">
          <h5 className="card-header">السعر</h5>
          <div className="card-body">
            <p className="card-text">{sale.price}</p>
          </div>
        </div>
        <div className="card mb-3">
          <h5 className="card-header">التاريخ</h5>
          <div className="card-body">
            <p className="card-text">{sale.date}</p>
          </div>
        </div>
        <div className="card mb-3">
          <h5 className="card-header">رقم التسجيل</h5>
          <div className="card-body">
            <p className="card-text">{sale.registrationNumber}</p>
          </div>
        </div>
        <div className="card mb-3">
          <h5 className="card-header">اسم المشتري</h5>
          <div className="card-body">
            <p className="card-text">{sale.buyer_firstname}</p>
          </div>
        </div>
        <div className="card mb-3">
          <h5 className="card-header">لقب المشتري</h5>
          <div className="card-body">
            <p className="card-text">{sale.buyer_lastname}</p>
          </div>
        </div>
        <div className="card mb-3">
          <h5 className="card-header">صور المشتري</h5>
          <div className="card-body">
            {isLoading ? ( // Render a loading indicator while the images are loading
              <div>جاري تحميل الصور ... </div>
            ) : (
              <div className="row row-cols-3 g-5">
                {resizedImages.map((smallImageUri, index) => {
                  const imageUrl = `http://localhost:3000/static/imgs/card/${sale.buyer_card[index]}`;

                  return (
                    <div key={index}>
                      <ModalImage
                        small={smallImageUri}
                        large={imageUrl}
                        showRotate
                        alt={`صورة ${index + 1}`}
                        width={200} // Set the desired width here
                        height={200} // Set the desired height here
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSale;
