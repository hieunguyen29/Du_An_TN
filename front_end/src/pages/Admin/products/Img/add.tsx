import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddImagesMutation } from '../../../../api/ImagesApi';
import { Iimages } from '../../../../interface/images';

const AdmidImageADD: React.FC = () => {
  const [addimages] = useAddImagesMutation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = form.elements.namedItem('hinh') as HTMLInputElement;
    const selectedFile = fileInput.files[0];
    console.log(selectedFile);
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('hinh', selectedFile);

      await addimages(formData).unwrap();
      navigate('/admin/tour/image/');

    } catch (error) {
      setErrors(error.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Thêm ảnh mới</h2>
      </header>
      <form
        className="tour-form"
        style={{ maxWidth: 600 }}
        onSubmit={onFinish}
        autoComplete="off"
      >
        <div>
          <label htmlFor="hinh">Upload Image</label>
          <input
            type="file"
            id="hinh"
            name="hinh"
            required
            accept="image/*"
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Thêm'}
          </button>
          <button
            type="button"
            className="ml-2"
            onClick={() => navigate('/admin/tour/image/')}
          >
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmidImageADD;