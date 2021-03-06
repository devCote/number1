import React, { useState, useEffect } from 'react';
import './Collections.scss';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import {
//SpinnerOverlay,
//SpinnerContainer,
//} from '../../components/with-spinner/with-spinner.styles';
import {
  selectDirectorySection,
  selectIsDirectoryLoaded,
} from '../../redux/directory/directory.selectors';
import { selectAdminMode } from '../../redux/admin/admin.selector';
import AdminBtns from '../admin/AdminBtns';
import NewSpinner from '../new-spinner/NewSpinner';

const Collection = () => {
  const isLoaded = useSelector(selectIsDirectoryLoaded);
  const [currentStatus, setCurrentStatus] = useState(isLoaded);

  const directory = useSelector(selectDirectorySection);
  const admin = useSelector(selectAdminMode);
  const history = useHistory();

  useEffect(() => {
    setCurrentStatus(isLoaded);
  }, [isLoaded]);

  return (
    <React.Fragment>
      {currentStatus ? (
        <div className='menu container'>
          {admin ? (
            <div
              className='collection-item'
              onClick={() => {
                history.push('/admin/addsection/section');
              }}
            >
              <p className='sign_to_action'>+</p>
              <p className='text_to_action'>Добавить раздел</p>
            </div>
          ) : null}
          {directory.map((section: any) => (
            <div key={section.id} className='collection-item'>
              <Link
                className='image'
                to={section.linkUrl + '/' + section.collectionId}
              >
                <img
                  src={section.imageUrl + '/' + section.collectionId}
                  alt='card pic'
                />
              </Link>
              <div className='content-text'>
                <Link
                  className='header-text'
                  to={section.linkUrl + section.collectionId}
                >
                  {section.title}
                </Link>
              </div>
              <AdminBtns
                item={section}
                editLink={`/admin/editsection/${section.id}`}
                fireColl={'sections'}
                isCollection
              />
            </div>
          ))}
        </div>
      ) : (
        <NewSpinner />
      )}
    </React.Fragment>
  );
};

export default Collection;
