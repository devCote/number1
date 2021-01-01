import React, { useEffect, useRef, useState } from 'react';
import './section.scss';
import { useSelector } from 'react-redux';
import { selectAdminMode } from '../../redux/admin/admin.selector';
import CustomButton from '../custom-button/custom-button';
import {
  addItemToCollection,
  uploadImage,
} from '../../firebase/firebase.utils';
import { useHistory } from 'react-router-dom';
import AdminInput from './AdminInput';

const AddSectionOrCollection = () => {
  const [imageUrl, setImageUrl]: any = useState(null);
  const [file, setFile] = useState(null);
  const [path, setPath] = useState('');
  const [percentage, setPercentage] = useState(null);
  const [status, setStatus] = useState(null);
  const [childRef, setChildRef]: any = useState(null);

  const [title, setTitle] = useState('TEST');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [country, setCountry] = useState('');
  const [landing, setLanding] = useState('');
  const [style, setStyle] = useState('');
  const [color, setColor] = useState('');
  const [fabricType, setFabricType] = useState('');
  const [fabricSettings, setFabricSettings] = useState('');
  const [fastener, setFastener] = useState('');
  const [sizes, setSizes] = useState('');

  const uploadRef: any = useRef();
  const admin = useSelector(selectAdminMode);
  const history = useHistory();

  const addItem = () => {
    let link: string = path;
    if (!path.includes('shop/')) link = `shop/${path}`;
    addItemToCollection('sections', {
      imageUrl,
      linkUrl: link,
      title,
      childRef: childRef.fullPath,
    });
    addItemToCollection('collections', {
      routeName: path,
      title,
    });
  };

  const addItemRef: any = useRef();
  addItemRef.current = addItem;

  useEffect(() => {
    if (childRef) {
      addItemRef.current();
      setTimeout(() => {
        window.location.replace('/');
      }, 1000);
    }
  }, [childRef]);

  const uploadHandler = (e: any) => {
    setFile(e.target.files[0]);

    let reader: any = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const uploadFile = () => {
    uploadRef.current.click();
  };

  const onUploadSubmit = () => {
    uploadImage(
      'images/sections/',
      file,
      setStatus,
      setPercentage,
      setImageUrl,
      setChildRef
    );
  };

  if (!admin) return <h1>Режим админа не включен</h1>;

  if (uploadRef.current) console.log(uploadRef.current);

  return (
    <React.Fragment>
      {admin ? (
        <React.Fragment>
          <div className='main_admin_container'>
            <div className='showcard_admin_row'>
              <div onClick={uploadFile} className='collection-item'>
                <img className='image' src={imageUrl} alt='' />
                <div className='content-text'>{title}</div>
                <input
                  className='upload_btn'
                  type='file'
                  name='sectionImg'
                  onChange={uploadHandler}
                  ref={uploadRef}
                />
              </div>
              <div className='admin_img_prew_container'>
                <div className='admin_img_prew'></div>
                <div className='admin_img_prew'></div>
                <div className='admin_img_prew'></div>
                <div className='admin_img_prew'></div>
              </div>
            </div>
            <div className='admin_input_container'>
              <AdminInput
                inputLabel={'Название продукта'}
                inputValue={title}
                setInput={setTitle}
              />
              <AdminInput
                inputLabel={'Цена'}
                inputValue={price}
                setInput={setPrice}
              />
              <AdminInput
                inputLabel={'Бренд'}
                inputValue={brand}
                setInput={setBrand}
              />
              <AdminInput
                inputLabel={'Страна'}
                inputValue={country}
                setInput={setCountry}
              />
              <AdminInput
                inputLabel={'Посадка'}
                inputValue={landing}
                setInput={setLanding}
              />
              <AdminInput
                inputLabel={'Стиль'}
                inputValue={style}
                setInput={setStyle}
              />
              <AdminInput
                inputLabel={'Цвет'}
                inputValue={color}
                setInput={setColor}
              />
              <AdminInput
                inputLabel={'Тип ткани'}
                inputValue={fabricType}
                setInput={setFabricType}
              />
              <AdminInput
                inputLabel={'Свойства ткани'}
                inputValue={fabricSettings}
                setInput={setFabricSettings}
              />
              <AdminInput
                inputLabel={'Застежка'}
                inputValue={fastener}
                setInput={setFastener}
              />
              <AdminInput
                inputLabel={'Размеры'}
                inputValue={sizes}
                setInput={setSizes}
              />
            </div>
          </div>
          <div className='admin_btn_container'>
            <CustomButton
              onClick={onUploadSubmit}
              className='control_btn'
              type='button'
              apply
            >
              Применить
            </CustomButton>
            <CustomButton
              onClick={() => history.push('/')}
              className='control_btn'
              type='button'
            >
              Вернуться
            </CustomButton>
          </div>
          <div className='admin_status_container'>
            {status && percentage ? (
              <div className='upload_status'>
                <p className='status'>{status}</p>
                {percentage !== '100' ? (
                  <p className='percentage'>{percentage}%</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default AddSectionOrCollection;