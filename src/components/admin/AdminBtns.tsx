import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  deleteImage,
  deleteItemFromCollection,
} from '../../firebase/firebase.utils';
import { selectAdminMode } from '../../redux/admin/admin.selector';
import CustomButton from '../custom-button/custom-button';
import './adminBtns.scss';

interface Props {
  item: any;
  editLink: string;
  fireColl: string;
}

const AdminBtns = ({ item, editLink, fireColl }: Props) => {
  const admin = useSelector(selectAdminMode);
  const history = useHistory();

  return (
    <React.Fragment>
      {admin ? (
        <div className='modify_btn_container'>
          <CustomButton
            onClick={() => history.push(editLink)}
            className='modify_btn'
            type='button'
          >
            Изменить
          </CustomButton>
          <CustomButton
            onClick={() => {
              deleteImage(item.childRef);
              deleteItemFromCollection(fireColl, item.id);
              setInterval(() => {
                window.location.reload();
              }, 1000);
            }}
            className='modify_btn'
            type='button'
          >
            Удалить
          </CustomButton>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default AdminBtns;